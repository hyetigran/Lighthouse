import React from "react";
import { StyleSheet, View, Text } from "react-native";

const TransactionRow = () => {
  return (
    <View style={styles.container}>
      <Text>Transaction Row</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
});

export default TransactionRow;
