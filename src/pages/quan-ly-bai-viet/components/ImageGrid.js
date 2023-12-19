import React from 'react'
import { ImageList, ImageListItem } from '@mui/material'

export default function ImageGrid({ images }) {
  const calculateCols = length => {
    if (length === 1) {
      return 1
    } else if (length === 2) {
      return 2
    } else {
      return 4
    }
  }

  const cols = calculateCols(images.length)

  return (
    <ImageList cols={cols}>
      {images.map(item => (
        <ImageListItem key={item.mediaPath}>
          {item.mediaType === 'video' ? (
            <>
              <video controls preload='auto' style={{ width: '100%', height: '100%', objectFit: 'cover' }}>
                <source src={item.mediaPath} type='video/mp4' />
              </video>
            </>
          ) : (
            <>
              <img
                srcSet={`${item.mediaPath}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                src={`${item.mediaPath}?w=164&h=164&fit=crop&auto=format`}
                loading='lazy'
                alt=''
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </>
          )}
        </ImageListItem>
      ))}
    </ImageList>
  )
}
