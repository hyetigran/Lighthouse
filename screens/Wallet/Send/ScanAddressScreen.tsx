import React from "react";
import { View, StyleSheet } from "react-native";
import QRCodeScanner from "react-native-qrcode-scanner";
import { useNavigation } from "@react-navigation/core";
import { useDispatch } from "react-redux";

import { updateToAddress } from "../../../store/actions/sendActions";

const ScanAddressScreen = () => {
  const { goBack } = useNavigation();

  const dispatch = useDispatch();

  const onSuccessHandler = (e: any) => {
    dispatch(updateToAddress(e.data));
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
