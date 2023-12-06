// ** Icon imports
import Login from 'mdi-material-ui/Login'
import Table from 'mdi-material-ui/Table'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'
import { FaUsers, FaListAlt } from 'react-icons/fa'

const navigation = () => {
  return [
    {
      title: 'Thống kê',
      icon: HomeOutline,
      path: '/'
    },
    {
      sectionTitle: 'Quản lý bài viết'
    },
    {
      title: 'Tất cả bài viết',
      icon: FaListAlt,
      path: '/quan-ly-bai-viet/tat-ca-bai-viet'
    },
    {
      sectionTitle: 'Quản lý tài khoản'
    },
    {
      title: 'Tất cả tài khoản',
      icon: FaUsers,
      path: '/quan-ly-tai-khoan/tat-ca-tai-khoan'
    },
    {
      title: 'Cài đặt tài khoản',
      icon: AccountCogOutline,
      path: '/account-settings/'
    }
    // {
    //   sectionTitle: 'Pages'
    // },
    // {
    //   title: 'Login',
    //   icon: Login,
    //   path: '/pages/login',
    //   openInNewTab: true
    // },
    // {
    //   title: 'Register',
    //   icon: AccountPlusOutline,
    //   path: '/pages/register',
    //   openInNewTab: true
    // },
    // {
    //   title: 'Error',
    //   icon: AlertCircleOutline,
    //   path: '/pages/error',
    //   openInNewTab: true
    // }
  ]
}

export default navigation
