// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import ReactApexcharts from 'src/@core/components/react-apexcharts'

function calculateAverageGrowth(data, fieldName) {
  if (!data || data.length === 0 || !data[0].hasOwnProperty(fieldName)) {
    console.error('Invalid data or field name.')
    return null
  }
  const totalFieldValue = data.reduce((sum, item) => sum + item[fieldName], 0)
  const averageGrowth = totalFieldValue / data.length

  return averageGrowth
}

const WeeklyOverview = ({ dataChart }) => {
  const theme = useTheme()

  const chartData = dataChart.map(item => ({
    x: new Date(item.date[0], item.date[1] - 1, item.date[2]),
    y: item.dataDay || 0
  }))

  const options = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    plotOptions: {
      bar: {
        borderRadius: 9,
        distributed: true,
        columnWidth: '40%',
        endingShape: 'rounded',
        startingShape: 'rounded'
      }
    },
    stroke: {
      width: 2,
      colors: [theme.palette.background.paper]
    },
    legend: { show: false },
    grid: {
      strokeDashArray: 7,
      padding: {
        top: -1,
        right: 0,
        left: -12,
        bottom: 5
      }
    },
    dataLabels: { enabled: false },
    colors: [theme.palette[dataChart[0]?.color || 'primary'].main],
    states: {
      hover: {
        filter: { type: 'none' }
      },
      active: {
        filter: { type: 'none' }
      }
    },

    xaxis: {
      type: 'datetime', // Đặt kiểu của trục x là datetime
      categories: chartData.map(item => item.x.getTime()), // Chuyển đổi thời gian thành timestamp
      tickPlacement: 'on',
      labels: { show: true, datetimeUTC: false, format: 'dd/MM' }, // Format hiển thị ngày tháng
      axisTicks: { show: true },
      axisBorder: { show: true }
    },
    yaxis: {
      show: true,
      tickAmount: 10,
      labels: {
        offsetX: -17,
        formatter: value => Math.round(value)
      }
    }
  }

  return (
    <Card>
      <CardHeader
        title='Tổng quan hàng tuần'
        titleTypographyProps={{
          sx: { lineHeight: '2rem !important', letterSpacing: '0.15px !important' }
        }}
      />
      <CardContent sx={{ '& .apexcharts-xcrosshairs.apexcharts-active': { opacity: 0 } }}>
        <ReactApexcharts
          type='bar'
          height={500}
          options={options}
          series={[{ name: dataChart[0]?.title || '', data: chartData }]}
        />
        <Box sx={{ mt: 7, mb: 7, display: 'flex', alignItems: 'center' }}>
          {/* <Typography variant='body2'>
            {`Mức tăng trưởng đã được cải thiện ` +
              calculateAverageGrowth(dataChart, 'newUser') +
              `% 😎 so với giai đoạn trước.`}
          </Typography> */}
        </Box>
      </CardContent>
    </Card>
  )
}

export default WeeklyOverview
