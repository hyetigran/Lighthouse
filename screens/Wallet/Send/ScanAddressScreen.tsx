import React from "react";
import { View, Text, StyleSheet } from "react-native";
import QRCodeScanner from "react-native-qrcode-scanner";
import { RNCamera } from "react-native-camera";

const ScanAddressScreen = () => {
  const onSuccessHandler = () => {};
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
