import { Request, Response} from 'express'
import knex from '../database/connection'

class ItemsController{
    async index(requisicao: Request, resposta: Response) {
        const items = await knex('items').select('*')//await espera a requisicao terminar pra ter os dados

        const serializedItems = items.map(item => {
            return{
                id: item.id,
                title: item.title,
                image_url: `http://10.0.0.6:3333/uploads/${item.image}`
            }
        })
        return resposta.json(serializedItems)
    }
}

export default ItemsController