import React from "react";
import { StyleSheet, View, Text } from "react-native";
import TransactionRow from "./TransactionRow";

const TransactionList = () => {
  return (
    <View style={styles.container}>
      <TransactionRow />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    //alignItems: "center",
    //alignContent: "center",
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

export default TransactionList;
