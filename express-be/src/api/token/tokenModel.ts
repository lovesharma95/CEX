import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

export const GetTokensForWalletAddressOutputSchema = z.object({
  tokens: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      mint: z.string(),
      native: z.boolean(),
      price: z.string(),
      image: z.string(),
      decimals: z.number(),
      balance: z.string(),
      usdBalance: z.string(),
    })
  ),
  totalBalance: z.string(),
});

export const GetSupportedTokensOutputSchema = z.object({
  id: z.string(),
  name: z.string(),
  mint: z.string(),
  native: z.boolean(),
  price: z.string(),
  image: z.string(),
  decimals: z.number(),
});

export const GetTokensForWalletAddressInputSchema = z.object({
  params: z.object({ address: z.string() }),
});

export const SwapTokensInputSchema = z.object({
  body: z.object({
    inputMint: z.string(),
    inAmount: z.string(),
    outputMint: z.string(),
    outAmount: z.string(),
    otherAmountThreshold: z.string(),
    swapMode: z.string(),
    slippageBps: z.number(),
    platformFee: z.nullable(z.string()), // Nullable field
    priceImpactPct: z.string(),
    routePlan: z.array(
      z.object({
        swapInfo: z.object({
          ammKey: z.string(),
          label: z.string(),
          inputMint: z.string(),
          outputMint: z.string(),
          inAmount: z.string(),
          outAmount: z.string(),
          feeAmount: z.string(),
          feeMint: z.string(),
        }),
        percent: z.number(),
      })
    ),
    contextSlot: z.number(),
    timeTaken: z.number(),
  }),
});

export const SwapTokensOutputSchema = z.object({
  txnId: z.string(),
});
