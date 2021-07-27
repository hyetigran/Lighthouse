import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Colors from "../../constants/Colors";

interface ActionProps {
  data: {
    totalMarketValue: number;
    totalGainValue: number;
    totalGainPercent: number;
  };
}

const BigHero = ({
  data: { totalMarketValue, totalGainValue, totalGainPercent },
}: ActionProps) => {
  const sign = totalGainValue > 0 ? "+" : "-";
  return (
    <View style={styles.container}>
      <Text style={styles.totalAmountText}>{`$${totalMarketValue.toFixed(
        2
      )}`}</Text>
      <View style={styles.returnsContainer}>
        <Text style={{ paddingRight: 10 }}>{`${sign} $${totalGainValue.toFixed(
          2
        )}`}</Text>
        <Text>{`${totalGainPercent.toFixed(2)}%`}</Text>
      </View>
      {/* <View style={styles.timePeriodContainer}>
        {["1H", "1D", "1W", "1M", "1Y", "All"].map(
          (txt: string, index: number) => {
            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.defaultTimePeriod,
                  periodUI === index && styles.activeTimePeriod,
                ]}
                onPress={() => setPeriodUI(index)}
              >
                <Text
                  style={[
                    styles.timePeriodText,
                    periodUI === index && styles.activeTimeText,
                  ]}
                >
                  {txt}
                </Text>
              </TouchableOpacity>
            );
          }
        )}
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    minHeight: 180,
  },
  totalAmountText: {
    fontSize: 36,
    fontWeight: "bold",
  },
  returnsContainer: {
    flexDirection: "row",
  },
  timePeriodContainer: {
    flexDirection: "row",
    marginVertical: 20,
    justifyContent: "space-between",
    width: "60%",
  },
  defaultTimePeriod: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: "#fff",
  },
  activeTimePeriod: {
    backgroundColor: Colors.light.text,
    borderRadius: 30,
  },
  timePeriodText: {
    fontWeight: "bold",
  },
  activeTimeText: {
    color: "#fff",
  },
});

export default BigHero;
