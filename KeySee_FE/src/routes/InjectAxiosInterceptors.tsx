import React, { useEffect, useState } from 'react'
import { checkResponseAxios } from 'src/services/axios/axios'
import { COOKIE_NAME, HTTP_CODES, LOCAL_STORAGE_NAME } from 'src/common/constants/constants'
import { ERROR_MESSAGE } from 'src/common/constants/messages/errorMessage'
import MessageDialog from 'src/common/components/dialog/MessageDialog'
import { DialogType } from 'src/common/enum/DialogType'
import { useNavigate } from 'react-router'
import { APP_ROUTE } from 'src/common/constants/routes/AppRoute'
import Cookies from 'universal-cookie'
import { getLocalStorage, isNullOrEmpty } from 'src/common/utils/utils'
import CryptoJS from 'crypto-js'

interface InterceptorProps {
  showMessageDialog: Boolean
  statusCode: Number | any
  title: String | any
  messages: String | any
  confirmTitleText: String | any
}

const InjectAxiosInterceptors = (): JSX.Element => {
  const [dialogProps, setDialogProps] = useState<InterceptorProps>({
    showMessageDialog: false,
    statusCode: null,
    messages: '',
    confirmTitleText: '',
    title: ''
  })

  // Dialog type to display when error occurs.
  let dialogType = DialogType.BusinessError

  const navigate = useNavigate()

  const getInfoMemorized = () => {
    const infoEncode = getLocalStorage(LOCAL_STORAGE_NAME.MEMORIZED)
    const SECRET_KEY: string =
      process.env.REACT_APP_SECRET_KEY || ('KEYSEE_TOKEN_SECRET_KEY' as string)
    if (typeof infoEncode === 'string') {
      const bytes = CryptoJS.AES.decrypt(infoEncode, SECRET_KEY)
      const originalObj = bytes.toString(CryptoJS.enc.Utf8)
      return originalObj ? JSON.parse(originalObj) : null
    }
    return null
  }

  useEffect(() => {
    const cookies = new Cookies()
    const token = cookies.get(COOKIE_NAME.AUTHENTICATION)
    function showErrorDialog(statusCode: any) {
      let title = 'KEYSEE'
      let message = ''
      let confirmTitle = ''
      switch (statusCode) {
        case HTTP_CODES.FORBIDDEN:
          message = ERROR_MESSAGE.FORBIDDEN_ERROR
          dialogType = DialogType.BusinessError
          break
        case HTTP_CODES.INTERNAL_SERVER_ERROR:
          message = ERROR_MESSAGE.EM0006
          dialogType = DialogType.UnhandledError
          break
        case HTTP_CODES.NETWORK_ERROR:
          message = ERROR_MESSAGE.NETWORK_ERROR
          dialogType = DialogType.OtherError
          break
        case HTTP_CODES.UNAUTHORIZED:
          message = ERROR_MESSAGE.LOGIN_SESSION_EXPIRED
          title = 'Session expired'
          message = 'Your session has expired, please log in again.'
          confirmTitle = 'OK'
          dialogType = DialogType.BusinessError
          break
        case HTTP_CODES.NOT_FOUND:
          message = ERROR_MESSAGE.NOT_FOUND
          dialogType = DialogType.BusinessError
          break
      }

      const isRememberLoginInformation =
        getInfoMemorized()?.rememberMe || getLocalStorage(LOCAL_STORAGE_NAME.REMEMBER_ME) === 'true'

      if (isRememberLoginInformation && statusCode === HTTP_CODES.UNAUTHORIZED) {
        navigate(APP_ROUTE.Authenticate.Login.path)
      } else {
        if (statusCode === HTTP_CODES.UNAUTHORIZED && !isRememberLoginInformation) {
          localStorage.clear()
        }
        setDialogProps({
          showMessageDialog: true,
          statusCode: statusCode,
          title: title,
          messages: message,
          confirmTitleText: confirmTitle
        })
      }
    }
    if (!token && isNullOrEmpty(getInfoMemorized()?.rememberMe)) {
      // Case user entry web first time
      navigate(APP_ROUTE.Authenticate.Login.path)
      return
    } else if (!token && window.location.pathname === APP_ROUTE.Authenticate.Login.path)
      // Do nothing.
      return

    checkResponseAxios(showErrorDialog)
  }, [navigate, dialogProps])

  const resetDialogProps = () => {
    setDialogProps({
      showMessageDialog: false,
      statusCode: null,
      title: '',
      messages: '',
      confirmTitleText: ''
    })
  }
  const backToLoginPage = () => {
    resetDialogProps()
    navigate(APP_ROUTE.Authenticate.Login.path)
  }

  return (
    dialogProps.showMessageDialog && (
      <MessageDialog
        open={dialogProps.showMessageDialog}
        dialogType={dialogType}
        title={dialogProps.title}
        message={dialogProps.messages}
        confirmTitle={dialogProps.confirmTitleText}
        onClose={() => {
          dialogProps.statusCode === HTTP_CODES.UNAUTHORIZED
            ? backToLoginPage()
            : resetDialogProps()
        }}
      />
    )
  )
}

export default InjectAxiosInterceptors
