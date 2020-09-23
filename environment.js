import Constants from 'expo-constants'

const ENV = {
  default: {
    apiUrl: 'http://localhost:8080/',
    google: {
      placeApiKey: 'AIzaSyBpg9hQgGtVsvKLZJIwlAvSdlZW6D6RF68',
    },
    reduxLoggerEnabled: false,
    sentry: {
      dsn: 'https://050b3fdc48274c2b9d9858dffb41aa13@o446932.ingest.sentry.io/5426218',
    },
  },
  dev: {
    apiUrl: 'http://localhost:8080/',
    google: {
      placeApiKey: 'AIzaSyBpg9hQgGtVsvKLZJIwlAvSdlZW6D6RF68',
    },
    reduxLoggerEnabled: true,
    sentry: {
      dsn: 'https://050b3fdc48274c2b9d9858dffb41aa13@o446932.ingest.sentry.io/5426218',
    },
  },
  staging: {
    apiUrl: 'https://sipstir-api-staging.herokuapp.com//',
    google: {
      placeApiKey: 'AIzaSyBpg9hQgGtVsvKLZJIwlAvSdlZW6D6RF68',
    },
    reduxLoggerEnabled: false,
    sentry: {
      dsn: 'https://050b3fdc48274c2b9d9858dffb41aa13@o446932.ingest.sentry.io/5426218',
    },
  },
  prod: {
    apiUrl: 'https://sipstir-api-prod.herokuapp.com/',
    google: {
      placeApiKey: 'AIzaSyBpg9hQgGtVsvKLZJIwlAvSdlZW6D6RF68',
    },
    sentry: {
      dsn: 'https://050b3fdc48274c2b9d9858dffb41aa13@o446932.ingest.sentry.io/5426218',
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
