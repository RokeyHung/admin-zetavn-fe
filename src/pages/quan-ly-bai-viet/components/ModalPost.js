import * as React from 'react'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import MuiAvatar from '@mui/material/Avatar'
import Link from '@mui/material/Link'
import ImageGrid from './ImageGrid'
import FavoriteIcon from '@mui/icons-material/Favorite'
import CommentIcon from '@mui/icons-material/Comment'
import SendIcon from '@mui/icons-material/Send'
import PublicIcon from '@mui/icons-material/Public'
import PeopleIcon from '@mui/icons-material/People'
import LockIcon from '@mui/icons-material/Lock'
import CircleIcon from '@mui/icons-material/Circle'

export default function ModalPost({ openModal, setOpenModal, dataPost }) {
  const handleClose = () => setOpenModal(false)
  const [maxHeight, setMaxHeight] = React.useState(0)

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const screenHeight = window.innerHeight
      const calculatedMaxHeight = screenHeight * 0.95
      setMaxHeight(calculatedMaxHeight)
    }
  }, [])

  return (
    <Modal
      open={openModal}
      onClose={handleClose}
      aria-labelledby='transition-modal-title'
      aria-describedby='transition-modal-description'
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500
        }
      }}
    >
      <Fade in={openModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 1100,
            minHeight: 300,
            maxHeight: maxHeight,
            bgcolor: 'background.paper',
            border: '1px solid #435585',
            borderRadius: 2,
            p: 6,
            overflowY: 'auto',
            '&::-webkit-scrollbar': {
              width: '10px'
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#acaaaa',
              borderRadius: '10px'
            },
            '&::-webkit-scrollbar-thumb:hover': {
              backgroundColor: '#a5a3a3'
            }
          }}
        >
          <div style={{}}>
            <div style={{ display: 'flex', alignItems: 'center', justifyItems: 'center', gap: 10 }}>
              <MuiAvatar src={dataPost?.user?.avatar} />
              <div>
                <Typography sx={{ fontWeight: 600, fontSize: 18, display: 'flex', alignItems: 'center' }}>
                  <Link href='#' color='inherit'>
                    {dataPost?.user?.display}
                  </Link>
                  {!!dataPost?.activity && (
                    <Typography>
                      &#160; - đang {dataPost?.activity?.name} {dataPost?.activity?.detail?.name}
                    </Typography>
                  )}
                </Typography>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Typography>{dataPost?.createdAt}</Typography>
                  {!!dataPost?.accessModifier && <CircleIcon style={{ fontSize: 4 }} />}
                  {dataPost?.accessModifier === 'PUBLIC' && <PublicIcon style={{ fontSize: 18 }} />}
                  {dataPost?.accessModifier === 'FRIENDS' && <PeopleIcon style={{ fontSize: 18 }} />}
                  {dataPost?.accessModifier === 'PRIVATE' && <LockIcon style={{ fontSize: 18 }} />}
                </div>
              </div>
            </div>
            <Typography sx={{ mt: 2 }}>{dataPost?.content}</Typography>
            <div>
              <ImageGrid images={dataPost?.medias} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                <FavoriteIcon style={{ color: '#D80032' }} />
                <Typography>{dataPost?.countLike} người dùng thích</Typography>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                <CommentIcon style={{ color: '#3081D0' }} />
                <Typography>{dataPost?.countComment} bình luận</Typography>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                <SendIcon style={{ color: '#3081D0' }} />
                <Typography>{dataPost?.countShare || 0} chia sẻ</Typography>
              </div>
            </div>
          </div>
        </Box>
      </Fade>
    </Modal>
  )
}
