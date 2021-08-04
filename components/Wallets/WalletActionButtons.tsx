import React from "react";
import { useNavigation } from "@react-navigation/core";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
const { darkGrey, background } = Colors.light;

const WalletActionButtons = () => {
  const { navigate } = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.actionButton} onPress={() => {}}>
        <Text style={styles.actionText}>Receive</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.actionButton}
        onPress={() => navigate("Send")}
      >
        <Text style={styles.actionText}>Send</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  actionButton: {
    margin: 20,
    paddingVertical: 15,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: darkGrey,
    flex: 1,
    backgroundColor: background,
  },
  actionText: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
});

export default WalletActionButtons;
