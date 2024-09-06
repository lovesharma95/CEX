import { StatusCodes } from "http-status-codes";
import { Keypair } from "@solana/web3.js";

import { SolWalletRepository } from "@/api/solWallet/solWalletRepository";
import { ServiceResponse } from "@/common/models/serviceResponse";
import { logger } from "@/server";
import { SolWallet } from "@/common/orm/entities/solWallet/SolWallet";
import { SolWalletWithWallet } from "./solWalletTypes";
import { Provider } from "@/common/orm/entities/users/types";
import { JwtManager } from "@/common/utils/jwtManager";

export class SolWalletService {
  private solWalletRepository: SolWalletRepository;

  constructor() {
    this.solWalletRepository = new SolWalletRepository();
  }

  async findUserPublicKey(
    id: string
  ): Promise<ServiceResponse<Partial<SolWallet> | null>> {
    try {
      const publicKey = await this.solWalletRepository.findByUserId(id);
      if (!publicKey) {
        return ServiceResponse.failure(
          "No Public Key Found",
          null,
          StatusCodes.NOT_FOUND
        );
      }

      return ServiceResponse.success<any>("Public Key found", publicKey);
    } catch (ex) {
      const errorMessage = `Error finding user public key: ${
        (ex as Error).message
      }`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while retrieving user public key.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

export const solWalletService = new SolWalletService();
