import React, { useState } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useRoute, useNavigation } from "@react-navigation/core";
import Slider from "react-native-slide-to-unlock";

import { ReviewRouteProp } from "../../../navigation/SendStack";
import Colors from "../../../constants/Colors";
import { RootState } from "../../../store";
import ReviewCard from "../../../components/Wallets/ReviewCard";
import { thunkBroadcastTransaction } from "../../../store/actions/sendActions";
import { roundNumber } from "../../../helpers/utilities";
import { BCH_TO_SATOSHI, ONE_CENT } from "../../../constants/Variables";
import DEFAULT_LOGO from "../../../assets/images/icon.png";

const { gainGreenLite, background, darkGrey, gainGreen } = Colors.light;

const ReviewTransactionScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { name, sendData, balance, logo } = useSelector(
    (state: RootState) => state.send
  );
  const {
    params: { rateUSD },
  } = useRoute<ReviewRouteProp>();

  const { navigate } = useNavigation();

  const dispatch = useDispatch();

  const slideToSendHandler = () => {
    setIsLoading(true);
    dispatch(thunkBroadcastTransaction(navigate));
  };
  let feeMessage = "";
  const feeFiat = roundNumber(
    ((sendData.fee / BCH_TO_SATOSHI) * rateUSD).toString(),
    2
  );
  if (+feeFiat <= ONE_CENT) {
    feeMessage = "Less than 1 cent";
  } else {
    feeMessage = feeFiat;
  }

  let imgSource;
  if (!logo) {
    imgSource = DEFAULT_LOGO;
  } else {
    imgSource = { uri: logo };
  }

  // TODO - redirect to main wallet page when missing data i.e.  name, sendData

  const cryptoOutput =
    (sendData.to.satoshis / BCH_TO_SATOSHI).toString() + " BCH";
  const fiatOutput =
    roundNumber(
      ((sendData.to.satoshis / BCH_TO_SATOSHI) * rateUSD).toString(),
      2
    ) + " USD";

  return (
    <View style={styles.container}>
      <ScrollView style={styles.reviewContainer}>
        <View style={styles.mainDetailContainer}>
          <Text style={styles.mainText}>You are sending</Text>
          <Text style={[styles.mainText, { fontSize: 30, fontWeight: "bold" }]}>
            {fiatOutput}
          </Text>
          <Text style={styles.mainText}>{cryptoOutput}</Text>
        </View>
        <View style={styles.addressContainer}>
          <ReviewCard header={"From:"} name={name} amount={balance} />
          <ReviewCard header={"To:"} name={sendData.to.address} />
        </View>
        {isLoading && <ActivityIndicator size="large" color={gainGreen} />}
      </ScrollView>
      <View style={styles.feeContainer}>
        <Text>{`Fee: ${feeMessage}`}</Text>
        <Text>{`${sendData.fee} satoshi`}</Text>
      </View>
      <View style={styles.slideMainContainer}>
        <Slider
          disableSliding={isLoading}
          // childrenContainer={styles.slideChildren}
          onEndReached={slideToSendHandler}
          containerStyle={styles.slideSubContainer}
          sliderElement={
            <Image style={styles.slideElement} source={imgSource} />
          }
        >
          <Text style={styles.slideChildren}>
            {isLoading ? "Sending" : "Slide to send"}
          </Text>
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
    marginHorizontal: 40,
    paddingBottom: 20,
    justifyContent: "space-between",
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
