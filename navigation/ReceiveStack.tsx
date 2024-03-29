import * as React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

import ReceiveTransactionScreen from "../screens/Wallet/Receive/ReceiveTransactionScreen";
import EnterAmountScreen from "../screens/Wallet/Common/EnterAmountScreen";
import SelectReceiveScreen from "../screens/Wallet/Receive/SelectReceiveScreen";
import { ReceiveParamList } from "../types";
import { RouteProp } from "@react-navigation/native";

export type ReceiveRouteProp = RouteProp<ParamList, "Receive">;
type ParamList = {
  Receive: {
    pk?: string;
  };
};

const Stack = createStackNavigator<ReceiveParamList>();

export default function ReceiveNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="ReceiveTransactionScreen"
      screenOptions={({ route }) => ({
        ...TransitionPresets.ModalSlideFromBottomIOS,
      })}
    >
      <Stack.Screen
        name="ReceiveTransactionScreen"
        component={ReceiveTransactionScreen}
        options={{
          headerTitle: "Receive",
          headerBackTitle: " ",
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
        name="SelectReceiveScreen"
        component={SelectReceiveScreen}
        options={{
          headerTitle: "Select Wallet",
          headerBackTitle: " ",
        }}
      />
    </Stack.Navigator>
  );
}
