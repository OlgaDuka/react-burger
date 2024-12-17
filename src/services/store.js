import {applyMiddleware, combineReducers, compose, createStore} from 'redux'
import {thunk} from 'redux-thunk'
import {constructorReducer} from './reducers/constructor'
import {orderReducer} from './reducers/order'
import {ingredientsReducer} from './reducers/ingredients'
import {userReducer} from './reducers/user'

const rootReducer = combineReducers({
    burgerConstructor: constructorReducer,
    ingredients: ingredientsReducer,
    order: orderReducer,
    user: userReducer
})

const initialState = {}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(thunk)))
