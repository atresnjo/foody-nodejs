import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Orders from './pages/Orders'
import { RecoilRoot } from 'recoil'
import { GraphQLClient, ClientContext } from 'graphql-hooks'
import axios from 'axios'
import { buildAxiosFetch } from '@lifeomic/axios-fetch'
import { getAccessToken } from './misc/utils'
import Register from './pages/Signup'

const gqlAxios = axios.create()

gqlAxios.interceptors.request.use((request) => {
    var token = getAccessToken()
    console.log(`intercept ${token}`)
    var tokenHeader = request.headers['Authorization']
    if (token !== null && tokenHeader != undefined)
        request.headers['Authorization'] = `Bearer ${token}`
    return request
})

const client = new GraphQLClient({
    url: 'http://localhost:8080/graphql',
    fetch: buildAxiosFetch(gqlAxios),
})

export default function App() {
    return (
        <RecoilRoot>
            <ClientContext.Provider value={client}>
                <Router>
                    <Switch>
                        <Route path="/home">
                            <Home />
                        </Route>
                        <Route path="/signup">
                            <Register />
                        </Route>
                        <Route path="/login">
                            <Login />
                        </Route>
                        <Route path="/orders">
                            <Orders />
                        </Route>
                        <Route path="/">
                            <Home />
                        </Route>
                    </Switch>
                </Router>
            </ClientContext.Provider>
        </RecoilRoot>
    )
}
