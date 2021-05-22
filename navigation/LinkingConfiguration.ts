import * as Linking from "expo-linking";

export default {
  prefixes: [Linking.makeUrl("/")],
  config: {
    screens: {
      Root: {
        screens: {
          Markets: {
            screens: {
              CryptoListScreen: "one",
            },
          },
          Portfolio: {
            screens: {
              MainPortfolioScreen: "two",
            },
          },
          Wallets: {
            screens: {
              MainWalletsScreen: "three",
            },
          },
        },
      },
      Transaction: "four",
      NotFound: "*",
    },
  },
};
