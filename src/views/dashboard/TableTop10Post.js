// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import { formatNumber } from '../../utils/index'

const DashboardTable = ({ dataRow }) => {
  return (
    <Card>
      <TableContainer>
        <Table aria-label='table in dashboard'>
          <TableHead>
            <TableRow>
              <TableCell>Người dùng</TableCell>
              <TableCell>Likes</TableCell>
              <TableCell>Comments</TableCell>
              <TableCell>Ngày đăng</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataRow.map(row => (
              <TableRow hover key={row.id} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important`, maxWidth: '150px !important' }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={[{ fontWeight: 500, fontSize: '1rem !important' }, textStyle]}>
                      {row?.user?.display || ''}
                    </Typography>
                    <Typography variant='caption' sx={textStyle}>
                      {row?.user?.username || ''}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography sx={{ fontWeight: 500, fontSize: '1rem !important' }}>
                    {formatNumber(row?.countLike)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={{ fontWeight: 500, fontSize: '1rem !important' }}>
                    {formatNumber(row?.countComment)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={{ fontWeight: 500, fontSize: '1rem !important' }}>{row?.createdAt}</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}

const textStyle = {
  display: 'inline-block',
  maxWidth: '150px',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis'
}

export default DashboardTable
