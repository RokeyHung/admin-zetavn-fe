import { Checkbox, FormControlLabel, FormHelperText } from '@mui/material'
import React, { Fragment } from 'react'
import Link from 'next/link'
import { useController } from 'react-hook-form'
import { styled } from '@mui/material/styles'

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const InputTerms = ({ id, name, children, control }) => {
  const {
    field,
    fieldState: { error }
  } = useController({
    name,
    control
  })

  return (
    <>
      <FormControlLabel id={id} name={name || id} {...field} control={<Checkbox />} label={children} />
      <FormHelperText error>{!!error?.message}</FormHelperText>
    </>
  )
}

export default InputTerms
