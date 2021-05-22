import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { thunkFetchPortfolio } from "../../store/actions/portfolioActions";

import { Text, View } from "../../components/Themed";
import BigHero from "../../components/Portfolio/BigHero";
import TransactionList from "../../components/Portfolio/TransactionList";

export default function MainPortfolioScreen() {
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true)
    dispatch(thunkFetchPortfolio())
    setIsLoading(false)
  }, [])

  return (
    <View style={styles.container}>
      <BigHero />
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <TransactionList isLoading={isLoading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
