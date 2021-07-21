import React from "react";
import dayjs from "dayjs";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../../../constants/Colors";
import { Transaction } from "../../../store/types/portfolioTypes";
import { TouchableOpacity } from "react-native-gesture-handler";

const {
  tabIconDefault: darkGrey,
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

  return (
    <View style={styles.container}>
      <View style={styles.topInfo}>
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
          <Text>{`${formatDate} via ${exchange}`}</Text>
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
        <View style={styles.bottomInfoRowOne}>
          <View>
            <Text>{`${symbol} ${actionText} Price`}</Text>
            <Text>{purchasePrice.toFixed(2)}</Text>
          </View>
          <View>
            <Text>Trading Pair</Text>
            <Text>{`${symbol}/${fiat}`}</Text>
          </View>
          <View>
            <Text>Amount Added</Text>
            <Text>{coinAmount}</Text>
          </View>
        </View>
        <View style={styles.bottomInfoRowTwo}>
          <View>
            <Text>Cost</Text>
            <Text>{costBasis.toFixed(2)}</Text>
          </View>
          <View>
            <Text>Worth</Text>
            <Text>{marketValue.toFixed(2)}</Text>
          </View>
          <View>
            <Text>Delta</Text>
            <Text>{gainLossPercent}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: background,
  },
  topInfo: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  infoCircle: {
    borderWidth: 2,
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    padding: 5,
  },
  buyB: {
    backgroundColor: gainGreenLite,
    borderColor: gainGreen,
  },
  sellS: { backgroundColor: lossRedLite, borderColor: lossRed },
  circleText: { textAlign: "center", fontWeight: "bold", fontSize: 20 },
  bottomInfo: {},
  bottomInfoRowOne: {},
  bottomInfoRowTwo: {},
});
export default TransactionRow;
