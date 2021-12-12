import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

import Colors from "../../constants/Colors";

interface ActionProps {
  walletName: string;
  address: string;
}

const { darkGrey, text, secondaryText } = Colors.light;

const DetailTxnReceived = ({ walletName, address }: ActionProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Received To</Text>
      <View style={styles.walletNameContainer}>
        <Image
          style={styles.logo}
          source={{
            uri: `https://s2.coinmarketcap.com/static/img/coins/64x64/1831.png`,
          }}
        />
        <Text style={styles.walletNameText}>{walletName}</Text>
      </View>
      <View style={styles.addressContainer}>
        <Text>{address}</Text>
      </View>
    </View>
  );
};

export default DetailTxnReceived;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderBottomColor: secondaryText,
    borderBottomWidth: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  logo: {
    width: 32,
    height: 32,
  },
  header: {
    color: darkGrey,
    fontSize: 18,
  },
  walletNameContainer: {
    flexDirection: "row",
    paddingVertical: 10,
    alignItems: "center",
  },
  walletNameText: {
    fontSize: 20,
    color: text,
    paddingLeft: 10,
  },
  addressContainer: {
    backgroundColor: secondaryText,
    padding: 10,
    borderRadius: 4,
  },
});
