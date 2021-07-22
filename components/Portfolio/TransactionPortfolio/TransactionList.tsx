import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import {
  PortfolioCoin,
  Transaction,
} from "../../../store/types/portfolioTypes";
import Colors from "../../../constants/Colors";
import TransactionRow from "./TransactionRow";

const { background, darkGrey } = Colors.light;

interface ActionProps {
  coin: PortfolioCoin;
}
const TransactionList = ({ coin }: ActionProps) => {
  return (
    <View style={styles.container}>
      {/* <View style={styles.verticalLine}></View> */}
      <FlatList
        data={coin.transactions}
        // columnWrapperStyle={{ justifyContent: "space-between" }}
        keyExtractor={(item) => item.txId.toString()}
        contentContainerStyle={styles.flatList}
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
    backgroundColor: background,
  },
  flatList: {
    paddingBottom: 30,
  },
});
export default TransactionList;
