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
import { getAllPosts, getOnePost } from '../../../api/posts'
import { FaEye } from 'react-icons/fa'
import { Button } from '@mui/material'

const columns = [
  { id: 'postId', label: 'Post Id', minWidth: 100 },
  { id: 'display', label: 'Display Name', minWidth: 100 },
  { id: 'content', label: 'Content', minWidth: 100 },
  { id: 'accessModifier', label: 'Access Modifier', minWidth: 100 },
  { id: 'createdAt', label: 'Created at', minWidth: 100 },
  { id: 'status', label: 'Status', minWidth: 100 },
  { id: 'edit', label: '', minWidth: 60 }
]

function createData(postId, display, content, accessModifier, createdAt, status, edit) {
  return { postId, display, content, accessModifier, createdAt, status, edit }
}

const editButtons = postId => {
  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      <Button onClick={() => handleShowPostId(postId)}>
        <FaEye size={20} color='#A9B5CF' />
      </Button>
    </div>
  )
}

const handleShowPostId = async postId => {
  try {
    const response = await getOnePost(postId)
    const { code, message, data } = response
    console.log(data)
  } catch (error) {
    alert(error.message)

    return
  }
}

const TableStickyHeader = () => {
  // ** States
  const [rows, setRows] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [status, setStatus] = useState('')

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  async function getData() {
    try {
      const response = await getAllPosts(status, page, rowsPerPage)
      const { code, message, data } = response
      if (code == 200) {
        const dataPost = data.data.map((item, index) =>
          createData(
            item.id,
            item.user.display,
            item.content,
            item.accessModifier,
            item.createdAt,
            item.status,
            editButtons(item.id)
          )
        )
        setRows(dataPost)
      }
    } catch (error) {
      alert(error.message)

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
