import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("tokens")
export class Token {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", nullable: false })
  name!: string;

  @Column({ type: "varchar", nullable: false })
  mint!: string;

  @Column({ type: "boolean", nullable: false })
  native!: boolean;

  @Column({ type: "decimal", nullable: false, precision: 10, scale: 2 })
  price!: number;

  @Column({ type: "int", nullable: false })
  decimals!: number;

  @Column({ type: "varchar", nullable: false })
  image!: string;
}
