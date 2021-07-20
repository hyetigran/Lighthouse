import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Colors from "../../../constants/Colors";
import { PortfolioCoin } from "../../../store/types/portfolioTypes";

interface ActionProps {
  data: PortfolioCoin;
}
const {
  tabIconDefault: colorBorder,
  secondaryText: darkGrey,
  gainGreen,
} = Colors.light;

const CoinRow = ({ data }: ActionProps) => {
  const { logo, name, symbol, spotPrice, cryptoTotal, marketValue, coinId } =
    data;
  const { navigate } = useNavigation();
  let gainLossColor = gainGreen;

  const handleNavigate = () => {
    navigate("Transaction", {
      screen: "TransactionDetail",
      params: { id: coinId, name },
    });
  };

  return (
    // <View >
    <TouchableOpacity style={styles.container} onPress={handleNavigate}>
      <View style={styles.imgContainer}>
        <Image
          style={styles.logo}
          source={{
            uri: logo,
          }}
        />
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.infoTop}>
          <Text style={[styles.textPadd, styles.bigAndBold]}>{symbol}</Text>
          <Text style={[styles.textPadd, styles.bigText]}>{name}</Text>
        </View>
        <View style={styles.bottom}>
          <Text style={[styles.textPadd, styles.greyText]}>
            {cryptoTotal.toFixed(2)}
          </Text>
          <View style={styles.dividor} />
          <Text style={[styles.textPadd, styles.greyText]}>
            {spotPrice!.toFixed(2)}
          </Text>
        </View>
      </View>
      <View style={styles.priceContainer}>
        <View>
          <Text style={[styles.textPadd, styles.bigAndBold]}>
            {marketValue!.toFixed(2)}
          </Text>
        </View>
        <View style={styles.bottom}>
          <Text style={[styles.textPadd, { color: gainLossColor }]}>
            abs gain
          </Text>
          <Text
            style={[styles.textPadd, styles.boldText, { color: gainLossColor }]}
          >
            % gain
          </Text>
        </View>
      </View>
    </TouchableOpacity>
    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    flexDirection: "row",
    borderColor: darkGrey,
    borderBottomWidth: 1,
    paddingVertical: 8,
    width: "100%",
  },
  imgContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 5,
  },
  logo: {
    width: 48,
    height: 48,
  },
  infoContainer: {
    flex: 2,
    justifyContent: "space-around",
    paddingHorizontal: 5,
  },
  infoTop: {
    flexDirection: "row",
  },
  bottom: {
    flexDirection: "row",
    flexWrap: "nowrap",
  },
  priceContainer: {
    flex: 2,
    alignItems: "flex-end",
    justifyContent: "space-around",
    paddingHorizontal: 5,
  },
  textPadd: {
    paddingHorizontal: 5,
  },
  dividor: {
    borderLeftColor: darkGrey,
    borderLeftWidth: 1,
  },
  bigText: {
    fontSize: 16,
  },
  boldText: {
    fontWeight: "bold",
  },
  bigAndBold: {
    fontSize: 16,
    fontWeight: "bold",
  },
  greyText: {
    color: colorBorder,
  },
});

export default CoinRow;
