import { APP_ROUTE, SCREENS } from 'src/common/constants/routes/AppRoute'
import { Container, Button, ListItemText, Grid } from '@mui/material'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'
import HeaderBar from 'src/common/components/header/HeaderBar'
import { MenuProps } from 'src/common/models/HeaderBarProps'
import { MENU } from 'src/common/constants/menu/menu'
import './KinoItiran.scss'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectionRowIdState } from 'src/features/data-grid/selectionRowIdSlice'

let menus: any[]

const getMenus = (routesList: any) => {
  const keys = Object.keys(routesList)
  keys.forEach((key) => {
    const title = routesList[key]?.title
    const bgColor = routesList[key]?.backgroundColor
    const url = routesList[key]?.url
    menus.push({ key, title, bgColor, url })
  })
}
const KinoItiran = (): JSX.Element => {
  menus = []
  getMenus(SCREENS)
  const navigateTo = useNavigate()
  const menuProps: MenuProps[] = [
    {
      id: MENU.M1.id,
      parent: MENU.M1.name,
      disabled: false,
      children: [
        {
          id: MENU.M1[1].id,
          name: MENU.M1[1].name,
          path: MENU.M1[1].path,
          disabled: false,
          children: [],
          onClick: () => {
            //TODO: change route when path is ceated
            window.location.href = APP_ROUTE.PageNotFound.path
          }
        }
      ]
    },
    {
      id: MENU.M2.id,
      parent: MENU.M2.name,
      disabled: true,
      children: []
    }
  ]
  const dispatch = useDispatch()
  const seikyuIchiranSelectionRowId = useSelector((state: any) => state['selectionRowId'].seikyuIchiranSelectionRowId);

  useEffect(() => {
    //Set selection row id = 0 for seikyu
    dispatch(setSelectionRowIdState({  seikyuSelectionRowId : 0,
      seikyuIchiranSelectionRowId}))
  },[])
  
  return (
    <>
      <HeaderBar menu={menuProps} background="azure" color="black" />
      <div className="KinoItiranContainer screen-container">
        <div className="screen-title">
          <h2>Functions list</h2>
        </div>
        <div className="container">
          <Container maxWidth="md">
            <Grid container spacing={2}>
              {menus.map((menu: any) => (
                <Grid item xs={6} key={menu.key}>
                  <Button
                    className="KinoItiranButton"
                    key={menu.key}
                    onClick={() => {
                      navigateTo(menu.url)
                    }}
                  >
                    <div className="Square" style={{ backgroundColor: menu.bgColor }}></div>
                    <ListItemText className="KinoItiranListItem" primary={menu.title} />
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Container>
        </div>
      </div>
    </>
  )
}

export default KinoItiran
