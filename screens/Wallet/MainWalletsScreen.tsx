import React, { useEffect } from "react";
import { StyleSheet, FlatList, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import WalletActionButtons from "../../components/Wallets/WalletActionButtons";
import WalletCard from "../../components/Wallets/WalletCard";
import Colors from "../../constants/Colors";
import { RootState } from "../../store";
import { thunkGetAllWallets } from "../../store/actions/walletActions";

const { secondaryText: grey, background } = Colors.light;

export default function MainWalletsScreen() {
  const wallets = useSelector((state: RootState) => state.wallet);
  const dispatch = useDispatch();
  useEffect(() => {
    initialLoad();
  }, []);

  const initialLoad = () => {
    dispatch(thunkGetAllWallets());
  };

  return (
    <View style={styles.container}>
      <WalletActionButtons />
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
