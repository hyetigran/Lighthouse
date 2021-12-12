export const FETCH_WALLETS_SUCCESS = "FETCH_WALLETS_SUCCESS";
export const CREATE_WALLET_SUCCESS = "CREATE_WALLET_SUCCESS";
export const FETCH_WALLET_DETAILS_SUCCESS = "FETCH_WALLET_DETAILS_SUCCESS";

export interface Wallets {
  [key: string]: any;
  walletsData: Wallet[];
  name: string;
  logo: string;
  coinId: number;
  symbol: string;
}
export interface Wallet {
  [key: string]: any;
  privateKey: any;
  privateKeyWIF: string;
  publickKey?: string;
  // TODO - import Address types
  // TODO - implement HD Wallets types
  addressString: string;
  name: string;
  isBacked: boolean;
  balance: number;
  transactions?: Transaction[];
}

export interface Transaction {
  id: string;
  value: number;
  fiatValue?: number;
  date: number;
  address: string;
  addressSent: string;
  fee: number;
  confirmations: number;
  sent: boolean;
  dateDisplay?: string;
}
interface getWalletsAction {
  type: typeof FETCH_WALLETS_SUCCESS;
  payload: Wallets[];
}

interface createWalletAction {
  type: typeof CREATE_WALLET_SUCCESS;
  payload: Wallets;
}

interface getWalletDetailsAction {
  type: typeof FETCH_WALLET_DETAILS_SUCCESS;
  payload: Wallets[];
}

export type WalletActionTypes =
  | getWalletsAction
  | createWalletAction
  | getWalletDetailsAction;
