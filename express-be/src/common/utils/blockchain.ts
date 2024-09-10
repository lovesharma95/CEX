import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  VersionedTransaction,
} from "@solana/web3.js";
import {
  getAssociatedTokenAddress,
  getAccount,
  getMint,
} from "@solana/spl-token";
import { SolWallet } from "../orm/entities/solWallet/SolWallet";

export enum Type {
  solana = "solana",
}

export class Blockchain {
  private type: Type;
  private connection = new Map<Type, Connection>([
    [Type.solana, new Connection(process.env.RPC_URL ?? "")],
  ]);

  constructor(type: Type) {
    this.type = type;
  }

  private getConnection(type: Type) {
    return (
      this.connection.get(this.type) ??
      new Connection(process.env.RPC_URL ?? "")
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

  private getPrivateKeyFromDb(privateKey: string) {
    const arr = privateKey.split(",").map((x) => Number(x));
    const privateKeyUintArr = Uint8Array.from(arr);
    const keypair = Keypair.fromSecretKey(privateKeyUintArr);
    return keypair;
  }

  async swapTxn(solWallet: SolWallet, body: any) {
    try {
      const conn = this.getConnection(this.type);

      const { swapTransaction } = (await (
        await fetch("https://quote-api.jup.ag/v6/swap", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // quoteResponse from /quote api
            quoteResponse: body,
            // user public key to be used for the swap
            userPublicKey: solWallet.publicKey,
            // auto wrap and unwrap SOL. default is true
            wrapAndUnwrapSol: true,
            // feeAccount is optional. Use if you want to charge a fee.  feeBps must have been passed in /quote API.
            // feeAccount: "fee_account_public_key"
          }),
        })
      ).json()) as unknown as any;

      const swapTransactionBuf = Buffer.from(swapTransaction, "base64");
      var transaction = VersionedTransaction.deserialize(swapTransactionBuf);
      const privateKey = this.getPrivateKeyFromDb(solWallet.privateKey);
      transaction.sign([privateKey]);

      const latestBlockHash = await conn.getLatestBlockhash();

      // Execute the transaction
      const rawTransaction = transaction.serialize();
      const txnid = await conn.sendRawTransaction(rawTransaction, {
        skipPreflight: true,
        maxRetries: 2,
      });

      await conn.confirmTransaction({
        blockhash: latestBlockHash.blockhash,
        lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
        signature: txnid,
      });

      return txnid;
    } catch (err) {
      console.log("error while swap txn", err);
      return null;
    }
  }
}
