import { Request, Response} from 'express'
import knex from '../database/connection'

class PointsController{

    async index(requisicao: Request, resposta: Response){
        const { city, uf, items } = requisicao.query

        const parsedItems = String(items).split(',').map(item => Number(item.trim()))

        const points = await knex('points')
        .join('point_items', 'points.id', '=', 'point_items.point_id')
        .whereIn('point_items.item_id', parsedItems)
        .where('city', String(city))
        .where('uf', String(uf))
        .distinct()
        .select('points.*')

        const serializedPoints = points.map(point => {
            return{
                ...point,
                image_url: `http://10.0.0.6:3333/uploads/${point.image}`
            }
        })

        return resposta.json(serializedPoints)
    }

    async show(requisicao: Request, resposta: Response){
        const id = requisicao.params.id
        //outra forma: const { id } = requisicao.params


        const point = await knex('points').where('id', id).first()
        if(!point){
            return resposta.status(400).json({ message:'Ponto não existe.'})
        }

        const serializedPoint = {
            ...point,
            image_url: `http://10.0.0.6:3333/uploads/${point.image}`
        }

        const items = await knex('items')
        .join('point_items', 'items.id', '=', 'point_items.item_id')
        .where('point_items.point_id', id)

        return resposta.json({ point:serializedPoint, items })
    }


    async create(requisicao: Request, resposta: Response){
        const {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items
        } = requisicao.body
    
        const trx = await knex.transaction()//criando transação, para que se um insert falhar o outro não aconteça
    
        const point = {
            image: requisicao.file.filename,
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf
        }

        const insertedIds = await trx('points').insert(point)//inserindo na tabela points, o metodo insert retorna o id do dado inserido no banco
    
        const point_id = insertedIds[0]
    
        const pointItems = items.split(',').map((item: string) => Number(item.trim())).map((item_id: number) => {
            return{
                item_id,
                point_id,
            }
        })
    
        await trx('point_items').insert(pointItems)//inserindo na tabela da relação

        await trx.commit()

        return resposta.json({
            id: point_id,
            ...point,
        })
    }
}

export default PointsController