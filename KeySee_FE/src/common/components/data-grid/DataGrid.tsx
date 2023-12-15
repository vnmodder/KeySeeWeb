import React, {
  forwardRef,
  useEffect,
  useMemo,
  useState,
  useImperativeHandle,
  useCallback,
  UIEvent,
  useRef
} from 'react'
import {
  MaterialReactTable,
  MRT_Cell,
  MRT_RowSelectionState,
  type MRT_ColumnDef,
  MRT_PaginationState,
} from 'material-react-table'
import { DataGridProps } from 'src/common/models/DataGridProps'
import { useDispatch, useSelector } from 'react-redux'
import { getLocalStorage, setLocalStorage } from 'src/common/utils/utils'
import { THEME_COLOR } from 'src/common/constants/color/colorConstant'
import { setSelectionRowIdState } from 'src/features/data-grid/selectionRowIdSlice'
import './DataGrid.scss'

const getColumnName = (cell: MRT_Cell<any>) => {
  return cell.column.id.split('.')[0]
}

const DataGrid = forwardRef((props: DataGridProps, forwardedRef) => {
  /**
   * State rows table data grid
   */
  const [tableData, setTableData] = useState<any>(props.rows)
  const [pagination, setPagination] = useState<MRT_PaginationState>(props.pagination);
  //optionally access the underlying virtualizer instance
  const tableContainerRef = useRef<any>(null)
  useEffect(() => {
    const dataScrollLeft = getLocalStorage('scrollLeft')
    const dataScrollTop = getLocalStorage('scrollTop')
    tableContainerRef.current.scrollTop = dataScrollTop ?? 0
    tableContainerRef.current.scrollLeft = dataScrollLeft ?? 0
    setTableData(props.rows)
  }, [props.rows])

  const dispatch = useDispatch()
  const seikyuSelectionRowId = useSelector((state: any) => state['selectionRowId'].seikyuSelectionRowId);

  const updateSeikyuIchiranSeletionRowId = (newRowId : number) => {
    dispatch(setSelectionRowIdState({  seikyuSelectionRowId,
      seikyuIchiranSelectionRowId : newRowId}))
  }

  useImperativeHandle(forwardedRef, () => ({
    moveRowUp() {
      const dataRow: any = props.rows

      if (indexRow === 0 || dataRow[indexRow - 1]?.backgroundCode !== dataRow[indexRow]?.backgroundCode)
      {
        updateSeikyuIchiranSeletionRowId(indexRow);
        return [...dataRow]
      }

      //Swap row
      //Swap prop display order and set isEdited
      const tempRow = dataRow[indexRow];
      const tempDisplayOrder1 = {value : dataRow[indexRow].displayOrder.value, isEdited: true};
      const tempDisplayOrder2 = {value : dataRow[indexRow - 1].displayOrder.value, isEdited: true}

      dataRow[indexRow] = {...dataRow[indexRow - 1], displayOrder: tempDisplayOrder1};
      dataRow[indexRow - 1] = {...tempRow, displayOrder: tempDisplayOrder2};
      updateSeikyuIchiranSeletionRowId(indexRow - 1);
      return [...dataRow]
    },

    moveRowDown() {
      const dataRow: any = props.rows

      if (indexRow === (dataRow.length - 1) || dataRow[indexRow + 1]?.backgroundCode !== dataRow[indexRow]?.backgroundCode)
      {
        updateSeikyuIchiranSeletionRowId(indexRow);
        return [...dataRow]
      }

      //Swap row
      //Swap prop display order and set isEdited
      const tempRow = dataRow[indexRow];
      const tempDisplayOrder1 = {value : dataRow[indexRow].displayOrder.value, isEdited: true};
      const tempDisplayOrder2 = {value : dataRow[indexRow + 1].displayOrder.value, isEdited: true}

      dataRow[indexRow] = {...dataRow[indexRow + 1], displayOrder: tempDisplayOrder1};
      dataRow[indexRow + 1] = {...tempRow, displayOrder: tempDisplayOrder2};

      updateSeikyuIchiranSeletionRowId(indexRow + 1);
      return [...dataRow]
    },
    /**
     * @returns Return data grid when edit data
     */
    returnDataTable() {
      return [...tableData]
    },

    getCurrentPagination () {
      return pagination;
    }
  }))

  const columns = useMemo<MRT_ColumnDef<any>[]>(() => props.columns, [props.columns])
  const [indexRow, setIndexRow] = useState<number>(props.indexRowSelected ?? 0);  
  const [rowSelected, setRowSelected] = useState<any>(props.rows[indexRow])
  const objectSelect = Object.create({})
  objectSelect[`${indexRow < 0 ? 0 : indexRow}`] = true
  const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>(
    props.rowFirstSelected ? objectSelect : {}
  )

  const handleSaveCell = (
    cell: MRT_Cell<any>,
    value: any,
    onValueChanged?: (rowValue: any, newValue: any) => any
  ) => {
    //send/receive api updates here
    const newTableData = props.rows.map((rowValue, index) => {
      if (index === cell.row.index) {
        const colName = getColumnName(cell)
        const oldRow = props.rows[cell.row.index][colName]
        const isValueModifed = value != oldRow.value
        if (isValueModifed && onValueChanged) {
          return { ...onValueChanged(rowValue, value) }
        }
        return {
          ...rowValue,
          [colName]: { value: value, isEdited: oldRow.isEdited || isValueModifed }
        }
      }
      return rowValue
    })

    props.setRows!(newTableData)
  }

  const getBackgroundRow = (rowSelection: MRT_RowSelectionState, row: any) => {
    if (rowSelection[row.id]) {
      if (row.id !== indexRow)
      {
        setIndexRow(parseInt(row.id))
      }
      return THEME_COLOR.SELECTION
    }
    if (row.original?.soldFlg) {
      return THEME_COLOR.SILVER
    }
    if (row.original?.backgroundCode !== undefined) {
      return row.original?.backgroundCode === 0
        ? THEME_COLOR.FIRST_GROUP_ROW
        : THEME_COLOR.SECOND_GROUP_ROW
    }
    return ''
  }

  const getColorCell = (rowSelection: MRT_RowSelectionState, row: any) => {
    if (rowSelection[row.id] !== undefined) {
      return rowSelection[row.id] ? 'white !important' : 'black'
    }
  }
  /**
   * Get value scroll Left and Top
   */
  const fetchMoreOnBottomReached = useCallback((containerRefElement?: HTMLDivElement | null) => {
    if (containerRefElement) {
      const { scrollTop, scrollLeft } = containerRefElement
      setLocalStorage('scrollLeft', scrollLeft)
      setLocalStorage('scrollTop', scrollTop)
    }
  }, [])

  useEffect(() => {
    //selection on change
    if (props.selectionOnChange)
    {
      props.selectionOnChange(indexRow);
    }
  }, [indexRow])

  return (
    <MaterialReactTable
      defaultColumn={props.defaultColumn}
      // enable resize all columns
      enableColumnResizing={props.enableColumnResizing}
      // set border table
      muiTableProps={{
        sx: { tableLayout: 'fixed', ...props.muiTablePropStyle }
      }}
      // set border heade cell
      muiTableHeadCellProps={{
        align: 'center',
        sx: { ...props.muiTableHeadCellPropStyle, fontWeight: '400' }
      }} // set border body cell
      muiTableBodyCellProps={{
        align: 'center',
        sx: { padding: '5px', ...props.muiTableBodyCellPropStyle }
      }}
      muiTableContainerProps={{
        ref: tableContainerRef,
        sx: { height: props.height },
        onScroll: (
          event: UIEvent<HTMLDivElement> //add an event listener to the table container element
        ) => fetchMoreOnBottomReached(event.target as HTMLDivElement)
      }}
      // columns
      columns={columns}
      // data table
      data={props.rows}
      // disable sorting
      enableSorting={props.enableSorting}
      // disable column actions
      enableColumnActions={false}
      // state => isLoading : boolean, rowSelection
      state={{ isLoading: props.isLoading === undefined ? false : props.isLoading, rowSelection, pagination }}
      // enable editing
      enableEditing={props.enableEditing}
      // mode edit cell
      editingMode="cell"
      // onBlur is more efficient, but could use onChange instead
      muiTableBodyCellEditTextFieldProps={({ cell }) => ({
        onBlur: (event) => {
          if (props.setRows) {
            const colName = getColumnName(cell)
            const onValueChanged = props.cellEdittingCallbacks
              ? props.cellEdittingCallbacks[colName].getNewRowValue
              : undefined
            handleSaveCell(cell, event.target.value, onValueChanged)
          }
        },
        onChange: (event) => {
          const colName = getColumnName(cell)
          const validatingCallback = props.cellEdittingCallbacks
            ? props.cellEdittingCallbacks[colName].validating
            : undefined

          if (validatingCallback) {
            const isValueValid = validatingCallback(event.target.value)
            if (!isValueValid) {
              event.target.value = event.target.defaultValue
              event.preventDefault()
              event.stopPropagation()
            } else {
              event.target.defaultValue = event.target.value
            }
          }
        }
      })}
      // position pagination
      positionPagination="bottom"
      // disable TopToolbar
      enableTopToolbar={props.enableTopToolbar}
      muiTableBodyRowProps={
        props.activeRowSelected !== undefined && props.activeRowSelected === true
          ? ({ row }) => ({
              onClick: () => {
                //singer choice => enableSingleRowSelection = true
                if (props.enableSingleRowSelection) {
                  if (rowSelection[row.id] === undefined) {
                    setRowSelection((prev: any) => ({
                      [row.id]: !prev[row.id]
                    }))
                    setRowSelected([row.original])
                    // onClickRow(row.original)
                  }
                }
              },
              selected: rowSelection[row.id],
              sx: {
                cursor: 'pointer',
                '& .MuiTableCell-root': {
                  padding: '0px',
                  backgroundColor: getBackgroundRow(rowSelection, row),
                  color: getColorCell(rowSelection, row)
                }
              },
              hover: false
            })
          : undefined
      }
      enableRowSelection={props.enableRowSelection}
      onRowSelectionChange={setRowSelection}
      initialState={{
        columnPinning: { left: props.pinningLeft, right: props.pinningRight }
      }}
      onPaginationChange={setPagination}
      enablePagination={props.enablePagination}
      enableBottomToolbar={props.enableBottomToolbar}
      enableStickyHeader={props.enableStickyHeader}
      enableMultiRowSelection={props.enableSingleRowSelection}
    />
  )
})
export default React.memo(DataGrid)
