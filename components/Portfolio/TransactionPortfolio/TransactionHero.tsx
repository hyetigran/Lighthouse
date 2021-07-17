import React from "react";
import { View, Text, StyleSheet } from "react-native";

const TransactionHero = () => {
  return (
    <View style={styles.container}>
      <Text>Transaction hero </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default TransactionHero;
