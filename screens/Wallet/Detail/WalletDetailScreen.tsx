import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  SectionList,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/core";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

import { RootState } from "../../../store";
import Colors from "../../../constants/Colors";
import { DetailRouteProp } from "../../../navigation/DetailWalletNavigator";
import TransactionItem from "../../../components/Wallets/TransactionItem";
import TransactionItemHeader from "../../../components/Wallets/TransactionItemHeader";
import { useEffect } from "hoist-non-react-statics/node_modules/@types/react";
import { thunkGetWalletDetails } from "../../../store/actions/walletActions";

const { gainGreenLite, background, gainGreen } = Colors.light;

const WalletDetailScreen = () => {
  const { sendData } = useSelector((state: RootState) => state.send);

  const {
    params: { pId, coinId, walletName, address },
  } = useRoute<DetailRouteProp>();
  const dispatch = useDispatch();
  const { navigate } = useNavigation();

  useEffect(() => {
    dispatch(thunkGetWalletDetails(address, walletName, pId, coinId));
  }, []);

  let transformedTransactions = sendData;
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
      <SectionList
        // NAME UNIQUE ENFORCED?
        keyExtractor={(item) => item.name}
        renderItem={({ item, section }) => {
          return <TransactionItem data={{}} />;
        }}
        renderSectionHeader={({ section: { name } }) => (
          <TransactionItemHeader month={"December"} />
        )}
        sections={transformedTransactions}
      />
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
});

export default WalletDetailScreen;
