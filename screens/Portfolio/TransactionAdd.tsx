import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  NativeSyntheticEvent as NSE,
  TextInputChangeEventData as TICED,
  KeyboardAvoidingView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";

import Colors from "../../constants/Colors";
import TransactionForm from "../../components/Portfolio/TransactionForm";
import Modal from "../../components/Modal/ModalComponent";
import { useDispatch } from "react-redux";

const { width } = Dimensions.get("window");
const {
  gainGreen,
  gainGreenLite,
  lossRed,
  lossRedLite,
  tabIconDefault,
  background,
  tint,
} = Colors.light;

const initialTransaction = {};

const TransactionAdd = () => {
  const [isBuy, setIsBuy] = useState(true);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [priceType, setPriceType] = useState(0);
  const [buyPrice, setBuyPrice] = useState<number>(0);
  const [coinAmount, setCoinAmount] = useState<number>(0);

  const { navigate, goBack } = useNavigation();

  // SELECTOR --> coin
  const dispatch = useDispatch();

  const onChangeDate = (event: Event, selectedDate: Date) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  const showMode = (currentMode: string) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  const closeModal = () => {
    setShow(false);
  };

  const onChangePrice = (e: NSE<TICED>) => {
    setBuyPrice(+e.nativeEvent.text);
  };

  const togglePriceType = () => {
    setPriceType((prevState: number) => (prevState ? 0 : 1));
  };

  const handleCoinAmount = (e: NSE<TICED>) => {
    setCoinAmount(+e.nativeEvent.text);
  };

  const addButtonColor = {
    backgroundColor: isBuy ? gainGreenLite : lossRedLite,
    borderColor: isBuy ? gainGreen : lossRed,
  };

  return (
    <View style={styles.container}>
      <View style={styles.btnGroup}>
        <TouchableOpacity
          style={[styles.btnCommon, { ...(isBuy ? styles.btnBuy : "") }]}
          onPress={() => setIsBuy(true)}
        >
          <Text
            style={[styles.btnText, { ...(!isBuy ? styles.btnInactive : "") }]}
          >
            Buy
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btnCommon, { ...(!isBuy ? styles.btnSell : "") }]}
          onPress={() => setIsBuy(false)}
        >
          <Text
            style={[styles.btnText, { ...(isBuy ? styles.btnInactive : "") }]}
          >
            Sell
          </Text>
        </TouchableOpacity>
      </View>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="padding"
        keyboardVerticalOffset={100}
      >
        <View style={{ flexGrow: 1 }}>
          <TransactionForm
            data={{ symbol: "BTC" }}
            showDatepicker={showDatepicker}
            date={date}
            buyPrice={buyPrice}
            onChangePrice={onChangePrice}
            togglePriceType={togglePriceType}
            priceType={priceType}
            coinAmount={coinAmount}
            handleCoinAmount={handleCoinAmount}
          />
        </View>
      </KeyboardAvoidingView>
      <View style={[styles.btnContainer, addButtonColor]}>
        <Text style={styles.btnAdd} onPress={() => {}}>
          Add Transaction
        </Text>
      </View>
      <Modal isVisible={show} closeModal={closeModal}>
        <View style={[styles.modalHeader]}>
          {mode === "time" ? (
            <>
              <Text style={styles.modalText} onPress={showDatepicker}>
                Previous
              </Text>
              <Text style={styles.modalText} onPress={closeModal}>
                Done
              </Text>
            </>
          ) : (
            <>
              <View style={{ flexGrow: 1 }}></View>
              <Text style={styles.modalText} onPress={showTimepicker}>
                Next
              </Text>
            </>
          )}
        </View>
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          // @ts-ignore
          mode={mode}
          is24Hour={true}
          display="spinner"
          maximumDate={new Date()}
          // @ts-ignore
          onChange={onChangeDate}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: background,
  },
  btnGroup: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 12,
    width: "90%",
    alignSelf: "center",
  },
  btnText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  btnInactive: {
    fontWeight: "normal",
    color: tabIconDefault,
  },
  btnCommon: {
    borderWidth: 2,
    paddingHorizontal: 34,
    paddingVertical: 12,
    borderRadius: 8,
    borderColor: tabIconDefault,
  },
  btnBuy: {
    borderColor: gainGreen,
    backgroundColor: gainGreenLite,
  },
  btnSell: {
    borderColor: lossRed,
    backgroundColor: lossRedLite,
  },
  btnContainer: {
    //flex: 1,
    width: "90%",
    // position: "absolute",
    // bottom: 30,
    borderRadius: 8,
    borderWidth: 2,
    marginHorizontal: (width * 0.1) / 2,
    marginVertical: 30,
    backgroundColor: background,
  },
  btnAdd: {
    color: background,
    textAlign: "center",
    paddingVertical: 16,
    fontSize: 20,
    fontWeight: "bold",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    alignSelf: "center",
    marginVertical: 10,
  },
  modalText: {
    color: tint,
    fontSize: 20,
  },
});
export default TransactionAdd;
