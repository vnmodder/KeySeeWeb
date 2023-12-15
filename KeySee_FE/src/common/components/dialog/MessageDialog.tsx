import React, { useState } from 'react'
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
  PaperProps,
  Typography
} from '@mui/material'
import { isNullOrEmpty } from 'src/common/utils/utils'
import ErrorIcon from '@mui/icons-material/Error'
import WarningIcon from '@mui/icons-material/Warning'
import './Dialog.scss'
import Draggable from 'react-draggable'
import { DialogType } from 'src/common/enum/DialogType'
import CancelIcon from '@mui/icons-material/Cancel'
import PriorityHighIcon from '@mui/icons-material/PriorityHigh'
import { THEME_COLOR } from 'src/common/constants/color/colorConstant'

export type MessageDialogProps = {
  dialogType?: DialogType
  title: string
  message: string
  confirmTitle?: string | null
  onClose?: ((value: any) => void | undefined) | undefined
}

function PaperComponent(props: PaperProps) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  )
}

function getDialogIconAndBackgroundColor(dialogType: DialogType) {
  switch (dialogType) {
    case DialogType.QuestionMessage:
      return {
        icon: <ErrorIcon style={{ color: THEME_COLOR.SELECTION, scale: '150%' }} />,
        class: 'question'
      }
    case DialogType.BusinessError:
      return {
        icon: <ErrorIcon style={{ color: THEME_COLOR.SELECTION, scale: '150%' }} />,
        class: 'error'
      }
    case DialogType.ValidationMessage.valueOf():
      return {
        icon: <ErrorIcon style={{ color: THEME_COLOR.SELECTION, scale: '150%' }} />,
        class: 'validation'
      }
    case DialogType.Information:
      return {
        icon: <ErrorIcon style={{ color: THEME_COLOR.SELECTION, scale: '150%' }} />,
        class: 'information'
      }
    case DialogType.OtherError:
      return {
        icon: <WarningIcon style={{ color: THEME_COLOR.WARNING, scale: '150%' }} />,
        class: 'other'
      }
    case DialogType.UnhandledError:
      return {
        icon: <CancelIcon style={{ color: THEME_COLOR.RED, scale: '150%' }} />,
        class: 'unhandled'
      }
    default:
      return {
        class: 'error'
      }
  }
}

const MessageDialog = (props: MessageDialogProps | any) => {
  const [open, setOpen] = useState(true)

  const handleClose = () => {
    setOpen(false)
    props?.onClose()
  }

  const iconWithBackgroundColor = getDialogIconAndBackgroundColor(props?.dialogType)
  const dialogTitleClasses = `${iconWithBackgroundColor.class} dialogTitle dialog-content-padding`

  return (
    <Dialog
      open={open}
      PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title"
      className="dialog"
      onClose={handleClose}
    >
      <DialogTitle className={dialogTitleClasses}>{props?.title}</DialogTitle>
      <DialogContent className="dialogContent dialog-content-padding dialog-content-display-format">
        <div className="item-center-v">{iconWithBackgroundColor?.icon || <PriorityHighIcon />}</div>
        <p>{props?.message}</p>
      </DialogContent>
      <DialogActions className="dialogAction">
        <Button onClick={handleClose} variant="outlined" color="primary" className="dialogBtn">
          {isNullOrEmpty(props?.confirmTitle) ? 'OK' : props?.confirmTitle}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default MessageDialog
