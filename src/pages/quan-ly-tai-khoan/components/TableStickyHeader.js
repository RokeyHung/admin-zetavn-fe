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
import { getAllUser, getOneUser } from '../../../api/users'
import { FaEye } from 'react-icons/fa'
import { Button } from '@mui/material'
import { useRouter } from 'next/router'
import { http_url } from '../../../utils/index'

const columns = [
  { id: 'id', label: 'Id', minWidth: 100 },
  { id: 'display', label: 'Họ và tên', minWidth: 100 },
  { id: 'username', label: 'Username', minWidth: 100 },
  { id: 'role', label: 'Quyền', minWidth: 100 },
  { id: 'status', label: 'Trạng thái', minWidth: 100 },
  { id: 'createdAt', label: 'Ngày tạo', minWidth: 60 },
  { id: 'edit', label: '', minWidth: 60 }
]

function createData(id, display, username, role, status, createdAt, edit) {
  return { id, display, username, role, status, createdAt, edit }
}

const TableStickyHeader = () => {
  // ** States
  const [rows, setRows] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [status, setStatus] = useState('')
  const router = useRouter()

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const editButtons = postId => {
    return (
      <div style={{ display: 'flex', gap: '10px' }}>
        <Button onClick={() => handleShowUserId(postId)}>
          <FaEye size={20} color='#A9B5CF' />
        </Button>
      </div>
    )
  }

  const handleShowUserId = async userId => {
    router.push(`${http_url}/account-settings/${userId}`)
  }

  async function getData() {
    try {
      const response = await getAllUser(status, page, rowsPerPage)
      const { code, message, data } = response
      if (code == 200) {
        const dataPost = data.data.map((item, index) =>
          createData(item.id, item.display, item.username, item.role, item.status, item.createdAt, editButtons(item.id))
        )
        setRows(dataPost)
      }
    } catch (error) {
      console.log(error.message)

      return
    }
  }

  useEffect(() => {
    getData()
  }, [rowsPerPage])

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 700 }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell key={index} align={column.align} sx={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
              return (
                <TableRow hover role='checkbox' tabIndex={-1} key={index}>
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
