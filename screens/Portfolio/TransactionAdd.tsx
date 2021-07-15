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

// @ts-ignore
import { PORTFOLIO_API_URL } from "@env";
import Colors from "../../constants/Colors";
import TransactionForm from "../../components/Portfolio/TransactionForm";
import Modal from "../../components/Modal/ModalComponent";
import { useDispatch, useSelector } from "react-redux";
import { axiosWithAuth } from "../../helpers/axiosWithAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootState } from "../../store";
import { useEffect } from "react";

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
const initialErrorState = {
  price: false,
  coin: false,
  date: false,
};
const TransactionAdd = () => {
  const [isBuy, setIsBuy] = useState(true);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [priceType, setPriceType] = useState(0);
  const [buyPrice, setBuyPrice] = useState<string>("");
  const [coinAmount, setCoinAmount] = useState<string>("");
  const [error, setError] = useState(initialErrorState);

  const { navigate, goBack } = useNavigation();

  useEffect(() => {
    if (error.price) {
      validateField("price");
    } else if (error.coin) {
      validateField("coin");
    }
  }, [buyPrice, coinAmount]);

  // SELECTOR --> coin
  const { portfolioId } = useSelector((state: RootState) => state.portfolio);
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

  const onChangePrice = (text: string) => {
    const [leftSide, rightSide] = text.split(".");
    if (
      isNaN(+text) ||
      (rightSide && rightSide.length > 8) ||
      (leftSide && leftSide.length > 14)
    ) {
      return;
    }
    setBuyPrice(text);
  };

  const togglePriceType = () => {
    setPriceType((prevState: number) => (prevState ? 0 : 1));
  };

  const handleCoinAmount = (text: string) => {
    const [leftSide, rightSide] = text.split(".");
    if (
      isNaN(+text) ||
      (rightSide && rightSide.length > 8) ||
      (leftSide && leftSide.length > 14)
    ) {
      return;
    }
    setCoinAmount(text);
  };

  const validateInputs = () => {
    // TODO - ENHANCE VALIDATION
    if (+coinAmount <= 0 || +buyPrice <= 0 || !date) {
      return true;
    }
    return false;
  };

  const validateField = (field: string) => {
    switch (field) {
      case "coin":
        setError({ ...error, coin: !coinAmount.trim().length });
        break;
      case "price":
        setError({ ...error, price: !buyPrice.trim().length });
        break;
      case "date":
        break;
    }
  };

  const handleAddTransaction = async () => {
    // VALIDATE
    if (validateInputs()) {
      return;
    }

    const purchaseDate = date.getTime();
    console.log("PD", purchaseDate);
    const data = {
      purchase_date: purchaseDate,
      coin_amount: coinAmount,
      // convert to 'per coin'
      spot_price: priceType ? buyPrice : +buyPrice / +coinAmount,
      exchange: "Global",
      fiat: "USD",
      coin_id: 1,
      portfolio_id: portfolioId,
      is_buy: isBuy,
    };
    // SEND NETWORK REQUEST
    const token = await AsyncStorage.getItem("token");
    const result = await axiosWithAuth(token!).post(
      `${PORTFOLIO_API_URL}/transaction-create`,
      data
    );

    // SAVE TRANSACTION TO PORTFOLIO STATE

    // TODO - PERSIST LOCALLY WITH SQLite
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
            error={error}
            validateField={validateField}
          />
        </View>
      </KeyboardAvoidingView>
      <TouchableOpacity onPress={handleAddTransaction}>
        <View style={[styles.btnContainer, addButtonColor]}>
          <Text style={styles.btnAdd}>Add Transaction</Text>
        </View>
      </TouchableOpacity>
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
