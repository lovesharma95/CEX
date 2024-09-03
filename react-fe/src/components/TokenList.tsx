import React from "react";
import TokenRow from "./TokenRow";

function TokenList({ tokens }: { tokens: any[] }) {
  return (
    <div>
      {tokens.map((token: any) => (
        <div>
          <TokenRow token={token} />
          <hr />
        </div>
      ))}
    </div>
  );
}

export default TokenList;
