import axios from 'axios'

export default function setAuthorizationToken(access_token) {
  if (access_token) {
    axios.defaults.headers.common['Access-Token'] = access_token
  } else {
    delete axios.defaults.headers.common['Access-Token']
  }
}