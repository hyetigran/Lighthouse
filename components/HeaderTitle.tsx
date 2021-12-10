import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";

interface ActionProps {
  id?: number;
  name: string;
}
const HeaderTitle = (props: ActionProps) => {
  return (
    <View style={styles.header}>
      {props.id && (
        <Image
          style={styles.logo}
          source={{
            uri: `https://s2.coinmarketcap.com/static/img/coins/64x64/${props.id}.png`,
          }}
        />
      )}
      <Text style={styles.title}>{props.name}</Text>
    </View>
  );
};

export default HeaderTitle;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 32,
    height: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    paddingHorizontal: 8,
  },
});
