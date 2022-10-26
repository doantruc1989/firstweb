import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class users {
    @PrimaryGeneratedColumn()
    "id": number

    @Column({
        unique: true
})
    "username": string
    

    @Column()
    "password": string

    @Column()
    "avatar": string
};