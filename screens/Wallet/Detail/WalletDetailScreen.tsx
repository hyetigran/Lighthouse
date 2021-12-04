import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/core";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

import { RootState } from "../../../store";
import Colors from "../../../constants/Colors";
import { DetailRouteProp } from "../../../navigation/DetailWalletNavigator";

const { gainGreenLite, background } = Colors.light;
const WalletDetailScreen = () => {
  //   const { sendData } = useSelector((state: RootState) => state.send);
  //   const { navigate } = useNavigation();
  const {
    params: { pId },
  } = useRoute<DetailRouteProp>();
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <Text>Wallet detail screen</Text>
      <Text>{pId}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default WalletDetailScreen;
