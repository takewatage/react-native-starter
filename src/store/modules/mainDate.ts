import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {RootState, AppDispatch} from "../index";
import Ani from "../../models/ani";
import {loadStorage} from "../../services/StorageService";
import {PayloadAction} from "@reduxjs/toolkit/dist/createAction";


export interface IMainDate {
    id?: string
    title?: string
    date?: string
}



type State = {
    mainDate: IMainDate
    isLoading?: boolean
}

const initialState: State = {
    mainDate: {},
    isLoading: false
}

// type response = {mainDate: IMainDate}



const slice = createSlice({
    name: 'mainSlice',
    initialState,
    reducers: {
        updateMain: (state, {payload}: PayloadAction<object>) => {
            console.log("-detailSlice-")
            console.log(payload)
            return {...state, mainDate: payload}
        },
        reset: (state) => {
            console.log("-reset-")
            return {...state, mainDate: {}}
        }
    },
})

export const {
    updateMain, reset
} = slice.actions

export const mainDateReducers = slice.reducer


export default slice