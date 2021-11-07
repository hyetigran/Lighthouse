import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Input } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../../constants/Colors";

const ADDRESS_INPUT_LABEL = "Enter bitcoin address";

const { background, darkGrey, gainGreenLite, text } = Colors.light;

const SendAddressScreen = () => {
  const [sendAddress, setSendAddress] = useState("");
  // FROM WALLET OPTION

  const changeAddressHandler = (value: string) => {};

  const pasteClipboardHandler = () => {};

  const qrScannerHandler = () => {};

  return (
    <View style={styles.container}>
      {/* <View>
        <Text>Navigated FROM WALLET</Text>
      </View> */}
      <View>
        <Input
          containerStyle={styles.addressInputContainer}
          inputContainerStyle={styles.addressInput}
          placeholder={ADDRESS_INPUT_LABEL}
          value={sendAddress}
          onChangeText={changeAddressHandler}
        />
      </View>
      <View style={styles.optionSelectContainer}>
        <TouchableOpacity
          style={styles.copyClipboardContainer}
          onPress={pasteClipboardHandler}
        >
          <Ionicons size={18} color={text} name={"clipboard-outline"} />
          <Text>Paste Clipboard</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity style={styles.scanButton} onPress={qrScannerHandler}>
          <Ionicons size={20} color={background} name={"qr-code-outline"} />
          <Text style={styles.scanButtonText}>Scan QR Code</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    marginBottom: 350,
    marginHorizontal: 30,
    justifyContent: "space-around",
    minHeight: 350,
  },
  addressInputContainer: {
    paddingHorizontal: 0,
  },
  addressInput: {
    borderWidth: 1,
    borderColor: darkGrey,
    borderRadius: 4,
    paddingHorizontal: 10,
  },
  scanButton: {
    backgroundColor: gainGreenLite,
    flexDirection: "row",
    borderRadius: 4,
    padding: 20,
    justifyContent: "center",
  },
  scanButtonText: {
    color: background,
    fontWeight: "bold",
    fontSize: 18,
    paddingLeft: 6,
  },
  optionSelectContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  copyClipboardContainer: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: darkGrey,
    padding: 10,
    alignItems: "center",
    width: 130,
  },
});

export default SendAddressScreen;
