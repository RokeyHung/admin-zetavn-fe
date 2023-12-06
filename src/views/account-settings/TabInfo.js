// ** React Imports
import { forwardRef, useState } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Radio from '@mui/material/Radio'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import FormLabel from '@mui/material/FormLabel'
import InputLabel from '@mui/material/InputLabel'
import RadioGroup from '@mui/material/RadioGroup'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import FormControlLabel from '@mui/material/FormControlLabel'

// ** Third Party Imports
import DatePicker from 'react-datepicker'

// ** Styled Components
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

const CustomInput = forwardRef((props, ref) => {
  return <TextField inputRef={ref} label='Ngày sinh' fullWidth {...props} />
})

const TabInfo = ({ dataInfo }) => {
  // ** State
  const [date, setDate] = useState(null)
  const [dataUser, setDataUser] = useState(dataInfo)

  return (
    <CardContent>
      <form>
        <Grid container spacing={7}>
          <Grid item xs={12} sx={{ marginTop: 4.8 }}>
            <TextField
              fullWidth
              multiline
              label='Giới thiệu'
              minRows={2}
              placeholder='Thông tin giới thiệu'
              defaultValue=''
              value={dataUser.information?.aboutMe}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DatePickerWrapper>
              <DatePicker
                selected={date}
                showYearDropdown
                showMonthDropdown
                id='account-settings-date'
                placeholderText='MM/DD/YYYY'
                customInput={<CustomInput />}
                onChange={date => {
                  setDate(date)
                  console.log(date)
                }}
              />
            </DatePickerWrapper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type='number'
              label='Điện thoại'
              placeholder=''
              defaultValue=''
              value={dataUser?.phone}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Sống ở'
              placeholder='Nhập nơi sống'
              defaultValue=''
              value={dataUser.information?.livesAt}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl>
              <FormLabel sx={{ fontSize: '0.875rem' }}>Giới tính</FormLabel>
              <RadioGroup
                row
                defaultValue='MALE'
                value={dataUser.information?.genderEnum}
                aria-label='gender'
                name='account-settings-info-radio'
              >
                <FormControlLabel value='MALE' label='Nam' control={<Radio />} />
                <FormControlLabel value='FEMALE' label='Nữ' control={<Radio />} />
                <FormControlLabel value='OTHER' label='Khác' control={<Radio />} />
              </RadioGroup>
            </FormControl>
          </Grid>
          {/* <Grid item xs={12}>
            <Button variant='contained' sx={{ marginRight: 3.5 }}>
              Save Changes
            </Button>
            <Button type='reset' variant='outlined' color='secondary' onClick={() => setDate(null)}>
              Reset
            </Button>
          </Grid> */}
        </Grid>
      </form>
    </CardContent>
  )
}

export default TabInfo
