import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

import { RootState } from "../../../store";
import Colors from "../../../constants/Colors";
import { resetTransaction } from "../../../store/actions/sendActions";

const { gainGreenLite, background } = Colors.light;
const SuccessTransactionScreen = () => {
  const { sendData } = useSelector((state: RootState) => state.send);
  const { navigate } = useNavigation();
  const dispatch = useDispatch();

  const confirmHandler = () => {
    navigate("Wallets");
    dispatch(resetTransaction());
  };
  return (
    <View style={styles.container}>
      <Ionicons name="checkmark-circle-outline" size={180} color={background} />
      <Text style={styles.successText}>Payment Sent</Text>
      <View style={styles.confirmContainer}>
        <TouchableOpacity onPress={confirmHandler}>
          <Text style={styles.successText}>OK</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: gainGreenLite,
    paddingVertical: 120,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  successText: {
    fontWeight: "bold",
    fontSize: 32,
    color: background,
    textAlign: "center",
    paddingVertical: 40,
  },
  confirmContainer: {
    paddingTop: 40,
    borderTopWidth: 0.5,
    borderColor: background,
    width: "100%",
  },
});

export default SuccessTransactionScreen;
