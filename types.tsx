export type RootStackParamList = {
  Root: undefined;
  Transaction: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  Markets: undefined;
  Portfolio: undefined;
  Wallets: undefined;
};

export type TabOneParamList = {
  TabOneScreen: undefined;
};

export type MarketsTabParamList = {
  CryptoListScreen: undefined;
};

export type PortfolioTabParamsList = {
  MainPortfolioScreen: undefined;
};

export type WalletsTabParamsList = {
  MainWalletsScreen: undefined;
};

export type TransactionParamList = {
  TransactionSearch: undefined;
  TransactionAdd: { id: number; name: string };
  TransactionDetail: { id: number; name: string };
};
