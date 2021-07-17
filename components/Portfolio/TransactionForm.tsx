import React from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableWithoutFeedback,
  NativeSyntheticEvent as NSE,
  TextInputChangeEventData as TICED,
} from "react-native";
import { Input } from "react-native-elements";
import moment from "moment";
import Colors from "../../constants/Colors";

interface ActionProps {
  data: any;
  date: Date;
  buyPrice: string;
  priceType: number;
  coinAmount: string;
  error: { coin: boolean; price: boolean; date: boolean };
  togglePriceType: () => void;
  onChangePrice: (text: string) => void;
  showDatepicker: () => void;
  handleCoinAmount: (text: string) => void;
  validateField: (text: string) => void;
}
const {
  tabIconDefault: colorBorder,
  secondaryText: darkGrey,
  gainGreen,
} = Colors.light;

const TransactionForm = ({
  data: { symbol },
  date,
  buyPrice,
  priceType,
  coinAmount,
  error,
  showDatepicker,
  onChangePrice,
  togglePriceType,
  handleCoinAmount,
  validateField,
}: ActionProps) => {
  const rightPriceText = priceType ? "in total" : "per coin";

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <Input label="Exchange" placeholder="Global avg." disabled />
      <Input label="Trading Pair" placeholder={`${symbol}/USD`} disabled />
      <TouchableWithoutFeedback onPress={showDatepicker}>
        <View style={styles.dateContainer}>
          <Text style={styles.dateLabel}>Date & Time</Text>
          <Text style={styles.dateValue}>
            {moment(date).format("MMMM Do YYYY, h:mm a")}
          </Text>
        </View>
      </TouchableWithoutFeedback>
      <Input
        label={buyPrice ? "Buy Price" : " "}
        placeholder="Buy Price"
        value={buyPrice}
        keyboardType="numeric"
        onChangeText={onChangePrice}
        errorMessage={error.price ? "Required field" : ""}
        onBlur={() => validateField("price")}
        rightIcon={() => (
          <Text style={styles.rightTextToggle} onPress={togglePriceType}>
            {rightPriceText}
          </Text>
        )}
      />
      <Input
        label={coinAmount ? "Amount Bought" : " "}
        placeholder="Amount Bought"
        value={coinAmount}
        defaultValue={coinAmount}
        keyboardType="numeric"
        onChangeText={handleCoinAmount}
        errorMessage={error.coin ? "Required field" : ""}
        onBlur={() => validateField("coin")}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    alignSelf: "center",
  },
  dateContainer: {
    marginHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: Colors.light.darkGrey,
    justifyContent: "center",
    marginBottom: 20,
  },
  dateLabel: {
    color: Colors.light.darkGrey,
    fontSize: 16,
    fontWeight: "bold",
  },
  dateValue: {
    fontSize: 18,
    paddingVertical: 9,
  },
  rightTextToggle: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    backgroundColor: Colors.light.secondaryText,
    borderWidth: 1,
    borderColor: Colors.light.darkGrey,
    borderRadius: 12,
    overflow: "hidden",
  },
});

export default TransactionForm;
