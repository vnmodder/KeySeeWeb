import { createAsyncThunk } from '@reduxjs/toolkit'
import { HTTP_CODES } from 'src/common/constants/constants'
import AXIOS from 'src/services/axios/axios'

// Health Check
export const healthCheck = createAsyncThunk('healthCheck', async (_param, { rejectWithValue }) => {
  try {
    const response = await AXIOS.get('/api/healthCheck')

    if (response.status === HTTP_CODES.OK) {
      return response.data
    }
    return 'GET BACK-END INFORMATION FAILED!'
  } catch (err: any) {
    return rejectWithValue(err.data)
  }
})
