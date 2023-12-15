import React, { useState } from 'react'
import './HealthCheck.css'
// import GitInfo from 'react-git-info/macro'
import { Paper } from '@mui/material'
import { useAppDispatch } from 'src/hooks/useAppDispatch.d'
import { healthCheck } from 'src/features/healthCheck/healthCheckAction'

// This page will be disabled at the final release.
const HealthCheck = (): JSX.Element => {
  // const git = GitInfo()
  const [backEndInformation, setBackEndInformation] = useState('')
  let frontEndInformation = ''

  frontEndInformation += `ORIGIN URL: ${process.env.REACT_APP_BASE_URL}<br/>`
  frontEndInformation += `BROWSER TIME: ${new Date().toUTCString()}<br/>`
  // frontEndInformation += `BRANCH: ${git.branch}<br/>`
  // frontEndInformation += `LAST COMMIT: ${git.commit.shortHash}<br/>`
  // frontEndInformation += `LAST COMMIT SHA: ${git.commit.hash}<br/>`
  // frontEndInformation += `COMMIT TIME: ${new Date(git.commit.date).toString()}<br/>`

  const dispatch = useAppDispatch()

  dispatch(healthCheck())
    .then((res: any) => {
      setBackEndInformation(res.payload.replaceAll('\r\n', '<br/>'))
    })
    .catch((err: any) => {
      setBackEndInformation('GET BACK-END INFORMATION FAILED!')
    })

  return (
    <div className="health-check-container">
      <Paper className="content">
        <div>
          <h2>Front-end source information</h2>
          <div dangerouslySetInnerHTML={{ __html: frontEndInformation }}></div>
        </div>
        <div>
          <h2>Back-end source information</h2>
          <div dangerouslySetInnerHTML={{ __html: backEndInformation }}></div>
        </div>
      </Paper>
    </div>
  )
}
export default HealthCheck
