import React from "react";

function TokenRow({ token }: { token: any }) {
  return (
    <div className="flex justify-between">
      <div className="flex">
        <div>
          <img
            src={token.image}
            alt="token image"
            className="rounded-full w-10 h-10 mr-2"
          />
        </div>
        <div>
          <div className="font-bold">{token.name}</div>
          <div className="font-medium">
            1 {token.name} = ~${token.price}
          </div>
        </div>
      </div>
      <div>
        <div className="font-bold flex flex-end">{token.usdBalance}</div>
        <div className="font-medium flex flex-end">{token.balance}</div>
      </div>
    </div>
  );
}

export default TokenRow;
