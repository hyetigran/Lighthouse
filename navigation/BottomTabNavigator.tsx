import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import TabOneScreen from "../screens/TabOneScreen";
import TabTwoScreen from "../screens/TabTwoScreen";
import CryptoListScreen from "../screens/Markets/CryptoListScreen";
import MainPortfolioScreen from "../screens/Portfolio/MainPortfolioScreen";
import MainWalletsScreen from "../screens/Wallet/MainWalletsScreen";
import { BottomTabParamList, TabOneParamList, TabTwoParamList } from "../types";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="MarketsTab"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
    >
      <BottomTab.Screen
        name="MarketsTab"
        component={TabMarketsNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-code" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="PortfolioTab"
        component={TabPortfolioNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-code" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="WalletTab"
        component={TabWalletsNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-code" color={color} />
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

const MarketsTabStack = createStackNavigator<TabTwoParamList>();

function TabMarketsNavigator() {
  return (
    <MarketsTabStack.Navigator>
      <MarketsTabStack.Screen
        name="MarketsTab"
        component={CryptoListScreen}
        options={{ headerTitle: "Markets" }}
      />
    </MarketsTabStack.Navigator>
  );
}

const PortfolioTabStack = createStackNavigator<TabTwoParamList>();

function TabPortfolioNavigator() {
  return (
    <PortfolioTabStack.Navigator>
      <PortfolioTabStack.Screen
        name="PortfolioTab"
        component={MainPortfolioScreen}
        options={{ headerTitle: "Main Portfolio" }}
      />
    </PortfolioTabStack.Navigator>
  );
}
const WalletsTabStack = createStackNavigator<TabTwoParamList>();

function TabWalletsNavigator() {
  return (
    <WalletsTabStack.Navigator>
      <WalletsTabStack.Screen
        name="WalletTab"
        component={MainWalletsScreen}
        options={{ headerTitle: "Wallets" }}
      />
    </WalletsTabStack.Navigator>
  );
}
