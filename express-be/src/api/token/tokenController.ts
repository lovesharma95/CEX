import type { Request, RequestHandler, Response } from "express";

import { tokenService } from "@/api/token/tokenService";
import { handleServiceResponse } from "@/common/utils/httpHandlers";

class TokenController {
  public getTokenForWalletAddress: RequestHandler = async (
    req: Request,
    res: Response
  ) => {
    const publicKey = await tokenService.getTokenForAddress(req.params.address);
    return handleServiceResponse(publicKey, res);
  };
}

export const tokenController = new TokenController();
