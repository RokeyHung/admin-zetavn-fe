import * as React from 'react'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'

export default function ImageGrid({ images }) {
  return (
    <ImageList cols={2}>
      {images.map(item => (
        <ImageListItem key={item.mediaPath}>
          <img
            srcSet={`${item.mediaPath}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            src={`${item.mediaPath}?w=164&h=164&fit=crop&auto=format`}
            loading='lazy'
          />
        </ImageListItem>
      ))}
    </ImageList>
  )
}
