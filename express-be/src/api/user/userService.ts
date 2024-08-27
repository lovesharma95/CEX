import { StatusCodes } from "http-status-codes";
import { Keypair } from "@solana/web3.js";

import { UserRepository } from "@/api/user/userRepository";
import { ServiceResponse } from "@/common/models/serviceResponse";
import { logger } from "@/server";
import { User } from "@/common/orm/entities/users/User";
import { UserWithWallet } from "./userTypes";
import { Provider } from "@/common/orm/entities/users/types";
import { JwtManager } from "@/common/utils/jwtManager";

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

      const jwtManager = new JwtManager();
      const { accessToken, refreshToken } = await jwtManager.generateTokens({
        _id: users.id,
      });

      return ServiceResponse.success<any>("Account found", {
        id: users?.id,
        email: users?.email,
        accessToken,
        refreshToken,
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

      const jwtManager = new JwtManager();
      const { accessToken, refreshToken } = await jwtManager.generateTokens({
        _id: users.id,
      });

      return ServiceResponse.success<any>(
        "Account created",
        {
          id: users.id,
          email: users.email,
          accessToken,
          refreshToken,
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

  async updateUser(userData: User) {
    try {
      const user = await this.userRepository.findByEmail(userData.email);
      if (!user) {
        return ServiceResponse.failure(
          "No Account found",
          null,
          StatusCodes.NOT_FOUND
        );
      }

      const data = {
        name: userData.name,
        profilePicture: userData.profilePicture,
        sub: userData.sub,
        password: userData.password,
        provider: Provider.Google,
      };

      const users = await this.userRepository.updateUser(data, user);

      return ServiceResponse.success<Partial<User>>(
        "Account updated",
        {
          id: users.id,
          email: users.email,
        },
        StatusCodes.CREATED
      );
    } catch (ex) {
      const errorMessage = `Error updating account: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while updating account.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

export const userService = new UserService();
