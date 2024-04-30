import knex from "knex";

export default knex({
    client: 'pg',
    connection: {
        host: 'localhost',
        port: 3001,
        database: 'rancho',
        user: 'ismael',
        password: 'isca11061996'
    }
});