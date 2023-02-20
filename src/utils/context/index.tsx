import { createContext, FC, ReactNode, useContext, useReducer } from 'react'
import {
  AppContext as AppContextInterface,
  AuthActionType,
  User,
} from '../types'

import { authInitialState, authReducer } from './reducer'

const AppContext = createContext<AppContextInterface>({
  login: (user: User) => null,
  logout: () => null,
  auth: {},
})

export const useAppContext = () => useContext(AppContext)

export const AppProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, authInitialState)

  const login = (user: User) => dispatch({ type: AuthActionType.LOGIN, user })
  const logout = () => dispatch({ type: AuthActionType.LOGOUT })

  const value = { auth: state, login, logout }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
