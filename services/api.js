import axios from 'axios'

import env from '../environment';

const defaultClient = axios.create({
  baseURL: env.apiUrl,
  timeout: 10000
})

const googlePlaceClient = axios.create({
  baseURL: 'https://maps.googleapis.com/maps/api/place/',
  timeout: 10000
})

const clients = {
  default: {
    client: defaultClient
  },
  googlePlace: {
    client: googlePlaceClient
  }
}

export default clients