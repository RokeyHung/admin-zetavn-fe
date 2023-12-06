// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import { styled, useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Styled Components
const MenuHeaderWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingRight: theme.spacing(4.5),
  transition: 'padding .25s ease-in-out',
  minHeight: theme.mixins.toolbar.minHeight
}))

const HeaderTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  lineHeight: 'normal',
  textTransform: 'uppercase',
  color: theme.palette.text.primary,
  transition: 'opacity .25s ease-in-out, margin .25s ease-in-out'
}))

const StyledLink = styled('a')({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none'
})

const VerticalNavHeader = props => {
  // ** Props
  const { verticalNavMenuBranding: userVerticalNavMenuBranding } = props

  // ** Hooks
  const theme = useTheme()

  return (
    <MenuHeaderWrapper className='nav-header' sx={{ pl: 6 }}>
      {userVerticalNavMenuBranding ? (
        userVerticalNavMenuBranding(props)
      ) : (
        <Link href='/' passHref>
          <StyledLink>
            <svg xmlns='http://www.w3.org/2000/svg' version='1.1' width='35' height='30' viewBox='0 0 2000 2250'>
              <g transform='matrix(1,0,0,1,0,0)'>
                <svg
                  viewBox='0 0 320 360'
                  data-background-color='#ffffff'
                  preserveAspectRatio='xMidYMid meet'
                  height='2250'
                  width='2000'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <g id='tight-bounds' transform='matrix(1,0,0,1,0,0)'>
                    <svg viewBox='0 0 320 360' height='360' width='320'>
                      <g>
                        <svg></svg>
                      </g>
                      <g>
                        <svg viewBox='0 0 320 360' height='360' width='320'>
                          <g>
                            <path
                              d='M320 187.111c0-45.764-20.238-86.866-52.203-114.908-28.043-31.964-69.145-52.203-114.908-52.203-84.302 0-152.889 68.587-152.889 152.889 0 45.753 20.231 86.848 52.185 114.891 28.043 31.975 69.152 52.22 114.926 52.22 0.299 0 0.59-0.021 0.889-0.021 0.299 0 0.59 0.021 0.889 0.021 83.456 0 151.111-67.655 151.111-151.111 0-0.299-0.021-0.59-0.021-0.889 0-0.299 0.021-0.59 0.021-0.889zM59.833 263.097c-15.093-21.255-24.071-47.143-24.256-75.097 0.48-72.928 59.492-131.943 132.423-132.423 27.954 0.185 53.845 9.163 75.097 24.256 24.366 23.627 39.57 56.64 39.57 93.056 0 71.559-58.219 129.778-129.778 129.778-36.416 0-69.429-15.204-93.056-39.57zM3.556 172.889c0-82.343 66.99-149.333 149.333-149.333 35.051 0 67.292 12.167 92.8 32.462-22.98-13.824-49.863-21.796-78.578-21.796-84.302 0-152.889 68.587-152.889 152.889 0 28.708 7.968 55.584 21.785 78.56-20.288-25.5-32.452-57.739-32.451-92.782zM167.111 318.667c-35.84 0-68.363-14.418-92.107-37.743 21.952 15.89 48.864 25.298 77.885 25.298 73.522 0 133.333-59.812 133.333-133.333 0-29.02-9.408-55.932-25.298-77.885 23.324 23.744 37.742 56.267 37.743 92.107 0 72.54-59.015 131.556-131.556 131.556z'
                              fill='#496fad'
                              fillRule='nonzero'
                              stroke='none'
                              strokeWidth='1'
                              strokeLinecap='butt'
                              strokeLinejoin='miter'
                              strokeMiterlimit='10'
                              strokeDasharray=''
                              strokeDashoffset='0'
                              fontFamily='none'
                              fontWeight='none'
                              fontSize='none'
                              textAnchor='none'
                              style={{ mixBlendMode: 'normal' }}
                              data-fill-palette-color='tertiary'
                            ></path>
                          </g>
                          <g transform='matrix(1,0,0,1,103.08859890109889,99)'>
                            <svg viewBox='0 0 113.8228021978022 162' height='162' width='113.8228021978022'>
                              <g>
                                <svg viewBox='0 0 113.8228021978022 162' height='162' width='113.8228021978022'>
                                  <g>
                                    <svg viewBox='0 0 113.8228021978022 162' height='162' width='113.8228021978022'>
                                      <g>
                                        <svg viewBox='0 0 113.8228021978022 162' height='162' width='113.8228021978022'>
                                          <g id='textblocktransform'>
                                            <svg
                                              viewBox='0 0 113.8228021978022 162'
                                              height='162'
                                              width='113.8228021978022'
                                              id='textblock'
                                            >
                                              <g>
                                                <svg
                                                  viewBox='0 0 113.8228021978022 162'
                                                  height='162'
                                                  width='113.8228021978022'
                                                >
                                                  <g transform='matrix(1,0,0,1,0,0)'>
                                                    <svg
                                                      width='113.8228021978022'
                                                      viewBox='2.42 -35.55 24.97 35.55'
                                                      height='162'
                                                      data-palette-color='#496fad'
                                                    >
                                                      <path
                                                        d='M27.39-4.83L9.42-4.83 26.88-31.74 26.83-35.55 2.59-35.55 2.59-30.69 19.85-30.69 2.42-3.91 2.44 0 27.39 0 27.39-4.83Z'
                                                        opacity='1'
                                                        transform='matrix(1,0,0,1,0,0)'
                                                        fill='#496fad'
                                                        className='wordmark-text-0'
                                                        data-fill-palette-color='primary'
                                                        id='text-0'
                                                      ></path>
                                                    </svg>
                                                  </g>
                                                </svg>
                                              </g>
                                            </svg>
                                          </g>
                                        </svg>
                                      </g>
                                      <g></g>
                                    </svg>
                                  </g>
                                </svg>
                              </g>
                            </svg>
                          </g>
                        </svg>
                      </g>
                      <defs></defs>
                    </svg>
                    <rect width='320' height='360' fill='none' stroke='none' visibility='hidden'></rect>
                  </g>
                </svg>
              </g>
            </svg>
            <HeaderTitle variant='h6' sx={{ ml: 3 }}>
              {themeConfig.templateName}
            </HeaderTitle>
          </StyledLink>
        </Link>
      )}
    </MenuHeaderWrapper>
  )
}

export default VerticalNavHeader
