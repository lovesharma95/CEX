import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { ServiceResponse } from "@/common/models/serviceResponse";
import { handleServiceResponse } from "../utils/httpHandlers";
import { JwtManager } from "../utils/jwtManager";

export const authenticateRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) {
      return handleServiceResponse(
        ServiceResponse.failure(
          "Unauthorized access!",
          null,
          StatusCodes.UNAUTHORIZED
        ),
        res
      );
    }

    const jwtManager = new JwtManager();
    const verifiedToken: any = await jwtManager.verifyAccessToken(token);

    req.user = verifiedToken.tokenDetails;

    next();
  } catch (err: any) {
    const errorMessage = `Unauthorized access!: ${err.message}`;
    const statusCode = StatusCodes.UNAUTHORIZED;
    const serviceResponse = ServiceResponse.failure(
      errorMessage,
      null,
      statusCode
    );
    return handleServiceResponse(serviceResponse, res);
  }
};
