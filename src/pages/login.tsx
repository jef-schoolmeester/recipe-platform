import { useRouter } from 'next/router'

import { useState } from 'react'

import { useAppContext } from '@/utils/context'

const Login = () => {
  const { login } = useAppContext()

  const router = useRouter()

  const [userName, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleLogin = async () => {
    if (!userName || !password) return

    const body = {
      username: userName,
      password: password,
    }

    const response = await fetch('/api/auth/login', {
      body: JSON.stringify(body),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const loginResult = await response.json()
    login(loginResult)
    router.push('/')
  }

  return (
    <main>
      <h1>Login</h1>
      <form>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={userName}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </form>
      <button onClick={handleLogin}>Log in</button>
    </main>
  )
}

export default Login
