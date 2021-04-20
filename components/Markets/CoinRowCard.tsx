import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";

import Colors from "../../constants/Colors";
import { Currency } from "../../store/types/marketTypes";
import { marketCapFormatter } from "../../helpers/utilities";

interface ActionProps {
  coinInfo: Currency;
}

const CoinRowCard = ({ coinInfo }: ActionProps) => {
  const colorFav = Colors.light.tint;
  const dispatch = useDispatch();

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
  let formattedPrice = price >= 10 ? price.toFixed(2) : price.toFixed(4);
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
            <Text style={styles.secondaryText}>
              {Math.abs(percentChange24h).toFixed(3)}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.spacer}></View>
      <View style={styles.priceContainer}>
        <Text style={styles.primaryText}>{formattedPrice}</Text>
        <Text style={styles.secondaryText}>{`MCap ${marketCapFormatter(
          marketCap
        )}`}</Text>
      </View>
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
    maxWidth: "100%",
    flex: 1,
  },
  logoContainer: {},
  logo: { width: 32, height: 32 },
  infoContainer: {
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
  spacer: {
    flexGrow: 1,
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
