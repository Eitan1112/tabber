import ReactDOM from 'react-dom'
import React from 'react'
import { Provider } from 'react-redux'
import { history } from './routers/AppRouter'
import configureStore from './store/configureStore'
import AppRouter from './routers/AppRouter'
import {firebase} from './firebase/firebase'
import { login, logout } from './actions/auth'
import './styles/styles.scss'
import 'antd/dist/antd.css'

const store = configureStore()

const jsx = (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  )

store.subscribe(() => {
    console.log('New store state:', store.getState())
})

ReactDOM.render(jsx, document.getElementById('root'))

firebase.auth().onAuthStateChanged((user) => {
    if(user) {
        store.dispatch(login(user.uid))
        history.push('/tabwriter')
    } else {
        store.dispatch(logout())
        history.push('/')
    }
})