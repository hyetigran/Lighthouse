import React from "react";
import { View, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
const { darkGrey } = Colors.light;

interface ActionProps {
  isTop: boolean;
  topNum?: number;
}
const Dash = ({ isTop, topNum }: ActionProps) => {
  const num = topNum || 25;
  const top = isTop ? -num : num;
  return <View style={[styles.dash, { top: top }]}></View>;
};

const styles = StyleSheet.create({
  dash: {
    height: 12,
    width: 1,
    borderWidth: 0.5,
    borderColor: darkGrey,
    left: 20,
  },
});
export default Dash;
