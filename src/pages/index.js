import Grid from '@mui/material/Grid'
import { forwardRef, useState } from 'react'
import Button from '@mui/material/Button'
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import TableTop10User from 'src/views/dashboard/TableTop10User'
import TableTop10Post from 'src/views/dashboard/TableTop10Post'
import StatisticsCard from 'src/views/dashboard/StatisticsCard'
import WeeklyOverview from 'src/views/dashboard/WeeklyOverview'
import TextField from '@mui/material/TextField'
import DatePicker from 'react-datepicker'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { subDays } from 'date-fns'
import { dashboardInteract, statisticsPostPopular, statisticsUserPopular } from 'src/api/statistics'
import { useEffect } from 'react'

const CustomInputStart = forwardRef((props, ref) => {
  return <TextField inputRef={ref} label='Start' fullWidth {...props} />
})

const CustomInputEnd = forwardRef((props, ref) => {
  return <TextField inputRef={ref} label='End' fullWidth {...props} />
})

const Dashboard = () => {
  const [dateStart, setDateStart] = useState(subDays(new Date(), 6))
  const [dateEnd, setDateEnd] = useState(new Date())
  const [dataUser, setDataUser] = useState([])
  const [dataPost, setDataPost] = useState([])
  const [dataStatistic, setDataStatistic] = useState([])

  async function getData() {
    try {
      const getStatistic = await dashboardInteract(
        dateStart.toLocaleDateString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        }),
        dateEnd.toLocaleDateString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        })
      )
      const statisticsPost = await statisticsPostPopular()
      const statisticsUser = await statisticsUserPopular()

      const { code, message, data } = getStatistic
      setDataStatistic(data.data)
      setDataUser(statisticsUser.data)
      setDataPost(statisticsPost.data)
    } catch (error) {
      console.log(error.message)

      return
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <Grid container spacing={3}>
              <Grid item xs={4}></Grid>
              <Grid item xs={4}></Grid>
              <Grid item xs={4}></Grid>
            </Grid>
          </Grid>

          <Grid item xs={3}>
            <Grid container spacing={3}>
              <Grid item xs={4}></Grid>
              <Grid item xs={4}></Grid>
              <Grid item xs={4}></Grid>
            </Grid>
          </Grid>

          <Grid item xs={6}>
            <Grid container spacing={3}>
              <Grid item xs={5}>
                <DatePickerWrapper>
                  <DatePicker
                    selected={dateStart}
                    showYearDropdown
                    showMonthDropdown
                    id='account-settings-date-start'
                    placeholderText='MM/DD/YYYY'
                    customInput={<CustomInputStart />}
                    onChange={date => {
                      setDateStart(date)
                      console.log(date)
                    }}
                  />
                </DatePickerWrapper>
              </Grid>
              <Grid item xs={5}>
                <DatePickerWrapper>
                  <DatePicker
                    selected={dateEnd}
                    showYearDropdown
                    showMonthDropdown
                    id='account-settings-date-end'
                    placeholderText='MM/DD/YYYY'
                    customInput={<CustomInputEnd />}
                    onChange={date => {
                      setDateEnd(date)
                      console.log(date)
                    }}
                  />
                </DatePickerWrapper>
              </Grid>
              <Grid item xs={2} style={{ display: 'flex', alignItems: 'center' }}>
                <Button variant='contained' style={{ width: '100%', fontSize: 15 }}>
                  Apply
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={12}>
          <StatisticsCard dataStatistic={dataStatistic} />
        </Grid>
        <Grid item xs={12}>
          <WeeklyOverview dataStatistic={dataStatistic} />
        </Grid>
        <Grid container item spacing={6}>
          <Grid item xs={6}>
            <TableTop10User dataRow={dataUser} />
          </Grid>
          <Grid item xs={6}>
            <TableTop10Post dataRow={dataPost} />
          </Grid>
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default Dashboard
