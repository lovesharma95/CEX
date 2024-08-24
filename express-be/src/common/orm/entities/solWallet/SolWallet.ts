import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { User } from "../users/User";

@Entity("sol_wallets")
export class SolWallet {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "text", nullable: false })
  publicKey!: string;

  @Column({ type: "text", nullable: false })
  privateKey!: string;

  @OneToOne(() => User, (user) => user.solWallet)
  @JoinColumn()
  user!: User;
}
