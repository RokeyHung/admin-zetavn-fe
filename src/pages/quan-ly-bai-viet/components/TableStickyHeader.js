// ** React Imports
import { useState, useEffect } from 'react'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import { getAllPosts, getOnePost, updateStatusPost } from '../../../api/posts'
import { FaEye } from 'react-icons/fa'
import { Button, Typography } from '@mui/material'
import ModalPost from './ModalPost'
import CustomModal from 'src/@core/layouts/components/CustomModal'
import Box from '@mui/material/Box'

const columns = [
  { id: 'postId', label: 'Post Id', minWidth: 100 },
  { id: 'display', label: 'Tên người dùng', minWidth: 180 },
  { id: 'content', label: 'Content', minWidth: 160 },
  { id: 'accessModifier', label: 'Phạm vi bài viết', minWidth: 160 },
  { id: 'createdAt', label: 'Đăng ngày', minWidth: 100 },
  { id: 'status', label: 'Trạng thái', minWidth: 120 },
  { id: 'edit', label: '', minWidth: 60 }
]

function createData(postId, display, content, accessModifier, createdAt, status, edit) {
  return { postId, display, content, accessModifier, createdAt, status, edit }
}

const TableStickyHeader = () => {
  // ** States
  const [rows, setRows] = useState([])
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [totalPosts, setTotalPosts] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [status, setStatus] = useState('')
  const [openModal, setOpenModal] = useState(false)
  const [openModalStatus, setOpenModalStatus] = useState(false)
  const [dataPost, setDataPost] = useState({})

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
  }

  const handleShowPostId = async postId => {
    try {
      const response = await getOnePost(postId)
      const { code, message, data } = response
      setDataPost(data)
    } catch (error) {
      alert(error.message)

      return
    }
  }

  const editButtons = postId => {
    return (
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', alignItems: 'center' }}>
        <Button
          onClick={() => {
            const handleOnClick = async () => {
              await handleShowPostId(postId)
              setOpenModal(true)
            }
            handleOnClick()
          }}
        >
          <FaEye size={20} color='#A9B5CF' />
        </Button>
        <Select sx={{ maxWidth: 38, maxHeight: 38, border: 'none' }}>
          <MenuItem
            style={{ backgroundColor: '#fff' }}
            onClick={() => {
              const handleOnClick = async () => {
                await handleShowPostId(postId)
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
    const [status, setStatus] = useState(dataPost?.status || '')

    const handleChange = async event => {
      setStatus(event.target.value)
    }

    const handleUpdateStatus = async () => {
      if (!!dataPost?.id) {
        const res = await updateStatusPost(dataPost.id, status.toLowerCase())
        const { code, message, data } = res
        if (code === 200) {
          let post = rows.find(obj => obj.postId === dataPost.id)
          if (post) {
            post.status = status
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
        >{`Cập nhật trạng thái bài viết của ${dataPost?.user?.display}`}</Typography>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginTop: 20 }}>
          <Typography>Trạng thái: </Typography>
          <Box sx={{ maxWidth: 250 }}>
            <Select sx={{ maxHeight: 40 }} value={status} onChange={handleChange}>
              <MenuItem value={'ACTIVE'}>ACTIVE</MenuItem>
              <MenuItem value={'LOCKED'}>LOCKED</MenuItem>
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
          <Button variant='contained' onClick={handleUpdateStatus}>
            Cập nhật
          </Button>
        </div>
      </div>
    )
  }

  async function getData() {
    try {
      const response = await getAllPosts(status, page, rowsPerPage)
      const { code, message, data } = response
      if (code == 200) {
        setTotalPages(data.totalPages)
        setTotalPosts(data.totalElements)
        const dataPost = data.data.map((item, index) =>
          createData(
            item.id,
            item.user.display,
            item.content.substring(0, 100) + '...',
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
  }, [rowsPerPage, page])

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
        rowsPerPageOptions={[5, 25, 100]}
        component='div'
        count={totalPosts}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <ModalPost openModal={openModal} setOpenModal={() => setOpenModal(!openModal)} dataPost={dataPost} />
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
