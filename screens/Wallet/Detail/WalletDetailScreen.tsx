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
import Spinner from "../../../components/UI/Spinner";
import emptyImage from "../../../assets/images/empty.png";
import { thunkAttachPrivateKey } from "../../../store/actions/sendActions";
import { BCH_TO_SATOSHI } from "../../../constants/Variables";
import { roundNumber } from "../../../helpers/utilities";

const { gainGreenLite, background, gainGreen, darkGrey } = Colors.light;

interface TransformedTransactions {
  month: string;
  data: Transaction[];
}

const WalletDetailScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [transformedTransactions, setTransformedTransactions] =
    useState<TransformedTransactions[]>();
  const {
    params: { pId, coinId, walletName, address, price },
  } = useRoute<DetailRouteProp>();

  const wallet = useSelector((state: RootState) => state.wallet);
  const groupIndex = wallet.findIndex((g) => g.coinId === coinId);
  const walletIndex = wallet[groupIndex].walletsData.findIndex(
    (w) => w.privateKeyWIF === pId
  );

  const dispatch = useDispatch();
  const { navigate } = useNavigation();

  useEffect(() => {
    initialLoad();
  }, []);

  const initialLoad = async () => {
    await dispatch(thunkGetWalletDetails(address, walletName, pId, coinId));
    transformTransactions();
  };

  const transformTransactions = () => {
    const formatTransactions = wallet[groupIndex].walletsData[
      walletIndex
    ].transactions!.reduce((acc: any, trxn: Transaction) => {
      // CREATE SECTIONS sorted by MONTH
      let dateUnix = moment.unix(trxn.date);
      let month = dateUnix.format("MMMM");
      let dateDisplay = dateUnix.format("MMM DD, YYYY");
      trxn.dateDisplay = dateDisplay;
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
    }, []);
    setTransformedTransactions(formatTransactions);
    setIsLoading(false);
  };

  const sendHandler = () => {
    dispatch(thunkAttachPrivateKey(pId));

    // pId param currently not used
    navigate("Send", {
      screen: "SendAddressScreen",
      params: { pId },
    });
  };

  const totalCoinBalance =
    wallet[groupIndex].walletsData[walletIndex].balance / BCH_TO_SATOSHI;
  const totalFiatBalance = roundNumber(
    (totalCoinBalance * price).toString(),
    2
  );
  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <Text style={styles.mainAmountText}>{`${totalFiatBalance} USD`}</Text>
        <Text style={styles.subAmountText}>{`${totalCoinBalance} BCH`}</Text>
        <View style={styles.actionContainer}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() =>
              navigate("Receive", {
                screen: "ReceiveTransactionScreen",
                params: { pk: pId },
              })
            }
          >
            <Text style={styles.actionText}>Receive</Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={totalCoinBalance <= 0}
            style={styles.actionButton}
            onPress={sendHandler}
          >
            <Text style={styles.actionText}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
      {isLoading && <Spinner />}
      {!isLoading ? (
        transformedTransactions?.length ? (
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
        )
      ) : (
        <View></View>
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
