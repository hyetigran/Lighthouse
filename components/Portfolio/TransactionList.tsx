import React from "react";
import { StyleSheet, View, Text } from "react-native";

const BigHero = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.totalAmountText}>$ 100,000</Text>
      <View style={styles.returnsContainer}>
        <Text>+ $ 10,000</Text>
        <Text> ^ 5%</Text>
      </View>
      <View style={styles.timePeriodContainer}>
        {["1H", "1D", "1W", "1M", "1Y", "All"].map((txt: string) => {
          return <Text>{txt}</Text>;
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    //alignItems: "center",
    //alignContent: "center",
  },
  totalAmountText: {
    fontSize: 30,
    fontWeight: "bold",
  },
  returnsContainer: {
    flexDirection: "row",
  },
  timePeriodContainer: {
    flexDirection: "row",
  },
});

export default BigHero;
