import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import {
  getAssociatedTokenAddress,
  getAccount,
  getMint,
} from "@solana/spl-token";

export enum Type {
  solana = "solana",
}

export class Blockchain {
  private type: Type;
  private connection = new Map<Type, Connection>([
    [
      Type.solana,
      new Connection(
        "https://solana-devnet.g.alchemy.com/v2/EspGgEsKtp6xdG1-P32lj9raEFUlgXNc"
      ),
    ],
  ]);

  constructor(type: Type) {
    this.type = type;
  }

  private getConnection(type: Type) {
    return (
      this.connection.get(this.type) ??
      new Connection(
        "https://solana-devnet.g.alchemy.com/v2/EspGgEsKtp6xdG1-P32lj9raEFUlgXNc"
      )
    );
  }

  async getAccountBalance(
    token: {
      name: string;
      mint: string;
      native: boolean;
      decimals: number;
    },
    address: string
  ) {
    const conn = this.getConnection(this.type);
    if (token.native) {
      let balance = await conn.getBalance(new PublicKey(address));
      return balance / LAMPORTS_PER_SOL;
    }
    const ata = await getAssociatedTokenAddress(
      new PublicKey(token.mint),
      new PublicKey(address)
    );

    try {
      const account = await getAccount(conn, ata);
      // const mint = await getMint(connection, new PublicKey(token.mint));
      return Number(account.amount) / 10 ** token.decimals;
    } catch (e) {
      return 0;
    }
  }
}
