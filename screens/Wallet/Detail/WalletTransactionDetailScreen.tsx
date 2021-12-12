import React from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/core";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

import { RootState } from "../../../store";
import Colors from "../../../constants/Colors";
import { TransactionRouteProp } from "../../../navigation/DetailWalletNavigator";
import DetailTxnReceived from "../../../components/Wallets/DetailTxnReceived";
import DetailTxnSent from "../../../components/Wallets/DetailTxnSent";

const {
  gainGreenLite,
  background,
  tabIconDefault: lightGrey,
  darkGrey,
  secondaryText: border,
  text,
} = Colors.light;

const WalletTransactionDetailScreen = () => {
  //   const { navigate } = useNavigation();
  const {
    params: {
      transaction: {
        id,
        sent,
        value,
        fiatValue,
        dateDisplay,
        fee,
        confirmations,
        address,
      },
      walletName,
    },
  } = useRoute<TransactionRouteProp>();
  const dispatch = useDispatch();

  const viewOnBlockchainHandler = () => {};

  const sentText = sent ? "Sent" : "Received";
  const confirmationText = confirmations > 6 ? "6+" : confirmations;
  return (
    <ScrollView style={styles.container}>
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
          <Text style={styles.cryptoText}>{`${value} BCH`}</Text>
          <Text style={styles.fiatText}>{`${fiatValue} USD`}</Text>
        </View>
      </View>

      <View>
        {sent ? (
          <DetailTxnSent walletName={walletName} address={address} />
        ) : (
          <DetailTxnReceived walletName={walletName} address={address} />
        )}
      </View>
      <View style={styles.detailRowContainer}>
        <Text>Date</Text>
        <Text>{dateDisplay}</Text>
      </View>
      {sent && (
        <View style={styles.detailRowContainer}>
          <Text>Fee</Text>
          <Text>{`${fee} BCH`}</Text>
        </View>
      )}
      <View style={styles.detailRowContainer}>
        <Text>Confirmations</Text>
        <Text>{confirmationText}</Text>
      </View>
      <TouchableOpacity
        onPress={viewOnBlockchainHandler}
        style={styles.viewBlockchainButton}
      >
        <Text style={styles.viewBlockchainText}>View on blockchain</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: background,
  },
  topContainer: {
    borderBottomColor: lightGrey,
    borderBottomWidth: 1,
    paddingHorizontal: 20,
    paddingBottom: 40,
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
  cryptoText: {
    fontSize: 20,
    color: darkGrey,
  },
  fiatText: {
    fontSize: 40,
  },
  // sentRowContainer: {
  //   borderBottomWidth: 1,
  //   borderColor: border,
  //   paddingVertical: 20,
  // },
  detailRowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: border,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  viewBlockchainButton: {
    borderRadius: 4,
    backgroundColor: lightGrey,
    width: "80%",
    alignSelf: "center",
    paddingVertical: 20,
    marginTop: 20,
    marginBottom: 50,
  },
  viewBlockchainText: {
    color: text,
    textAlign: "center",
    fontSize: 20,
  },
});

export default WalletTransactionDetailScreen;
