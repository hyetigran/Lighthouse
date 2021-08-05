import React, { useEffect } from "react";
import { StyleSheet, FlatList, View } from "react-native";
import { useSelector } from "react-redux";

import WalletActionButtons from "../../components/Wallets/WalletActionButtons";
import WalletCard from "../../components/Wallets/WalletCard";
import Colors from "../../constants/Colors";
import { RootState } from "../../store";

const { secondaryText: grey, background } = Colors.light;

export default function MainWalletsScreen() {
  const wallets = useSelector((state: RootState) => state.wallet);
  useEffect(() => {
    initialLoad();
  }, []);

  const initialLoad = () => {
    // if exists LOAD PK
    // else CREATE PrivateKey, Public Key, Address
    // PERSIST in AsyncStorage
  };

  return (
    <View style={styles.container}>
      <WalletActionButtons />
      <FlatList
        data={wallets}
        keyExtractor={(item) => item.symbol}
        contentContainerStyle={styles.flatList}
        renderItem={({ item }) => {
          return <WalletCard wallets={item} />;
        }}
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
