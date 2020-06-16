import Knex from 'knex'

export async function up(knex: Knex){
    return knex.schema.createTable('items', table => {
        table.increments('id').primary()
        table.string('image').notNullable()
        table.string('title').notNullable()
    })

}//CRIA TABELA NO BANCO

export async function down(knex: Knex){
    return knex.schema.dropTable('items')
}//VOLTA ATRÁS, (APAGA A TABELA DO BANCO)