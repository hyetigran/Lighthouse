// import { Ionicons } from "@expo/vector-icons";
import {
  createStackNavigator,
  HeaderBackButton,
} from "@react-navigation/stack";
import * as React from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
//import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

// import Colors from "../constants/Colors";
// import useColorScheme from "../hooks/useColorScheme";
import TransactionSearch from "../screens/Portfolio/TransactionSearch";
import TransactionAdd from "../screens/Portfolio/TransactionAdd";
import { TransactionParamList } from "../types";
import HeaderTitle from "../components/HeaderTitle";
import { RouteProp } from "@react-navigation/native";
import TransactionDetail from "../screens/Portfolio/TransactionDetail";
import Colors from "../constants/Colors";

const { text } = Colors.light;

export type TransactionRouteProp = RouteProp<ParamList, "Add">;
type ParamList = {
  Add: { id: number; name: string; symbol: string; action?: string };
};
const Stack = createStackNavigator<TransactionParamList>();

export default function TransactionNavigator() {
  // const colorScheme = useColorScheme();

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
        options={({ route, navigation }) => ({
          headerTitle: () => <HeaderTitle {...route.params} />,
          headerLeft: (props) => {
            if (route.params.action === "edit") {
              return (
                <TouchableOpacity>
                  <Ionicons size={24} color={text} name={"trash-outline"} />
                </TouchableOpacity>
              );
            }
            return <HeaderBackButton {...props} onPress={navigation.goBack} />;
          },
          headerRight: () => {
            if (route.params.action === "edit") {
              return (
                <TouchableOpacity>
                  <Ionicons
                    size={30}
                    color={text}
                    name={"close-outline"}
                    onPress={navigation.goBack}
                  />
                </TouchableOpacity>
              );
            }
          },
          // DEFAULT to "Back"
          headerBackTitle: "",
        })}
      />
      <Stack.Screen
        name="TransactionDetail"
        component={TransactionDetail}
        options={({ route }) => ({
          headerTitle: () => <HeaderTitle {...route.params} />,
          headerBackTitle: "Portfolio",
        })}
      />
    </Stack.Navigator>
  );
}
