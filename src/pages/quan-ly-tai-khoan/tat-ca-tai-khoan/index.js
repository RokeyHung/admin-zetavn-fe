// ** MUI Imports
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Card from '@mui/material/Card'
import { CardHeader } from '@mui/material'
import TableStickyHeader from 'src/pages/quan-ly-tai-khoan/components/TableStickyHeader'

const TatCaTaiKhoan = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Quản lý tài khoản' titleTypographyProps={{ variant: 'h6' }} />
          <TableStickyHeader />
        </Card>
        <div style={{ height: 100 }} />
      </Grid>
    </Grid>
  )
}

export default TatCaTaiKhoan
