import { IconButton, Menu, MenuItem, Typography, styled } from '@mui/material'
import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router'
import ConfirmDialog from 'src/common/components/dialog/ConfirmDialog'
import MessageDialog from 'src/common/components/dialog/MessageDialog'
import { COOKIE_NAME, LOCAL_STORAGE_NAME } from 'src/common/constants/constants'
import { APP_ROUTE } from 'src/common/constants/routes/AppRoute'
import { DialogType } from 'src/common/enum/DialogType'
import { removeCookies, removeLocalStorage } from 'src/common/utils/utils'
import { logout } from 'src/features/authenticate/authenticateActions'
import { useAppDispatch } from 'src/hooks/useAppDispatch.d'
import LogoutIcon from '@mui/icons-material/Logout'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import { setInformationUserState } from 'src/features/information-user/informationUserSlice'
import { useSelector } from 'react-redux'
import './LogoutDialog.scss'
import { setAuthenticateState } from 'src/features/authenticate/authenticateSlice'
import { setUserPermissionState } from 'src/features/authenticate/userPermissionSlice'
const LogoutMenuContainer = styled(Menu)({
  marginTop: '1.5rem'
})

const LogoutDialog: React.FC = () => {
  const selectorUserInformation = useSelector((state: any) => state['informationUser'])
  const dispatch = useAppDispatch()
  const navigateTo = useNavigate()
  const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null)
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false)
  const [isLogoutError, setLogoutError] = useState({
    isError: false,
    message: ''
  })

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElement(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorElement(null)
  }

  const onClickLogout = () => {
    handleMenuClose()
    setLogoutDialogOpen(true)
  }

  const handleLogoutConfirm = () => {
    setLogoutDialogOpen(false)
    dispatch(setAuthenticateState(null))
    dispatch(setInformationUserState(null))
    dispatch(setUserPermissionState(null))
    dispatch(logout()).then((res: any) => {
      if (!res?.error) {
        removeCookies(COOKIE_NAME.AUTHENTICATION)
        localStorage.clear()
        navigateTo(APP_ROUTE.Authenticate.Login.path)
      }
    })
  }

  const handleLogoutCancel = () => {
    setLogoutDialogOpen(false)
  }

  const userName = useRef<string>(selectorUserInformation?.name)

  return (
    <React.Fragment>
      <div className="Typography-container">
        <Typography className="Typography-item">
          {selectorUserInformation && `User name：${userName?.current}`}
        </Typography>
        <IconButton
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenuOpen}
          color="inherit"
        >
          <ArrowDropDownIcon />
        </IconButton>
        <LogoutMenuContainer
          id="menu-appbar"
          anchorEl={anchorElement}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          open={Boolean(anchorElement)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={onClickLogout}>
            <LogoutIcon
              sx={{
                marginRight: '1.25rem',
                color: 'darkgrey'
              }}
            />
            Logout
          </MenuItem>
        </LogoutMenuContainer>

        {logoutDialogOpen && (
          <ConfirmDialog
            dialogType={DialogType.Information}
            onCancel={handleLogoutCancel}
            onConfirm={handleLogoutConfirm}
            message="Log out of the KeySee system."
            confirmTitle="Logout"
          ></ConfirmDialog>
        )}
      </div>
      {isLogoutError.isError && (
        <MessageDialog
          title="Logout failed"
          dialogType={DialogType.BusinessError}
          message={isLogoutError.message}
          onClose={() => {
            setLogoutError({ isError: false, message: '' })
          }}
        />
      )}
    </React.Fragment>
  )
}

export default React.memo(LogoutDialog)
