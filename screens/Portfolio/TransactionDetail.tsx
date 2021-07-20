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
  const [coin] = useSelector(({ portfolio }: { portfolio: Portfolio }) =>
    portfolio.portfolioCoins!.filter((coin) => coin.coinId === params.id)
  );
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
