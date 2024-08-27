import type { Request, RequestHandler, Response } from "express";

import { userService } from "@/api/user/userService";
import { handleServiceResponse } from "@/common/utils/httpHandlers";
import { StatusCodes } from "http-status-codes";

class UserController {
  public signupUser: RequestHandler = async (req: Request, res: Response) => {
    const existingUser = await userService.findUserByEmail(req.body.email);
    if (existingUser.statusCode === StatusCodes.NOT_FOUND) {
      const serviceResponse = await userService.createUserWithWallets(req.body);
      return handleServiceResponse(serviceResponse, res);
    }
    await userService.updateUser(req.body);
    return handleServiceResponse(existingUser, res);
  };
}

export const userController = new UserController();
