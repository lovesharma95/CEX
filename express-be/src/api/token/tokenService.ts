import { StatusCodes } from "http-status-codes";

import { TokenRepository } from "@/api/token/tokenRepository";
import { ServiceResponse } from "@/common/models/serviceResponse";
import { logger } from "@/server";
import { SolWallet } from "@/common/orm/entities/solWallet/SolWallet";

export class TokenService {
  private tokenRepository: TokenRepository;

  constructor() {
    this.tokenRepository = new TokenRepository();
  }

  async getTokenForAddress(
    address: string
  ): Promise<ServiceResponse<Partial<SolWallet> | null>> {
    try {
      const tokens = await this.tokenRepository.findTokens();

      return ServiceResponse.success<any>("tokens found", tokens);
    } catch (ex) {
      const errorMessage = `Error finding token for address: ${
        (ex as Error).message
      }`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while retrieving token for address.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

export const tokenService = new TokenService();
