import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaCopy } from "react-icons/fa";

import Button from "./Button";
import TokenList from "./TokenList";
import { getWalletAddress } from "../services/walletService";
import { getWalletTokensBalance } from "../services/tokenService";

function Assets() {
  const accessToken: string = useSelector(
    (state: any) => state.auth.accessToken
  );
  const [userWallet, setUserWallet] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    async function getUserWallet() {
      const apiData = await getWalletAddress(accessToken);
      const { publicKey } = apiData.responseObject;

      if (!publicKey) {
        console.log("No solana wallet found associated with the user");
        setUserWallet(null);
      } else {
        setUserWallet(publicKey);
      }
    }

    getUserWallet();
  }, [accessToken]);

  useEffect(() => {
    if (userWallet) {
      async function getWalletTokens() {
        const apiData = await getWalletTokensBalance(accessToken, userWallet);
        const data = apiData.responseObject;

        if (!data) {
          console.log("No data found");
          setData(null);
        } else {
          setData(data);
        }
      }

      getWalletTokens();
    }
  }, [accessToken, userWallet]);

  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => {
        setCopied(false);
      }, 2000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [copied]);

  return userWallet ? (
    <div className="text-slate-400 mt-4 font-bold">
      <div className="flex flex-col p-12">
        <div>
          Account assets
          <br />
        </div>
        <div className="flex justify-between">
          <div>
            <span className="font-bold text-4xl text-black">
              ${data?.totalBalance ?? 0}
            </span>{" "}
            <span className="text-slate-500 text-xl font-bold">USD</span>
          </div>
          <div>
            <Button
              type="btn-neutral"
              onClick={() => {
                navigator.clipboard.writeText(userWallet);
                setCopied(true);
              }}
            >
              {copied ? "copied" : <FaCopy />}
            </Button>
          </div>
        </div>
      </div>
      <div className="pt-4 bg-slate-100 p-12">
        <TokenList tokens={data?.tokens ?? []} />
      </div>
    </div>
  ) : (
    <div className="text-red-500 mt-4 font-bold">No solana wallet found</div>
  );
}

export default Assets;
