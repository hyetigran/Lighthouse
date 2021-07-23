import React, { useState } from "react";
import { useRoute } from "@react-navigation/core";
import { View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import TransactionHero from "../../components/Portfolio/TransactionPortfolio/TransactionHero";
import TransactionList from "../../components/Portfolio/TransactionPortfolio/TransactionList";
import TransactionModal from "../../components/Portfolio/TransactionPortfolio/TransactionModal";
import { TransactionRouteProp } from "../../navigation/TransactionStack";
import { Portfolio } from "../../store/types/portfolioTypes";
import Modal from "../../components/Modal/ModalComponent";

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

  const handleTxnOption = (data: ActionState) => {
    setIsVisible(true);
    setSelectedTxn(data);
  };

  const totalProfit = coin.marketValue - coin.costBasis;
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
        closeModal={() => setIsVisible(false)}
      >
        <TransactionModal txn={selectedTxn} />
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
