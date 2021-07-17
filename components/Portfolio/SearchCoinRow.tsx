import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import Colors from "../../constants/Colors";

interface ActionProps {
  data: { id: number; name: string; symbol: string };
}
const { secondaryText: darkGrey } = Colors.light;

const SearchCoinRow = ({ data }: ActionProps) => {
  const { id, name, symbol } = data;

  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Image
          style={styles.logo}
          source={{
            uri: `https://s2.coinmarketcap.com/static/img/coins/64x64/${id}.png`,
          }}
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={[styles.textPadd, styles.bigAndBold]}>{symbol}</Text>
        <Text style={[styles.textPadd, styles.bigText]}>{name}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    flexDirection: "row",
    borderColor: darkGrey,
    borderBottomWidth: 1,
    paddingVertical: 8,
    width: "100%",
  },
  imgContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  logo: {
    width: 48,
    height: 48,
  },
  infoContainer: {
    justifyContent: "space-around",
    paddingHorizontal: 5,
  },
  textPadd: {
    paddingHorizontal: 5,
  },
  bigText: {
    fontSize: 16,
  },
  bigAndBold: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SearchCoinRow;
