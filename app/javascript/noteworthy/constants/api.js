let apiUrl

const DEVELOPMENT_API_URL = `http://localhost:3000/api/v1`
const PRODUCTION_API_URL = `${window.location.protocol}//${window.location.hostname}:${window.location.port}/api/v1`

const hostname = window && window.location && window.location.hostname

if (hostname.split(':')[1] == 'loaclhost') {
  apiUrl = DEVELOPMENT_API_URL
} else {
  apiUrl = PRODUCTION_API_URL
}

export const API_URL = apiUrl
