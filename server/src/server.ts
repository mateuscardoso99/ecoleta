import express from 'express'
import cors from 'cors' //'npm install cors', controla quais URLs vão poder acessar a aplicação, 'npm install @types/cors' para adicionar tipos que o typescript precisa
import routes from './routes'
import path from 'path'

import { errors } from 'celebrate'
//'npm install @types/express -D', o typescript precisa saber o tipo da biblioteca importada
//'npm install ts-node -D', para o node conseguir reconhecer e e executar typescript
//'npm install typescript -D', instalação typescript
//'npx tsc --init', criar arquivo arquivo de configuração do typescript

//'npx ts-node src/server.ts', para inicializar o servidor
//'npm install ts-node-dev -D', para atualizar alterações automaticamente

//'npx ts-node-dev src/server.ts', para inicializar o servidor sem precisar interromper a cada mudança
//'npm run dev', ao inves do comando acima, colocando 'ts-node-dev src/server.ts' dentro do package.json, na parte de scripts

//TIPOS DE ROTAS:
//GET: buscar dados do back-end
//POST: criar um novo dado no back-end
//PUT: atualizar um dado no back-end
//DELETE: apagar um dado no back-end

//request.params: paramatros da propria rota
//request.query: parametros opcionais, para filtragem ou paginação
//request.body: parametros para criação/atualização de informações

const app = express()

app.use(cors())
app.use(express.json())//fazendo com que o express leia o json
app.use(routes)
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')))

/*const users = [
    'joao',
    'silvio',
    'felix',
    'maria'
]*/

/*app.get('/users', (requisicao, resposta) => {
    const search = String(requisicao.query.search)

    const usuariosFiltrados = search ? users.filter(user => user.includes(search)) : users

    //resposta.send('ola')//retornando texto
    return resposta.json(usuariosFiltrados)
})*/

/*app.get('/users/:id', (requisicao, resposta) => {
    const id = Number(requisicao.params.id)
    const user = users[id]

    return resposta.json(user)
})*/

/*app.post('/users', (requisicao, resposta) => {
    const data = requisicao.body
    console.log(data)

    const user = {
        nome: data.nome,
        idade: data.idade
    }

    return resposta.json(user)
})*/

app.use(errors())


app.listen(3333)