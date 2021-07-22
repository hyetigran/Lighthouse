import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { Ionicons } from "@expo/vector-icons";

import { PortfolioCoin } from "../../../store/types/portfolioTypes";
import Colors from "../../../constants/Colors";
import TransactionRow from "./TransactionRow";
import Dash from "../../UI/Dash";

const { background, darkGrey, text } = Colors.light;

interface ActionProps {
  coin: PortfolioCoin;
}
const TransactionList = ({ coin }: ActionProps) => {
  const { navigate } = useNavigation();
  const handleAddNewTransaction = () => {
    navigate("TransactionAdd", { id: coin.coinId, name: coin.name });
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.addTxnButton}
        onPress={handleAddNewTransaction}
      >
        <View style={styles.iconWrapper}>
          <View style={styles.addTxnButtonIcon}>
            <Ionicons
              size={38}
              style={{ alignSelf: "center" }}
              color={"white"}
              name={"add"}
            />
          </View>
        </View>
        <Text style={styles.addTxnButtonText}>Add New Transaction</Text>
      </TouchableOpacity>
      <FlatList
        data={coin.transactions}
        keyExtractor={(item) => item.txId.toString()}
        contentContainerStyle={styles.flatList}
        renderItem={({ item }) => (
          <TransactionRow transaction={item} symbol={coin.symbol} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: background,
  },
  addTxnButton: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    alignSelf: "center",
    marginTop: 10,
    paddingLeft: 8,
  },
  iconWrapper: {
    backgroundColor: darkGrey,
    borderRadius: 60 / 2,
  },
  addTxnButtonIcon: {
    height: 40,
    width: 40,
    paddingLeft: 2,
    backgroundColor: text,
    borderRadius: 40 / 2,
    // shadowColor: darkGrey,
    // shadowOffset: { width: 1, height: 1 },
    // shadowOpacity: 1,
    // shadowRadius: 10,
    margin: 10,
  },
  addTxnButtonText: {
    fontWeight: "bold",
    paddingLeft: 8,
  },
  flatList: {
    paddingBottom: 30,
  },
});
export default TransactionList;
