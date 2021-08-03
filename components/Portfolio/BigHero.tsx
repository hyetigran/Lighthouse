import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../../constants/Colors";

const { gainGreen, lossRed } = Colors.light;

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
  let sign = "";
  let deltaColor = "";
  let caretDirection = "";
  if (totalGainValue > 0) {
    sign = "+";
    deltaColor = gainGreen;
    caretDirection = "caret-up";
  } else {
    sign = "-";
    deltaColor = lossRed;
    caretDirection = "caret-down";
  }
  return (
    <View style={styles.container}>
      <Text style={styles.totalAmountText}>{`$${totalMarketValue.toFixed(
        2
      )}`}</Text>
      <View style={styles.returnsContainer}>
        <Text
          style={{ color: deltaColor, paddingRight: 10 }}
        >{`${sign} $${Math.abs(totalGainValue).toFixed(2)}`}</Text>
        <View style={{ flexDirection: "row" }}>
          <Ionicons
            size={18}
            color={deltaColor}
            // @ts-ignore
            name={caretDirection}
          />

          <Text style={{ color: deltaColor }}>{`${totalGainPercent.toFixed(
            2
          )}%`}</Text>
        </View>
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
