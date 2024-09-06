import bcrypt from "bcryptjs";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
  BeforeInsert,
} from "typeorm";

import { SolWallet } from "../solWallet/SolWallet";
import { InrWallet } from "../inrWallet/InrWallet";
import { Provider } from "./types";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", nullable: false, unique: true })
  email!: string;

  @Column({ type: "varchar", nullable: true })
  sub!: string | undefined;

  @Column({ type: "varchar", nullable: true })
  name?: string | undefined;

  @Column({ type: "text", nullable: true })
  profilePicture?: string | undefined;

  @Column({ type: "text", nullable: true })
  password?: string | undefined;

  @OneToOne(() => SolWallet, (solWallet) => solWallet.user, {
    nullable: false,
    cascade: true,
  })
  solWallet?: SolWallet;

  @OneToOne(() => InrWallet, (inrWallet) => inrWallet.user, {
    nullable: false,
    cascade: true,
  })
  inrWallet?: InrWallet;

  @Column({
    type: "enum",
    enum: Provider,
  })
  provider!: Provider;

  @BeforeInsert()
  hashPassword() {
    if (this.password) {
      this.password = bcrypt.hashSync(this.password, 8);
    }
  }

  checkIfPasswordMatch(unencryptedPassword: string): boolean {
    if (!this.password) {
      return false;
    }
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }
}
