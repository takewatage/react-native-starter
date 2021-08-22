import {configureStore, combineReducers, getDefaultMiddleware} from '@reduxjs/toolkit'

import token from './modules/token'

const rootReducer = combineReducers({
    token: token.reducer,
})


const store = configureStore({
    reducer: rootReducer,
	// middleware: getDefaultMiddleware({
	// 	serializableCheck: false
	// })
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store