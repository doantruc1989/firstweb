import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class comment {
    @PrimaryGeneratedColumn()
    "id": number

    @Column()
    "username": string

    @Column()
    "content": string

    @Column({
        type: "timestamp"
    })
    "time": string

    @Column()
    "postId": number
};