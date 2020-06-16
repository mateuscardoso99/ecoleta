//npm install multer, lib para trabalhar com uploads
//npm install @types/multer -D, adicionar a tipagem que o typescript precisa

import multer from 'multer'
import path from 'path'
import crypto from 'crypto'//gera um hash, para evitar arquivos duplicados

export default {
    storage: multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'uploads'),//onde vai ficar o arquivo q o usuario enviar
        filename(requisicao, file, callback){
            const hash = crypto.randomBytes(6).toString('hex')
            const fileName = `${hash}-${file.originalname}`//nome do arquivo terá um hash aleatorio, mais o nome original

            callback(null, fileName);//o primeiro parametro deve ser um erro, se houver
        }
    })
}