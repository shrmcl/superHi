import styled from 'styled-components'
// using attrs method to avoid styled-components rending with new classNames on every move
export const Image = styled.div.attrs(({$movedX, $movedY}) => ({
  style: {
    transform: `translate(${$movedX}px, ${$movedY}px)`
  }
}))`
  background-image: url('/image1.jpeg');
  background-size: 400px 600px;
  height: 100px;
  width: 100px;
  position: relative;
  background-position: ${({$initialX, $initialY}) => `-${$initialX * 100}px -${$initialY * 100}px`}
`