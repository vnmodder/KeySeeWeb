import { DateView } from "@mui/x-date-pickers"

export interface DatePickerProps {
  label: string
  views: DateView[]
  date: Date
  disabled: boolean,
  sendDate: any,
  readOnly: boolean,
  openToMonth: boolean,
  format: string
  onSelectedSectionsChange?: void | any
}
