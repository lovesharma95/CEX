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
