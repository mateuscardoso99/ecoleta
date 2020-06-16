import path from 'path';

module.exports = {
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'src', 'database', 'database.sqlite'),
    },

    migrations: {
        directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    },

    seeds: {
        directory: path.resolve(__dirname, 'src', 'database', 'seeds')
    },

    useNullAsDefault: true,
};//sqlite não suporta valores default, por isso deve passado o comando acima

//depois de configurado rodar o comando: 'npx knex --knexfile knexfile.ts migrate:latest', pra migrar as tabelas pro banco
//é interessante instalar a extensão do SQLite para o VSCode.
//depois de instalar: clicar ctrl+shift+p, digitar 'sqlite' e escolher opção 'open database', e escolher o arquivo que foi criado

//para rodar as seeds: 'npx knex --knexfile knexfile.ts seed:run'