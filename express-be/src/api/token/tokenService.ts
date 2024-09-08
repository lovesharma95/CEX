import { StatusCodes } from "http-status-codes";

import { TokenRepository } from "@/api/token/tokenRepository";
import { ServiceResponse } from "@/common/models/serviceResponse";
import { logger } from "@/server";
import { SolWallet } from "@/common/orm/entities/solWallet/SolWallet";
import { Blockchain, Type } from "@/common/utils/blockchain";

export class TokenService {
  private tokenRepository: TokenRepository;
  private blockchain: Blockchain;

  constructor() {
    this.tokenRepository = new TokenRepository();
    this.blockchain = new Blockchain(Type.solana);
  }

  async getTokenForAddress(
    address: string
  ): Promise<ServiceResponse<Partial<SolWallet> | null>> {
    try {
      const supportedTokens = await this.tokenRepository.findTokens();

      const balances = await Promise.all(
        supportedTokens.map((token) =>
          this.blockchain.getAccountBalance(token, address)
        )
      );

      const tokens = supportedTokens.map((token, index) => ({
        ...token,
        balance: balances[index].toFixed(2),
        usdBalance: (balances[index] * Number(token.price)).toFixed(2),
      }));

      const result = {
        tokens,
        totalBalance: tokens
          .reduce((acc, val) => acc + Number(val.usdBalance), 0)
          .toFixed(2),
      };

      return ServiceResponse.success<any>("tokens found", result);
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

  async getSupportedTokens(): Promise<
    ServiceResponse<Partial<SolWallet> | null>
  > {
    try {
      const supportedTokens = await this.tokenRepository.findTokens();

      return ServiceResponse.success<any>("tokens found", supportedTokens);
    } catch (ex) {
      const errorMessage = `Error finding supported tokens: ${
        (ex as Error).message
      }`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while retrieving supported tokens.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

export const tokenService = new TokenService();
