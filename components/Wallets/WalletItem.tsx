import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Wallet } from "../../store/types/walletTypes";

interface ActionProps {
  wallet: Wallet;
}

const WalletItem = ({ wallet }: ActionProps) => {
  return (
    <View style={styles.container}>
      <Text>WalletItem</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default WalletItem;
