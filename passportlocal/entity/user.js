var EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "db2",
    tableName: "user",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        usr: {
            type: "varchar",
        },
        pwd: {
            type: 'varchar',
        },
        role: {
            type: 'varchar',
        },
    },
})