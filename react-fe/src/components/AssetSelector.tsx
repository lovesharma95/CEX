import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getSupportedTokens } from "../services/tokenService";

function AssetSelector({
  selectedToken,
  onSelect,
  label,
}: {
  selectedToken: any;
  onSelect: (asset: any) => void;
  label: string;
}) {
  const accessToken: string = useSelector(
    (state: any) => state.auth.accessToken
  );
  const [supportedTokens, setSupportedTokens] = useState<any>(null);

  useEffect(() => {
    async function fetchSupportedTokens() {
      const apiData = await getSupportedTokens(accessToken);
      const data = apiData.responseObject;

      if (data) {
        setSupportedTokens(data);
      } else {
        console.error("No supported tokens found");
      }
    }

    if (accessToken) {
      fetchSupportedTokens();
    }
  }, [accessToken]);

  return (
    <div className="py-2 pl-2">
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">You {label}:</span>
        </div>
        <select
          onChange={(e) => {
            const token = supportedTokens.find(
              (x: any) => x.name === e.target.value
            );
            if (token) onSelect(token);
          }}
          className="select select-bordered focus:outline-none"
        >
          {supportedTokens &&
            supportedTokens.map((token: any) => (
              <option
                key={token.name}
                value={token.name}
                selected={selectedToken?.name == token.name}
              >
                {token.name}
              </option>
            ))}
        </select>
      </label>
    </div>
  );
}

export default AssetSelector;
