import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
//import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import CryptoListScreen from "../screens/Markets/CryptoListScreen";
import MainPortfolioScreen from "../screens/Portfolio/MainPortfolioScreen";
import EnterAmountScreen from "../screens/Wallet/Common/EnterAmountScreen";
import MainWalletsScreen from "../screens/Wallet/MainWalletsScreen";
import {
  BottomTabParamList,
  PortfolioTabParamsList,
  MarketsTabParamList,
  WalletsTabParamsList,
} from "../types";
import AddWalletNavigator from "./WalletStack";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Portfolio"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
    >
      <BottomTab.Screen
        name="Markets"
        component={TabMarketsNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-list" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Portfolio"
        component={TabPortfolioNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-folder" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Wallets"
        component={TabWalletsNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-wallet" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
}) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab

// INFLEXIBLE DESIGN -- NOT CURRENTLY INVOKED
// const MarketsTopTab = createMaterialTopTabNavigator();

// function MarketsTopTabNavigator() {
//   return (
//     <MarketsTopTab.Navigator>
//       <MarketsTopTab.Screen
//         name="All Currencies"
//         component={CryptoListScreen}
//       />
//       <MarketsTopTab.Screen name="Favorites" component={CryptoListScreen} />
//     </MarketsTopTab.Navigator>
//   );
// }

const MarketsTabStack = createStackNavigator<MarketsTabParamList>();

function TabMarketsNavigator() {
  return (
    <MarketsTabStack.Navigator>
      <MarketsTabStack.Screen
        name="CryptoListScreen"
        component={CryptoListScreen}
        options={{ headerTitle: "Markets" }}
      />
    </MarketsTabStack.Navigator>
  );
}

const PortfolioTabStack = createStackNavigator<PortfolioTabParamsList>();

function TabPortfolioNavigator() {
  return (
    <PortfolioTabStack.Navigator>
      <PortfolioTabStack.Screen
        name="MainPortfolioScreen"
        component={MainPortfolioScreen}
        options={{ headerTitle: "Main Portfolio" }}
      />
    </PortfolioTabStack.Navigator>
  );
}
const WalletsTabStack = createStackNavigator<WalletsTabParamsList>();

function TabWalletsNavigator() {
  return (
    <WalletsTabStack.Navigator initialRouteName="EnterAmoountScreen">
      <WalletsTabStack.Screen
        name="MainWalletsScreen"
        component={MainWalletsScreen}
        options={{ headerTitle: "Wallets" }}
      />
      <WalletsTabStack.Screen
        name="AddWalletNavigator"
        component={AddWalletNavigator}
        options={{ headerShown: false }}
      />
      <WalletsTabStack.Screen
        name="EnterAmoountScreen"
        component={EnterAmountScreen}
        options={{ headerTitle: "Enter Amount" }}
      />
    </WalletsTabStack.Navigator>
  );
}
