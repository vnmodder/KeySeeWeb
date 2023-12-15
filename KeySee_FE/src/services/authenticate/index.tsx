import { AxiosResponse } from 'axios'
import { END_POINT } from '../../common/constants/api/endpoint'
import { ILoginRequest } from 'src/features/authenticate/authenticateModels'
import AXIOS from 'src/services/axios/axios'

export const authenticationService = {
  login(payload: ILoginRequest): Promise<AxiosResponse> {
    return AXIOS.post(END_POINT.LOGIN, payload)
  },
  logout(): Promise<AxiosResponse> {
    return AXIOS.post(END_POINT.LOGOUT)
  }
}
