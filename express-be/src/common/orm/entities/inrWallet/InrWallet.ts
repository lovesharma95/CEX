import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { User } from "../user/User";

@Entity("inr_wallets")
export class InrWallet {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "bigint", nullable: false })
  balance!: number;

  @OneToOne(() => User, (user) => user.inrWallet)
  @JoinColumn()
  user!: User;
}
