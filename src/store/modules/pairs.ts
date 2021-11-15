import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {RootState, AppDispatch} from "../index";
import Ani from "../../models/ani";
import {loadStorage} from "../../services/StorageService";
import {PayloadAction} from "@reduxjs/toolkit/dist/createAction";
import FirestoreService from "../../services/FirestoreService";



type State = {
    pairCode: string,
    loading: boolean
}

const initialState: State = {
    pairCode: '',
    loading: false
}


const slice = createSlice({
    name: 'pairsSlice',
    initialState,
    reducers: {
        updatePairCode: (state, {payload}: PayloadAction<string>) => {
            console.log(payload)
            return {...state, pairCode: payload}
        },
        reset: (state) => {
            console.log("-reset-")
            return {...state, pairCode: ''}
        }
    },
})

export const {
    updatePairCode, reset
} = slice.actions

export const pairsReducers = slice.reducer


export default slice