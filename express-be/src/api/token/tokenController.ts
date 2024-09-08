import type { Request, RequestHandler, Response } from "express";

import { tokenService } from "@/api/token/tokenService";
import { handleServiceResponse } from "@/common/utils/httpHandlers";

class TokenController {
  public getTokenForWalletAddress: RequestHandler = async (
    req: Request,
    res: Response
  ) => {
    const tokenData = await tokenService.getTokenForAddress(req.params.address);
    return handleServiceResponse(tokenData, res);
  };

  public getSupportedTokens: RequestHandler = async (
    req: Request,
    res: Response
  ) => {
    const tokenData = await tokenService.getSupportedTokens();
    return handleServiceResponse(tokenData, res);
  };
}

export const tokenController = new TokenController();
