import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";

import Colors from "../../constants/Colors";
import { Transaction } from "../../store/types/walletTypes";

const {
  tabIconDefault: darkGrey,
  secondaryText: lightGrey,
  gainGreenLite,
  background,
} = Colors.light;

interface ActionProps {
  transaction: Transaction;
}
const TransactionItem = ({ transaction }: ActionProps) => {
  const { navigate } = useNavigation();
  const { sent, dateDisplay } = transaction;
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        // TODO - make coinID dynamic
        navigate("DetailWalletNavigator", {
          screen: "WalletTransactionDetail",
          //   params: { pId: wallet.privateKeyWIF, id: 1831, name: wallet.name },
        })
      }
    >
      <View>
        {transaction.sent ? (
          <Ionicons size={40} name="arrow-up-circle-outline" color={darkGrey} />
        ) : (
          <Ionicons
            size={40}
            name="arrow-down-circle-outline"
            color={gainGreenLite}
          />
        )}
      </View>
      <View style={styles.subInfoContainer}>
        <Text style={styles.walletName}>{sent ? "Sent" : "Received"}</Text>
        <Text style={styles.amountText}>{dateDisplay}</Text>
      </View>
      <View style={styles.subInfoContainer}>
        <Text style={styles.walletName}>0.000123 BCH</Text>
        <Text style={styles.amountText}>50 USD</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: background,
    justifyContent: "space-around",
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: lightGrey,
  },
  infoContainer: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: lightGrey,
    marginLeft: 10,
    paddingRight: 20,
    paddingVertical: 20,
  },
  subInfoContainer: {},
  walletName: {
    fontSize: 14,
    fontWeight: "bold",
  },
  amountText: {
    color: darkGrey,
  },
});

export default TransactionItem;
