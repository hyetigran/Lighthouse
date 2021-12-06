import React from "react";
import { View, Text, StyleSheet } from "react-native";

import Colors from "../../constants/Colors";

interface ActionProps {
  month: string;
}

const {
  tabIconDefault: darkGrey,
  secondaryText: lightGrey,
  gainGreenLite,
} = Colors.light;

const TransactionItemHeader = ({ month }: ActionProps) => {
  return (
    <View style={styles.monthHeaderContainer}>
      <Text style={styles.monthHeaderTitle}>{month}</Text>
    </View>
  );
};

export default TransactionItemHeader;

const styles = StyleSheet.create({
  monthHeaderContainer: {
    flex: 1,
  },
  monthHeaderTitle: {
    color: darkGrey,
  },
});
