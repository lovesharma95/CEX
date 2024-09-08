import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import { z } from "zod";

import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import {
  GetTokensForWalletAddressOutputSchema,
  GetTokensForWalletAddressInputSchema,
  GetSupportedTokensOutputSchema,
} from "@/api/token/tokenModel";
import { tokenController } from "./tokenController";
import { StatusCodes } from "http-status-codes";
import { authenticateRequest } from "@/common/middleware/authenticate";
import { validateRequest } from "@/common/utils/httpHandlers";

export const tokenRegistry = new OpenAPIRegistry();
export const tokenRouter: Router = express.Router();

tokenRegistry.register("Token", GetTokensForWalletAddressOutputSchema);

tokenRegistry.registerPath({
  method: "get",
  path: "/token",
  tags: ["Token"],
  request: {},
  responses: createApiResponse(
    GetSupportedTokensOutputSchema,
    "Success",
    StatusCodes.OK
  ),
  security: [{ BearerAuth: [] }],
});

tokenRouter.get("/", authenticateRequest, tokenController.getSupportedTokens);

tokenRegistry.registerPath({
  method: "get",
  path: "/token/wallet/{address}",
  tags: ["Token"],
  request: {
    params: GetTokensForWalletAddressInputSchema.shape.params,
  },
  responses: createApiResponse(
    GetTokensForWalletAddressOutputSchema,
    "Success",
    StatusCodes.OK
  ),
  security: [{ BearerAuth: [] }],
});

tokenRouter.get(
  "/wallet/:address",
  authenticateRequest,
  validateRequest(GetTokensForWalletAddressInputSchema),
  tokenController.getTokenForWalletAddress
);
