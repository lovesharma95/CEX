import type { Request, RequestHandler, Response } from "express";

import { solWalletService } from "@/api/solWallet/solWalletService";
import { handleServiceResponse } from "@/common/utils/httpHandlers";

class SolWalletController {
  public getPublicKey: RequestHandler = async (req: Request, res: Response) => {
    const publicKey = await solWalletService.findUserPublicKey(req.user._id);
    return handleServiceResponse(publicKey, res);
  };
}

export const solWalletController = new SolWalletController();
