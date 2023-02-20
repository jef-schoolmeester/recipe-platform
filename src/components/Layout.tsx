import Link from 'next/link'
import { useRouter } from 'next/router'

import React from 'react'

import { useAppContext } from '@/utils/context'

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    logout,
    auth: { isAuthenticated, username },
  } = useAppContext()

  const router = useRouter()

  console.log(router.route)

  const ineligibleRoutes = ['/login', '/register']

  if (ineligibleRoutes.includes(router.route)) return <>{children}</>
  return (
    <>
      <header style={{ width: '100vw' }}>
        {isAuthenticated && username ? (
          <>
            <h3>{username}</h3>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link href="/register">register</Link>
            <Link href="/login">log in</Link>
          </>
        )}
      </header>
      {children}
    </>
  )
}

export default Layout
