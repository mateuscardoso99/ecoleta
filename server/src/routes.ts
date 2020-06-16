import express from 'express'
import multer from 'multer'
import multerConfig from './config/multer'

import { celebrate, Joi } from 'celebrate'//lib para validação de dados no backend,
                                        //'npm install celebrate',
                                        //'npm install @types/hapi__joi -D'

import PointsController from './controllers/PointsController'
import ItemsController from './controllers/ItemsController'

const routes = express.Router()
const upload = multer(multerConfig)

const pointsController = new PointsController()
const itemsController = new ItemsController()

routes.get('/items', itemsController.index)
routes.get('/points', pointsController.index)
routes.get('/points/:id', pointsController.show)

routes.post('/points',
    upload.single('image'),
    celebrate({
        body: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().required().email(),
            whatsapp: Joi.string().required(),
            latitude: Joi.number().required(),
            longitude: Joi.number().required(),
            city: Joi.string().required(),
            uf: Joi.string().required().max(2),
            items: Joi.string().required()
        })//validacao no backend
    }, {
        abortEarly: false //vai listar todos os campos que faltam
    }),
    pointsController.create)
//passando a imagem enviada pelo usuario, se fosse varias fotos seria o metodo array()

export default routes