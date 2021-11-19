import React from "react";
import { View, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import { RootState } from "../../../store";
import { thunkAttachPrivateKey } from "../../../store/actions/sendActions";
import SelectWalletScreen from "../Common/SelectWalletScreen";

// TODO - move to constants dir.
const MIN_DUST_LIMIT = 1000;

const SelectSendScreen = () => {
  const { navigate } = useNavigation();
  const dispatch = useDispatch();
  const wallets = useSelector((state: RootState) => state.wallet);
  const transformedWallets = wallets.map((wallet) => {
    return {
      name: wallet.name,
      logo: wallet.logo,
      symbol: wallet.symbol,
      data: wallet.walletsData.filter(
        (wallet) => wallet.balance >= MIN_DUST_LIMIT
      ),
    };
  });

  const handleSelectWallet = (pk: string) => {
    dispatch(thunkAttachPrivateKey(pk));
    navigate("EnterAmountScreen");
  };
  return (
    <View style={styles.container}>
      <SelectWalletScreen
        pk={null}
        handleSelectWallet={handleSelectWallet}
        transformedWallets={transformedWallets}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default SelectSendScreen;
