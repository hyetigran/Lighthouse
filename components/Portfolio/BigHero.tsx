import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Colors from "../../constants/Colors";

const BigHero = () => {
  const [periodUI, setPeriodUI] = useState<number>(5);
  return (
    <View style={styles.container}>
      <Text style={styles.totalAmountText}>$ 100,000</Text>
      <View style={styles.returnsContainer}>
        <Text>+ $ 10,000</Text>
        <Text> ^ 5%</Text>
      </View>
      <View style={styles.timePeriodContainer}>
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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
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
    // borderWidth: 1,
  },
  timePeriodText: {
    fontWeight: "bold",
  },
  activeTimeText: {
    color: "#fff",
  },
});

export default BigHero;
