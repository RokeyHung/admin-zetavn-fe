import { TextField } from '@mui/material'
import { useController } from 'react-hook-form'

const Input = ({ name, id, label, sx, control, type = 'text' }) => {
  const {
    field,
    fieldState: { error }
  } = useController({
    name,
    control
  })

  return (
    <>
      <TextField
        {...field}
        autoFocus
        fullWidth
        id={id}
        type={type}
        label={label}
        name={id || name}
        sx={{ marginBottom: 4, ...sx }}
        error={!!error?.message}
        helperText={error?.message}
      />
    </>
  )
}

export default Input
