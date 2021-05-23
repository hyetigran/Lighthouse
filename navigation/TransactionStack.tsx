import { Ionicons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
//import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import TransactionSearch from "../screens/Portfolio/TransactionSearch";
import TransactionAdd from "../screens/Portfolio/TransactionAdd";
import { TransactionParamList } from "../types";

const Stack = createStackNavigator<TransactionParamList>();

export default function TransactionNavigator() {
  const colorScheme = useColorScheme();

  return (
    <Stack.Navigator initialRouteName="TransactionSearch">
      <Stack.Screen
        name="TransactionSearch"
        component={TransactionSearch}
        options={{
          headerTitle: "Add Transaction",
          headerBackTitle: "Portfolio",
        }}
      />
      <Stack.Screen
        name="TransactionAdd"
        component={TransactionAdd}
        options={({ route }) => ({
          headerTitle: route.params.name,
          headerBackTitle: "Portfolio",
        })}
      />
    </Stack.Navigator>
  );
}
