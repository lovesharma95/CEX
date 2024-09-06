import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import { z } from "zod";

import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { GetSolWalletPublicKeySchema } from "@/api/solWallet/solWalletModel";
import { solWalletController } from "./solWalletController";
import { StatusCodes } from "http-status-codes";
import { authenticateRequest } from "@/common/middleware/authenticate";

export const solWalletRegistry = new OpenAPIRegistry();
export const solWalletRouter: Router = express.Router();

solWalletRegistry.register("SolWallet", GetSolWalletPublicKeySchema);

solWalletRegistry.registerPath({
  method: "get",
  path: "/sol-wallet/public-key",
  tags: ["Sol-Wallet"],
  request: {},
  responses: createApiResponse(
    GetSolWalletPublicKeySchema,
    "Success",
    StatusCodes.OK
  ),
  security: [{ BearerAuth: [] }],
});

solWalletRouter.get(
  "/public-key",
  authenticateRequest,
  solWalletController.getPublicKey
);
