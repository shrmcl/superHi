import React, { useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import ImgBox from './components/ImgBox'
import ModalComponent from './components/Modal'
import ModalInner from './components/ModalInner'
import { GlobalStyle, ImageContainer, Wrapper, Button }  from './styles'

// prettier-ignore 
const matrix = [
  [0,0], [1,0], [2,0], [3,0],
  [0,1], [1,1], [2,1], [3,1],
  [0,2], [1,2], [2,2], [3,2],
  [0,3], [1,3], [2,3], [3,3],
  [0,4], [1,4], [2,4], [3,4],
  [0,5], [1,5], [2,5], [3,5]
]

const App = () => {
  // 1 is fully scattered img; 0 is the img unified
  const [distance, setDistance] = useState(1)
  const [showModal, setShowModal] = useState(false)
  // suggested calculation for motion easing
  const easing = (num) => Math.pow(num, 3)

  const calculateDistance = ([x, y]) => {
    // find center of window
    const center = [window.innerWidth / 2, window.innerHeight / 2]
    const maxHypot = Math.hypot(center[0], center[1])
    const hypot = Math.hypot(center[0] - x, center[1] - y)
    const distance = hypot / maxHypot
    const easeDistance = easing(distance)
    setDistance(easeDistance)
  }
  // clientX and clientY are destructured from the MouseEvent object
  // these values provide coordinates of the cursor
  const handleMove = ({clientX, clientY}) => {
    calculateDistance([clientX, clientY])
  }
  // touches is destructured from the TouchEvent object
  // touches[0] represents the first finger touch of the screen
  const handleTouchMove = ({touches}) => {
    calculateDistance([touches[0].clientX, touches[0].clientY])
  }

  const toggleModal = () => {
    setShowModal((showModal) => !showModal)
  }

  return (
    <>
      <GlobalStyle />
      {showModal && (
        <ModalComponent toggleModal={toggleModal}>
          <ModalInner />
        </ModalComponent>
      )}
      <Header />
      <Footer />
      <Wrapper onMouseMove={handleMove} onTouchMove={handleTouchMove} $color={Math.round(240 - distance * 40)}>
        <ImageContainer $isTogether={distance < 0.01}>
          <Button onClick={toggleModal}>Sign up for updates</Button>
          {matrix.map(([x,y], index) => (
             <ImgBox key={index} x={x} y={y} percent={distance} />
          ))}
        </ImageContainer>
      </Wrapper>
      
    </>
  )
}

export default App;
