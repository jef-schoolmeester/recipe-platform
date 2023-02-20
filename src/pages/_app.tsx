import type { AppProps } from 'next/app'

import '@/styles/globals.css'
import { AppProvider } from '@/utils/context'
import Layout from '@/components/Layout'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppProvider>
  )
}
