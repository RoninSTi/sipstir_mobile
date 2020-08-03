import Constants from 'expo-constants'

const ENV = {
  default: {
    apiUrl: 'https://prospector.omnilert.io/v1/',
    auth0: {
      audience: 'https://api.barsnap.com',
      clientId: '22GIQsEFlXvQluSJ0exktX2wdX66LMKb',
      domain: 'dev-f4i21swa.us.auth0.com',
    },
    google: {
      placeApiKey: 'AIzaSyBpg9hQgGtVsvKLZJIwlAvSdlZW6D6RF68',
    },
    reduxLoggerEnabled: false,
  },
  dev: {
    apiUrl: 'http://localhost:8080/',
    auth0: {
      audience: 'https://api.barsnap.com',
      clientId: '22GIQsEFlXvQluSJ0exktX2wdX66LMKb',
      domain: 'dev-f4i21swa.us.auth0.com',
    },
    google: {
      placeApiKey: 'AIzaSyBpg9hQgGtVsvKLZJIwlAvSdlZW6D6RF68',
    },
    reduxLoggerEnabled: true,
  },
  staging: {
    apiUrl: 'https://pure-temple-78419.herokuapp.com/',
    auth0: {
      audience: 'https://api.barsnap.com',
      clientId: '22GIQsEFlXvQluSJ0exktX2wdX66LMKb',
      domain: 'dev-f4i21swa.us.auth0.com',
    },
    google: {
      placeApiKey: 'AIzaSyBpg9hQgGtVsvKLZJIwlAvSdlZW6D6RF68',
    },
    reduxLoggerEnabled: false,
  },
  prod: {
    apiUrl: 'https://prospector.omnilert.io/v1/',
    google: {
      placeApiKey: 'AIzaSyBpg9hQgGtVsvKLZJIwlAvSdlZW6D6RF68',
    },
  },
}

function getEnvVars(env = '') {
  if (env === null || env === undefined || env === '') return ENV.dev
  if (env.indexOf('dev') !== -1) return ENV.dev
  if (env.indexOf('staging') !== -1) return ENV.staging
  if (env.indexOf('prod') !== -1) return ENV.prod
  if (env.indexOf('default') !== -1) return ENV.default
  return ENV.default
}

export default getEnvVars(Constants.manifest.releaseChannel)
