const host = '//cd554bb11f10.ngrok.io'
const config = {
  develop: {
    url: `https:${host}/api/v1/`,
  },
  staging: {
    url: 'https://myhealthmed.co.uk/api/v1/',
  },
}

export function getConfig(): { url: string } {
  return __DEV__ ? config.develop : config.staging
}

export const version = '1.0.7(0)'

export { reactotron } from './ReactotronConfig'
export default {
  useFixture: false,
}
