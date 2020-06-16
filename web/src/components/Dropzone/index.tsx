//npm install react-dropzone, lib para uploads
import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import { FiUpload } from 'react-icons/fi'

import './styles.css'

interface Props{
  onFileUploaded: (arquivo: File) => void
}


const Dropzone: React.FC<Props> = ({onFileUploaded}) => {
  const [selectedFileUrl, setSelectedFileUrl] = useState('')

  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0]//só haverá um arquivo, por isso sempre vai estar na posição zero

    const fileUrl = URL.createObjectURL(file)

    setSelectedFileUrl(fileUrl)
    onFileUploaded(file)
  }, [onFileUploaded])

  const {getRootProps, getInputProps} = useDropzone({
    onDrop,
    accept: 'image/*'//aceita qualquer tipo de imagem
  })

  return (
    <div className="dropzone" {...getRootProps()}>
      <input { ...getInputProps()} accept='image/*'/>
      
      { selectedFileUrl 
        ? <img src={selectedFileUrl} alt="foto do ponto de coleta" />
        : (
          <p>
            <FiUpload/>
            Selecione a foto aqui
          </p>
        )
      }

    </div>
  )
}

export default Dropzone