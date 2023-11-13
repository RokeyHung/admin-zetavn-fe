// ** MUI Imports
import Grid from '@mui/material/Grid'
import { forwardRef, useState } from 'react'

// ** Icons Imports
import Poll from 'mdi-material-ui/Poll'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'
import BriefcaseVariantOutline from 'mdi-material-ui/BriefcaseVariantOutline'

// ** Custom Components Imports
import CardStatisticsVerticalComponent from 'src/@core/components/card-statistics/card-stats-vertical'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import Table from 'src/views/dashboard/Table'
import Trophy from 'src/views/dashboard/Trophy'
import TotalEarning from 'src/views/dashboard/TotalEarning'
import StatisticsCard from 'src/views/dashboard/StatisticsCard'
import WeeklyOverview from 'src/views/dashboard/WeeklyOverview'
import DepositWithdraw from 'src/views/dashboard/DepositWithdraw'
import SalesByCountries from 'src/views/dashboard/SalesByCountries'
import TextField from '@mui/material/TextField'
import DatePicker from 'react-datepicker'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

const CustomInputStart = forwardRef((props, ref) => {
  return <TextField inputRef={ref} label='Start' fullWidth {...props} />
})

const CustomInputEnd = forwardRef((props, ref) => {
  return <TextField inputRef={ref} label='End' fullWidth {...props} />
})

const Dashboard = () => {
  // ** State

  const [dateStart, setDateStart] = useState(null)
  const [dateEnd, setDateEnd] = useState(null)

  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid container>
          <Grid item xs={4}>
            <Grid container spacing={3}>
              <Grid item xs={4}></Grid>
              <Grid item xs={4}></Grid>
              <Grid item xs={4}></Grid>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Grid container spacing={3}>
              <Grid item xs={4}></Grid>
              <Grid item xs={4}></Grid>
              <Grid item xs={4}></Grid>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <DatePickerWrapper>
                  <DatePicker
                    selected={dateStart}
                    showYearDropdown
                    showMonthDropdown
                    id='account-settings-date'
                    placeholderText='MM/DD/YYYY'
                    customInput={<CustomInputStart />}
                    onChange={date => {
                      setDateStart(date)
                      console.log(date)
                    }}
                  />
                </DatePickerWrapper>
              </Grid>
              <Grid item xs={6}>
                <DatePickerWrapper>
                  <DatePicker
                    selected={dateEnd}
                    showYearDropdown
                    showMonthDropdown
                    id='account-settings-date'
                    placeholderText='MM/DD/YYYY'
                    customInput={<CustomInputEnd />}
                    onChange={date => {
                      setDateEnd(date)
                      console.log(date)
                    }}
                  />
                </DatePickerWrapper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
          <Trophy />
        </Grid>
        <Grid item xs={12} md={8}>
          <StatisticsCard />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <WeeklyOverview />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <TotalEarning />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Grid container spacing={6}>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats='$25.6k'
                icon={<Poll />}
                color='success'
                trendNumber='+42%'
                title='Total Profit'
                subtitle='Weekly Profit'
              />
            </Grid>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats='$78'
                title='Refunds'
                trend='negative'
                color='secondary'
                trendNumber='-15%'
                subtitle='Past Month'
                icon={<CurrencyUsd />}
              />
            </Grid>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats='862'
                trend='negative'
                trendNumber='-18%'
                title='New Project'
                subtitle='Yearly Project'
                icon={<BriefcaseVariantOutline />}
              />
            </Grid>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats='15'
                color='warning'
                trend='negative'
                trendNumber='-18%'
                subtitle='Last Week'
                title='Sales Queries'
                icon={<HelpCircleOutline />}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <SalesByCountries />
        </Grid>
        <Grid item xs={12} md={12} lg={8}>
          <DepositWithdraw />
        </Grid>
        <Grid item xs={12}>
          <Table />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default Dashboard
