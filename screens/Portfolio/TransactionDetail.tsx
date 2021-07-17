import React from "react";
import { View, StyleSheet } from "react-native";
import TransactionHero from "../../components/Portfolio/TransactionPortfolio/TransactionHero";
import TransactionList from "../../components/Portfolio/TransactionPortfolio/TransactionList";

const TransactionDetail = () => {
  return (
    <View style={styles.container}>
      <TransactionHero />
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
