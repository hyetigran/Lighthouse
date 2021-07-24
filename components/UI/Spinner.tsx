import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import Colors from "../../constants/Colors";

const { tint } = Colors.light;

const Spinner = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={tint} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
export default Spinner;
