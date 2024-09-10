import React, { useEffect, useState } from "react";
import SwapInputRow from "./SwapInputRow";
import SwapIcon from "./SwapIcon";
import { useSelector } from "react-redux";
import {
  getSupportedTokens,
  getWalletTokensBalance,
} from "../services/tokenService";
import { getWalletAddress } from "../services/walletService";
import { debounce } from "../utils";
import axios from "axios";
import { getSwapAmount, swapTokens } from "../services/swapService";
import Button from "./Button";

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
  const [isSwapping, setIsSwapping] = useState(false);

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

  const fetchQuote = debounce(async (baseAmount: string) => {
    if (!baseAmount) return;
    setFetchingQuote(true);
    const controller = new AbortController();

    try {
      if (baseAsset.mint === quoteAsset.mint) {
        setQuoteAmount(baseAmount);
        setQuoteResponse(null);
      } else {
        const response = await getSwapAmount(
          baseAsset.mint,
          quoteAsset.mint,
          baseAmount,
          baseAsset.decimals,
          controller
        );

        console.log("response", response);

        setQuoteAmount(
          (
            Number(response.outAmount) / Number(10 ** quoteAsset.decimals)
          ).toString()
        );
        setQuoteResponse(response);
      }
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request canceled", error.message);
      } else {
        console.error("Error fetching quote", error);
      }
    } finally {
      setFetchingQuote(false);
    }

    return () => controller.abort();
  }, 300);

  useEffect(() => {
    if (baseAmount) {
      fetchQuote(baseAmount);
    }
  }, [baseAsset, quoteAsset, baseAmount]);

  const swap = async () => {
    // trigger swap with https://station.jup.ag/docs/apis/swap-api API in backend TODO
    try {
      setIsSwapping(true);
      console.log("quoteResponse: ", quoteResponse);

      const apiData = await swapTokens(quoteResponse, accessToken);
      const data = apiData.responseObject;

      if (data) {
        setIsSwapping(false);
      }
    } catch (e) {
      console.log("Error while sending a txn");
      setIsSwapping(false);
    }
  };

  return (
    <div className="mt-4">
      <div className="text-2xl font-bold mb-4">Swap Tokens</div>
      <div className="bg-slate-50">
        <SwapInputRow
          amount={baseAmount}
          onAmountChange={(value: string) => setBaseAmount(value)}
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
          inputLoading={fetchingQuote}
          selectedToken={quoteAsset}
          amount={quoteAmount}
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
      <div className="flex flex-row-reverse mt-2">
        <Button type="btn-primary" onClick={swap}>
          {isSwapping ? "swapping..." : "Swap"}
        </Button>
      </div>
    </div>
  );
}

export default Swap;
