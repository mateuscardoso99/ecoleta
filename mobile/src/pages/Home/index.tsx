import React, { useState, useEffect } from 'react'
import { View, ImageBackground, Image, Text, Picker, Alert, StyleSheet, TextInput, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { Feather as Icon} from '@expo/vector-icons' //import dos icones, 'as' serve como um apelido
import { useNavigation} from '@react-navigation/native'

import axios from 'axios'

const Home = () => {

    const navegacao = useNavigation()

    const [loading, setLoading] = useState(false)

    const [uf, setUf] = useState('RS')
    const [cities, setCities] = useState([])
    const [selectedCity, setSelectedCity] = useState('0')

    useEffect(()=>{
        async function getCitiesFromState(){
          setLoading(true)
          const response = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`)
          const cityNames = response.data.map(city => city.nome)
          setCities(cityNames)
          setLoading(false)
        }
        getCitiesFromState()
    },[uf])

    function irParaPoints(){
        if(selectedCity === "0"){
          return Alert.alert('Selecione uma cidade')
        }
        navegacao.navigate('Points', {
          uf,
          selectedCity
        })//passando parametros para a tela Points
    }


    if(loading){
        return(
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <ActivityIndicator size="large" color="#8257E5"/>
            </View>
        )
    }

    return(
      <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ImageBackground source={require('../../assets/home-background.png')} style={styles.container} imageStyle={{ width: 274, height: 368 }}>
            <View style={styles.main}>
                <Image source={require('../../assets/logo.png')}/>
                <Text style={styles.title}>Seu marketplace de coleta de resíduos</Text>
                <Text style={styles.description}>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</Text>
            </View>

            <View style={styles.footer}>
                <Picker
                  selectedValue={uf}
                  onValueChange={value=>setUf(value)}
                  style={styles.input}
                >
                  <Picker.Item label="Acre" value="AC"/>
                  <Picker.Item label="Alagoas" value="AL"/>
                  <Picker.Item label="Amapá" value="AP"/>
                  <Picker.Item label="Amazonas" value="AM"/>
                  <Picker.Item label="Bahia" value="BA"/>
                  <Picker.Item label="Ceará" value="CE"/>
                  <Picker.Item label="Distrito Federal" value="DF"/>
                  <Picker.Item label="Espírito Santo" value="ES"/>
                  <Picker.Item label="Goiás" value="GO"/>
                  <Picker.Item label="Maranhão" value="MA"/>
                  <Picker.Item label="Mato Grosso" value="MT"/>
                  <Picker.Item label="Mato Grosso do Sul" value="MS"/>
                  <Picker.Item label="Minas Gerais" value="MG"/>
                  <Picker.Item label="Pará" value="PA"/>
                  <Picker.Item label="Paraíba" value="PB"/>
                  <Picker.Item label="Paraná" value="PR"/>
                  <Picker.Item label="Pernambuco" value="PE"/>
                  <Picker.Item label="Piauí" value="PI"/>
                  <Picker.Item label="Rio de Janeiro" value="RJ"/>
                  <Picker.Item label="Rio Grande do Norte" value="RN"/>
                  <Picker.Item label="Rio Grande do Sul" value="RS"/>
                  <Picker.Item label="Rondônia" value="RO"/>
                  <Picker.Item label="Roraima" value="RR"/>
                  <Picker.Item label="Santa Catarina" value="SC"/>
                  <Picker.Item label="São Paulo" value="SP"/>
                  <Picker.Item label="Sergipe" value="SE"/>
                  <Picker.Item label="Tocantins" value="TO"/>
                </Picker>

                <Picker
                  selectedValue={selectedCity}
                  onValueChange={value=>setSelectedCity(value)}
                  style={styles.input}
                >
                  <Picker.Item label="Selecione" value="0"/>
                  {cities.map(city => (
                    <Picker.Item key={city} label={city} value={city}/>
                  ))}
                </Picker>

               {/* maxLength={2} autoCapitalize="characters" autoCorrect={false} autoCorrect desabilita a correção do teclado */}

                <RectButton style={styles.button} onPress={irParaPoints}>{/*onPress, é igual ao onClick */}
                    <View style={styles.buttonIcon}>
                        <Text>
                            <Icon name="arrow-right" color="#fff" size={24}></Icon>
                        </Text>
                    </View>
                    <Text style={styles.buttonText}>Entrar</Text>
                </RectButton>
            </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    )
}

//expo install expo-font @expo-google-fonts/roboto, instalar fontes
//npm install @react-navigation/native, biblioteca de rotas e outros recursos

//expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view
//libs para gestos do usuario, animações, telas entre outras.

//npm install @react-navigation/stack, navegação em piha: permite que ao trocar de tela a tela anterior continue 'existindo'


//npm install react-native-picker-select, lib para combobox (tag <select></select>)

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 32,
    },
  
    main: {
      flex: 1,
      justifyContent: 'center',
    },
  
    title: {
      color: '#322153',
      fontSize: 32,
      fontFamily: 'Ubuntu_700Bold',
      maxWidth: 260,
      marginTop: 64,
    },
  
    description: {
      color: '#6C6C80',
      fontSize: 16,
      marginTop: 16,
      fontFamily: 'Roboto_400Regular',
      maxWidth: 260,
      lineHeight: 24,
    },
  
    footer: {
      marginTop: 15
    },
  
    select: {},
  
    input: {
      height: 60,
      backgroundColor: '#FFF',
      borderRadius: 10,
      marginBottom: 8,
      paddingHorizontal: 24,
      fontSize: 16,
    },
  
    button: {
      backgroundColor: '#34CB79',
      height: 60,
      flexDirection: 'row',
      borderRadius: 10,
      overflow: 'hidden',
      alignItems: 'center',
      marginTop: 8,
    },
  
    buttonIcon: {
      height: 60,
      width: 60,
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      justifyContent: 'center',
      alignItems: 'center'
    },
  
    buttonText: {
      flex: 1,
      justifyContent: 'center',
      textAlign: 'center',
      color: '#FFF',
      fontFamily: 'Roboto_500Medium',
      fontSize: 16,
    }
  });

export default Home