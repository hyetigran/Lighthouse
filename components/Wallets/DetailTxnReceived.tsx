import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

import Colors from "../../constants/Colors";

interface ActionProps {
  month: string;
}

const { darkGrey } = Colors.light;

const DetailTxnReceive = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.monthHeaderTitle}>Received To</Text>
      <View>
        <Image
          style={styles.logo}
          source={{
            uri: `https://s2.coinmarketcap.com/static/img/coins/64x64/1831.png`,
          }}
        />
        <Text>Personal Wallet NAME placeholder</Text>
      </View>
      <View>
        <Text>bch address</Text>
      </View>
    </View>
  );
};

export default DetailTxnReceive;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  logo: {
    width: 32,
    height: 32,
  },
  monthHeaderTitle: {
    color: darkGrey,
    fontSize: 18,
  },
});
