import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";
import WalletActionButtons from "../../components/Wallets/WalletActionButtons";

export default function MainWalletsScreen() {
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
});
