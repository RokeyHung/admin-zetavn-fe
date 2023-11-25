// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import TrendingUp from 'mdi-material-ui/TrendingUp'
import AccessPointNetwork from 'mdi-material-ui/AccessPointNetwork'
import DotsVertical from 'mdi-material-ui/DotsVertical'
import AccessPointPlus from 'mdi-material-ui/AccessPointPlus'
import CellphoneLink from 'mdi-material-ui/CellphoneLink'
import AccountConvertOutline from 'mdi-material-ui/AccountConvertOutline'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import { useEffect, useState } from 'react'

const renderStats = dataStatistic => {
  const [dataTotal, setDataTotal] = useState([])

  const caculator = data => {
    setDataTotal(prevDataTotal => {
      const newDataTotal = { ...prevDataTotal }

      data.forEach(obj => {
        Object.keys(obj).forEach(key => {
          if (key !== 'date') {
            newDataTotal[key] = (newDataTotal[key] || 0) + obj[key]
          }
        })
      })

      const calculatedStats = [
        {
          title: 'Bài viết mới',
          stats: newDataTotal?.newPost || 0,
          color: 'primary',
          icon: <TrendingUp sx={{ fontSize: '1.75rem' }} />
        },
        {
          title: 'Người dùng mới',
          stats: newDataTotal?.newUser || 0,
          color: 'success',
          icon: <AccountOutline sx={{ fontSize: '1.75rem' }} />
        },
        {
          title: 'Lượt tương tác',
          color: 'primary',
          stats:
            (newDataTotal?.totalLikePost || 0) +
            (newDataTotal?.totalCommentPost || 0) +
            (newDataTotal?.totalSharePost || 0),
          icon: <AccountConvertOutline sx={{ fontSize: '1.75rem' }} />
        },
        {
          title: 'Lượt theo dõi',
          color: 'success',
          stats: newDataTotal?.totalFollower || 0,
          icon: <AccessPointPlus sx={{ fontSize: '1.75rem' }} />
        },
        {
          title: 'Thiết bị truy cập',
          stats: newDataTotal?.totalBookmarkPost || 0,
          color: 'warning',
          icon: <CellphoneLink sx={{ fontSize: '1.75rem' }} />
        },
        {
          title: 'Lượt tiếp cận',
          stats: newDataTotal?.totalViewPost || 0,
          color: 'info',
          icon: <AccessPointNetwork sx={{ fontSize: '1.75rem' }} />
        }
      ]

      return calculatedStats
    })
  }

  useEffect(() => {
    caculator(dataStatistic)
  }, [dataStatistic])

  return dataTotal.map((item, index) => (
    <Grid item xs={12} sm={2} key={index}>
      <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar
          variant='rounded'
          sx={{
            mr: 3,
            width: 44,
            height: 44,
            boxShadow: 3,
            color: 'common.white',
            backgroundColor: `${item.color}.main`
          }}
        >
          {item.icon}
        </Avatar>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant='caption'>{item.title}</Typography>
          <Typography variant='h6'>{item.stats}</Typography>
        </Box>
      </Box>
    </Grid>
  ))
}

const StatisticsCard = ({ dataStatistic }) => {
  return (
    <Card>
      <CardHeader
        title='Tổng quan'
        subheader={
          <Typography variant='body2'>
            <Box component='span' sx={{ fontWeight: 600, color: 'text.primary' }}>
              Tăng trưởng trung bình trong khoảng thời gian này
            </Box>
          </Typography>
        }
        titleTypographyProps={{
          sx: {
            mb: 2.5,
            lineHeight: '2rem !important',
            letterSpacing: '0.15px !important'
          }
        }}
      />
      <CardContent sx={{ pt: theme => `${theme.spacing(3)} !important` }}>
        <Grid container spacing={[5, 0]}>
          {renderStats(dataStatistic)}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default StatisticsCard
