import React from 'react'
import { Route, BrowserRouter } from 'react-router-dom'//'npm install react-router-dom', 
                                                        //se usar typescript precisa instalar: 'npm install @types/react-router-dom -D

import Home from './pages/Home'
import CreatePoint from './pages/CreatePoint'

const Routes = () => {
    return(
        <BrowserRouter>

            <Route component={Home} path="/" exact/>
            <Route component={CreatePoint} path="/create-point" />

        </BrowserRouter>
    )
}

export default Routes
