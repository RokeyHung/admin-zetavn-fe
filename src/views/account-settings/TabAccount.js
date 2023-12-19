// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Alert from '@mui/material/Alert'
import Select from '@mui/material/Select'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import AlertTitle from '@mui/material/AlertTitle'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Button from '@mui/material/Button'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'

const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius
}))

const ButtonStyled = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const ResetButtonStyled = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(4.5),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
}))

const TabAccount = ({ dataAccount, setDataAccount }) => {
  const [imgSrc, setImgSrc] = useState('/images/avatars/1.png')
  const [dataUser, setDataUser] = useState(dataAccount)

  const handleFieldChange = (field, value) => {
    const fieldKeys = field.split('.')
    const newDataUser = { ...dataUser }

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

  useEffect(() => {
    setDataUser(dataAccount)
  }, [dataAccount])

  const onChange = file => {
    const reader = new FileReader()
    const { files } = file.target

    if (files && files.length !== 0) {
      const selectedFile = files[0]

      reader.onload = () => {
        setImgSrc(reader.result)
      }

      reader.readAsDataURL(selectedFile)

      setDataAccount(prevDataAccount => ({
        ...prevDataAccount,
        avatar: selectedFile
      }))
    }
  }

  return (
    <CardContent>
      <form>
        <Grid container spacing={7}>
          <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ImgStyled src={dataUser.avatar || imgSrc} alt='Profile Pic' />
              <Box>
                <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                  Tải hình ảnh
                  <input
                    hidden
                    type='file'
                    onChange={onChange}
                    accept='image/png, image/jpeg'
                    id='account-settings-upload-image'
                  />
                </ButtonStyled>
                <ResetButtonStyled color='error' variant='outlined' onClick={() => setImgSrc('/images/avatars/1.png')}>
                  Reset
                </ResetButtonStyled>
                <Typography variant='body2' sx={{ marginTop: 5 }}>
                  Allowed PNG or JPEG. Max size of 800K.
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Username'
              placeholder=''
              defaultValue={''}
              value={dataUser.username}
              onChange={event => handleFieldChange('username', event.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6} sx={{ display: 'flex', gap: 6 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='First Name'
                placeholder=''
                defaultValue=''
                value={dataUser.firstName}
                onChange={event => handleFieldChange('firstName', event.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Last Name'
                placeholder=''
                defaultValue=''
                value={dataUser.lastName}
                onChange={event => handleFieldChange('lastName', event.target.value)}
                required
              />
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type='email'
              label='Email'
              placeholder=''
              defaultValue={dataUser.email || ''}
              value={dataUser.email}
              onChange={event => handleFieldChange('email', event.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Role</InputLabel>
              <Select
                label='Role'
                value={dataUser?.role || ''}
                onChange={event => handleFieldChange('role', event.target.value)}
                required
                defaultValue='USER'
              >
                <MenuItem value='USER'>USER</MenuItem>
                <MenuItem value='ADMIN'>ADMIN</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                label='Status'
                value={dataUser?.status || ''}
                onChange={event => handleFieldChange('status', event.target.value)}
                required
                defaultValue='ACTIVE'
              >
                <MenuItem value='ACTIVE'>ACTIVE</MenuItem>
                <MenuItem value='LOCKED'>LOCKED</MenuItem>
                <MenuItem value='SUSPENDED'>SUSPENDED</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Company'
              placeholder='ABC Pvt. Ltd.'
              defaultValue=''
              value={dataUser.information?.worksAt}
              onChange={event => handleFieldChange('information.worksAt', event.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            {!dataUser.id && (
              <TextField
                fullWidth
                label='Password'
                placeholder=''
                defaultValue=''
                value={dataUser.password}
                onChange={event => handleFieldChange('password', event.target.value)}
                required
                type='password'
              />
            )}
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default TabAccount
