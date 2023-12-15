import React from 'react'
import { Typography, Box, styled } from '@mui/material'

const BaseErrorPageContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  backgroundColor: '#f8f8f8'
})

const ErrorPageHeading = styled(Typography)(({ theme }) => ({
  fontSize: 36,
  fontWeight: 'bold',
  color: theme.palette.text.primary,
  textAlign: 'center'
}))

const ErrorPageMessage = styled(Typography)(({ theme }) => ({
  fontSize: 36,
  fontWeight: 'bold',
  color: theme.palette.text.primary
}))

const BaseErrorPage = (heading, message, optionalMessage) => (
  <BaseErrorPageContainer>
    <ErrorPageMessage variant='h1'>
      {heading}
    </ErrorPageMessage>
    <ErrorPageHeading variant='body1'>
      {message}
      {optionalMessage && <span><br/>{optionalMessage}</span>}
    </ErrorPageHeading>
  </BaseErrorPageContainer>
)

export default BaseErrorPage
