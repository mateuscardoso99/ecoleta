import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react'//changeEvent e formEvent para manipular eventos mudanças, click, submit etc.. no formulario
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import { Map, TileLayer, Marker } from 'react-leaflet'//api de mapas: 'npm install leaflet react-leaflet',
                                                    //com typescript é preciso instalar: 'npm install @types/react-leaflet -D

import logo from '../../assets/logo.svg'
import './styles.css'
import api from '../../services/api'
import axios from 'axios'
import { LeafletMouseEvent } from 'leaflet'//importando click no mapa

import Dropzone from '../../components/Dropzone'

//sempre que for criado um estado pra um array ou objeto, é preciso definir manualmente o tipo das variaveis, por isso foi criada a interface 

interface Item {//representação do formato que o objeto vai ter
    id: number
    title: string
    image_url: string
}

interface IBGEUFResponse {
    sigla: string
    nome: string
}

interface IBGECITYResponse {
    nome: string
}

const CreatePoint = () => {

    const [items, setItems] = useState<Item[]>([])//estados são uteis para armazenar informações dentro dum componente
    const [ufs, setUfs] = useState<IBGEUFResponse[]>([])
    const [selectedUf, setSelectedUf] = useState('0')
    const [cities, setCities] = useState<string[]>([])
    const [selectedCity, setSelectedCity] = useState('0')
    const [selectedPosition, setSelectedPosition] = useState<[number,number]>([0,0])
    const [initialPosition, setInitialPosition] = useState<[number,number]>([0,0])
    const [formData, setFormData] = useState({
        name:'',
        email:'',
        whatsapp:'',
    })
    const [selectedItems, setSelectedItems] = useState<number[]>([])
    const history = useHistory()

    const [selectedFile, setSelectedFile] = useState<File>()

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords
        setInitialPosition([latitude, longitude])
        })//retorna a posição do usuario quando iniciar a aplicação

    }, [])

    useEffect(() => {
        api.get('items').then(resposta => {
            setItems(resposta.data)
        })
    }, [])//usar quando se deseja que uma função seja executada UMA UNICA VEZ, mesmo que o componente sofra alterações de estado ou etc..

    useEffect(() => {
        axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome').then(resposta => {
            //const siglas = resposta.data.map(uf => uf.sigla)
            //setUfs(siglas)
            setUfs(resposta.data)
        })
    }, [])

    useEffect(() => {
        if (selectedUf === '0') {
            return
        }

        axios.get<IBGECITYResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
        .then(resposta => {
            const cityNames = resposta.data.map(city => city.nome)
            setCities(cityNames)
        })
    }, [selectedUf])

    function handleSelectUf(event: ChangeEvent<HTMLSelectElement>){//HTMLSelectElement significa q esta manipulando um evento em uma tag select do html
        const uf = event.target.value
        setSelectedUf(uf)
    }

    function handleSelectCity(event: ChangeEvent<HTMLSelectElement>){
        const city = event.target.value
        setSelectedCity(city)
    }

    function handleMapClick(event: LeafletMouseEvent){
        setSelectedPosition([
            event.latlng.lat,
            event.latlng.lng
        ])
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>){
        const { name, value } = event.target

        setFormData({ ...formData, [name]: value }) //...formData copia os dados ja exitentes, impedindo que sejam perdidos
    }

    function handleSelectItem(id: number){
        const jaSelecionado = selectedItems.findIndex(item => item === id)
        if (jaSelecionado >= 0) {
            const itemsFiltrados = selectedItems.filter(item => item != id)
            setSelectedItems(itemsFiltrados)
        }
        else{
            setSelectedItems([ ...selectedItems, id])
        }
    }

    async function cadastrar(event: FormEvent){
        event.preventDefault()

        const { name, email, whatsapp } = formData
        const uf = selectedUf
        const city = selectedCity
        const [latitude, longitude] = selectedPosition
        const items = selectedItems

        const dados = new FormData()//para envio de arquivos e necessario o FormData
            dados.append('name', name)
            dados.append('email', email)
            dados.append('whatsapp', whatsapp)
            dados.append('uf', uf)
            dados.append('city', city)
            dados.append('latitude', String(latitude))
            dados.append('longitude', String(longitude))
            dados.append('items', items.join(','))

            if(selectedFile){
                dados.append('image', selectedFile)
            }
            
        await api.post('points', dados)
        alert('Cadastrado com sucesso!')
        history.push('/')//enviando pra rota '/'
    }


    return(
        <div id="page-create-point">
            <header>
                <img src={logo} alt="Ecoleta"/>
                <Link to="/">
                    <span>
                        <FiArrowLeft/>
                    </span>
                    Voltar para home
                </Link>
            </header>

            <form onSubmit={cadastrar}>
                <h1>Cadastro do <br/> ponto de coleta</h1>

                <Dropzone onFileUploaded={setSelectedFile}/>


                <fieldset>
                    <legend>
                        <h2>Dados</h2>
                    </legend>

                    <div className="field">
                        <label htmlFor="name">Nome da entidade</label>
                        <input type="text" name="name" id="name" onChange={handleInputChange}/>
                    </div>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="email">E-mail</label>
                            <input type="email" name="email" id="email" onChange={handleInputChange}/>
                        </div>

                        <div className="field">
                            <label htmlFor="whatsapp">WhatsApp</label>
                            <input type="text" name="whatsapp" id="whatsapp" onChange={handleInputChange}/>
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Endereço</h2>
                        <span>Selecione o endereço no mapa</span>
                    </legend>

                    <Map center={initialPosition} zoom={15} onClick={handleMapClick}>
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={selectedPosition}/>
                    </Map>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="uf">Estado</label>
                            <select name="uf" id="uf" value={selectedUf} onChange={handleSelectUf}>
                                <option value="0">Selecione o estado</option>
                                {ufs.map(dados => (
                                    <option key={dados.sigla} value={dados.sigla}>{dados.nome}</option>
                                ))}
                            </select>
                        </div>

                        <div className="field">
                            <label htmlFor="city">Cidade</label>
                            <select name="city" id="city" value={selectedCity} onChange={handleSelectCity}>
                                <option value="0">Selecione uma cidade</option>
                                {cities.map(city => (
                                    <option key={city} value={city}>{city}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Ítens de coleta</h2>
                        <span>Selecione um ou mais itens de abaixo</span>
                    </legend>

                    <ul className="items-grid">
                        {items.map(item => (
                            <li key={item.id} 
                                onClick={() => handleSelectItem(item.id)}
                                className={selectedItems.includes(item.id) ? 'selected' : ''}>
                                <img src={item.image_url} alt={item.title}/>
                                <span>{item.title}</span>
                            </li>
                        ))}
                    </ul>

                </fieldset>

                <button type="submit">Cadastrar ponto de coleta!</button>
            </form>
        </div>
    )
}

export default CreatePoint