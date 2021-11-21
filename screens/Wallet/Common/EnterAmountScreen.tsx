import React, { useState, useMemo, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../../store";
import { addSendCrypto } from "../../../store/actions/sendActions";
import {
  estimateTransactionBytes,
  roundNumber,
} from "../../../helpers/utilities";
import Colors from "../../../constants/Colors";
import { BCH_DUST_LIMIT } from "../../../constants/Variables";

const { text, background, gainGreenLite, darkGrey, lossRed } = Colors.light;

const NUMBER_PAD_KEYS = [
  "7",
  "8",
  "9",
  "4",
  "5",
  "6",
  "1",
  "2",
  "3",
  ".",
  "0",
  "<",
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
      (coin) => coin.symbol === state.send.symbol
    )?.price;
    return {
      send: state.send,
      currentRateUSD: currentRate,
    };
  });

  const { navigate } = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (send.name === "") {
      navigate("Wallets");
    }
  }, [send.name]);

  useEffect(() => {
    if (+fieldAmount.cryptoAmount !== 0 && fieldAmount.error === "") {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [fieldAmount.cryptoAmount, fieldAmount.error]);

  const fee1 = useMemo(
    () => estimateTransactionBytes(send.sendData.utxos.length, 1),
    [send.sendData.utxos]
  );
  const allAvailableCrypto = useMemo(
    () => (send.balance - fee1) / 100000000,
    [send.balance]
  );

  const allAvailableFiat = useMemo(
    () => (allAvailableCrypto * currentRateUSD!).toFixed(2),
    [currentRateUSD]
  );

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

  const maxBalanceHandler = () => {
    let updatedSecondaryVal;
    let errorMessage;
    updatedSecondaryVal = +allAvailableCrypto * currentRateUSD!;
    errorMessage = validateCryptoAmount(+allAvailableCrypto);
    setFieldAmount({
      cryptoAmount: allAvailableCrypto.toString(),
      fiatAmount: roundNumber(updatedSecondaryVal.toString(), 2),
      error: errorMessage,
    });
  };

  const validateCryptoAmount = (value: number) => {
    const toSatoshi = value * 100000000;
    if (toSatoshi < BCH_DUST_LIMIT) {
      return "Amount below the minimum dust limit.";
    }
    if (send.balance - toSatoshi < fee1) {
      return "Insufficient balance.";
    }
    return "";
  };

  const reviewTransactionHandler = () => {
    dispatch(addSendCrypto(+fieldAmount.cryptoAmount));
    navigate("ReviewTransactionScreen");
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
                {fieldAmount.error.length ? fieldAmount.error : ""}
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
        <TouchableOpacity
          style={styles.sendMaxAction}
          onPress={() => maxBalanceHandler()}
        >
          <Text style={{ color: background }}>{`Use All Available Funds (${
            isCryptoFocus
              ? allAvailableCrypto + " BCH"
              : allAvailableFiat + " USD"
          })`}</Text>
        </TouchableOpacity>
        <View style={styles.numKeyContainer}>
          {NUMBER_PAD_KEYS.map((val) => {
            return (
              <TouchableOpacity
                key={val}
                style={styles.numKey}
                onPress={() => inputChangeHandler(val)}
              >
                <Text style={styles.keyText}>{val}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <View>
          <TouchableOpacity
            onPress={reviewTransactionHandler}
            style={isActive ? styles.active : styles.inactive}
            disabled={!isActive}
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
    paddingBottom: 20,
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
    paddingBottom: 20,
  },
  errorContainer: {},
  errorText: {
    color: lossRed,
    paddingTop: 10,
  },
  actionContainer: {},
  sendMaxAction: {
    backgroundColor: text,
    paddingVertical: 14,
    alignItems: "center",
  },
  numKeyContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
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
