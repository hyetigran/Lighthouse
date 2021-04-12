import axios from "axios";
import { Action } from "redux";
import { RootState } from "../index";
import { ThunkAction } from "redux-thunk";

import { MARKETS_API_KEY } from "@env";
import {
  FETCH_CURRENCIES_SUCCESS,
  Currency,
  MarketActionTypes,
} from "../types/marketTypes";

export const thunkGetAllCurrencies = (): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> => async (dispatch) => {
  try {
    // FETCH COINS
    const result: any = await axios.get(
      `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest`,
      { headers: { "X-CMC_PRO_API_KEY": MARKETS_API_KEY } }
    );

    // const result: any = await axios.get(
    //   `https://pro-api.coinmarketcap.com/v1/cryptocurrency/info`,
    //   {
    //     headers: { "X-CMC_PRO_API_KEY": MARKETS_API_KEY },
    //     params: {
    //       symbol: `BTC,ETH,BNB,XRP,USDT,ADA,DOT,LTC,UNI,LINK,XLM,BCH,THETA,FIL,USDC,DOGE,TRX,WBTC,VET,SOL,KLAY,EOS,XMR,LUNA,MIOTA,BTT,CRO,FTT,BSV,BUSD,XTZ,ATOM,AAVE,NEO,AVAX,CAKE,ALGO,HT,EGLD,XEM,KSM,HOT,DAI,BTCB,DASH,HBAR,CHZ,ZEC,ENJ,RUNE,NEAR,DCR,GRT,ETC,MKR,COMP,ZIL,STX,SNX,BAT,LEO,BTG,SUSHI,TFUEL,MATIC,MANA,UST,CEL,NEXO,ZRX,YFI,WAVES,RVN,UMA,ICX,KCS,QTUM,ONT,OKB,HNT,OMG,ONE,DENT,FLOW,SC,BNT,VGX,NPXS,DGB,RSR,FTM,REV,ANKR,BTMX,CHSB,REN,CFX,CELO,IOST,PAX`,
    //       aux: "logo",
    //     },
    //   }
    // );
    //console.log("result", result);
    // let names = result.data.map((coin: any) => {
    //   return coin.symbol;
    // });
    // interface LOGO {
    //   [key: string]: any;
    // }
    // let logos: LOGO = {};
    // for (let coin in result.data.data) {
    //   let name: string = result.data.data[coin].symbol;
    //   logos[name] = result.data.data[coin].logo;
    // }
    // console.log("names", logos);
    // Access AsyncStorage for favorited currencies

    const currencyData = result.data.data.map((coin: any) => {
      return {
        id: coin.id,
        rank: coin.cmc_rank,
        name: coin.name,
        price: coin.quote.USD.price,
        symbol: coin.symbol,
        marketCap: coin.quote.USD.market_cap,
        percentChange24h: coin.quote.USD.percent_change_24h,
        isFav: false, // false by default
        logo: `https://s2.coinmarketcap.com/static/img/coins/64x64/${coin.id}.png`,
      };
    });
    console.log("fetched");
    dispatch(fetchAllCurrencies(currencyData));
  } catch (error) {
    console.log("err", error);
  }
};

const fetchAllCurrencies = (allCurrencies: Currency[]): MarketActionTypes => {
  return {
    type: FETCH_CURRENCIES_SUCCESS,
    payload: allCurrencies,
  };
};
