// ** MUI Imports
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Card from '@mui/material/Card'
import { CardHeader } from '@mui/material'
import TableStickyHeader from 'src/pages/quan-ly-bai-viet/components/TableStickyHeader'

const XemBaiViet = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Quản lý bài viết' titleTypographyProps={{ variant: 'h6' }} />
          <TableStickyHeader />
        </Card>
        <div style={{ height: 100 }} />
      </Grid>
    </Grid>
  )
}

export default XemBaiViet
