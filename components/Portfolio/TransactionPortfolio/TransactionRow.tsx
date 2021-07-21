import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../../../constants/Colors";
import { Transaction } from "../../../store/types/portfolioTypes";

const {
  tabIconDefault: darkGrey,
  gainGreen,
  lossRed,
  background,
  secondaryText: borderGrey,
} = Colors.light;

interface ActionProps {
  //   transaction: Transaction;
}
const TransactionRow = ({}: ActionProps) => {
  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: background,
  },
});
export default TransactionRow;
