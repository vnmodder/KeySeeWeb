import { Dialog, DialogContent, DialogTitle, Paper, PaperProps } from '@mui/material'
import React from 'react'
import Draggable from 'react-draggable'
import './Dialog.scss'
import { INFORMATION_MESSAGE } from 'src/common/constants/messages/informationMessage'

function PaperComponent(props: PaperProps) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  )
}

export type LoadingDialogProps = {
  open: boolean
}

const LoadingDialog = (props: LoadingDialogProps) => {
  return (
    <Dialog
      open={props.open}
      PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title"
      className="dialog"
    >
      <DialogTitle className="dialogTitle dialog-content-padding">KEYSEE</DialogTitle>
      <DialogContent className="dialogContent loading-dialog-content-padding dialog-content-display-format">
        <p>{INFORMATION_MESSAGE.IM0014}</p>
      </DialogContent>
    </Dialog>
  )
}

export default LoadingDialog
