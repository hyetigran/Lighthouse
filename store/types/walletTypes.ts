export const FETCH_WALLETS_SUCCESS = "FETCH_WALLETS_SUCCESS";
export const CREATE_WALLET_SUCCESS = "CREATE_WALLET_SUCCESS";

export interface Wallets {
  walletsData: Wallet[];
  name: string;
  logo: string;
  coinId: number;
  symbol: string;
}
export interface Wallet {
  privateKey?: any;
  privateKeyWIF: string;
  publickKey?: string;
  // TODO - import Address types
  // TODO - implement HD Wallets
  addressString: string;
  name: string;
  isBacked: boolean;
  balance: number;
}
interface getWalletsAction {
  type: typeof FETCH_WALLETS_SUCCESS;
  payload: Wallets[];
}

interface createWalletAction {
  type: typeof CREATE_WALLET_SUCCESS;
  payload: Wallets;
}

export type WalletActionTypes = getWalletsAction | createWalletAction;
