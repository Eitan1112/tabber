import { createStore, applyMiddleware } from 'redux';
import rowsReducer from '../reducers/rows'
import coordsReducer from '../reducers/coords'
import pastReducer from '../reducers/past'
import futureReducer from '../reducers/future'
import playerReducer from '../reducers/player'
import settingsReducer from '../reducers/settings'
import playerMiddleware from '../middleware/player'
import messagesMiddleware from '../middleware/messages'
import dictionaryReducer from '../reducers/dictionary'
import authReducer from '../reducers/auth'
import thunk from 'redux-thunk'

const combineReducers = (reducers) => {
    const keys = Object.keys(reducers)
    return ((state = {}, action) => {
        const nextState = {}
        for (let key of keys) {
            const reducer = reducers[key]
            nextState[key] = reducer(state[key], action, state)
        }
        return nextState
    }
)}

const configureStore = () => {
    return createStore(combineReducers({
        rows: rowsReducer,
        coords: coordsReducer,
        past: pastReducer,
        future: futureReducer,
        player: playerReducer,
        settings: settingsReducer,
        dictionary: dictionaryReducer,
        auth: authReducer
    }), applyMiddleware(playerMiddleware, messagesMiddleware, thunk))
}

export default configureStore