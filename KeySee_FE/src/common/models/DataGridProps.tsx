import { MRT_ColumnDef } from 'material-react-table'

interface TextFieldCellEdittingProps {
  validating?: (newValue: string) => boolean
  getNewRowValue?: (oldRowValue: any, newValue: string) => any
}

export interface DataGridProps {
  // height table
  height: string
  // link doc https://www.material-react-table.com/docs/api/column-options
  columns: Array<MRT_ColumnDef<any>>
  // link doc https://www.material-react-table.com/docs/api/column-options
  rows: Array<any>,
  setRows?: React.Dispatch<React.SetStateAction<Array<any>>>
  //allows create checkbox select rows, link doc https://www.material-react-table.com/docs/guides/row-selection#enable-row-selection
  enableRowSelection: boolean
  // allow create size columns auto, link https://www.material-react-table.com/docs/api/props#defaultColumn-prop
  defaultColumn?: {
    minSize?: number
    maxSize?: number
    size: number
  }
  // allow resize width columns
  enableColumnResizing: boolean
  // allow sorting data
  enableSorting: boolean
  // flag loading data => show spriner
  isLoading?: boolean
  // allow editing data
  enableEditing: boolean
  // allow turn/off toolbar table
  enableTopToolbar: boolean
  // allow active row selected
  activeRowSelected?: boolean
  // pagination, link https://www.material-react-table.com/docs/guides/pagination#pagination-feature-guide
  pagination: { pageSize: number; pageIndex: number }
  // all disable pagination
  enablePagination?: boolean
  // allow hide bottom tool bar
  enableBottomToolbar?: boolean
  // allow customer style table, example { border: 'black', border-radius:'5px' }
  muiTablePropStyle?: any
  // allow customer style cell header, example { border: 'black', border-radius:'5px' }
  muiTableHeadCellPropStyle?: any
  // allow customer style cell body, example { border: 'black', border-radius:'5px' }
  muiTableBodyCellPropStyle?: any
  // allow sticky header
  enableStickyHeader?: boolean
  // https://www.material-react-table.com/docs/guides/column-pinning#pin-(freeze)-columns-by-default
  pinningLeft?: string[]
  pinningRight?: string[]
  //https://www.material-react-table.com/docs/guides/row-selection#single-row-selection
  enableSingleRowSelection?: boolean
  rowFirstSelected?: boolean // example {0:true}
  onClick?: any,
  indexRowSelected?:number,
  cellEdittingCallbacks?: Record<string, TextFieldCellEdittingProps>
  selectionOnChange? : any,
}
