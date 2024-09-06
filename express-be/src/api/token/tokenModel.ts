import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

export const GetTokensForWalletAddressOutputSchema = z.array(
  z.object({
    id: z.string(),
    name: z.string(),
    mint: z.string(),
    native: z.boolean(),
    price: z.number(),
    image: z.string(),
    decimals: z.number(),
    balance: z.number(),
    usdBalance: z.number(),
  })
);

export const GetTokensForWalletAddressInputSchema = z.object({
  params: z.object({ address: z.string() }),
});
