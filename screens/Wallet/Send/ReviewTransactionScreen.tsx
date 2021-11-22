import React from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useRoute } from "@react-navigation/core";

import Colors from "../../../constants/Colors";
import { RootState } from "../../../store";
import ReviewCard from "../../../components/Wallets/ReviewCard";

const { gainGreenLite, background } = Colors.light;

const ReviewTransactionScreen = () => {
  const { name, sendData, balance } = useSelector(
    (state: RootState) => state.send
  );
  const {
    params: { rateUSD },
  } = useRoute();

  return (
    <View style={styles.container}>
      <ScrollView style={styles.reviewContainer}>
        <View style={styles.mainDetailContainer}>
          <Text style={styles.mainText}>You are sending</Text>
          <Text style={[styles.mainText, { fontSize: 30, fontWeight: "bold" }]}>
            0.09 USD
          </Text>
          <Text style={styles.mainText}>0.000 160 00 BCH</Text>
        </View>
        <View style={styles.addressContainer}>
          <ReviewCard header={"From:"} name={name} amount={balance} />
          <ReviewCard header={"To:"} name={sendData.to.address} />
        </View>
      </ScrollView>
      <View style={styles.feeContainer}>
        <Text>Fee: Less than 1 cent</Text>
        <Text>BCH</Text>
      </View>
      <View style={styles.slideContainer}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  reviewContainer: {},
  mainDetailContainer: {
    backgroundColor: gainGreenLite,
    // justifyContent: "center",
    alignItems: "center",
    paddingTop: 40,
    paddingBottom: 80,
  },
  mainText: {
    color: background,
    fontSize: 20,
    paddingTop: 8,
  },
  addressContainer: {
    backgroundColor: background,
    alignItems: "center",
  },
  feeContainer: {
    flexDirection: "row",
  },
  slideContainer: {},
});

export default ReviewTransactionScreen;
