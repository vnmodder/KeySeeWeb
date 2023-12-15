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
import './Dialog.scss'
import Draggable from 'react-draggable'
import { DialogType } from 'src/common/enum/DialogType'
import PriorityHighIcon from '@mui/icons-material/PriorityHigh'
import ErrorIcon from '@mui/icons-material/Error'
import WarningIcon from '@mui/icons-material/Warning'
import CancelIcon from '@mui/icons-material/Cancel'
import { THEME_COLOR } from 'src/common/constants/color/colorConstant'

export type ConfirmDialogProps = {
  dialogType?: DialogType
  title?: string
  message: string
  confirmTitle?: string
  cancelTitle?: string
  onCancel?: ((value: any) => void | undefined) | undefined
  onConfirm?: ((value: any) => void | undefined) | undefined
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

function PaperComponent(props: PaperProps) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  )
}

const ConfirmDialog = (props: ConfirmDialogProps | any) => {
  const [open, setOpen] = useState(true)

  const handleCancel = () => {
    setOpen(false)
    props?.onCancel()
  }

  const handleConfirm = () => {
    setOpen(false)
    props?.onConfirm()
  }

  const iconWithBackgroundColor = getDialogIconAndBackgroundColor(props?.dialogType)
  const dialogTitleClasses = `${iconWithBackgroundColor.class} dialogTitle dialog-content-padding`

  return (
    <Dialog
      open={open}
      PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title"
      className="dialog"
      onClose={handleCancel}
    >
      <DialogTitle className={dialogTitleClasses}>
        <Typography variant="h6" className="title">
          {isNullOrEmpty(props?.title) ? 'Confirm' : props?.title}
        </Typography>
      </DialogTitle>
      <DialogContent className="dialogContent dialog-content-padding dialog-content-display-format">
        <div className="item-center-v">{iconWithBackgroundColor?.icon || <PriorityHighIcon />}</div>
        <p>{props?.message}</p>
      </DialogContent>
      <DialogActions className="dialogAction">
        <Button onClick={handleConfirm} variant="contained" color="primary" className="dialogBtn">
          {isNullOrEmpty(props?.confirmTitle) ? 'OK' : props?.confirmTitle}
        </Button>
        <Button onClick={handleCancel} variant="outlined" color="primary" className="dialogBtn">
          {isNullOrEmpty(props?.cancelTitle) ? 'Cancel' : props?.cancelTitle}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmDialog
