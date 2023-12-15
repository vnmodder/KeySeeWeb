import React, { useCallback, useMemo, memo } from 'react'
import TextField, { TextFieldProps } from '@mui/material/TextField'

type TextAreaProps = {
  placeholder?: string
  fontColor?: string
  editable?: boolean
  initialValue?: string
  value?: string
  onValueChange?: (newValue: string) => void
} & TextFieldProps

const TextArea = (props: TextAreaProps) => {
  const { fontColor, editable, onValueChange, placeholder, ...textFieldProps } = props

  const internalOnChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (onValueChange) {
      onValueChange(e.target.value)
    }
  }, [onValueChange])

  const styles = useMemo(() => {
    if (fontColor) {
      return {
        ...props.sx,
        "& .MuiInputBase-root": {
          color: fontColor
        }
      }
    }
    return props.sx
  }, [fontColor, props.sx])

  const inputProps = useMemo(() => {
    if (editable) {
      return {
        ...props.InputProps,
        readOnly: true
      }
    }
    return props.InputProps
  }, [editable, props.InputProps])

  return <TextField multiline {...textFieldProps} label={placeholder} onChange={internalOnChange} sx={styles} InputProps={inputProps} />
}

export default memo(TextArea)