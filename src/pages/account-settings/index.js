// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import MuiTab from '@mui/material/Tab'

// ** Icons Imports
import AccountOutline from 'mdi-material-ui/AccountOutline'
import LockOpenOutline from 'mdi-material-ui/LockOpenOutline'
import InformationOutline from 'mdi-material-ui/InformationOutline'

// ** Demo Tabs Imports
import TabInfo from 'src/views/account-settings/TabInfo'
import TabAccount from 'src/views/account-settings/TabAccount'
import TabSecurity from 'src/views/account-settings/TabSecurity'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

import { getOneUser, create } from '../../api/users'
import { useRouter } from 'next/router'
import { Button } from '@mui/material'

const Tab = styled(MuiTab)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    minWidth: 100
  },
  [theme.breakpoints.down('sm')]: {
    minWidth: 67
  }
}))

const TabName = styled('span')(({ theme }) => ({
  lineHeight: 1.71,
  fontSize: '0.875rem',
  marginLeft: theme.spacing(2.4),
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}))

const AccountSettings = () => {
  // ** State
  const router = useRouter()
  const userId = router.query.id
  const [value, setValue] = useState('account')
  const [dataUser, setDataUser] = useState({})

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  async function getData() {
    try {
      const response = await getOneUser(userId)
      const { code, message, data } = response
      if (code == 200) {
        setDataUser(data)
      }
    } catch (error) {
      alert(error.message)

      return
    }
  }

  useEffect(() => {
    getData()
  }, [])

  const handleCreate = async () => {
    try {
      const response = await create(dataUser)
      const { code, message, data } = response
      if (code == 200) {
        alert(message)
        router.push('/quan-ly-tai-khoan/tat-ca-tai-khoan/')
      } else {
        alert(message)
      }
    } catch (error) {
      alert(error.message)

      return
    }
  }

  return (
    <Card>
      <TabContext value={value}>
        <TabList
          onChange={handleChange}
          aria-label='account-settings tabs'
          sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
        >
          <Tab
            value='account'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AccountOutline />
                <TabName>Tài khoản</TabName>
              </Box>
            }
          />
          <Tab
            value='info'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <InformationOutline />
                <TabName>Giới thiệu</TabName>
              </Box>
            }
          />
        </TabList>

        <TabPanel sx={{ p: 0 }} value='account'>
          <TabAccount dataAccount={dataUser} setDataAccount={setDataUser} />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='info'>
          <TabInfo dataInfo={dataUser} setDataAccount={setDataUser} />
        </TabPanel>
      </TabContext>
      {!!dataUser && (
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '1.25rem', marginBottom: '1.25rem' }}>
          <Button variant='contained' onClick={handleCreate}>
            Tạo người dùng
          </Button>
        </div>
      )}
    </Card>
  )
}

export default AccountSettings
