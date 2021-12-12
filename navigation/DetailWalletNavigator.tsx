import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

import { DetailWalletParamList } from "../types";
import WalletDetailScreen from "../screens/Wallet/Detail/WalletDetailScreen";
import WalletTransactionDetailScreen from "../screens/Wallet/Detail/WalletTransactionDetailScreen";
import HeaderTitle from "../components/HeaderTitle";
import { Transaction } from "../store/types/walletTypes";

const Stack = createStackNavigator<DetailWalletParamList>();

export type DetailRouteProp = RouteProp<ParamList, "Detail">;
export type TransactionRouteProp = RouteProp<ParamList, "Transaction">;
type ParamList = {
  Detail: {
    pId: string;
    coinId: number;
    walletName: string;
    address: string;
    price: number;
  };
  Transaction: {
    transaction: Transaction;
    walletName: string;
  };
};
export default function DetailWalletNavigator() {
  return (
    <Stack.Navigator initialRouteName="WalletDetailScreen">
      <Stack.Screen
        name="WalletDetailScreen"
        component={WalletDetailScreen}
        options={({ route }) => {
          const params = {
            ...route.params,
            id: route.params.coinId,
            name: route.params.walletName,
          };
          return {
            headerTitle: () => <HeaderTitle {...params} />,
            headerBackTitle: "Back",
          };
        }}
      />
      <Stack.Screen
        name="WalletTransactionDetailScreen"
        component={WalletTransactionDetailScreen}
        options={({ route }) => {
          const headerTitle = route.params.transaction.sent
            ? "Sent Funds"
            : "Received Funds";
          const params = {
            ...route.params,
            name: headerTitle,
          };
          return {
            headerTitle: () => <HeaderTitle {...params} />,
            headerBackTitle: " ",
          };
        }}
      />
    </Stack.Navigator>
  );
}
