import type { AppProps } from 'next/app'
import { useState, useEffect } from 'react'
import { GoogleOAuthProvider } from '@react-oauth/google'

import Upload from '../components/organisms/Upload/Upload'
import Navbar from '../components/organisms/Navbar/Navbar'
import Discover from '../components/molecules/Discover/Discover'
import Footer from '../components/organisms/Footer/Footer'
import '../styles/globals.css'

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [isSSR, setIsSSR] = useState(true)

  useEffect(() => {
    setIsSSR(false)
  }, [])

  if (isSSR) return null

  return (
    <GoogleOAuthProvider
      clientId={`${process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN}`}
    >
      <div className="xl:w-[100%] m-auto relative">
        <Upload />
        <Navbar />
        <div className="pt-8">
          <Discover />
        </div>
        <div className="pt-8 px-11">
          <div className="images">
            <Component {...pageProps} />
          </div>
        </div>
        <Footer />
      </div>
    </GoogleOAuthProvider>
  )
}

export default MyApp
