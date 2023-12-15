import { Button, Dialog, DialogContent, DialogTitle, Paper, PaperProps } from '@mui/material'
import React, { useState } from 'react'
import Draggable from 'react-draggable'
import './CheckVersion.scss'
export function PaperComponent(props: PaperProps) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  )
}

export type CheckVersionDialogProps = {
  onConfirm?: ((value: any) => void | undefined) | undefined
}

const CheckVersionDialog = (props: CheckVersionDialogProps | any): JSX.Element => {
  const [isOpen, setOpen] = useState(false)
  const closeCheckVersionDialog = () => {
    props.onConfirm()
    setOpen(false)
  }
  return (
    <Dialog
      open={true}
      PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title"
      className="version-dialog"
      onClose={closeCheckVersionDialog}
    >
      <DialogTitle>About KEYSEE</DialogTitle>
      <DialogContent>
        <div>
          <img src="/assets/images/KEYSEE_LOGIN.png" alt="KEYSEE LOGO" className="logo" width={300} />
        </div>

        <div className="display-flex margin-top-1rem">
          <div>{`Version: ${process.env.REACT_APP_VERSION}`}</div>
          <Button
            onClick={closeCheckVersionDialog}
            variant="outlined"
            color="primary"
            className="dialogBtn"
          >
            OK
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CheckVersionDialog
