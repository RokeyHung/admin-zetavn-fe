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
  return <TextField inputRef={ref} label='Birth Date' fullWidth {...props} />
})

const TabInfo = ({ dataInfo, setDataAccount }) => {
  // ** State
  const [date, setDate] = useState(null)

  const handleFieldChange = (field, value) => {
    const fieldKeys = field.split('.')
    const newDataUser = { ...dataInfo }

    let currentObject = newDataUser
    for (let i = 0; i < fieldKeys.length; i++) {
      const key = fieldKeys[i]

      if (i === fieldKeys.length - 1) {
        currentObject[key] = value
      } else {
        currentObject[key] = currentObject[key] || {}
        currentObject = currentObject[key]
      }
    }

    setDataAccount(newDataUser)
  }

  return (
    <CardContent>
      <form>
        <Grid container spacing={7}>
          <Grid item xs={12} sx={{ marginTop: 4.8 }}>
            <TextField
              fullWidth
              multiline
              label='Bio'
              minRows={2}
              placeholder='Bio'
              defaultValue=''
              value={dataInfo.information?.aboutMe}
              onChange={event => handleFieldChange('information.aboutMe', event.target.value)}
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
                  handleFieldChange('information.birthday', date)
                }}
                value={dataInfo.information?.birthday || date}
              />
            </DatePickerWrapper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type='number'
              label='Phone'
              placeholder=''
              defaultValue=''
              value={dataInfo?.phone}
              onChange={event => handleFieldChange('phone', event.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Live at'
              placeholder='New York'
              defaultValue=''
              value={dataInfo.information?.livesAt}
              onChange={event => handleFieldChange('information.livesAt', event.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl>
              <FormLabel id='demo-radio-buttons-group-label'>Gender</FormLabel>
              <RadioGroup
                aria-labelledby='demo-radio-buttons-group-label'
                defaultValue={dataInfo.information?.genderEnum}
                name='radio-buttons-group'
                row
                onChange={event => handleFieldChange('information.genderEnum', event.target.value)}
              >
                <FormControlLabel value='MALE' control={<Radio />} label='Nam' />
                <FormControlLabel value='FEMALE' control={<Radio />} label='Nữ' />
                <FormControlLabel value='OTHER' control={<Radio />} label='Khác' />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default TabInfo
