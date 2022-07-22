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
      <div className="xl:w-[100%] m-auto overflow-hidden h-[100vh]">
        <Navbar />
        <div className="pt-8">
          <Discover />
        </div>
        <div className="flex gap-6 md:gap-20 px-11">
          <div className="mt-4 flex flex-col gap-10 overflow-auto h-[88vh] images flex-1">
            <Component {...pageProps} />
          </div>
        </div>
        <Footer />
      </div>
    </GoogleOAuthProvider>
  )
}

export default MyApp
