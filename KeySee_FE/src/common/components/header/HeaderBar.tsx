import React, { memo, useState } from 'react'
import { Link } from 'react-router-dom'
import { AppBar, Toolbar, IconButton, Typography, Menu } from '@mui/material'
import { APP_ROUTE } from 'src/common/constants/routes/AppRoute'
import Cookies from 'universal-cookie'
import { COOKIE_NAME } from 'src/common/constants/constants'
import { isNullOrEmpty } from 'src/common/utils/utils'
import LogoutDialog from 'src/pages/authenticate/logout/LogoutDialog'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import './HeaderBar.scss'
import TreeView from '@mui/lab/TreeView'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import TreeItem from '@mui/lab/TreeItem'
import {
  HeaderBarProps,
  TypographyMenuProps,
  OptionsState,
  MenuProps,
  OptionsType
} from 'src/common/models/HeaderBarProps'
import { useNavigate } from 'react-router-dom'
import { MENU } from 'src/common/constants/menu/menu'
import CheckVersionDialog from 'src/pages/common/version/CheckVersion'

const HeaderBar = (props: HeaderBarProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const [options, setOptions] = useState<OptionsState[]>([])

  const open = Boolean(anchorEl)

  const propsMenu = props.menu

  const cookie = new Cookies()

  const isLogin = !isNullOrEmpty(cookie.get(COOKIE_NAME.AUTHENTICATION))

  const navigate = useNavigate()

  const [checkVersion, showCheckVersion] = useState(false)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const setOptionsState = (
    menuChildren: OptionsState[],
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    // Open menu
    handleClick(event)
    // Set menu children data
    setOptions(menuChildren)
  }

  const handleFunction = (prop: any) => {
    prop.onClick()
  }

  const getProp = (id: string) => {
    if (id[0] === 'M') {
      switch (id.length) {
        case 2:
          return props.menu.find((x) => x.id === id)
        case 3:
          return props.menu.find((x) => x.id === id.slice(0, 2))?.children.find((x) => x.id === id)
        case 4:
          return props.menu
            .find((x) => x.id === id.slice(0, 2))
            ?.children.find((x) => x.id === id.slice(0, 3))
            ?.children.find((x) => x.id === id)
      }
    } else {
      return props.menu.find((x) => x.id === 'M2')?.children.find((x) => x.id === id)
    }
  }

  const handleExecuteFunction = (id: string) => {
    let prop = getProp(id)

    if (prop?.onClick) {
      handleFunction(prop)
    }
  }

  const clickMenuNavigateAction = (id: string) => {
    switch (id) {
      // redirect to ファイル管理 screen
      //TODO: fix path
      case MENU.M1[1].id:
        handleExecuteFunction(id)
        return
      // refresh screen
      case MENU.M1[2].id:
        handleExecuteFunction(id)
        return
      // export Invoice requires payment
      case MENU.M1[3][1].id:
        handleExecuteFunction(id)
        return
      // export 振替伝票
      case MENU.M1[3][2].id:
        handleExecuteFunction(id)
        return
      //redirect back to previous screen
      case MENU.M2[1].id:
        handleExecuteFunction(id)
        return
      //redirect to 機能一覧 screen
      case MENU.M2[2].id:
        handleExecuteFunction(id)
        return
      //redirect to 物件台帳 screen
      //TODO: fix path
      case MENU.M2[3].id:
        window.location.href = APP_ROUTE.PageNotFound.path
        return
      default: {
        handleExecuteFunction(id)
      }
    }
  }

  const MenuSeparator = (props: { isEndSection?: boolean }) => {
    const style = {
      borderBottom: props.isEndSection ? '3px solid black' : '1px solid #dfdfdf',
      marginBottom: '0.25rem',
      marginTop: '0.25rem'
    }
    return <div style={style}></div>
  }

  const TypographyMenu = (props: TypographyMenuProps) => {
    const disableClassName = props.disable ? 'TypographyMenuDisabled' : 'TypographyMenuEnabled'
    return (
      <Typography variant="h6" className={`${disableClassName} TypographyMenu`}>
        {props.parent}
      </Typography>
    )
  }

  const TreeViewComponent = () => {
    return (
      <TreeView
        aria-label="file system navigator"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        className="TreeViewComponent"
        sx={{
          height: 'auto',
          flexGrow: 1,
          width: 'min-content',
          minWidth: '13rem',
          overflow: 'scroll{1}',
          maxHeight: '50rem',
          fontSize: '0.9rem'
        }}
      >
        {options.map((option: OptionsState, index: number) => {
          const hasChildren = Array.isArray(option.children) && option.children?.length !== 0
          if (hasChildren) {
            return (
              <div key={index}>
                <TreeItem nodeId={option.id} label={option.name}>
                  {option.children.map((node: OptionsType) => {
                    return (
                      <Link
                        key={node.id}
                        to={'#'}
                        onClick={
                          node.disabled
                            ? (event) => {
                                event.preventDefault()
                              }
                            : () => {
                                clickMenuNavigateAction(node.id)
                              }
                        }
                        style={
                          node.disabled
                            ? { textDecoration: 'none', color: 'gray' }
                            : { textDecoration: 'none', color: 'black' }
                        }
                      >
                        <TreeItem
                          nodeId={node.id}
                          label={node.name}
                          // onClick={
                          //   node.disabled
                          //     ? (event) => {
                          //         event.preventDefault()
                          //       }
                          //     : handleClose
                          // }
                        ></TreeItem>
                      </Link>
                    )
                  })}
                </TreeItem>
                {index !== options.length - 1 && (
                  <MenuSeparator isEndSection={option.isEndSection ?? false} />
                )}
              </div>
            )
          }
          return (
            <Link
              className={option.isEndSection ? 'EndSection' : ''}
              key={index}
              onClick={
                option.disabled
                  ? (event) => {
                      event.preventDefault()
                    }
                  : () => {
                      clickMenuNavigateAction(option.id)
                    }
              }
              to={'#'}
              style={
                option.disabled
                  ? { textDecoration: 'none', color: 'gray' }
                  : { textDecoration: 'none', color: 'black' }
              }
            >
              <TreeItem
                nodeId={option.id}
                label={option.name}
                // onClick={
                //   option.disabled
                //     ? (event) => {
                //         event.preventDefault()
                //       }
                //     : handleClose
                // }
              ></TreeItem>
              {index !== options.length - 1 && (
                <MenuSeparator isEndSection={option.isEndSection ?? false} />
              )}
            </Link>
          )
        })}
      </TreeView>
    )
  }

  const TreeViewComponentMemo = React.memo(TreeViewComponent)

  return (
    <>
      <AppBar
        position="static"
        className="AppBar"
        sx={{
          backgroundColor: props.background,
          color: props.color
        }}
      >
        <Toolbar>
          <div className="Header">
            <div className="Logo">
              <Link to={APP_ROUTE.Home.path}>
                <img
                  className="logo-image"
                  src="/assets/images/KEYSEE_LOGIN_122x40.png"
                  alt="Logo"
                />
              </Link>
            </div>
            <div className="menu-header align-item-center">
              {propsMenu.map((menu: MenuProps) => {
                return (
                  <React.Fragment key={menu.id}>
                    <div className="align-item-center">
                      <TypographyMenu parent={menu.parent} disable={menu.disabled} />
                      <IconButton
                        className="IconButton"
                        disabled={menu.disabled}
                        size="large"
                        onClick={(e) => {
                          setOptionsState(menu.children, e)
                        }}
                      >
                        <ArrowDropDownIcon />
                      </IconButton>
                      <Menu
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'center'
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                      >
                        <TreeViewComponentMemo />
                      </Menu>
                    </div>
                  </React.Fragment>
                )
              })}
            </div>
          </div>
          {isLogin && <LogoutDialog />}
        </Toolbar>
      </AppBar>
      {checkVersion && (
        <CheckVersionDialog
          onConfirm={() => {
            showCheckVersion(false)
          }}
        />
      )}
    </>
  )
}

export default memo(HeaderBar)
