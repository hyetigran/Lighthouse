import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { thunkFetchPortfolio } from "../../store/actions/portfolioActions";
import { Text, View } from "../../components/Themed";
import BigHero from "../../components/Portfolio/BigHero";
import TransactionList from "../../components/Portfolio/TransactionList";
import Colors from "../../constants/Colors";

const { tint, tabIconDefault, secondaryText } = Colors.light;

export default function MainPortfolioScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { navigate } = useNavigation();

  useEffect(() => {
    setIsLoading(true);
    dispatch(thunkFetchPortfolio());
    setIsLoading(false);
  }, []);

  const addTransactionHandler = () => {
    navigate("Transaction");
  };

  return (
    <View style={styles.container}>
      <BigHero />
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <TransactionList isLoading={isLoading} />
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
