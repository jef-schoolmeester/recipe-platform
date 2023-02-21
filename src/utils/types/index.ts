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

// Recipes

export interface Ingredient {
  name: string
  quantity: number
  measurement?: string
}
export type Ingredients = Array<Ingredient>

export type Tools = Array<string>

export interface Step {
  description: string
}
export type Steps = Array<Step>

export interface Recipe {
  name: string
  description: string
  ingredients: Ingredients
  tools: Tools
  steps: Steps
}
