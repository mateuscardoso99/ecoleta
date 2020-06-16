import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from 'react-native'//touchable: classe de botoes
import Constants from 'expo-constants'
import { Feather as Icon } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import Mapa, {Marker} from 'react-native-maps'
import { SvgUri } from 'react-native-svg' //para carregar svg externo
import api from '../../services/api'
import * as Location from 'expo-location'

//expo install react-native-maps, lib para trabalhar com mapas
//expo install expo-contants
//expo install react-native-svg, para não dar erro com arquivos .svg
//npm install axios, para requisicoes http
//expo install expo-location, pegar localização atual do usuario e etc...

interface Item {
  id: number
  title: string
  image_url: string
}

interface Points {
  id: number
  name: string
  image: string
  image_url: string
  latitude: number
  longitude: number
}

interface Parametros{
  uf: string
  city: string
}


const Points = () => {
    const navegacao = useNavigation()

    function voltarTelaAnterior(){
      navegacao.goBack()//volta pra anterior
    }

    function irParaDetalhes(id: number){
      navegacao.navigate('Detail', {ponto_id: id})
    }



    const [items, setItems] = useState<Item[]>([])//como sera mais de um item, será armezenado em um vetor
    const [selectedItems, setSelectedItems] = useState<number[]>([])
    const [initialPosition, setInitialPosition] = useState<[number, number]>([0,0])
    const [points, setPoints] = useState<Points[]>([])

    const routes = useRoute()//pegar os parametros da rota
    const parametrosRota = routes.params as Parametros

    useEffect(() => {
      api.get('items').then(resposta => {
        setItems(resposta.data)
      })
    }, [])

    useEffect(() => {
      async function loadPosition(){
        const {status} = await Location.requestPermissionsAsync()//pedindo acesso a localizacao do usuario
        if (status !== 'granted') {
          Alert.alert('Opss..', 'Precisamos da permissão para acessar a sua localização')
          return
        }

        const location = await Location.getCurrentPositionAsync()
        const { latitude, longitude } = location.coords

        setInitialPosition([
          latitude,
          longitude
        ])

      }

      loadPosition()
    }, [])


    useEffect(() => {
      api.get('points',{
        params: {
          city: parametrosRota.city,
          uf: parametrosRota.uf,
          items: selectedItems
        }
      }).then(resposta => {
        setPoints(resposta.data)
      })
    }, [selectedItems])//passando esse parametro, sempre que for selecionado um item será feita a chamada a essa função novamente


    function handleSelectedItem(id: number){
      const jaSelecionados = selectedItems.findIndex(item => item === id)
      if(jaSelecionados >= 0){
        const itensFiltrados = selectedItems.filter(item => item !== id)
        setSelectedItems(itensFiltrados)
      }else{
        setSelectedItems([ ...selectedItems, id ])
      }
    }


    return(
        <>
            <View style={styles.container}>
                <TouchableOpacity onPress={voltarTelaAnterior}>
                    <Icon name="arrow-left" size={20} color="#34cb79"/>
                </TouchableOpacity>


                <Text style={styles.title}>Ben-vindo.</Text>
                <Text style={styles.description}>Encontre no mapa um ponto de coleta.</Text>

                <View style={styles.mapContainer}>
                    { initialPosition[0] !== 0 && (
                      <Mapa style={styles.map}
                          loadingEnabled={initialPosition[0] === 0}
                          initialRegion={{
                            latitude: initialPosition[0],
                            longitude: initialPosition[1],
                            latitudeDelta: 0.014,
                            longitudeDelta: 0.014,
                          }}>
                          {points.map(point => (
                            <Marker
                              key={String(point.id)}
                              style={styles.mapMarker} 
                              onPress={() => irParaDetalhes(point.id)} 
                              coordinate={{
                                latitude: point.latitude,
                                longitude: point.longitude,
                              }}>
                              <View style={styles.mapMarkerContainer}>
                                  <Image style={styles.mapMarkerImage} source={{ uri: point.image_url }}/>
                                  <Text style={styles.mapMarkerTitle}>{point.name}</Text>
                              </View>
                          </Marker>
                          ))}
                      </Mapa>
                    )}
                </View>


                <View style={styles.itemsContainer}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 5 }}>{/*scrollview permite dar scroll na pagina */}
                        {items.map(item => (//parametro key, precisa ser string no react native
                          <TouchableOpacity 
                          key={String(item.id)}
                          style={[
                            styles.item,
                            selectedItems.includes(item.id) ? styles.selectedItem : {}
                          ]}
                          onPress={() => handleSelectedItem(item.id)}
                          activeOpacity={0.4}>
                            <SvgUri width={42} height={42} uri={item.image_url}/>
                            <Text style={styles.itemTitle}>{item.title}</Text>
                          </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 32,
      paddingTop: 20 + Constants.statusBarHeight,
    },
  
    title: {
      fontSize: 20,
      fontFamily: 'Ubuntu_700Bold',
      marginTop: 24,
    },
  
    description: {
      color: '#6C6C80',
      fontSize: 16,
      marginTop: 4,
      fontFamily: 'Roboto_400Regular',
    },
  
    mapContainer: {
      flex: 1,
      width: '100%',
      borderRadius: 10,
      overflow: 'hidden',
      marginTop: 16,
    },
  
    map: {
      width: '100%',
      height: '100%',
    },
  
    mapMarker: {
      width: 90,
      height: 80, 
    },
  
    mapMarkerContainer: {
      width: 90,
      height: 70,
      backgroundColor: '#34CB79',
      flexDirection: 'column',
      borderRadius: 8,
      overflow: 'hidden',
      alignItems: 'center'
    },
  
    mapMarkerImage: {
      width: 90,
      height: 45,
      resizeMode: 'cover',
    },
  
    mapMarkerTitle: {
      flex: 1,
      fontFamily: 'Roboto_400Regular',
      color: '#FFF',
      fontSize: 13,
      lineHeight: 23,
    },
  
    itemsContainer: {
      flexDirection: 'row',
      marginTop: 16,
      marginBottom: 32,
    },
  
    item: {
      backgroundColor: '#fff',
      borderWidth: 2,
      borderColor: '#eee',
      height: 120,
      width: 120,
      borderRadius: 8,
      paddingHorizontal: 16,
      paddingTop: 20,
      paddingBottom: 16,
      marginRight: 8,
      alignItems: 'center',
      justifyContent: 'space-between',
  
      textAlign: 'center',
    },
  
    selectedItem: {
      borderColor: '#34CB79',
      borderWidth: 2,
    },
  
    itemTitle: {
      fontFamily: 'Roboto_400Regular',
      textAlign: 'center',
      fontSize: 13,
    },
  });


export default Points