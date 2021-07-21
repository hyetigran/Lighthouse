import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../../../constants/Colors";
import { PortfolioCoin } from "../../../store/types/portfolioTypes";

const {
  tabIconDefault: darkGrey,
  gainGreen,
  lossRed,
  background,
  secondaryText: borderGrey,
} = Colors.light;

interface ActionProps {
  totalOwned: number;
  totalFiat: number;
  totalProfit: number;
  avgBuyPrice: number;
  avgSellPrice: number;
  numTransactions: number;
}
const TransactionHero = ({
  totalFiat,
  totalOwned,
  totalProfit,
  avgBuyPrice,
  avgSellPrice,
  numTransactions,
}: ActionProps) => {
  let gainLossColor;
  let sign;
  if (totalProfit >= 0) {
    gainLossColor = gainGreen;
    sign = "+";
  } else {
    gainLossColor = lossRed;
    sign = "-";
  }
  const formatAvgBuyPrice = avgBuyPrice === 0 ? "-" : avgBuyPrice.toFixed(2);
  const formatAvgSellPrice = avgSellPrice === 0 ? "-" : avgSellPrice.toFixed(2);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.header_container}>
          <Text style={styles.header_label}>Owned</Text>
          <Text>{totalOwned.toFixed(2)}</Text>
        </View>
        <View style={styles.header_container}>
          <Text style={styles.header_label}>Market Value</Text>
          <Text>{`$${totalFiat.toFixed(2)}`}</Text>
        </View>
        <View style={styles.header_container}>
          <Text style={styles.header_label}>Total Profil</Text>
          <Text
            style={{ color: gainLossColor }}
          >{`${sign}$${totalProfit.toFixed(2)}`}</Text>
        </View>
      </View>
      <View style={styles.header}>
        <View style={styles.header_container}>
          <Text style={styles.header_label}>Avg. Buy Price</Text>
          <Text style={avgBuyPrice === 0 && styles.center}>
            {formatAvgBuyPrice}
          </Text>
        </View>
        <View style={styles.header_container}>
          <Text style={styles.header_label}>Avg. Sell Price</Text>
          <Text style={avgSellPrice === 0 && styles.center}>
            {formatAvgSellPrice}
          </Text>
        </View>
        <View style={styles.header_container}>
          <Text style={styles.header_label}># Transactions</Text>
          <Text style={[styles.center, { color: gainLossColor }]}>
            {numTransactions}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: background,
  },
  header: {
    flexDirection: "row",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: borderGrey,
    alignSelf: "center",
    paddingBottom: 30,
  },
  header_container: {
    flex: 1,
  },
  header_label: {
    color: darkGrey,
  },
  center: {
    textAlign: "center",
  },
});
export default TransactionHero;
