import React from "react";

import { View, StyleSheet, DeviceEventEmitter } from "react-native";
import { useSelector } from "react-redux";
import { useRoute, useNavigation } from "@react-navigation/native";

import { ReceiveRouteProp } from "../../../navigation/ReceiveStack";
import { RootState } from "../../../store";
import SelectWalletScreen from "../Common/SelectWalletScreen";

const SelectReceiveScreen = () => {
  const { params } = useRoute<ReceiveRouteProp>();
  const { goBack } = useNavigation();

  const wallets = useSelector((state: RootState) => state.wallet);
  const transformedWallets = wallets.map((wallet) => {
    return {
      name: wallet.name,
      logo: wallet.logo,
      symbol: wallet.symbol,
      data: wallet.walletsData,
    };
  });
  const handleSelectWallet = (walletPK: string) => {
    DeviceEventEmitter.emit("event.selectWalletToReceive", { walletPK });
    goBack();
  };
  return (
    <View style={styles.container}>
      <SelectWalletScreen
        pk={params.pk}
        transformedWallets={transformedWallets}
        handleSelectWallet={handleSelectWallet}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default SelectReceiveScreen;
