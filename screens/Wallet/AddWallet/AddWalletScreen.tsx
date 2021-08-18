import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import Colors from "../../../constants/Colors";

const {
  secondaryText: lightGrey,
  background,
  tabIconDefault: darkGrey,
  text,
} = Colors.light;

const AddWalletScreen = () => {
  const { navigate } = useNavigation();
  return (
    <View style={styles.container}>
      {/* TODO - REFACTOR TO COMPONENT */}
      <TouchableOpacity
        style={styles.addWalletRowOption}
        onPress={() => navigate("CreateWalletScreen")}
      >
        <View style={styles.iconContainer}>
          <Ionicons size={40} name="wallet-outline" color={background} />
        </View>
        <Text style={styles.rowText}>New personal wallet</Text>
        <Ionicons name="chevron-forward-outline" size={24} color={darkGrey} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightGrey,
    paddingVertical: 30,
  },
  addWalletRowOption: {
    flexDirection: "row",
    backgroundColor: background,
    width: "90%",
    alignSelf: "center",
    borderRadius: 6,
    padding: 15,
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconContainer: {
    backgroundColor: darkGrey,
    borderRadius: 6,
    padding: 5,
  },
  rowText: {
    fontSize: 18,
    color: text,
    paddingRight: 20,
  },
});

export default AddWalletScreen;
