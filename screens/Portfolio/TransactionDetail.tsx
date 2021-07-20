import React from "react";
import { useRoute } from "@react-navigation/core";
import { View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import TransactionHero from "../../components/Portfolio/TransactionPortfolio/TransactionHero";
import TransactionList from "../../components/Portfolio/TransactionPortfolio/TransactionList";
import { TransactionRouteProp } from "../../navigation/TransactionStack";
import { Portfolio } from "../../store/types/portfolioTypes";

const TransactionDetail = () => {
  const { params } = useRoute<TransactionRouteProp>();
  const [coinTxns] = useSelector(({ portfolio }: { portfolio: Portfolio }) =>
    portfolio.portfolioCoins!.filter((coin) => coin.coinId === params.id)
  );
  return (
    <View style={styles.container}>
      <TransactionHero
        totalFiat={coinTxns.marketValue!}
        totalOwned={coinTxns.cryptoTotal}
        totalProfit={coinTxns.gainLoss}
      />
      <TransactionList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default TransactionDetail;
