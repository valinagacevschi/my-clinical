import Constants from 'expo-constants'
import { Platform } from 'react-native'
import * as Sentry from 'sentry-expo'
import { API } from '../../services/api'
import { getNotificationsTokenAsync } from '../../services/notifications'
import { hasChanged } from '../utils'

export const setCodeEffect = ({ onSet, setSelf }): void => {
  onSet(async (newValue, oldValue) => {
    if (hasChanged('code', newValue, oldValue)) {
      const { code } = newValue
      const deviceType = Platform.OS
      const deviceId = Constants.installationId
      const token = await getNotificationsTokenAsync(true)
      const params = { code, token, deviceId, deviceType }
      const response = await API.setCode(params)
      if (!response.ok) {
        setTimeout(() => {
          setSelf({ ...newValue, code: null })
        }, 1)
        Sentry.Native.captureEvent({
          sagas: 'setCodeEffect',
          ...response,
        })
        if (code != null) {
          alert('Incorect code. Please check your code and try again')
        }
        return
      }
      setSelf({ ...newValue, registered: true })
    }
  })
}
