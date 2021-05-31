import React from "react";
import {
  StyleSheet,
  TextInput,
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
  showDatepicker: () => void;
  date: Date;
  buyPrice: string;
  onChangePrice: (e: NSE<TICED>) => void;
}
const {
  tabIconDefault: colorBorder,
  secondaryText: darkGrey,
  gainGreen,
} = Colors.light;

const TransactionForm = ({
  data: { symbol },
  showDatepicker,
  date,
  buyPrice,
  onChangePrice,
}: ActionProps) => {
  return (
    <View style={styles.container}>
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
        onChange={onChangePrice}
        rightIcon={() => <Text>Per coin</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
});

export default TransactionForm;
