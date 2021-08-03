import * as React from "react";
import {
  createStackNavigator,
  HeaderBackButton,
} from "@react-navigation/stack";
import { TouchableOpacity, Alert } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";

import TransactionSearch from "../screens/Portfolio/TransactionSearch";
import TransactionAdd from "../screens/Portfolio/TransactionAdd";
import TransactionDetail from "../screens/Portfolio/TransactionDetail";
import { TransactionParamList } from "../types";
import HeaderTitle from "../components/HeaderTitle";
import Colors from "../constants/Colors";
import { thunkDeleteTransaction } from "../store/actions/portfolioActions";

const { text } = Colors.light;

// TODO - DUPLICATE? -- see types.tsx
export type TransactionRouteProp = RouteProp<ParamList, "Add">;
type ParamList = {
  Add: {
    id: number;
    name: string;
    symbol: string;
    action?: string;
    txId?: string;
    isOnlyTransaction?: boolean;
  };
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
            const dispatch = useDispatch();
            if (route.params.action === "edit") {
              return (
                <TouchableOpacity
                  style={{ paddingLeft: 15 }}
                  onPress={() => {
                    Alert.alert(
                      "Delete Transaction",
                      "Are you sure you want to delete this transaction?",
                      [
                        {
                          text: "Yes",
                          onPress: () => {
                            const { id: coinId, isOnlyTransaction } =
                              route.params;
                            const txId = route.params.txId!;
                            dispatch(thunkDeleteTransaction({ txId, coinId }));
                            if (isOnlyTransaction) {
                              navigation.navigate("Portfolio");
                            } else {
                              navigation.navigate("TransactionDetail");
                            }
                          },
                          style: "destructive",
                        },
                        {
                          text: "No",
                          style: "cancel",
                        },
                      ]
                    );
                  }}
                >
                  <Ionicons size={24} color={text} name={"trash-outline"} />
                </TouchableOpacity>
              );
            }
            return <HeaderBackButton {...props} onPress={navigation.goBack} />;
          },
          headerRight: () => {
            if (route.params.action === "edit") {
              return (
                <TouchableOpacity style={{ paddingRight: 15 }}>
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
