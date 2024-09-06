import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

export const GetSolWalletPublicKeySchema = z.object({
  id: z.string(),
  publicKey: z.string(),
});
