import { Ionicons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
//import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import AddTransactionScreen from "../screens/Portfolio/AddTransactionScreen";
import { TransactionParamList } from "../types";

const Stack = createStackNavigator<TransactionParamList>();

export default function TransactionNavigator() {
  const colorScheme = useColorScheme();

  return (
    <Stack.Navigator initialRouteName="TransactionScreen">
      <Stack.Screen
        name="TransactionScreen"
        component={AddTransactionScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
