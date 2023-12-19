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
import { getAllUser, getOneUser, lockUserAccount, update } from '../../../api/users'
import { FaEye } from 'react-icons/fa'
import { Box, Button, MenuItem, Select, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { http_url } from '../../../utils/index'
import CustomModal from 'src/@core/layouts/components/CustomModal'

const columns = [
  { id: 'id', label: 'UserId', minWidth: 100 },
  { id: 'display', label: 'Display Name', minWidth: 100 },
  { id: 'username', label: 'Username', minWidth: 100 },
  { id: 'role', label: 'Role', minWidth: 100 },
  { id: 'status', label: 'Status', minWidth: 100 },
  { id: 'createdAt', label: 'Create at', minWidth: 60 },
  { id: 'edit', label: '', minWidth: 60 }
]

function createData(id, display, username, role, status, createdAt, edit) {
  return { id, display, username, role, status, createdAt, edit }
}

const TableStickyHeader = () => {
  // ** States
  const router = useRouter()
  const [rows, setRows] = useState([])
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [totalPosts, setTotalPosts] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [openModalStatus, setOpenModalStatus] = useState(false)
  const [dataUser, setDateUser] = useState({})

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const editButtons = userId => {
    return (
      <div style={{ display: 'flex', gap: '10px' }}>
        <Button onClick={() => handleShowUserId(userId)}>
          <FaEye size={20} color='#A9B5CF' />
        </Button>
        <Select sx={{ maxWidth: 38, maxHeight: 38, border: 'none' }}>
          <MenuItem
            style={{ backgroundColor: '#fff' }}
            onClick={() => {
              const handleOnClick = async () => {
                const response = await getOneUser(userId)
                const { code, message, data } = response
                if (code == 200) {
                  setDateUser(data)
                }
                setOpenModalStatus(true)
              }
              handleOnClick()
            }}
          >
            Cập nhật trạng thái
          </MenuItem>
        </Select>
      </div>
    )
  }

  const RenderModalUpdateStatus = () => {
    const [status, setStatus] = useState(dataUser?.status || '')
    const [role, setRole] = useState(dataUser?.role || '')

    const handleChangeStatus = async event => {
      setStatus(event.target.value)
    }

    const handleChangeRole = async event => {
      setRole(event.target.value)
    }

    const handleUpdate = async () => {
      if (!!dataUser?.id) {
        const res = await lockUserAccount(dataUser.id, status, role)
        const { code, message, data } = res
        if (code === 200) {
          let user = rows.find(obj => obj.id === dataUser.id)
          if (user) {
            user.status = status
            user.role = role
          }
          setOpenModalStatus(false)
        } else {
          alert(message)
        }
      }
    }

    return (
      <div>
        <Typography
          sx={{ fontWeight: 500, fontSize: 18 }}
        >{`Cập nhật trạng thái bài viết của ${dataUser?.user?.display}`}</Typography>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginTop: 20 }}>
          <Typography>Trạng thái: </Typography>
          <Box sx={{ maxWidth: 250 }}>
            <Select sx={{ maxHeight: 40 }} value={status} onChange={handleChangeStatus}>
              <MenuItem value={'ACTIVE'}>ACTIVE</MenuItem>
              <MenuItem value={'LOCKED'}>LOCKED</MenuItem>
              <MenuItem value={'SUSPENDED'}>SUSPENDED</MenuItem>
            </Select>
          </Box>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginTop: 20 }}>
          <Typography>Role: </Typography>
          <Box sx={{ maxWidth: 250 }}>
            <Select sx={{ maxHeight: 40 }} value={role} onChange={handleChangeRole}>
              <MenuItem value={'USER'}>USER</MenuItem>
              <MenuItem value={'ADMIN'}>ADMIN</MenuItem>
            </Select>
          </Box>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginTop: 50 }}>
          <Button
            type='reset'
            variant='outlined'
            color='secondary'
            sx={{ marginLeft: 'auto' }}
            onClick={() => setOpenModalStatus(!openModalStatus)}
          >
            Hủy
          </Button>
          <Button variant='contained' onClick={handleUpdate}>
            Cập nhật
          </Button>
        </div>
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
        setTotalPages(data.totalPages)
        setTotalPosts(data.totalElements)
        const dataUser = data.data.map((item, index) =>
          createData(item.id, item.display, item.username, item.role, item.status, item.createdAt, editButtons(item.id))
        )
        setRows(dataUser)
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
      <TableContainer style={{ overflowX: 'hidden' }}>
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
        count={totalPosts}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <CustomModal
        openModal={openModalStatus}
        setOpenModal={() => setOpenModalStatus(!openModalStatus)}
        renderContainer={<RenderModalUpdateStatus />}
        width={500}
      />
    </Paper>
  )
}

export default TableStickyHeader
