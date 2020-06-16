/*
expo permite acesso à recursos como câmera, microfone, player de música, entre outros,
de forma muito simples, além disso não é preciso instalar sdk do android ou ios
porque o Expo possui um aplicativo móvel instalável pelas lojas do Android/iOS
que contém todo código nativo necessário pelo React Native para iniciar sua aplicação e,
dessa forma, a única alteração em código que você faz é em Javascript.

instalar o expo:

npm install -g expo-cli

expo init [nome do projeto]

cd [nome do projeto]
npm start

a execução do app no proprio celular é por meio do qrcode desde que o celular esteja na mesma rede do computador e tenha o app expo instalado
*/

import React from 'react';
import { AppLoading } from 'expo'
import { StatusBar,Text, View } from 'react-native';//statusbar: barra de status do celular
import { Roboto_400Regular, Roboto_500Medium } from '@expo-google-fonts/roboto'
import { Ubuntu_700Bold, useFonts } from '@expo-google-fonts/ubuntu'

import Routes from './src/routes'

export default function App() {

  const [fontLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Ubuntu_700Bold
  })

  if (!fontLoaded) {
    return <AppLoading/>//enquanto as fontes nao carregam, aparece uma tela de carregamento
  }

  return (
    <>{/*fragmento */}
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent/>{/*//não é possivel retornar 2 componentes juntos,
                                                                    // eles devem estar encapsulados dentro de um só componente */}
      <Routes/>
    </>
  );
}

