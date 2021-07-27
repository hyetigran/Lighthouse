import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";
// @ts-ignore
import { PORTFOLIO_API_URL } from "@env";

import {
  thunkFetchPortfolio,
  thunkCreatePortfolio,
} from "../../store/actions/portfolioActions";
import { View } from "../../components/Themed";
import BigHero from "../../components/Portfolio/BigHero";
import CoinList from "../../components/Portfolio/CoinPortfolio/CoinList";
import InitialPortfolioSplash from "../../components/Portfolio/InitialPortfolioSplash";
import Colors from "../../constants/Colors";
import Auth from "../../helpers/auth";
import { RootState } from "../../store";

const { tint, tabIconDefault, secondaryText } = Colors.light;

export default function MainPortfolioScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const portfolio = useSelector((state: RootState) => state.portfolio);
  const dispatch = useDispatch();
  const { navigate } = useNavigation();

  useEffect(() => {
    setIsLoading(true);
    handleInitialLoad();
    setIsLoading(false);
  }, []);

  const addTransactionHandler = () => {
    navigate("Transaction");
  };

  const handleInitialLoad = async () => {
    const token = await AsyncStorage.getItem("token");
    if (typeof token === "string") {
      // Login
      if (!Auth.isAuthenticated(token)) {
        // Invalid token
        const deviceId = await AsyncStorage.getItem("deviceId");
        const resultLogin = await axios.post(`${PORTFOLIO_API_URL}/login`, {
          device_id: deviceId,
        });
        await AsyncStorage.setItem("token", resultLogin.data.access_token);
      }
      // Get 'Main' portfolio
      dispatch(thunkFetchPortfolio());
    } else {
      const newDeviceId = uuid.v4();
      if (typeof newDeviceId === "string") {
        const strDevID: string = newDeviceId;
        await AsyncStorage.setItem("deviceId", strDevID);
        // Register
        const resultRegister = await axios.post(
          `${PORTFOLIO_API_URL}/register`,
          {
            device_id: strDevID,
          }
        );
        // Set Token to Async Storage
        await AsyncStorage.setItem("token", resultRegister.data.access_token);

        // Create 'Main' portfolio
        dispatch(thunkCreatePortfolio());
      }
    }
  };
  if (portfolio.portfolioCoins.length === 0) {
    // Show initial Splash Component
    return (
      <View style={styles.container}>
        <InitialPortfolioSplash />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <BigHero />
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <CoinList isLoading={isLoading} />
      <TouchableOpacity
        style={styles.actionButton}
        onPress={addTransactionHandler}
      >
        <Ionicons name="add-outline" size={70} color={tint} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  actionButton: {
    position: "absolute",
    width: 70,
    bottom: 20,
    right: 20,
    height: 70,
    borderRadius: 70 / 2,
    shadowColor: tabIconDefault,
    shadowOpacity: 1.5,
    elevation: 8,
    shadowRadius: 5,
    shadowOffset: { width: 2, height: 5 },
    backgroundColor: secondaryText,
    paddingLeft: 2,
  },
});
