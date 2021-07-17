import React from "react";
import { View, Text, StyleSheet } from "react-native";

const TransactionList = () => {
  return (
    <View style={styles.container}>
      <Text>Transaction List </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default TransactionList;
