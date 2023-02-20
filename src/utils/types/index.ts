// Auth

export type UserRegisterRequest = {
  username?: string
  password?: string
}

export type UserLoginRequest = {
  username?: string
  password?: string
}

// Auth context

export interface User {
  id: string
  token: string
  username: string
}

export interface AuthContext {
  id?: string
  token?: string
  username?: string
  isAuthenticated?: boolean
}

export enum AuthActionType {
  LOGIN = 'auth/LOGIN',
  LOGOUT = 'auth/LOGOUT',
}

export type AuthAction =
  | { type: AuthActionType.LOGIN; user: User }
  | { type: AuthActionType.LOGOUT }

export interface AppContext {
  login: (user: User) => void
  logout: () => void
  auth: AuthContext
}
