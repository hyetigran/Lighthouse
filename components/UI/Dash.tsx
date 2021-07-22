import React from "react";
import { View, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
const { darkGrey } = Colors.light;

interface ActionProps {
  isTop: boolean;
}
const Dash = ({ isTop }: ActionProps) => {
  const top = isTop ? -25 : 25;
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
