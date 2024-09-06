import { Repository } from "typeorm";
import { SolWallet } from "@/common/orm/entities/solWallet/SolWallet";
import { InrWallet } from "@/common/orm/entities/inrWallet/InrWallet";
import { SolWalletWithWallet } from "./solWalletTypes";
import { connectionManager } from "@/common/orm/dbConnection";

export class SolWalletRepository {
  private solWalletRepository: Repository<SolWallet>;

  constructor() {
    this.solWalletRepository = connectionManager.getRepository(SolWallet);
  }

  async findByUserId(id: string) {
    return this.solWalletRepository.findOne({
      where: { user: { id: id } },
      select: {
        id: true,
        publicKey: true,
      },
    });
  }
}
