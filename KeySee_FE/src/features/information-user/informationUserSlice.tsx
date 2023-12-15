import { createSlice } from '@reduxjs/toolkit'
import { InformationUser } from './informationUserModels'

const initialState: InformationUser = {
  name: '',
  email: '',
  bushoCode: '',
  roles: [],
}


export const informationUserSlice = createSlice({
    name: 'information-user',
    initialState,
    reducers: {
        setInformationUserState: (state, action) => action.payload
    }
})

export const { setInformationUserState } = informationUserSlice.actions

export default informationUserSlice.reducer