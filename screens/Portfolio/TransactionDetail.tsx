import React, { useState } from "react";
import { useRoute, useNavigation } from "@react-navigation/core";
import { View, Text, StyleSheet, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import TransactionHero from "../../components/Portfolio/TransactionPortfolio/TransactionHero";
import TransactionList from "../../components/Portfolio/TransactionPortfolio/TransactionList";
import TransactionModal from "../../components/Portfolio/TransactionPortfolio/TransactionModal";
import { TransactionRouteProp } from "../../navigation/TransactionStack";
import { Portfolio } from "../../store/types/portfolioTypes";
import Modal from "../../components/Modal/ModalComponent";
import Spinner from "../../components/UI/Spinner";

import { thunkDeleteTransaction } from "../../store/actions/portfolioActions";

interface ActionState {
  txId: string;
  coinId: number;
}

const TransactionDetail = () => {
  const { params } = useRoute<TransactionRouteProp>();
  const [coin] = useSelector(({ portfolio }: { portfolio: Portfolio }) =>
    portfolio.portfolioCoins!.filter((coin) => coin.coinId === params.id)
  );

  const [isVisible, setIsVisible] = useState(false);
  const [selectedTxn, setSelectedTxn] = useState({ txId: "", coinId: 0 });

  const dispatch = useDispatch();
  const { navigate } = useNavigation();

  if (!coin) {
    return <Spinner />;
  }

  const handleTxnOption = (data: ActionState) => {
    setIsVisible(true);
    setSelectedTxn(data);
  };

  const handleCloseModal = () => {
    setIsVisible(false);
  };

  const handleDeleteAlert = () => {
    Alert.alert(
      "Delete Transaction",
      "Are you sure you want to delete this transaction?",
      [
        {
          text: "Yes",
          onPress: () => {
            dispatch(thunkDeleteTransaction(selectedTxn));
            if (coin.transactions.length > 1) {
              setIsVisible(false);
            } else {
              navigate("Portfolio");
            }
          },
          style: "destructive",
        },
        {
          text: "No",
          style: "cancel",
        },
      ]
    );
  };

  const handleEditNavigate = () => {
    navigate("TransactionAdd", {
      id: coin.coinId,
      name: coin.name,
      symbol: coin.symbol,
      action: "edit",
      txId: selectedTxn.txId,
    });
    setIsVisible(false);
  };

  const totalProfit = coin ? coin.marketValue - coin.costBasis : 0;
  return (
    <View style={styles.container}>
      <TransactionHero
        totalFiat={coin.marketValue!}
        totalOwned={coin.cryptoTotal}
        totalProfit={totalProfit}
        avgBuyPrice={coin.avgBuyPrice}
        avgSellPrice={coin.avgSellPrice}
        numTransactions={coin.transactions.length}
      />
      <TransactionList coin={coin} handleTxnOption={handleTxnOption} />
      <Modal
        modalHeight={200}
        isVisible={isVisible}
        closeModal={handleCloseModal}
      >
        <TransactionModal
          handleDeleteAlert={handleDeleteAlert}
          handleEditNavigate={handleEditNavigate}
          closeModal={handleCloseModal}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default TransactionDetail;
