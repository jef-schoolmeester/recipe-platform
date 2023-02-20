import { AuthAction, AuthContext, AuthActionType } from '../types'

export const authInitialState: AuthContext = {
  id: undefined,
  token: undefined,
  username: undefined,
  isAuthenticated: false,
}

export const authReducer = (
  state: AuthContext,
  action: AuthAction
): AuthContext => {
  switch (action.type) {
    case AuthActionType.LOGIN:
      return {
        ...state,
        ...action.user,
        isAuthenticated: true,
      }
    case AuthActionType.LOGOUT:
      return authInitialState
    default:
      return state
  }
}
