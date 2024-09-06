import { Repository } from "typeorm";
import { Token } from "@/common/orm/entities/token/Token";
import { connectionManager } from "@/common/orm/dbConnection";

export class TokenRepository {
  private tokenRepository: Repository<Token>;

  constructor() {
    this.tokenRepository = connectionManager.getRepository(Token);
  }

  async findTokens() {
    return this.tokenRepository.find();
  }
}
