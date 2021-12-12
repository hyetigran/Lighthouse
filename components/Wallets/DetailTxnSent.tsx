import React from "react";
import { View, Text, StyleSheet } from "react-native";

import Colors from "../../constants/Colors";

interface ActionProps {
  month: string;
}

const { darkGrey } = Colors.light;

const DetailTxnSent = ({ month }: ActionProps) => {
  return (
    <View style={styles.monthHeaderContainer}>
      <Text style={styles.monthHeaderTitle}>{month}</Text>
    </View>
  );
};

export default DetailTxnSent;

const styles = StyleSheet.create({
  monthHeaderContainer: {
    flex: 1,
    padding: 20,
  },
  monthHeaderTitle: {
    color: darkGrey,
    fontSize: 18,
  },
});
