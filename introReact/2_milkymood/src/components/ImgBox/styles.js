import styled from 'styled-components'

export const Image = styled.div`
  background-image: url('/image1.jpeg');
  background-size: 400px 600px;
  height: 100px;
  width: 100px;
  position: relative;
  background-position: ${({$initialX}) => `-${$initialX * 100}px`}
`