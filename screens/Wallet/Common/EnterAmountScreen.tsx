import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

import {
  estimateTransactionBytes,
  roundNumber,
} from "../../../helpers/utilities";
import Colors from "../../../constants/Colors";
import { BCH_DUST_LIMIT } from "../../../constants/Variables";

const {
  text,
  background,
  secondaryText,
  gainGreenLite,
  darkGrey,
  lossRedLite,
} = Colors.light;

const NUMBER_PAD_KEYS = [
  { key: "7" },
  { key: "8" },
  { key: "9" },
  { key: "4" },
  { key: "5" },
  { key: "6" },
  { key: "1" },
  { key: "2" },
  { key: "3" },
  { key: "." },
  { key: "0" },
  { key: "<" },
];

// IONICONS backspace-outline

const EnterAmountScreen = () => {
  const [isActive, setIsActive] = useState(false);
  const [isCryptoFocus, setIsCryptoFocus] = useState(false);
  const [fieldAmount, setFieldAmount] = useState({
    cryptoAmount: "0",
    fiatAmount: "0",
    error: "",
  });

  // SEND STATE & CURRENT USD RATE
  const { send, currentRateUSD } = useSelector((state: RootState) => {
    let currentRate = state.market[0].find(
      (coin) => coin.name === state.send.name
    )?.price;
    return {
      send: state.send,
      currentRateUSD: currentRate,
    };
  });

  const inputChangeHandler = (val: string) => {
    const { cryptoAmount, fiatAmount } = fieldAmount;
    let updatedVal = isCryptoFocus ? cryptoAmount : fiatAmount;
    const [left, right] = updatedVal.split(".");
    const isFraction = updatedVal.includes(".");

    if (val === "<") {
      if (updatedVal.length === 1) {
        updatedVal = "0";
      } else {
        updatedVal = updatedVal.substring(0, updatedVal.length - 1);
      }
    } else if (left.length >= 7) {
      return;
    } else {
      if (val === ".") {
        if (isFraction) {
          return;
        }
        updatedVal += ".";
      } else {
        if (updatedVal === "0") {
          updatedVal = val;
        } else {
          if (isFraction) {
            if (
              (!isCryptoFocus && right.length > 1) ||
              (isCryptoFocus && right.length > 7)
            ) {
              return;
            }
          }
          updatedVal += val;
        }
      }
    }

    let updatedSecondaryVal;
    let errorMessage;
    if (isCryptoFocus) {
      updatedSecondaryVal = +updatedVal * currentRateUSD!;
      errorMessage = validateCryptoAmount(+updatedVal);
      setFieldAmount({
        cryptoAmount: updatedVal,
        fiatAmount: roundNumber(updatedSecondaryVal.toString(), 2),
        error: errorMessage,
      });
    } else {
      updatedSecondaryVal = roundNumber(
        (+updatedVal / currentRateUSD!).toString(),
        8
      );
      errorMessage = validateCryptoAmount(+updatedSecondaryVal);

      setFieldAmount({
        cryptoAmount: updatedSecondaryVal,
        fiatAmount: updatedVal,
        error: errorMessage,
      });
    }
  };

  const validateCryptoAmount = (value: number) => {
    const fee1 = estimateTransactionBytes(send.sendData.utxos.length, 1);
    if (value < BCH_DUST_LIMIT) {
      return "Amount below the minimum dust limit.";
    }
    if (send.balance - value - fee1 < BCH_DUST_LIMIT) {
      return "Insufficient balance.";
    }
    return "";
  };

  const cryptoOutput = fieldAmount.cryptoAmount + " BCH";
  const fiatOutput = fieldAmount.fiatAmount + " USD";

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.bannerContainer}>
          <View style={styles.bannerSubContainer}>
            <Text style={styles.mainBannerAmount}>
              {isCryptoFocus ? cryptoOutput : fiatOutput}
            </Text>
            <Text style={styles.secondaryBannerAmount}>
              {!isCryptoFocus ? cryptoOutput : fiatOutput}
            </Text>
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>
                {fieldAmount.error ? fieldAmount.error : ""}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.amountSwap}
            onPress={() => setIsCryptoFocus((prevState) => !prevState)}
          >
            <Ionicons color={text} size={30} name="swap-vertical-outline" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.actionContainer}>
        <TouchableOpacity style={styles.sendMaxAction} onPress={() => {}}>
          <Text
            style={{ color: background }}
          >{`Use All Available Funds (${1} USD)`}</Text>
        </TouchableOpacity>
        <View style={styles.numKeyContainer}>
          {NUMBER_PAD_KEYS.map((val) => {
            return (
              <TouchableOpacity
                key={val.key}
                style={styles.numKey}
                onPress={() => inputChangeHandler(val.key)}
              >
                <Text style={styles.keyText}>{val.key}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {}}
            style={isActive ? styles.active : styles.inactive}
          >
            <Text style={styles.submitNext}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  bannerContainer: {
    borderRadius: 8,
    backgroundColor: background,
    marginHorizontal: 20,
    alignSelf: "center",
    width: "90%",
    marginVertical: 10,
    paddingTop: 46,
    paddingBottom: 30,
    shadowColor: darkGrey,
    shadowOpacity: 0.5,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 2 },
    flexDirection: "row",
    justifyContent: "center",
  },
  bannerSubContainer: {
    flex: 5,
    paddingLeft: 40,
  },
  mainBannerAmount: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  secondaryBannerAmount: {
    color: darkGrey,
    fontSize: 18,
    textAlign: "center",
  },
  amountSwap: {
    justifyContent: "center",
    flex: 1,
  },
  errorContainer: {},
  errorText: {
    color: lossRedLite,
  },
  actionContainer: {
    // flex: 1,
    // flexGrow: 1,
  },
  sendMaxAction: {
    backgroundColor: text,
    paddingVertical: 14,
    alignItems: "center",
  },
  numKeyContainer: {
    flexDirection: "row",
    // width: "100%",
    flexWrap: "wrap",
    // flex: 1,
    flexGrow: 1,
  },
  numKey: {
    width: "33.33%",
    alignItems: "center",
    backgroundColor: text,
    borderColor: darkGrey,
    borderWidth: 1,
    paddingVertical: 20,
  },
  keyText: { color: background, fontSize: 20, fontWeight: "bold" },
  submitNext: {
    fontWeight: "bold",
    fontSize: 30,
    color: background,
    textAlign: "center",
    paddingVertical: 16,
  },
  active: { backgroundColor: gainGreenLite },
  inactive: { backgroundColor: darkGrey },
});

export default EnterAmountScreen;
