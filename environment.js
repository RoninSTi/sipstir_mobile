import Constants from 'expo-constants'

const ENV = {
  default: {
    apiUrl: 'https://0352d7f5f6ee.ngrok.io/',
    google: {
      placeApiKey: 'AIzaSyBpg9hQgGtVsvKLZJIwlAvSdlZW6D6RF68',
    },
    reduxLoggerEnabled: false,
    sentry: {
      dsn: 'https://456a64e5cf4040b1bfcb6535ed5fb2c2@o353410.ingest.sentry.io/2556954',
    },
  },
  dev: {
    // apiUrl: 'https://sipstir-api-prod.herokuapp.com/',
    apiUrl: 'http://0.0.0.0:8080',
    google: {
      placeApiKey: 'AIzaSyBpg9hQgGtVsvKLZJIwlAvSdlZW6D6RF68',
    },
    reduxLoggerEnabled: false,
    sentry: {
      dsn: 'https://456a64e5cf4040b1bfcb6535ed5fb2c2@o353410.ingest.sentry.io/2556954',
    },
  },
  staging: {
    apiUrl: 'https://sipstir-api-staging.herokuapp.com//',
    google: {
      placeApiKey: 'AIzaSyBpg9hQgGtVsvKLZJIwlAvSdlZW6D6RF68',
    },
    reduxLoggerEnabled: false,
    sentry: {
      dsn: 'https://456a64e5cf4040b1bfcb6535ed5fb2c2@o353410.ingest.sentry.io/2556954',
    },
  },
  prod: {
    apiUrl: 'https://sipstir-api-prod.herokuapp.com/',
    google: {
      placeApiKey: 'AIzaSyBpg9hQgGtVsvKLZJIwlAvSdlZW6D6RF68',
    },
    sentry: {
      dsn: 'https://456a64e5cf4040b1bfcb6535ed5fb2c2@o353410.ingest.sentry.io/2556954',
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
