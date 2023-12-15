import { FormControl, InputLabel, NativeSelect, OutlinedInput } from '@mui/material'
import React, { useState } from 'react'
import { SelectOptionProps } from './SelectOptionProps'
import { THEME_COLOR } from 'src/common/constants/color/colorConstant'

export default function SelectOptionComponent(props: SelectOptionProps) {
  const [isEdited, setIsEdited] = useState<boolean | undefined>(props.isEdited)

  const onChange = (event: any) => {
    if (props.onChange === undefined) {
      event.preventDefault()
      return
    }
    props.onChange(event.target.value)
    if (props.isEdited === false) setIsEdited(true)
  }

  const getColor = () => {
    if (isEdited === undefined) {
      return
    }

    return isEdited ? THEME_COLOR.RED : THEME_COLOR.BLACK
  }

  return (
    <FormControl
      fullWidth
      sx={
        props.variant
          ? {
              '& .MuiOutlinedInput-root ': {
                '& .MuiNativeSelect-select': { padding: '0px', borderRadius: '0px' }
              }
            }
          : {}
      }
    >
      <InputLabel shrink={props.valueDefaultValue ? true : false}>{props.label}</InputLabel>
      <NativeSelect
        sx={
          props.variant
            ? {
                '& .MuiInput-input': {
                  padding: '0px'
                },
                '& .Mui-disabled':
                  {
                    color: 'black',
                    '-webkit-text-fill-color': `${getColor()} !important` 
                  }
              }
            : {
                '& .MuiOutlinedInput-input': {
                  padding: '10.5px 14px'
                }
              }
        }
        style={{ color: getColor() }}
        input={!props.variant ? <OutlinedInput label={props.label} /> : undefined}
        disabled={props.disabled}
        defaultValue={props.valueDefaultValue}
        value={props.value}
        onChange={(event) => {
          onChange(event)
        }}
      >
        {props.menuItems.map((menuItem, index: number) => {
          return (
            <option key={index} value={menuItem.value}>
              {menuItem.labelMenu}
            </option>
          )
        })}
      </NativeSelect>
    </FormControl>
  )
}
