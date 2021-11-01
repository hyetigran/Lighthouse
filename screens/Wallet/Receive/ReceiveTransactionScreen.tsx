import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  DeviceEventEmitter,
} from "react-native";
import QRCode from "react-native-qrcode-svg";
import Clipboard from "@react-native-clipboard/clipboard";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import { RootState } from "../../../store";
import Colors from "../../../constants/Colors";

const { tabIconDefault: darkGrey } = Colors.light;

const ReceiveTransactionScreen = () => {
  const [txnSuccess, setTxnSuccess] = useState(false);
  const wallets = useSelector((state: RootState) => state.wallet);
  // Select first wallet by default
  const [selectWallet, setSelectWallet] = useState({
    ...wallets[0],
    walletsData: wallets[0].walletsData[0],
  });
  console.log("SW", selectWallet.walletsData.addressString);
  const { navigate } = useNavigation();
  // TODO - LIFECYCLE LISTEN FOR TXN
  useEffect(() => {
    // API REQUEST FOR ADDRESS BALANCE UPDATE
  }, []);

  useEffect(() => {
    return () => {
      DeviceEventEmitter.removeAllListeners("event.selectWalletToReceive");
    };
  }, []);

  const selectWalletHandler = (eventData: { walletPK: string }) => {
    console.log("RTS handler!!");
    wallets.reduce((acc, cur) => {
      const walletIndex = cur.walletsData.findIndex(
        (w) => w.privateKeyWIF === eventData.walletPK
      );
      console.log("wIndex", walletIndex);

      if (walletIndex >= 0) {
        const selectedWallet = {
          ...cur,
          walletsData: cur.walletsData[walletIndex],
        };
        console.log("here?");
        setSelectWallet(selectedWallet);
      }
      return acc;
    }, {});
  };

  DeviceEventEmitter.addListener("event.selectWalletToReceive", (eventData) => {
    console.log("inside emit");
    selectWalletHandler(eventData);
  });
  // TODO - SELECT WALLET COMPONENT

  const copyToClipboard = () => {
    Clipboard.setString(selectWallet.walletsData.addressString);
  };

  return (
    <View style={styles.container}>
      {txnSuccess ? (
        <View>Success</View>
      ) : (
        <>
          <View style={styles.qrContainer}>
            <QRCode
              logo={{ uri: selectWallet.logo }}
              size={250}
              logoSize={45}
              value={selectWallet.walletsData.addressString}
            />
          </View>
          <TouchableOpacity onPress={copyToClipboard}>
            <Text>{selectWallet.walletsData.addressString}</Text>
          </TouchableOpacity>
          <View style={styles.fillerSpace}></View>
          <TouchableOpacity
            style={styles.selectWalletContainer}
            onPress={() => {
              navigate("SelectWalletScreen", {
                pk: selectWallet.walletsData.privateKeyWIF,
              });
            }}
          >
            <View>
              <Image
                style={styles.imgLogo}
                source={{
                  uri: selectWallet.logo,
                }}
              />
            </View>
            <View>
              <Text style={styles.selectWalletName}>
                {selectWallet.walletsData.name}
              </Text>
              <Text>{`${selectWallet.walletsData.balance} ${selectWallet.symbol}`}</Text>
            </View>
            <View style={styles.fillerSpace}></View>

            <Ionicons
              name="chevron-forward-outline"
              size={24}
              color={darkGrey}
            />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  qrContainer: {
    justifyContent: "center",
    alignSelf: "center",
    marginVertical: 60,
  },
  fillerSpace: { flexGrow: 1 },
  selectWalletContainer: {
    flexDirection: "row",
    paddingVertical: 18,
  },
  imgLogo: { height: 40, width: 40, marginRight: 12 },
  selectWalletName: { fontWeight: "bold" },
});

export default ReceiveTransactionScreen;
