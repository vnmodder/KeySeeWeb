import { createSlice } from '@reduxjs/toolkit'
import { ISelectionRowId } from './selectionRowIdModel'

const initialState: ISelectionRowId = {
  seikyuSelectionRowId : 0,
  seikyuIchiranSelectionRowId : 0
}

export const selectionRowIdSlice = createSlice({
  name: 'selection-row-id',
  initialState,
  reducers: {
    setSelectionRowIdState: (state, action) => action.payload
  }
})

export const { setSelectionRowIdState } = selectionRowIdSlice.actions

export default selectionRowIdSlice.reducer
