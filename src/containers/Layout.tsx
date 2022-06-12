import { FC } from 'react'
import styled from '@emotion/styled'
import Header from 'src/components/Header'
import Footer from 'src/components/Footer'
import App from './App'

const Main = styled.section`
  padding: 24px;
`

const Layout: FC = () => {
  return (
    <>
      <Header />
      <Main>
        <App />
      </Main>
      <Footer />
    </>
  )
}

export default Layout
