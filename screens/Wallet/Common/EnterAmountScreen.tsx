import React from "react";
import { View, Text, StyleSheet } from "react-native";

const NUMBER_PAD_KEYS = [
  { key: "." },
  { key: "0" },
  { key: "<" },
  { key: "1" },
  { key: "2" },
  { key: "3" },
  { key: "4" },
  { key: "5" },
  { key: "6" },
  { key: "7" },
  { key: "8" },
  { key: "9" },
];
const EnterAmountScreen = () => {
  return (
    <View style={styles.container}>
      <View></View>
      <View>
        <View>{/* use all funds */}</View>
        <View style={styles.numKeyContainer}>
          {NUMBER_PAD_KEYS.map((val) => {
            return (
              <View key={val.key} style={styles.numKey}>
                <Text>{val.key}</Text>
              </View>
            );
          })}
        </View>
        <View>{/* next */}</View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  numKeyContainer: {
    flexDirection: "row",
    flexWrap: "wrap-reverse",
  },
  numKey: {
    width: "33%",
    alignItems: "center",
  },
});

export default EnterAmountScreen;
