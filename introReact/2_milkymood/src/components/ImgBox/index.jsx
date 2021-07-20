import React from 'react'
import { Image } from './styles'

const ImgBox = ({x}) => {
  // this is a 'transient prop' 
  return <Image $initialX={x} />
}

export default ImgBox