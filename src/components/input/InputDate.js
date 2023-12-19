import dayjs, { Dayjs } from 'dayjs'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { registerLocale } from 'dayjs/locale/vi' // Add this import
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { useController } from 'react-hook-form'
import vi from 'dayjs/locale/vi'

registerLocale('vi', vi)

const InputDate = ({ id, name, label, placeholder, control }) => {
  const {
    field,
    fieldState: { error }
  } = useController({
    name,
    control
  })

  const [value, setValue] = (React.useState < Dayjs) | (null > dayjs('2022-04-17'))

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker', 'DatePicker']}>
          <DatePicker label={label} id={id} name={id || name} control={control} {...field} value={value} />
        </DemoContainer>
      </LocalizationProvider>
    </>
  )
}

export default InputDate
