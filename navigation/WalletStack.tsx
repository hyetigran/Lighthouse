import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import AddWalletScreen from "../screens/Wallet/AddWallet/AddWalletScreen";
import CreateWalletScreen from "../screens/Wallet/AddWallet/CreateWalletScreen";
import { WalletParamList } from "../types";

const Stack = createStackNavigator<WalletParamList>();

export default function AddWalletNavigator() {
  return (
    <Stack.Navigator initialRouteName="AddWalletScreen">
      <Stack.Screen
        name="AddWalletScreen"
        component={AddWalletScreen}
        options={{
          headerTitle: "Add Wallet",
          headerBackTitle: "Wallets",
        }}
      />
      <Stack.Screen
        name="CreateWalletScreen"
        component={CreateWalletScreen}
        options={{
          headerTitle: "Create Personal Wallet",
        }}
      />
    </Stack.Navigator>
  );
}
