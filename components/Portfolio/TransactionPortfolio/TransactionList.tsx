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
      <FlatList
        data={coin.transactions}
        keyExtractor={(item) => item.txId.toString()}
        renderItem={({ item }) => {
          //   console.log("DATA", data);
          return <TransactionRow transaction={item} />;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default TransactionList;
