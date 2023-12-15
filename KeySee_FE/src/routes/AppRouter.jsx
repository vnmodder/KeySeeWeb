import { Container } from '@mui/material'
import React from 'react'
import { Routes } from 'react-router'
import { Route } from 'react-router-dom'
import { PUBLIC_PAGES } from 'src/common/constants/constants'
import { getCurrentUserBushoCode, getCurrentUserRoles } from 'src/common/utils/utils'
import { APP_ROUTE } from 'src/common/constants/routes/AppRoute'
import PageNotFound from 'src/pages/errorPages/PageNotFound'
import Login from 'src/pages/authenticate/login/Login'

function Wrapper({ children }) {
  return <Container maxWidth={false}>{children}</Container>
}

let webPages = []

const getRoutePages = (routesList, routeRoot) => {
  const keys = Object.keys(routesList)

  keys.forEach((key) => {
    if (routesList[key]?.path !== undefined) {
      const path = routesList[key]?.path
      if (path !== APP_ROUTE.Authenticate.Login.path) {
        const component = routesList[key]?.component
        const bushoCodes = routesList[key]?.bushoCodes ?? []
        const roles = routesList[key]?.roles
        const isPublic = !!PUBLIC_PAGES.find((e) => e === path)
        webPages.push({ path, component, isPublic, bushoCodes, roles })
      }
    } else {
      getRoutePages(routesList[key], routeRoot ? `${routeRoot}/${key}` : key)
    }
  })
}

function AppRouter() {
  webPages = []
  getRoutePages(APP_ROUTE, null)
  const userRoles = getCurrentUserRoles()
  webPages = webPages
    .filter(
      (page) =>
        page.roles.length === 0 ||
        page.roles.filter((role) => userRoles.includes(role) || page.isPublic)
    )
    .filter(
      (page) =>
        page.isPublic ||
        page.bushoCodes.length === 0 ||
        page.bushoCodes.includes(getCurrentUserBushoCode())
    )
  return (
    <div>
      <Wrapper>
        <Routes>
          <Route
            id={APP_ROUTE.Authenticate.Login.path}
            path={APP_ROUTE.Authenticate.Login.path}
            Component={Login}
          />
          {webPages.map((route) => (
            <Route key={route.path} path={route.path} Component={route.component} />
          ))}
          <Route path="*" Component={PageNotFound} />
        </Routes>
      </Wrapper>
    </div>
  )
}

export default React.memo(AppRouter)
