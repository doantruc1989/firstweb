import { timeStamp } from "console";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class draft {
  @PrimaryGeneratedColumn()
  "id": number;

  @Column()
  "title": string;

  @Column()
  "content": string;

  @Column()
  "path": string;

  @Column({
    type: "timestamp",
  })
  "time": string;

  @Column({
    unique: true,
  })
  "username": string;
}
