import { FormControl, FormLabel, RadioGroup } from '@mui/material'

const MyRadioGroup = ({ id, labelId, name, label, children, control }) => {
  return (
    <FormControl fullWidth sx={{ marginBottom: 4, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      <FormLabel id={labelId} sx={{ mr: 4 }}>
        Giới tính:
      </FormLabel>
      <RadioGroup row aria-labelledby={labelId} name={name}>
        {children}
      </RadioGroup>
    </FormControl>
  )
}

export default MyRadioGroup
