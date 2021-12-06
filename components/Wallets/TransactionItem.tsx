import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";

import Colors from "../../constants/Colors";

// interface ActionProps {
//   wallet: Wallet;
//   logo: string;
//   navigate: Function;
// }

const {
  tabIconDefault: darkGrey,
  secondaryText: lightGrey,
  gainGreenLite,
} = Colors.light;

const TransactionItem = () => {
  const { navigate } = useNavigation();
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
      <View style={styles.imgContainer}>
        <Ionicons color={gainGreenLite} />
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.subInfoContainer}>
          <Text style={styles.walletName}>text 1</Text>
          <Text style={styles.amountText}>text 2</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  imgContainer: {},
  imgLogo: {
    height: 40,
    width: 40,
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
