// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import { getPostById } from '../../../api/posts'

const columns = [
  { id: 'postId', label: 'Post Id', minWidth: 100 },
  { id: 'display', label: 'Display Name', minWidth: 100 },
  { id: 'content', label: 'Content', minWidth: 100 },
  { id: 'accessModifier', label: 'Display Name', minWidth: 100 },
  { id: 'createdAt', label: 'Created at', minWidth: 100 },
  { id: 'updateAt', label: 'Update at', minWidth: 100 },
  { id: 'edit', label: '', minWidth: 60 }
]
function createData(postId, display, content, accessModifier, createdAt, updateAt, edit) {
  return { postId, display, content, accessModifier, createdAt, updateAt, edit }
}

const TableStickyHeader = () => {
  // ** States
  const [rows, setRows] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  async function getData() {
    try {
      const response = await getPostById()
      const { code, message, data } = response
      if (code == 200) {
        setRows([
          createData(
            data.id,
            data.user.display,
            data.content,
            data.accessModifier,
            data.createdAt,
            data.updateAt,
            <div>123</div>
          ),
          createData(
            data.id,
            data.user.display,
            data.content,
            data.accessModifier,
            data.createdAt,
            data.updateAt,
            <div>123</div>
          ),
          createData(
            data.id,
            data.user.display,
            data.content,
            data.accessModifier,
            data.createdAt,
            data.updateAt,
            <div>123</div>
          )
        ])
      }
    } catch (error) {
      alert(error.message)

      return
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell key={column.id} align={column.align} sx={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
              return (
                <TableRow hover role='checkbox' tabIndex={-1} key={row.code}>
                  {columns.map(column => {
                    const value = row[column.id]

                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    )
                  })}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}

export default TableStickyHeader
