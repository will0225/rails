import { UserAuthWrapper } from 'redux-auth-wrapper'
import { routerActions } from 'react-router-redux'

export const UserIsAuthenticated = UserAuthWrapper({
  authSelector: state => state.auth,
  redirectAction: routerActions.replace,
  wrapperDisplayName: 'UserIsAuthenticated',
  failureRedirectPath: '/login',
  predicate: auth => auth.isAuthenticated
})

export const UserIsNotAuthenticated = UserAuthWrapper({
  authSelector: state => state.auth,
  wrapperDisplayName: 'UserIsNotAuthenticated',
  predicate: auth => !auth.isAuthenticated,
  failureRedirectPath: '/hot',
  allowRedirectBack: false
})
