import React, { useEffect, useState } from 'react'
import { View, StyleSheet, TouchableOpacity, Image, Text, SafeAreaView, Linking } from 'react-native'
import { Feather as Icon, FontAwesome } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import { RectButton } from 'react-native-gesture-handler'
import api from '../../services/api'
import * as MailComposer from 'expo-mail-composer'

//expo install expo-mail-composer, para abrir o gmail, enviar emails etc..


interface Parametros{
  ponto_id: number
}

interface Dados {
  point:{
    image: string
    image_url: string
    name: string
    email: string
    whatsapp: string
    city: string
    uf: string
  }
  items:{
    title: string
  }[]
}

const Detail = () => {
    const [dados, setDados] = useState<Dados>({} as Dados)
    const navegacao = useNavigation()
    const route = useRoute()
    const parametrosDaRota = route.params as Parametros//dizendo que a variavel sera do tipo Parametros

    useEffect(() => {
      api.get(`/points/${parametrosDaRota.ponto_id}`).then(resposta => {
        setDados(resposta.data)
      })
    },[])

    function voltarTelaAnterior(){
        navegacao.goBack()
    }

    if(!dados.point){
      return null
    }

    function abrirWhatsApp(){
      Linking.openURL(`whatsapp://send?phone=${dados.point.whatsapp}&text=Tenho interesse na coleta de resíduos`)
      //abrindo whatsapp, e mandando uma mensagem padrão para o destinatario
    }

    function enviaEmail(){
      MailComposer.composeAsync({
        subject: 'Interesse na coleta de resíduos',
        recipients: [dados.point.email],
      })
    }


    return(
        <SafeAreaView style={{flex: 1}}>
            <View style={styles.container}>
                <TouchableOpacity onPress={voltarTelaAnterior}>
                    <Icon name="arrow-left" size={20} color="#34cb79"/>
                </TouchableOpacity>

                <Image style={styles.pointImage} source={{ uri: dados.point.image_url}}/>
                <Text style={styles.pointName}>{dados.point.name}</Text>
                <Text style={styles.pointItems}>{dados.items.map(item => item.title).join(', ')}</Text>{/*join() une os items e os separa por virgula */}

                <View style={styles.address}>
                    <Text style={styles.addressTitle}>{dados.point.uf}</Text>
                    <Text style={styles.addressContent}>{dados.point.city}</Text>
                </View>
            </View>

            <View style={styles.footer}>
                <RectButton style={styles.button} onPress={abrirWhatsApp}>
                    <FontAwesome name="whatsapp" size={20} color="#fff"/>
                    <Text style={styles.buttonText}>WhatsApp</Text>
                </RectButton>

                <RectButton style={styles.button} onPress={enviaEmail}>
                    <Icon name="mail" size={20} color="#fff"/>
                    <Text style={styles.buttonText}>E-mail</Text>
                </RectButton>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 32,
      paddingTop: 20,
    },
  
    pointImage: {
      width: '100%',
      height: 120,
      resizeMode: 'cover',
      borderRadius: 10,
      marginTop: 32,
    },
  
    pointName: {
      color: '#322153',
      fontSize: 28,
      fontFamily: 'Ubuntu_700Bold',
      marginTop: 24,
    },
  
    pointItems: {
      fontFamily: 'Roboto_400Regular',
      fontSize: 16,
      lineHeight: 24,
      marginTop: 8,
      color: '#6C6C80'
    },
  
    address: {
      marginTop: 32,
    },
    
    addressTitle: {
      color: '#322153',
      fontFamily: 'Roboto_500Medium',
      fontSize: 16,
    },
  
    addressContent: {
      fontFamily: 'Roboto_400Regular',
      lineHeight: 24,
      marginTop: 8,
      color: '#6C6C80'
    },
  
    footer: {
      borderTopWidth: StyleSheet.hairlineWidth,
      borderColor: '#999',
      paddingVertical: 20,
      paddingHorizontal: 32,
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    
    button: {
      width: '48%',
      backgroundColor: '#34CB79',
      borderRadius: 10,
      height: 50,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
  
    buttonText: {
      marginLeft: 8,
      color: '#FFF',
      fontSize: 16,
      fontFamily: 'Roboto_500Medium',
    },
  });

export default Detail