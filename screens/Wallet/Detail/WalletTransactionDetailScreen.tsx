import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/core";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

import { RootState } from "../../../store";
import Colors from "../../../constants/Colors";
import { TransactionRouteProp } from "../../../navigation/DetailWalletNavigator";

const { gainGreenLite, background } = Colors.light;

const WalletTransactionDetailScreen = () => {
  //   const { sendData } = useSelector((state: RootState) => state.send);
  //   const { navigate } = useNavigation();
  const { params } = useRoute<TransactionRouteProp>();
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Text>Wallet transaction detail screen</Text>
      <View style={styles.topContainer}>
        <View>
          {params.sent ? <Text>sent icon</Text> : <Text>received icon</Text>}
          {params.sent ? <Text>Sent</Text> : <Text>Received</Text>}
        </View>
        <View>
          <Text>BCH placeholder</Text>
          <Text>USD placeholder</Text>
        </View>
      </View>
      <View style={styles.detailContainer}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {},
  detailContainer: {},
});

export default WalletTransactionDetailScreen;
