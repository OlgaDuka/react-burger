import {applyMiddleware, combineReducers, createStore} from 'redux'
import {thunk} from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
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

const enhanser = composeWithDevTools(applyMiddleware(thunk))

export const store = createStore(rootReducer, enhanser)
