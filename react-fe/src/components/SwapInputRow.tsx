import React, { ReactNode } from "react";
import AssetSelector from "./AssetSelector";

function SwapInputRow({
  onSelect,
  amount,
  onAmountChange,
  selectedToken,
  subtitle,
  topBorderEnabled,
  bottomBorderEnabled,
  inputDisabled,
  inputLoading,
  label,
}: {
  onSelect: (asset: any) => void;
  selectedToken: any;
  subtitle?: ReactNode;
  topBorderEnabled: boolean;
  bottomBorderEnabled: boolean;
  amount?: string;
  onAmountChange?: (value: string) => void;
  inputDisabled?: boolean;
  inputLoading?: boolean;
  label: string;
}) {
  return (
    <div
      className={`border flex justify-between ${
        topBorderEnabled ? "rounded-t-xl" : ""
      } ${bottomBorderEnabled ? "rounded-b-xl" : ""}`}
    >
      <div className="flex flex-col w-52">
        <AssetSelector
          selectedToken={selectedToken}
          onSelect={onSelect}
          label={label}
        />
        {subtitle}
      </div>
      <div className="">
        <input
          disabled={inputDisabled}
          onChange={(e) => {
            onAmountChange?.(e.target.value);
          }}
          placeholder="0"
          type="text"
          className="bg-slate-50 outline-none w-72 text-4xl mt-8 mr-2"
          dir="rtl"
          value={inputLoading ? "Loading" : amount}
        ></input>
      </div>
    </div>
  );
}

export default SwapInputRow;
