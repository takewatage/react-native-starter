import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {RootState, AppDispatch} from "../index";
import Ani from "../../models/ani";
import {loadStorage} from "../../services/StorageService";
import {PayloadAction} from "@reduxjs/toolkit/dist/createAction";


export interface IMainDate {
    title?: string
    date?: string
}



type State = {
    mainDate: Ani
    isLoading?: boolean
}

const initialState: State = {
    mainDate: new Ani({}),
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
            state.mainDate = new Ani(payload)
        },
    },
})

export const {
    updateMain
} = slice.actions

export const mainDateReducers = slice.reducer


export default slice