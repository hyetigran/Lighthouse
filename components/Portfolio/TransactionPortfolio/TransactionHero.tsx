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
}
const TransactionHero = ({
  totalFiat,
  totalOwned,
  totalProfit,
}: ActionProps) => {
  let gainLossColor = totalProfit >= 0 ? gainGreen : lossRed;
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.header_container}>
          <Text style={styles.header_label}>Owned</Text>
          <Text>crypto total</Text>
        </View>
        <View style={styles.header_container}>
          <Text style={styles.header_label}>Market Value</Text>
          <Text>fiat total</Text>
        </View>
        <View style={styles.header_container}>
          <Text style={styles.header_label}>Total Profil</Text>
          <Text style={{ color: gainLossColor }}>P/L %</Text>
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
});
export default TransactionHero;
