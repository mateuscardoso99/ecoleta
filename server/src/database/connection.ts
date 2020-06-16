import knex from 'knex';//knex suporta inumeros bancos de dados e permite escrever consultas em JS
import path from 'path'

//npm install sqlite3, banco de dados utilizado na aplicação

const connection = knex({
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'database.sqlite'),
    },
    useNullAsDefault: true,
});

export default connection