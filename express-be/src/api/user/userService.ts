import { StatusCodes } from "http-status-codes";
import { Keypair } from "@solana/web3.js";

import { UserRepository } from "@/api/user/userRepository";
import { ServiceResponse } from "@/common/models/serviceResponse";
import { logger } from "@/server";
import { User } from "@/common/orm/entities/users/User";
import { UserWithWallet } from "./userTypes";
import { Provider } from "@/common/orm/entities/users/types";

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async findUserByEmail(
    email: string
  ): Promise<ServiceResponse<Partial<User> | null>> {
    try {
      const users = await this.userRepository.findByEmail(email);
      if (!users) {
        return ServiceResponse.failure(
          "No Account found",
          null,
          StatusCodes.NOT_FOUND
        );
      }

      return ServiceResponse.success<Partial<User>>("Account found", {
        id: users?.id,
        email: users?.email,
      });
    } catch (ex) {
      const errorMessage = `Error finding all users: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while retrieving users.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async createUserWithWallets(userData: User) {
    try {
      const keypair = Keypair.generate();

      const data: UserWithWallet = {
        ...userData,
        provider: Provider.Google,
        solWallet: {
          publicKey: keypair.publicKey.toBase58(),
          privateKey: keypair.secretKey.toString(),
        },
        inrWallet: {
          balance: 0,
        },
      };

      const users = await this.userRepository.createUserWithWallets(data);

      return ServiceResponse.success<Partial<User>>(
        "Account created",
        {
          id: users.id,
          email: users.email,
        },
        StatusCodes.CREATED
      );
    } catch (ex) {
      const errorMessage = `Error creating account: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while creating account.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

export const userService = new UserService();
