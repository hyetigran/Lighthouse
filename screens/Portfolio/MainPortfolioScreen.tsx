import * as React from "react";
import { StyleSheet } from "react-native";

import { Text, View } from "../../components/Themed";
import BigHero from "../../components/Portfolio/BigHero";
import TransactionList from "../../components/Portfolio/TransactionList";

export default function MainPortfolioScreen() {
  return (
    <View style={styles.container}>
      <BigHero />
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <TransactionList />
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
