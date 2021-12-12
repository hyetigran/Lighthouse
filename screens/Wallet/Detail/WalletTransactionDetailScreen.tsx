import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/core";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

import { RootState } from "../../../store";
import Colors from "../../../constants/Colors";
import { TransactionRouteProp } from "../../../navigation/DetailWalletNavigator";

const {
  gainGreenLite,
  background,
  tabIconDefault: lightGrey,
  darkGrey,
} = Colors.light;

const WalletTransactionDetailScreen = () => {
  //   const { navigate } = useNavigation();
  const {
    params: {
      transaction: { sent },
    },
  } = useRoute<TransactionRouteProp>();
  const dispatch = useDispatch();

  const sentText = sent ? "Sent" : "Received";
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.sentContainer}>
          {sent ? (
            <Ionicons
              size={40}
              name="arrow-up-circle-outline"
              color={darkGrey}
            />
          ) : (
            <Ionicons
              size={40}
              name="arrow-down-circle-outline"
              color={gainGreenLite}
            />
          )}

          <Text style={styles.sentText}>{sentText}</Text>
        </View>
        <View>
          <Text>BCH placeholder</Text>
          <Text>USD placeholder</Text>
        </View>
      </View>
      <View style={styles.detailContainer}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  topContainer: {
    borderBottomColor: lightGrey,
    borderBottomWidth: 1,
    paddingHorizontal: 20,
  },
  sentContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 20,
  },
  sentText: {
    fontSize: 20,
    paddingLeft: 14,
  },
  detailContainer: {},
});

export default WalletTransactionDetailScreen;
