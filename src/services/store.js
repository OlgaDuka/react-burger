import {applyMiddleware, combineReducers, compose, createStore} from 'redux'
import {thunk} from 'redux-thunk'
import {constructorReducer} from './reducers/constructor'
import {orderReducer} from './reducers/order'
import {ingredientsReducer} from './reducers/ingredients'
import {detailsReducer} from './reducers/details'

const rootReducer = combineReducers({
    burgerConstructor: constructorReducer,
    details: detailsReducer,
    ingredients: ingredientsReducer,
    order: orderReducer
})

const initialState = {}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(thunk)))
