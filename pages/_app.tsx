import type { AppProps } from 'next/app'
import { useState, useEffect } from 'react'
import { GoogleOAuthProvider } from '@react-oauth/google'

import Navbar from '../components/Navbar'
import Discover from '../components/Discover'
import Footer from '../components/Footer'
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
      <div className="xl:w-[100%] m-auto">
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
