import { DataSource, DataSourceOptions } from "typeorm"

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
