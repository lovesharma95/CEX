import bcrypt from "bcryptjs";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
} from "typeorm";

import { SolWallet } from "../solWallet/SolWallet";
import { InrWallet } from "../inrWallet/InrWallet";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", nullable: false })
  username!: string;

  @Column({ type: "varchar", default: "" })
  sub!: string;

  @Column({ type: "varchar", nullable: true })
  name?: string;

  @Column({ type: "text", nullable: true })
  profilePicture?: string;

  @Column({ type: "text", nullable: true })
  password?: string;

  @OneToOne(() => SolWallet, (solWallet) => solWallet.user, { nullable: true })
  @JoinColumn()
  solWallet?: SolWallet;

  @OneToOne(() => InrWallet, (inrWallet) => inrWallet.user, { nullable: true })
  @JoinColumn()
  inrWallet?: InrWallet;

  @Column({
    type: "enum",
    enum: ["Google"],
  })
  provider!: "Google";

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
