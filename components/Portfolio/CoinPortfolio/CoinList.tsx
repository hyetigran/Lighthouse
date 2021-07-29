import React, { useState } from "react";
import { StyleSheet, ScrollView, Text, ActivityIndicator } from "react-native";
import { useSelector } from "react-redux";

import { RootState } from "../../../store/index";
import { Portfolio } from "../../../store/types/portfolioTypes";
import CoinRow from "./CoinRow";

interface ActionProps {
  isLoading: boolean;
}
// TODO - create filter/sort component
const SORT_FILTER = "marketValue";

const CoinList = ({ isLoading }: ActionProps) => {
  const mainPortfolio: Portfolio = useSelector(
    (state: RootState) => state.portfolio
  );
  mainPortfolio.portfolioCoins.sort((a, b) => b[SORT_FILTER] - a[SORT_FILTER]);

  return (
    <ScrollView
      contentContainerStyle={styles.scrollViewStyle}
      style={styles.container}
    >
      {isLoading && <ActivityIndicator />}
      {mainPortfolio!.portfolioCoins.length && !isLoading ? (
        mainPortfolio?.portfolioCoins.map((pCoin) => (
          <CoinRow key={pCoin.coinId} data={pCoin} />
        ))
      ) : (
        <Text>No transactions found.</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    width: "90%",
    //alignItems: "center",
    //alignContent: "center",
  },
  scrollViewStyle: {
    justifyContent: "center",
  },
  totalAmountText: {
    fontSize: 30,
    fontWeight: "bold",
  },
  returnsContainer: {
    flexDirection: "row",
  },
  timePeriodContainer: {
    flexDirection: "row",
  },
});

export default CoinList;
