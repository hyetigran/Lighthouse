import React from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Image,
  Alert,
  Dimensions,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useRoute } from "@react-navigation/core";
import Slider from "react-native-slide-to-unlock";

import Colors from "../../../constants/Colors";
import { RootState } from "../../../store";
import ReviewCard from "../../../components/Wallets/ReviewCard";

const { gainGreenLite, background, darkGrey, text, gainGreen } = Colors.light;
const width = Dimensions.get("window").width;

const ReviewTransactionScreen = () => {
  const { name, sendData, balance, logo } = useSelector(
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
      <View style={styles.slideMainContainer}>
        <Slider
          // childrenContainer={styles.slideChildren}
          onEndReached={() => {
            Alert.alert("Attention", "onEndReached!");
          }}
          containerStyle={styles.slideSubContainer}
          sliderElement={
            <Image style={styles.slideElement} source={{ uri: logo }} />
          }
        >
          <Text style={styles.slideChildren}>Slide to send</Text>
        </Slider>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: background,
  },
  reviewContainer: {},
  mainDetailContainer: {
    backgroundColor: gainGreenLite,
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
  slideMainContainer: {
    alignSelf: "center",
    width: "70%",
    backgroundColor: darkGrey,
    marginBottom: 40,
    borderRadius: 40,
  },
  slideSubContainer: {
    justifyContent: "center",
  },
  slideChildren: {
    color: background,
    backgroundColor: darkGrey,
    fontSize: 16,
    fontWeight: "bold",
  },
  slideElement: {
    width: 80,
    height: 80,
  },
});

export default ReviewTransactionScreen;
