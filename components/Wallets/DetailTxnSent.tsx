import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

import Colors from "../../constants/Colors";

interface ActionProps {
  walletName: string;
  address: string;
}

const { darkGrey, text, secondaryText } = Colors.light;

const DetailTxnSent = ({ walletName, address }: ActionProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.sentContainer}>
        <Text style={styles.header}>To</Text>
        <View style={styles.addressContainer}>
          <Text>{address}</Text>
        </View>
      </View>
      <View style={styles.sentContainer}>
        <Text style={styles.header}>From</Text>
        <View style={styles.walletNameContainer}>
          <Image
            style={styles.logo}
            source={{
              uri: `https://s2.coinmarketcap.com/static/img/coins/64x64/1831.png`,
            }}
          />
          <Text style={styles.walletNameText}>{walletName}</Text>
        </View>
      </View>
    </View>
  );
};

export default DetailTxnSent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sentContainer: {
    borderBottomWidth: 1,
    borderColor: secondaryText,
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
    marginVertical: 4,
  },
});
