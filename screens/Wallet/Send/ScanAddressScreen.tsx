import React from "react";
import { View, Text, StyleSheet } from "react-native";
import QRCodeScanner from "react-native-qrcode-scanner";
import { RNCamera } from "react-native-camera";
import { useNavigation, useRoute } from "@react-navigation/core";
import { SendRouteProp } from "../../../navigation/SendStack";

const ScanAddressScreen = () => {
  const { goBack } = useNavigation();
  const { params } = useRoute<SendRouteProp>();

  const onSuccessHandler = (e: any) => {
    params.setSendAddress(e.data);
    goBack();
  };

  return (
    <View style={styles.container}>
      <QRCodeScanner
        onRead={onSuccessHandler}
        // flashMode={RNCamera.Constants.FlashMode.torch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ScanAddressScreen;
