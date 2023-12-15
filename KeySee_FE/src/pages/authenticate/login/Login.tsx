import { Button, Checkbox, Container, FormControlLabel, TextField } from '@mui/material'
import { unwrapResult } from '@reduxjs/toolkit'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { shallowEqual, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import MessageDialog from 'src/common/components/dialog/MessageDialog'
import { DialogType } from 'src/common/enum/DialogType'
import { HTTP_CODES, MESSAGE_ERROR_CODE } from 'src/common/constants/constants'
import { COOKIE_NAME, LOCAL_STORAGE_NAME } from 'src/common/constants/constants'
import { APP_ROUTE } from 'src/common/constants/routes/AppRoute'
import { login } from 'src/features/authenticate/authenticateActions'
import { ILoginRequest } from 'src/features/authenticate/authenticateModels'
import { RootState } from 'src/redux/store'
import { useAppDispatch } from 'src/hooks/useAppDispatch.d'
import isEmpty from 'validator/lib/isEmpty'
import './Login.scss'
import CryptoJS from 'crypto-js'
import { setInformationUserState } from 'src/features/information-user/informationUserSlice'
import {
  getCookies,
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage
} from 'src/common/utils/utils'
import { VALIDATION_MESSAGE } from 'src/common/constants/messages/validationMessage'
import { setUserPermissionState } from 'src/features/authenticate/userPermissionSlice'
import { ERROR_MESSAGE } from 'src/common/constants/messages/errorMessage'

const SECRET_KEY: string = process.env.REACT_APP_SECRET_KEY || ('KEYSEE_TOKEN_SECRET_KEY' as string)
const Login = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const { isLoading } = useSelector(
    ({ authentication }: RootState) => ({
      isLoading: authentication.isLoading
    }),
    shallowEqual
  )
  const getInfoMemorized = () => {
    const infoEncode = getLocalStorage(LOCAL_STORAGE_NAME.MEMORIZED)
    if (typeof infoEncode === 'string') {
      const bytes = CryptoJS.AES.decrypt(infoEncode, SECRET_KEY)
      const originalObj = bytes.toString(CryptoJS.enc.Utf8)
      return originalObj ? JSON.parse(originalObj) : null
    }
    return null
  }
  const objInfo = getInfoMemorized()
  const navigateTo = useNavigate()
  const [loginId, setLoginId] = useState(objInfo?.loginId ?? '')
  const [password, setPassword] = useState(objInfo?.password ?? '')
  const [rememberMe, setRememberMe] = useState(
    objInfo?.rememberMe ?? getLocalStorage(LOCAL_STORAGE_NAME.REMEMBER_ME) === 'true'
  )
  const [isError, setError] = useState<boolean>(false)
  const [errorMessage, setErrMsg] = useState<string>('')
  const loginIdMemorized = rememberMe && objInfo ? objInfo?.loginId : ''

  const {
    formState: { errors },
    clearErrors
  } = useForm<ILoginRequest>({
    reValidateMode: 'onSubmit',
    defaultValues: {
      loginId: loginIdMemorized,
      password: '',
      rememberMe
    }
  })

  useEffect(() => {
    if (objInfo) {
      setLoginId(objInfo.loginId)
      setPassword(objInfo.password)
      setRememberMe(objInfo.rememberMe)
      onSubmitLogin(null)
    }
    const isLogin: boolean = getCookies(COOKIE_NAME.AUTHENTICATION) ? true : false
    if (isLogin) {
      navigateTo(APP_ROUTE.Home.path)
    }
  }, [])

  const onSubmitLogin = (event: any | null) => {
    event?.preventDefault()
    const data = {
      loginId: loginId,
      password: password,
      rememberMe: rememberMe
    } as ILoginRequest

    dispatch(login(data)).then((response: any) => {
      const messageCodeReponse = response?.payload?.code
      const instance = response?.payload?.response?.data?.instance
      // Case error network
      if (messageCodeReponse === MESSAGE_ERROR_CODE.ERR_NETWORK) {
        setError(true)
        setErrMsg(ERROR_MESSAGE.NETWORK_ERROR)
        return
        // Case bad request => id or password wrong
      }
      if (messageCodeReponse === MESSAGE_ERROR_CODE.ERR_BAD_REQUEST && instance === 'VM0065') {
        setError(true)
        setErrMsg(VALIDATION_MESSAGE.VM0065)
        return
        // Case login succeed
      }
      if (!response.error) {
        const { name, email, bushoCode, roles, userPermissions } = response.payload.result
        const infoMemorized = CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString()
        const pathRedirectLoginByRememberMe = getLocalStorage(LOCAL_STORAGE_NAME.PATH_ROUTER_LOGIN)
        // Is rememberMe, set MEMORIZED value
        if (rememberMe) {
          setLocalStorage(LOCAL_STORAGE_NAME.MEMORIZED, infoMemorized)
        }
        // Is login by rememberMe, navigate to previous page
        if (pathRedirectLoginByRememberMe) {
          window.location.href = pathRedirectLoginByRememberMe
          removeLocalStorage(LOCAL_STORAGE_NAME.PATH_ROUTER_LOGIN)
        }
        setLocalStorage(LOCAL_STORAGE_NAME.REMEMBER_ME, rememberMe)
        dispatch(setUserPermissionState({ userPermissions: userPermissions }))
        dispatch(setInformationUserState({ name, email, bushoCode, roles }))
        navigateTo(APP_ROUTE.Home.path)
      }
    })
  }

  const closeMsgDialog = () => {
    clearErrors()
    setError(false)
    setErrMsg('')
  }

  const onChangeLoginId = (e: { target: { value: React.SetStateAction<string> } }) => {
    setLoginId(e.target.value)
  }

  const onChangePassword = (e: { target: { value: React.SetStateAction<string> } }) => {
    setPassword(e.target.value)
  }
  const onChangeRememberMe = (e: {
    target: { checked: boolean | ((prevState: boolean) => boolean) }
  }) => {
    setRememberMe(e.target.checked)
  }
  const disabledButton = isEmpty(loginId) || isEmpty(password)

  return (
    <div className="Login-form-container">
      <Container maxWidth="xs">
        <img className="Login-form-image" src="/assets/images/KEYSEE_LOGIN.png" alt="KEYSEE LOGIN" />
        <p className="Login-form-title">Management System</p>
        <form onSubmit={onSubmitLogin}>
          <div className="Login-form-input">
            <TextField
              type="text"
              value={loginId}
              className="Text-field"
              label="User name"
              variant="outlined"
              placeholder="User name"
              onChange={onChangeLoginId}
            />
            <TextField
              type="password"
              value={password}
              className="Text-field"
              label="Password"
              variant="outlined"
              placeholder="********"
              onChange={onChangePassword}
            />
            <FormControlLabel
              control={
                <Checkbox checked={rememberMe} onChange={onChangeRememberMe} color="primary" />
              }
              label="Remember Use name and password"
            />
            <Button
              className="Login-form-button-submit"
              variant="contained"
              color="primary"
              disabled={isLoading || disabledButton}
              type="submit"
            >
              Login
            </Button>
          </div>
        </form>
        {isError && (
          <MessageDialog
            dialogType={DialogType.BusinessError}
            title="KEYSEE"
            message={errorMessage}
            onClose={closeMsgDialog}
          />
        )}
      </Container>
    </div>
  )
}

export default Login
