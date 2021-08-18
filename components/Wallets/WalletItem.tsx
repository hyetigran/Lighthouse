import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Wallet } from "../../store/types/walletTypes";
import Colors from "../../constants/Colors";

interface ActionProps {
  wallet: Wallet;
  logo: string;
  navigate: Function;
}

const { tabIconDefault: darkGrey, secondaryText: lightGrey } = Colors.light;

const WalletItem = ({ wallet, logo, navigate }: ActionProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Image
          style={styles.imgLogo}
          source={{
            uri: logo,
          }}
        />
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.subInfoContainer}>
          <Text style={styles.walletName}>{wallet.name}</Text>
          <Text style={styles.amountText}>0 USD</Text>
        </View>
        <TouchableOpacity onPress={() => {}}>
          <Ionicons name="chevron-forward-outline" size={24} color={darkGrey} />
        </TouchableOpacity>
      </View>
    </View>
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

export default WalletItem;
