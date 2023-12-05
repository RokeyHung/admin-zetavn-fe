// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import CardHeader from '@mui/material/CardHeader'
import Button from '@mui/material/Button'
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

const renderStats = (dataStatistic, setDataChart) => {
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
          icon: <TrendingUp sx={{ fontSize: '1.75rem' }} />,
          field: ['newPost']
        },
        {
          title: 'Người dùng mới',
          stats: newDataTotal?.newUser || 0,
          color: 'success',
          icon: <AccountOutline sx={{ fontSize: '1.75rem' }} />,
          field: ['newUser']
        },
        {
          title: 'Lượt tương tác',
          color: 'primary',
          stats:
            (newDataTotal?.totalLikePost || 0) +
            (newDataTotal?.totalCommentPost || 0) +
            (newDataTotal?.totalSharePost || 0),
          icon: <AccountConvertOutline sx={{ fontSize: '1.75rem' }} />,
          field: ['totalLikePost', 'totalCommentPost', 'totalSharePost']
        },
        {
          title: 'Lượt theo dõi',
          color: 'success',
          stats: newDataTotal?.totalFollower || 0,
          icon: <AccessPointPlus sx={{ fontSize: '1.75rem' }} />,
          field: ['totalFollower']
        },
        {
          title: 'Lưu trữ bài viết',
          stats: newDataTotal?.totalBookmarkPost || 0,
          color: 'warning',
          icon: <CellphoneLink sx={{ fontSize: '1.75rem' }} />,
          field: ['totalBookmarkPost']
        },
        {
          title: 'Lượt tiếp cận',
          stats: newDataTotal?.totalViewPost || 0,
          color: 'info',
          icon: <AccessPointNetwork sx={{ fontSize: '1.75rem' }} />,
          field: ['totalViewPost']
        }
      ]

      return calculatedStats
    })
  }

  useEffect(() => {
    caculator(dataStatistic)
  }, [dataStatistic])

  const handleButtonClick = (fields, title, color) => {
    setDataChart(
      dataStatistic.map(item => ({
        date: item.date,
        dataDay: fields.reduce((acc, field) => acc + (item[field] || 0), 0),
        title: title,
        color: color
      }))
    )
  }

  return dataTotal.map((item, index) => (
    <Grid item xs={12} sm={2} key={index}>
      <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
        <Button onClick={() => handleButtonClick(item.field, item.title, item.color)}>
          <Avatar
            variant='rounded'
            sx={{
              mr: 3,
              width: 50,
              height: 50,
              boxShadow: 3,
              color: 'common.white',
              backgroundColor: `${item.color}.main`
            }}
          >
            {item.icon}
          </Avatar>
        </Button>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant='caption'>{item.title}</Typography>
          <Typography variant='h6'>{item.stats}</Typography>
        </Box>
      </Box>
    </Grid>
  ))
}

const StatisticsCard = ({ dataStatistic, setDataChart }) => {
  return (
    <Card>
      <CardHeader
        title='Tổng quan'
        subheader={
          <Typography variant='body2'>
            <Box component='span' sx={{ fontWeight: 600, color: 'text.primary' }}>
              Tăng trưởng trong khoảng thời gian này
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
          {renderStats(dataStatistic, setDataChart)}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default StatisticsCard
