export type RootStackParamList = {
  Root: undefined;
  Transaction: undefined;
  Send: undefined;
  Receive: undefined;
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
  AddWalletNavigator: undefined;
  DetailWalletNavigator: undefined;
};

export type TransactionParamList = {
  TransactionSearch: undefined;
  TransactionAdd: {
    id: number;
    name: string;
    symbol: string;
    action?: string;
    txId?: string;
  };
  TransactionDetail: { id: number; name: string };
};

export type SendParamList = {
  SendAddressScreen: undefined;
  ScanAddressScreen: {
    setSendAddress: () => void;
  };
  SelectSendScreen: undefined;
  EnterAmountScreen: undefined;
  ReviewTransactionScreen: undefined;
  SuccessTransactionScreen: undefined;
};

export type ReceiveParamList = {
  ReceiveTransactionScreen: undefined;
  EnterAmountScreen: undefined;
  SelectReceiveScreen: {
    pk: string;
  };
};
export type WalletParamList = {
  AddWalletScreen: undefined;
  CreateWalletScreen: undefined;
};

export type DetailWalletParamList = {
  WalletDetailScreen: {
    pId: string;
    id: number;
    name: string;
    address: string;
    price: number;
  };
  WalletTransactionDetailScreen: {
    tId: string;
  };
};
