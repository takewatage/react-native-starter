import {configureStore, combineReducers} from '@reduxjs/toolkit'
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'

import token from './modules/token'
import {AnniversaryReducers} from './modules/anniversary'
import {AsyncStorage} from "react-native";
import {pairsReducers} from "./modules/pairs";

// const rootReducer = combineReducers({
//     token: token.reducer,
//     mainDate: mainDateReducers
// })

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['pairCode'] // Stateは`pairCode`のみStorageに保存する
}

const persistedReducer = persistReducer(
    persistConfig,
    combineReducers({
        anniversary: AnniversaryReducers,
        pairCode: pairsReducers,
    })
)



const store = configureStore({
    reducer: persistedReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({
		serializableCheck: {
		    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
	})
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store