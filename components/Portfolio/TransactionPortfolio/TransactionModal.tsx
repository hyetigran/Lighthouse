import React from "react";
import { StyleSheet } from "react-native";
import { View, Text } from "../../Themed";

interface ActionProps {
  txn: { txId: string; coinId: number };
}

const TransactionModal = ({ txn }: ActionProps) => {
  return (
    <View style={styles.container}>
      <Text>T Modal</Text>
      <Text>{txn.txId}</Text>
      <Text>{txn.coinId}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default TransactionModal;
