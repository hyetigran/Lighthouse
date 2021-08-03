import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import SendAddressScreen from "../screens/Wallet/Send/SendAddressScreen";
import ChooseWalletScreen from "../screens/Wallet/Send/ChooseWalletScreen";
import EnterAmountScreen from "../screens/Wallet/Send/EnterAmountScreen";
import ReviewTransactionScreen from "../screens/Wallet/Send/ReviewTransactionScreen";
import { SendParamList } from "../types";

const Stack = createStackNavigator<SendParamList>();

export default function SendNavigator() {
  return (
    <Stack.Navigator initialRouteName="SendAddressScreen">
      <Stack.Screen
        name="SendAddressScreen"
        component={SendAddressScreen}
        options={{
          headerTitle: "Send",
        }}
      />
      <Stack.Screen
        name="ChooseWalletScreen"
        component={ChooseWalletScreen}
        options={{
          headerTitle: "Send",
        }}
      />
      <Stack.Screen
        name="EnterAmountScreen"
        component={EnterAmountScreen}
        options={{
          headerTitle: "Enter Amount",
        }}
      />
      <Stack.Screen
        name="ReviewTransactionScreen"
        component={ReviewTransactionScreen}
        options={{
          headerTitle: "Review Transaction",
        }}
      />
    </Stack.Navigator>
  );
}
