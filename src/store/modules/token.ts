import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
    name: 'token',
    initialState: '',
    reducers: {
        update: (state, action) => {
            const { token } = action.payload
            return token
        },
    }
})

export const { update } = slice.actions
export default slice
