import * as React from 'react'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'

export default function CustomModal({ openModal, setOpenModal, width = 1100, maxHeight = 1000, renderContainer }) {
  const handleClose = () => setOpenModal(false)
  const [maxHeightModal, setMaxHeightModal] = React.useState(maxHeight)

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const screenHeight = window.innerHeight
      const calculatedMaxHeight = screenHeight * 0.95
      setMaxHeightModal(calculatedMaxHeight)
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
            width: width,
            minHeight: 100,
            maxHeight: maxHeightModal,
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
          {!!renderContainer && renderContainer}
        </Box>
      </Fade>
    </Modal>
  )
}
