//'npx create-react-app [nome_projeto] --template=typescript', criou a estrutura do react em typescript

import React from 'react';
import './App.css';

import Routes from './routes'

function App() {

  /*const [cont, setCont] = useState(0)//useState(): 'import React, {useState} from 'react';' retorna um array com o valor do estado na posicao 0,
                                    // e uma funcao pra atualizar o valor do estado na posicao 1

  function buttonclick(){
      setCont(cont + 1)
  }*/

  return (
     /*<div>
       <Header titulo="teste"/>passando parametros pro componente Header.tsx
              <EXEMPLO DE COMPONENTE:>
              interface HeaderProps {
                  titulo: string;//parametro obrigatorio, titulo?: parametro opcional
              }

              const Header: React.FC<HeaderProps> = (props) => {

              return(
                <header>
                    <h1>{props.titulo}</h1>
                </header>
              )

       <h1>{cont}</h1>
       <button type="button" onClick={buttonclick}>Aumentar</button>
     </div>*/

    <Routes/>
  );
}

export default App;
