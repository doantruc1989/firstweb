import { timeStamp } from "console";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { category } from "./category";

@Entity()
export class post {
    @PrimaryGeneratedColumn()
    "id": number

    @Column()
    "title": string

    @Column({
        type: "text"
    })
    "content": string

    @Column({
        type: "text"
    })
    "contentFull": string

    @Column()
    "path": string

    @Column({
        type: "timestamp"
    })
    "time": string

    @ManyToOne(() => category, (category) => category.posts)
    "categories": category[]
};