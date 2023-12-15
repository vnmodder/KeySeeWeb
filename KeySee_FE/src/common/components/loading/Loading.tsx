import { Backdrop, CircularProgress } from '@mui/material'
import React, { createContext, useContext, useState } from 'react'
import { IReactNodeProps } from 'src/common/models/IReactNodeProps'

type LoadingContextProps = {
  show: (message?: string) => void
  hide: () => void
}

const defaultProps = {
  show: () => {},
  hide: () => {}
}

export const LoadingContext = createContext<LoadingContextProps>(defaultProps)

export const LoadingProvider: React.FC<IReactNodeProps> = ({ children }) => {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('Loading')
  const show = (message?: string) => {
    setMessage(message || 'Loading')
    setOpen(true)
  }

  const hide = () => setOpen(false)

  return (
    <LoadingContext.Provider value={{ show, hide }}>
      {children}
      <Backdrop open={open} style={{ zIndex: 9999, color: '#fff' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <CircularProgress color="inherit" />
          <p>{message}...</p>
        </div>
      </Backdrop>
    </LoadingContext.Provider>
  )
}

/**
 * When using loading predloader. using this function.
 */
export function useLoading(): LoadingContextProps {
  return useContext(LoadingContext)
}
