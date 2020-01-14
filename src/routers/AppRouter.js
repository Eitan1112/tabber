import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history';
import Homepage from '../components/Homepage'
import NotFound from '../components/NotFound'
import TabWriter from "../components/TabWriter"
import Login from '../components/Login'
import Register from '../components/Register';
import ResetPassword from '../components/ResetPassword'

export const history = createBrowserHistory()

const AppRouter = (props) => (
    <Router history={history}>
        <Switch>
            <Route path="/" component={Homepage} exact={true} />
            <Route path="/tabwriter" component={TabWriter} exact={true} />
            <Route path="/login" component={Login} exact={true} />
            <Route path="/register" component={Register} exact={true} />
            <Route path="/reset-password" component={ResetPassword} exact={true} />
            <Route component={NotFound} />
        </Switch>
    </Router>
)

export default AppRouter