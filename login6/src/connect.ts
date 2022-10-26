import { DataSource, DataSourceOptions } from "typeorm"
import * as mysql from 'mysql'

export const myDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "db3",
    entities: ["./src/entity/*.ts"],
    // logging: true,
    synchronize: true,
})

export const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db3'
});