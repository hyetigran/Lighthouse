import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

import { DetailWalletParamList } from "../types";
import WalletDetailScreen from "../screens/Wallet/Detail/WalletDetailScreen";
import WalletTransactionDetailScreen from "../screens/Wallet/Detail/WalletTransactionDetailScreen";

const Stack = createStackNavigator<DetailWalletParamList>();

export type DetailRouteProp = RouteProp<ParamList, "Detail">;
export type TransactionRouteProp = RouteProp<ParamList, "Transaction">;
type ParamList = {
  Detail: {
    pId: string;
  };
  Transaction: {
    tId: string;
  };
};
export default function DetailWalletNavigator() {
  return (
    <Stack.Navigator initialRouteName="WalletDetailScreen">
      <Stack.Screen
        name="WalletDetailScreen"
        component={WalletDetailScreen}
        options={{
          headerTitle: "Name of wallet here",
          headerBackTitle: "Wallets",
        }}
      />
      <Stack.Screen
        name="WalletTransactionDetailScreen"
        component={WalletTransactionDetailScreen}
        options={{
          headerTitle: "keep name of wallet?",
          headerBackTitle: "Back",
        }}
      />
    </Stack.Navigator>
  );
}
