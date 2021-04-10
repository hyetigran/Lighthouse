import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

import Colors from "../../constants/Colors";

const coinInfo = {
  logo: `https://s2.coinmarketcap.com/static/img/coins/64x64/1.png`,
  name: "Bitcoin",
  rank: "1",
  price: "$59,000",
  isFav: false,
  symbol: "BTC",
  marketCap: "$2T",
  percentChange24h: 0.091,
};
const CoinRowCard = () => {
  const color = Colors.light.tint;
  const {
    logo,
    name,
    rank,
    price,
    isFav,
    symbol,
    marketCap,
    percentChange24h,
  } = coinInfo;

  let iconName = isFav ? "star" : "star-outline";
  let percentChangeColor = percentChange24h > 0 ? "#0dc18d" : "#f74909";
  let caretDirection = percentChange24h > 0 ? "caret-up" : "caret-down";
  return (
    <View style={styles.coinRowContainer}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={{
            uri: logo,
          }}
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.primaryText}>{name}</Text>
        <View style={styles.info}>
          <View style={styles.rank}>
            <Text style={{ color: Colors.light.tabIconDefault }}>{rank}</Text>
          </View>
          <Text style={[styles.symbolText, styles.secondaryText]}>
            {symbol}
          </Text>
          <View style={styles.percentChange}>
            <Ionicons
              size={18}
              color={percentChangeColor}
              name={caretDirection}
            />
            <Text style={styles.secondaryText}>{percentChange24h}</Text>
          </View>
        </View>
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.primaryText}>{price}</Text>
        <Text style={styles.secondaryText}>{`MCap ${marketCap}`}</Text>
      </View>
      {/* <View style={styles.faveContainer}>
        <TouchableOpacity onPress={() => {}}>
          <Ionicons size={22} color={color} name={iconName} />
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  coinRowContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: Colors.light.secondaryText,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginVertical: 2,
    width: "100%",
    maxWidth: "100%",
  },
  logoContainer: {},
  logo: { width: 32, height: 32 },
  infoContainer: {
    flex: 1,
    paddingHorizontal: 30,
  },
  info: {
    flexDirection: "row",
  },
  symbolText: {
    paddingLeft: 4,
    paddingRight: 10,
  },
  rank: {
    backgroundColor: Colors.light.secondaryText,
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 4,
  },
  percentChange: {
    flexDirection: "row",
    alignItems: "center",
    color: Colors.light.tabIconDefault,
  },
  priceContainer: {
    alignItems: "flex-end",
  },
  faveContainer: {},
  primaryText: { fontWeight: "bold", fontSize: 18 },
  secondaryText: {
    color: Colors.light.tabIconDefault,
  },
});

export default CoinRowCard;
