import React, { useEffect, useState } from "react";
import Button from "./Button";
import TokenList from "./TokenList";

const tokens = [
  {
    name: "SOL",
    mint: "So11111111111111111111111111111111111111112",
    native: true,
    price: "180.00",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/3/34/Solana_cryptocurrency_two.jpg",
    decimals: 9,
    balance: "10.00",
    usdBalance: "1800.00",
  },
  {
    name: "USDC",
    mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    native: false,
    price: "1.00",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1vAKYEl0YffTpWSxrqEi_gmUsl-0BuXSKMQ&s",
    decimals: 6,
    balance: "11.00",
    usdBalance: "11.00",
  },
  {
    name: "USDT",
    mint: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
    native: false,
    price: "1.00",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvSxrpym7ij1Hf6zQOltcDORlrJGyj1kPf3A&s",
    decimals: 6,
    balance: "12.11",
    usdBalance: "12.11",
  },
];

const data = {
  tokens,
  totalBalance: "1823.11",
};

function Assets({ userId }: { userId: string }) {
  const [userWallet, setUserWallet] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function getUserWallet() {
      const wallet = {
        publicKey: "some key",
      };

      if (!wallet) {
        console.log("No solana wallet found associated to the user");
        setUserWallet(null);
      }

      setUserWallet(wallet);
    }

    getUserWallet();
  }, []);

  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => {
        setCopied(false);
      }, 3000);

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
              ${data.totalBalance}
            </span>{" "}
            <span className="text-slate-500 text-xl font-bold">USD</span>
          </div>
          <div>
            <Button
              type="btn-neutral"
              onClick={() => {
                navigator.clipboard.writeText(userWallet.publicKey);
                setCopied(true);
              }}
            >
              {copied ? "copied" : "Your wallet address"}
            </Button>
          </div>
        </div>
      </div>
      <div className="pt-4 bg-slate-100 p-12">
        <TokenList tokens={data.tokens} />
      </div>
    </div>
  ) : (
    <div className="text-red-500 mt-4 font-bold">No solana wallet found</div>
  );
}

export default Assets;
