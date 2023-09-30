import axios from 'axios'

const defaultClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 10000,
  withCredentials: true,
})

const googlePlaceClient = axios.create({
  baseURL: 'https://maps.googleapis.com/maps/api/place/',
  timeout: 10000,
})

const clients = {
  default: {
    client: defaultClient,
  },
  googlePlace: {
    client: googlePlaceClient,
  },
}

export default clients
