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
    if (token == null)
      return ServiceResponse.failure(
        "Unauthorized access!",
        null,
        StatusCodes.UNAUTHORIZED
      );

    const jwtManager = new JwtManager();
    const verifiedToken = await jwtManager.verifyAccessToken(token);

    // req.user = verifiedToken.tokenDetails;

    next();
  } catch (err) {
    const errorMessage = `Invalid input: ${err}`;
    const statusCode = StatusCodes.BAD_REQUEST;
    const serviceResponse = ServiceResponse.failure(
      errorMessage,
      null,
      statusCode
    );
    return handleServiceResponse(serviceResponse, res);
  }
};
