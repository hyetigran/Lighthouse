import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import WalletActionButtons from "../../components/Wallets/WalletActionButtons";
import WalletCard from "../../components/Wallets/WalletCard";
import Colors from "../../constants/Colors";
import { RootState } from "../../store";
import { thunkGetAllWallets } from "../../store/actions/walletActions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Spinner from "../../components/UI/Spinner";

const { secondaryText: grey, background } = Colors.light;

export default function MainWalletsScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const wallets = useSelector((state: RootState) => state.wallet);
  const dispatch = useDispatch();

  useEffect(() => {
    if (wallets.length < 1) {
      initialLoad();
    } else {
      setIsLoading(false);
    }
  }, [wallets]);

  // TODO - REMOVE for DEV ONLY
  // const clearWallets = async () => {
  //   await AsyncStorage.setItem("wallets", "");
  // };
  const initialLoad = () => {
    dispatch(thunkGetAllWallets());
    setIsLoading(true);
  };

  return (
    <View style={styles.container}>
      <WalletActionButtons />
      {isLoading ? (
        <Spinner />
      ) : (
        <FlatList
          data={wallets}
          keyExtractor={(item) => item.symbol}
          contentContainerStyle={styles.flatList}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <WalletCard key={index} wallets={item} />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: grey,
    alignItems: "center",
    justifyContent: "center",
  },
  flatList: {
    // backgroundColor: background,
    // minWidth: "90%",
  },
});
