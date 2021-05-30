import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { Input } from "react-native-elements";
import Colors from "../../constants/Colors";

interface ActionProps {
  data: any;
  showDatepicker: () => void;
  date: Date;
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
}: ActionProps) => {
  return (
    <View style={styles.container}>
      <Input label="Exchange" placeholder="Global avg." disabled />
      <Input label="Trading Pair" placeholder={`${symbol}/USD`} disabled />
      <TouchableWithoutFeedback onPress={showDatepicker}>
        <View style={styles.dateContainer}>
          <Text style={styles.dateLabel}>Date & Time</Text>
          <Text style={styles.dateValue}>{date.toDateString()}</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    // backgroundColor: "#fff",
    // justifyContent: "center",
    // flexDirection: "row",
    // borderColor: darkGrey,
    // borderBottomWidth: 1,
    // paddingVertical: 8,
    width: "90%",
    alignSelf: "center",
  },
  dateContainer: {
    marginHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: Colors.light.darkGrey,
    justifyContent: "center",
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
