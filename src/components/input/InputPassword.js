import React, { useState } from 'react'
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOutline'
import { useController } from 'react-hook-form'

const InputPassword = ({ id, name, label, control, sx, inputLabel }) => {
  const [values, setValues] = useState({
    password: '',
    showPassword: false
  })

  const {
    field,
    fieldState: { error }
  } = useController({
    name,
    control
  })

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  return (
    <FormControl fullWidth sx={{ marginBottom: 4, ...sx }}>
      {/* <InputLabel htmlFor={id || name}>{label}</InputLabel> */}
      <TextField
        variant='outlined'
        label={inputLabel}
        value={values.password}
        id={id}
        name={name}
        onChange={handleChange('password')}
        type={values.showPassword ? 'text' : 'password'}
        {...field}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton
                edge='end'
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                aria-label='Hiện mật khẩu'
              >
                {values.showPassword ? <EyeOutline fontSize='small' /> : <EyeOffOutline fontSize='small' />}
              </IconButton>
            </InputAdornment>
          )
        }}
        error={!!error?.message}
        helperText={error?.message}
      />
    </FormControl>
  )
}

export default InputPassword
