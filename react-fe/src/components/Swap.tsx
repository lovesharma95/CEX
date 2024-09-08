import React, { useEffect, useState } from "react";
import SwapInputRow from "./SwapInputRow";
import SwapIcon from "./SwapIcon";
import { useSelector } from "react-redux";
import {
  getSupportedTokens,
  getWalletTokensBalance,
} from "../services/tokenService";
import { getWalletAddress } from "../services/walletService";

function Swap() {
  const accessToken: string = useSelector(
    (state: any) => state.auth.accessToken
  );
  const [baseAsset, setBaseAsset] = useState<any>(null);
  const [quoteAsset, setQuoteAsset] = useState<any>(null);
  const [supportedTokens, setSupportedTokens] = useState<any>(null);
  const [userWallet, setUserWallet] = useState<any>(null);
  const [walletData, setWalletData] = useState<any>(null);
  const [baseAmount, setBaseAmount] = useState<string>("");
  const [quoteAmount, setQuoteAmount] = useState<string>("");
  const [fetchingQuote, setFetchingQuote] = useState(false);
  const [quoteResponse, setQuoteResponse] = useState(null);

  useEffect(() => {
    async function fetchSupportedTokens() {
      const apiData = await getSupportedTokens(accessToken);
      const data = apiData.responseObject;

      if (data) {
        setBaseAsset(data.find((token: any) => token.name === "SOL"));
        setQuoteAsset(data.find((token: any) => token.name === "USDC"));
        setSupportedTokens(data);
      } else {
        console.error("No tokens found");
      }
    }

    if (accessToken) {
      fetchSupportedTokens();
    }
  }, [accessToken]);

  useEffect(() => {
    async function fetchWalletAddress() {
      const apiData = await getWalletAddress(accessToken);
      const { publicKey } = apiData.responseObject;

      if (publicKey) {
        setUserWallet(publicKey);
      } else {
        console.error("No Solana wallet found");
      }
    }

    if (accessToken) {
      fetchWalletAddress();
    }
  }, [accessToken]);

  useEffect(() => {
    if (userWallet) {
      async function fetchWalletBalances() {
        const apiData = await getWalletTokensBalance(accessToken, userWallet);
        const data = apiData.responseObject;

        if (data) {
          setWalletData(data);
        } else {
          console.error("No wallet data found");
        }
      }

      fetchWalletBalances();
    }
  }, [accessToken, userWallet]);

  return (
    <div className="mt-4">
      <div className="text-2xl font-bold mb-4">Swap Tokens</div>
      <div className="bg-slate-50">
        <SwapInputRow
          selectedToken={baseAsset}
          onSelect={setBaseAsset}
          topBorderEnabled={true}
          bottomBorderEnabled={false}
          label="Pay"
          subtitle={
            <div className="text-slate-500 pb-2 text-sm pl-2 flex">
              <div className="font-normal pr-1">Current Balance:</div>
              <div className="font-semibold">
                {
                  walletData?.tokens?.find(
                    (x: any) => x?.name === baseAsset?.name
                  )?.balance
                }{" "}
                {baseAsset?.name}
              </div>
            </div>
          }
        />

        <div className="flex justify-center">
          <div
            onClick={() => {
              const temp = baseAsset;
              setBaseAsset(quoteAsset);
              setQuoteAsset(temp);
            }}
            className="cursor-pointer rounded-full w-10 h-10 border absolute mt-[-20px] bg-white flex justify-center items-center"
          >
            <SwapIcon />
          </div>
        </div>

        <SwapInputRow
          selectedToken={quoteAsset}
          onSelect={setQuoteAsset}
          inputDisabled={true}
          topBorderEnabled={false}
          bottomBorderEnabled={true}
          label="Receive"
          subtitle={
            <div className="text-slate-500 pb-2 text-sm pl-2 flex">
              <div className="font-normal pr-1">Current Balance:</div>
              <div className="font-semibold">
                {
                  walletData?.tokens?.find(
                    (x: any) => x?.name === quoteAsset?.name
                  )?.balance
                }{" "}
                {quoteAsset?.name}
              </div>
            </div>
          }
        />
      </div>
    </div>
  );
}

export default Swap;
