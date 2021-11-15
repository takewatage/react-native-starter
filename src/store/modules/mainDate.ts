import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {RootState, AppDispatch} from "../index";
import Ani from "../../models/ani";
import {loadStorage} from "../../services/StorageService";
import {PayloadAction} from "@reduxjs/toolkit/dist/createAction";


export interface IMainDate {
    id?: string
    title?: string
    date?: string
    userName1?: string
    userName2?: string
}



type State = {
    myAnniversary: IMainDate
}

const initialState: State = {
    myAnniversary: {},
}

// type response = {mainDate: IMainDate}



const slice = createSlice({
    name: 'mainSlice',
    initialState,
    reducers: {
        updateMain: (state, {payload}: PayloadAction<object>) => {
            console.log("-detailSlice-")
            console.log(payload)
            return {...state, myAnniversary: payload}
        },
        reset: (state) => {
            console.log("-reset-")
            return {...state, myAnniversary: {}}
        }
    },
})

export const {
    updateMain, reset
} = slice.actions

export const mainDateReducers = slice.reducer


export default slice