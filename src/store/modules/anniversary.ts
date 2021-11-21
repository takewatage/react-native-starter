import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {RootState, AppDispatch} from "../index";
import Ani from "../../models/ani";
import {loadStorage} from "../../services/StorageService";
import {PayloadAction} from "@reduxjs/toolkit/dist/createAction";
import Pairs from "../../models/pairs";
import FirestoreService from "../../services/FirestoreService";
import {Alert} from "react-native";



export type AnniversaryState = {
    pairs: Pairs,
    pageName: string,
    pageLoading: boolean,
    checkLoading: boolean
}

const initialState: AnniversaryState = {
    pairs: new Pairs({}).getPostable() as Pairs,
    pageName: '',
    pageLoading: false,
    checkLoading: false
}


type response = {pairs: Pairs}
type fetchPairsType = {
   code: string
}
export const fetchAnniversary =
    createAsyncThunk<response, fetchPairsType, {dispatch: AppDispatch, state: RootState}>(
        'pairs/fetchPairs',
        async({code}, thunkApi) => {
            const state = thunkApi.getState()
            console.log('fetchPairs--', code)
            let pairs = await FirestoreService.getPairs(code)

            if(!pairs) {
                Alert.alert("データの取得に失敗しました")
                return {pairs: new Pairs({}).getPostable() as Pairs}
            }

            pairs.anniversaries = await FirestoreService.getAnniversary(code)
            console.log('res--', pairs.getPostable() as Pairs)

            return {pairs: pairs.getPostable() as Pairs}
        }
    )



const slice = createSlice({
    name: 'anniversarySlice',
    initialState,
    reducers: {
        updateAnniversary: (state, {payload}: PayloadAction<Pairs>) => {
            return {...state, pairs: payload}
        },
        updatePageName: (state, {payload}: PayloadAction<string>) => {
            return {...state, pageName: payload}
        },
        updatePageLoading: (state, {payload}: PayloadAction<boolean>) => {
            return {...state, pageLoading: payload}
        },
        updateCheckLoading: (state, {payload}: PayloadAction<boolean>) => {
            return {...state, checkLoading: payload}
        },

        resetAnniversary: (state) => {
            console.log("-reset-")
            return {...state, pageName: ''}
        }

    },
    extraReducers: (builder) => {
        builder.addCase(fetchAnniversary.pending, (state) => {
            state.pageLoading = true
        }),
        builder.addCase(fetchAnniversary.fulfilled, (state, action) => {
            state.pairs = action.payload.pairs
            console.log('fulfilled',state.pairs)
            if(new Pairs(state.pairs).mainAnniversaryData) {
                state.pageName = 'main'
                state.pageLoading = false
                return
            }
            state.pageName = 'init'
            state.pageLoading = false
        }),
        builder.addCase(fetchAnniversary.rejected, (state) => {
            Alert.alert("データベースエラー")
        })
    }
})

export const {
    updateAnniversary, updatePageName, updateCheckLoading, updatePageLoading, resetAnniversary
} = slice.actions

export const AnniversaryReducers = slice.reducer


export default slice