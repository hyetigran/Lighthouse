import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  SectionList,
  Image,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/core";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Ionicons } from "@expo/vector-icons";

import { RootState } from "../../../store";
import Colors from "../../../constants/Colors";
import { DetailRouteProp } from "../../../navigation/DetailWalletNavigator";
import TransactionItem from "../../../components/Wallets/TransactionItem";
import TransactionItemHeader from "../../../components/Wallets/TransactionItemHeader";
import { thunkGetWalletDetails } from "../../../store/actions/walletActions";
import { Transaction, Wallets } from "../../../store/types/walletTypes";
import emptyImage from "../../../assets/images/empty.png";

const { gainGreenLite, background, gainGreen, darkGrey } = Colors.light;

interface TransformedTransactions {
  month: string;
  data: Transaction[];
}

const WalletDetailScreen = () => {
  const [transformedTransactions, setTransformedTransactions] =
    useState<TransformedTransactions[]>();
  const {
    params: { pId, coinId, walletName, address },
  } = useRoute<DetailRouteProp>();

  const walletDetails = useSelector((state: RootState) => {
    const walletState = state.wallet;
    let selectedWallet: Wallets[];
    for (let i = 0; i < walletState.length; i++) {
      let wallets = walletState[i];
      if (wallets.coinId === coinId) {
        let walletData = wallets.walletsData;
        selectedWallet = [wallets];
        for (let j = 0; j < walletData.length; j++) {
          let wallet = walletData[j];
          if (wallet.privateKeyWIF === pId) {
            selectedWallet[0].walletsData = [wallet];
          }
        }
      }
    }

    return selectedWallet![0];
  });
  const dispatch = useDispatch();
  const { navigate } = useNavigation();

  useEffect(() => {
    dispatch(thunkGetWalletDetails(address, walletName, pId, coinId));
  }, []);

  useEffect(() => {
    if (walletDetails.walletsData[0].transactions) {
      transformTransactions();
    }
  }, [walletDetails.walletsData[0].transactions]);

  const transformTransactions = () => {
    const formatTransactions =
      walletDetails.walletsData[0].transactions!.reduce(
        (acc: any, trxn: Transaction) => {
          // CREATE SECTIONS sorted by MONTH
          let month = moment.unix(trxn.date).format("MMMM");

          let monthExists = false;
          let updatedAcc = acc.map((obj: TransformedTransactions) => {
            if (obj.month === month) {
              monthExists = true;
              return {
                ...obj,
                data: [trxn, ...obj.data],
              };
            }
            return obj;
          });

          // Month Entry does NOT exist
          if (!monthExists) {
            let sectionObject = {
              month,
              data: [trxn],
            };
            return [sectionObject, ...acc];
          }
          // Month Entry does exist
          return updatedAcc;
        },
        []
      );
    setTransformedTransactions(formatTransactions);
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <Text style={styles.mainAmountText}>24.00 USD</Text>
        <Text style={styles.subAmountText}>0.000123 BCH</Text>
        <View style={styles.actionContainer}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() =>
              navigate("Receive", {
                screen: "ReceiveTransactionScreen",
                params: { pId },
              })
            }
          >
            <Text style={styles.actionText}>Receive</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() =>
              navigate("Send", {
                screen: "SendAddressScreen",
                params: { pId },
              })
            }
          >
            <Text style={styles.actionText}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
      {transformedTransactions ? (
        <SectionList
          // NAME UNIQUE ENFORCED?
          keyExtractor={(item) => item.date.toString()}
          renderItem={({ item, section }) => {
            return <TransactionItem transaction={item} />;
          }}
          renderSectionHeader={({ section: { month } }) => (
            <TransactionItemHeader month={month} />
          )}
          sections={transformedTransactions}
        />
      ) : (
        <View style={styles.imgContainer}>
          <Image style={styles.emptyImg} source={emptyImage} />
          <Text style={styles.imgCaption}>No transaction history</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    backgroundColor: gainGreenLite,
    paddingTop: 20,
  },
  actionContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 30,
  },
  actionButton: {
    borderColor: background,
    borderWidth: 0.5,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 4,
    minWidth: "40%",
  },
  actionText: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
    color: background,
  },
  mainAmountText: {
    fontWeight: "bold",
    fontSize: 40,
    textAlign: "center",
    color: background,
    paddingVertical: 10,
  },
  subAmountText: {
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "center",
    color: background,
  },
  imgContainer: {
    flexGrow: 1,
    backgroundColor: background,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyImg: {
    width: 250,
    height: 250,
  },
  imgCaption: {
    color: darkGrey,
  },
});

export default WalletDetailScreen;
