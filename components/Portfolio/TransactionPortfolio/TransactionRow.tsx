import React from "react";
import dayjs from "dayjs";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../../../constants/Colors";
import { Transaction } from "../../../store/types/portfolioTypes";
import Dash from "../../UI/Dash";

const {
  darkGrey,
  gainGreen,
  gainGreenLite,
  lossRed,
  lossRedLite,
  background,
  secondaryText: borderGrey,
} = Colors.light;

interface ActionProps {
  transaction: Transaction;
  symbol: string;
}
const TransactionRow = ({
  transaction: {
    isBuy,
    purchaseDate,
    exchange,
    purchasePrice,
    fiat,
    coinAmount,
    costBasis,
    marketValue,
    gainLossPercent,
  },
  symbol,
}: ActionProps) => {
  const formatDate = dayjs(purchaseDate).format("D MMM YYYY [at] HH:mm");

  const handleTransactionOption = () => {
    // OPEN BOTTOM ACTIVE SHEET MODAL
  };

  const actionText = isBuy ? "Buy" : "Sell";
  const deltaColor = gainLossPercent > 0 ? gainGreen : lossRed;

  return (
    <View style={styles.container}>
      <View style={styles.topInfo}>
        <View style={styles.topInfoLeft}>
          <Dash isTop={true} />
          <Dash isTop={false} />
          {isBuy ? (
            <View style={[styles.infoCircle, styles.buyB]}>
              <Text style={styles.circleText}>B</Text>
            </View>
          ) : (
            <View style={[styles.infoCircle, styles.sellS]}>
              <Text style={styles.circleText}>S</Text>
            </View>
          )}
          <View>
            <Text
              style={{ color: darkGrey }}
            >{`${formatDate} via ${exchange}`}</Text>
          </View>
        </View>
        <View>
          <TouchableOpacity onPress={handleTransactionOption}>
            <Ionicons
              size={18}
              color={darkGrey}
              name={"ellipsis-vertical-outline"}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.bottomInfo}>
        <View style={styles.bottomInfoRow}>
          <View style={styles.bottomInfoItem}>
            <Text
              style={styles.bottomInfoItemLabel}
            >{`${symbol} ${actionText} Price`}</Text>
            <Text style={styles.actionText}>{purchasePrice.toFixed(2)}</Text>
          </View>
          <View style={styles.bottomInfoItem}>
            <Text style={styles.bottomInfoItemLabel}>Trading Pair</Text>
            <Text style={styles.actionText}>{`${symbol}/${fiat}`}</Text>
          </View>
          <View style={styles.bottomInfoItem}>
            <Text style={styles.bottomInfoItemLabel}>Amount Added</Text>
            <Text style={styles.actionText}>{coinAmount}</Text>
          </View>
        </View>
        <View style={styles.spacer}></View>
        <View style={styles.bottomInfoRow}>
          <View style={styles.bottomInfoItem}>
            <Text style={styles.bottomInfoItemLabel}>Cost</Text>
            <Text style={styles.actionText}>{costBasis.toFixed(2)}</Text>
          </View>
          <View style={styles.bottomInfoItem}>
            <Text style={styles.bottomInfoItemLabel}>Worth</Text>
            <Text style={styles.actionText}>{marketValue.toFixed(2)}</Text>
          </View>
          <View style={styles.bottomInfoItem}>
            <Text style={styles.bottomInfoItemLabel}>Delta</Text>
            <Text
              style={[styles.actionText, { color: deltaColor }]}
            >{`${gainLossPercent.toFixed(2)}%`}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: background,
    width: "90%",
    alignSelf: "center",
  },
  topInfo: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: 10,
  },
  topInfoLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoCircle: {
    borderWidth: 2,
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    padding: 5,
    marginRight: 8,
  },
  buyB: {
    backgroundColor: gainGreenLite,
    borderColor: gainGreen,
  },
  sellS: { backgroundColor: lossRedLite, borderColor: lossRed },
  circleText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
  bottomInfo: {
    borderColor: darkGrey,
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
  },
  bottomInfoRow: {
    flexDirection: "row",
  },
  bottomInfoItem: {
    flex: 1,
  },
  bottomInfoItemLabel: {
    color: darkGrey,
  },
  spacer: {
    marginVertical: 4,
  },
  actionText: {
    fontWeight: "bold",
  },
});
export default TransactionRow;
