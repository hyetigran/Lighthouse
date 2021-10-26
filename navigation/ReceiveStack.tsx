import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ReceiveTransactionScreen from "../screens/Wallet/Receive/ReceiveTransactionScreen";
import EnterAmountScreen from "../screens/Wallet/Common/EnterAmountScreen";
import { ReceiveParamList } from "../types";

const Stack = createStackNavigator<ReceiveParamList>();

export default function SendNavigator() {
  return (
    <Stack.Navigator initialRouteName="ReceiveTransactionScreen">
      <Stack.Screen
        name="ReceiveTransactionScreen"
        component={ReceiveTransactionScreen}
        options={{
          headerTitle: "Receive",
          headerBackTitle: "Wallet",
        }}
      />
      <Stack.Screen
        name="EnterAmountScreen"
        component={EnterAmountScreen}
        options={{
          headerTitle: "Enter Amount",
        }}
      />
    </Stack.Navigator>
  );
}
