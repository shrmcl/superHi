import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import { GlobalStyle, ImageContainer, Wrapper }  from './styles'
import ImgBox from './components/ImgBox'

const matrix = [0, 1, 2, 3]

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Footer />
      <Wrapper>
        <ImageContainer>
          {matrix.map((x, index) => (
             <ImgBox key={index} x={x} />
          ))}
        </ImageContainer>
      </Wrapper>
      
    </>
  )
}

export default App;
