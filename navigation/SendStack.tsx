import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

import SendAddressScreen from "../screens/Wallet/Send/SendAddressScreen";
import ScanAddressScreen from "../screens/Wallet/Send/ScanAddressScreen";
import SelectSendScreen from "../screens/Wallet/Send/SelectSendScreen";
import EnterAmountScreen from "../screens/Wallet/Common/EnterAmountScreen";
import ReviewTransactionScreen from "../screens/Wallet/Send/ReviewTransactionScreen";
import { SendParamList } from "../types";

const Stack = createStackNavigator<SendParamList>();

// TODO - DUPLICATE? -- see types.tsx
export type SendRouteProp = RouteProp<ParamList, "Scan">;
type ParamList = {
  Scan: {
    setSendAddress: (text: string) => void;
  };
};
export default function SendNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="SendAddressScreen"
      screenOptions={{ gestureEnabled: false }}
    >
      <Stack.Screen
        name="SendAddressScreen"
        component={SendAddressScreen}
        options={{
          headerTitle: "Send",
          headerBackTitle: "Wallet",
        }}
      />
      <Stack.Screen
        name="ScanAddressScreen"
        component={ScanAddressScreen}
        options={{
          headerTitle: "Scan",
          headerBackTitle: "Send",
        }}
      />
      <Stack.Screen
        name="SelectSendScreen"
        component={SelectSendScreen}
        options={{
          headerTitle: " ",
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
