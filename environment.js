import Constants from 'expo-constants'

const ENV = {
  default: {
    apiUrl: 'https://0352d7f5f6ee.ngrok.io/',
    google: {
      placeApiKey: 'AIzaSyAVebIejVYP7By_UIR_4-ucpz5K0rGkfLU',
    },
    reduxLoggerEnabled: false,
  },
  dev: {
    // apiUrl: 'https://sipstir-api-prod.herokuapp.com/',
    apiUrl: 'http://0.0.0.0:8080',
    google: {
      placeApiKey: 'AIzaSyAVebIejVYP7By_UIR_4-ucpz5K0rGkfLU',
    },
    reduxLoggerEnabled: false,
  },
  staging: {
    apiUrl: 'https://sipstir-api-staging.herokuapp.com//',
    google: {
      placeApiKey: 'AIzaSyAVebIejVYP7By_UIR_4-ucpz5K0rGkfLUpg9hQgGtVsvKLZJIwlAvSdlZW6D6RF68',
    },
    reduxLoggerEnabled: false,
  },
  prod: {
    apiUrl: 'https://api.sipstir.app/',
    google: {
      placeApiKey: 'AIzaSyAVebIejVYP7By_UIR_4-ucpz5K0rGkfLU',
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

export default getEnvVars(Constants.expoConfig.releaseChannel)
