import type { AppProps } from 'next/app'
import { AuthContext } from '../contexts/AuthProvider'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContext>
      <Component {...pageProps} />
    </AuthContext>
  ) 
}

export default MyApp
