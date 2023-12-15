import { DatePicker, LocalizationProvider, jaJP } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import React from 'react'
import { DatePickerProps } from './DatePickerProps'
import 'dayjs/locale/ja' // import locale

export default function DatePickerComponent(props: DatePickerProps) {
  const onChangeDate = (e: any) => {
    props.sendDate(e)
  }
  const onSelectedSectionsChange = (e: any) => {
    props.onSelectedSectionsChange(e)
  }
  return (
    <LocalizationProvider
      dateFormats={{monthAndYear: "YYYY年MM月",}}
      adapterLocale="ja"
      dateAdapter={AdapterDayjs}
      localeText={jaJP.components.MuiLocalizationProvider.defaultProps.localeText}
    >
      <DatePicker
        onSelectedSectionsChange={onSelectedSectionsChange}
        onChange={onChangeDate}
        disabled={props.disabled}
        readOnly={props.readOnly}
        openTo={props.openToMonth ? 'month' : undefined}
        views={props.views}
        value={dayjs(props.date)}
        label={props.label}
        format={props.format} //"YYYY年 MM月 DD日"
        sx={{
          '& .MuiInputBase-root': {
            '& .MuiInputBase-input': {
              padding: '10px'
            }
          },
          '& .MuiFormLabel-root': {
            marginTop: '0px'
          }
        }}
      />
    </LocalizationProvider>
  )
}
