import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import {
  PortfolioCoin,
  Transaction,
} from "../../../store/types/portfolioTypes";
import TransactionRow from "./TransactionRow";

interface ActionProps {
  coin: PortfolioCoin;
}
const TransactionList = ({ coin }: ActionProps) => {
  return (
    <View style={styles.container}>
      <Text>Transaction List </Text>
      <View style={styles.verticalLine}></View>
      <FlatList
        data={coin.transactions}
        keyExtractor={(item) => item.txId.toString()}
        renderItem={({ item }) => (
          <TransactionRow transaction={item} symbol={coin.symbol} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  verticalLine: {},
});
export default TransactionList;
