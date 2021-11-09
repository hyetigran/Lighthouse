import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import WalletItem from "./WalletItem";
import { Wallets, Wallet } from "../../store/types/walletTypes";
import Colors from "../../constants/Colors";

interface ActionProps {
  wallets: Wallets;
}
const {
  tabIconDefault: darkGrey,
  background,
  secondaryText: lightGrey,
} = Colors.light;
const WalletCard = ({ wallets }: ActionProps) => {
  const { navigate } = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>{wallets.name}</Text>
        <TouchableOpacity onPress={() => navigate("AddWalletNavigator")}>
          <Ionicons name="add-outline" size={24} color={darkGrey} />
        </TouchableOpacity>
      </View>
      {wallets &&
        wallets.walletsData.map((wallet: Wallet) => (
          <WalletItem
            key={wallet.privateKeyWIF}
            wallet={wallet}
            logo={wallets.logo}
            navigate={navigate}
          />
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: background,
    minWidth: "90%",
    paddingLeft: 20,
    marginBottom: 20,
    borderRadius: 6,
    paddingTop: 16,
    shadowColor: darkGrey,
    shadowOpacity: 0.5,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 2 },
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: lightGrey,
    justifyContent: "space-between",
    paddingRight: 20,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default WalletCard;
