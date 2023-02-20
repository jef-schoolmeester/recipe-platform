import { useAppContext } from '@/utils/context'
import { useRouter } from 'next/router'
import { useState } from 'react'

const Register = () => {
  const { login } = useAppContext()

  const router = useRouter()

  const [userName, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('')

  const handleRegister = async () => {
    if (!userName || !password || password !== passwordConfirmation) return

    const body = {
      username: userName,
      password: password,
    }

    const registerResponse = await fetch('/api/auth/register', {
      body: JSON.stringify(body),
      method: 'POST',
    })
    const registerResult = await registerResponse.json()
    if (!registerResult.success) throw new Error('Unexpected error occured')

    const loginResponse = await fetch('/api/auth/login', {
      body: JSON.stringify(body),
      method: 'POST',
    })
    const loginResult = await loginResponse.json()
    login(loginResult)
    router.push('/')
  }

  return (
    <main>
      <h1>Register</h1>
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
        <label htmlFor="password">confirm password</label>
        <input
          id="passwordConfirmation"
          type="passwordConfirmation"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />
      </form>
      <button onClick={handleRegister}>Register</button>
    </main>
  )
}

export default Register
