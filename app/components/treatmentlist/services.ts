import Constants from 'expo-constants'
import { Platform } from 'react-native'
import useSWR from 'swr'
import { API } from '../../services/api'
import { getNotificationsTokenAsync } from '../../services/notifications'
import { mockData } from './mockData'
import { PublicModulesResponse } from './types'

const __MOCK__ = false

function useApi(apiCall, args = undefined): PublicModulesResponse {
  return useSWR(
    `${args}`,
    async () => {
      if (__MOCK__) {
        await (async () => new Promise((resolve) => setTimeout(resolve, 3500)))()
        return mockData
      } else {
        const response = await apiCall(args)
        if (!response.ok) {
          const { status, problem, data } = response
          const error = new Error(
            `An error occurred while fetching the data. ${data?.error} ${data?.message} ${problem} ${status}`,
          )
          throw error
        }
        return response.data
      }
    },
    {
      suspense: true,
    },
  ) as PublicModulesResponse
}

export function usePublicModules(): PublicModulesResponse {
  return useApi(API.getPublicModules)
}

export async function setPublicModule(id?: number): Promise<string | null> {
  const deviceType = Platform.OS
  const deviceId = Constants.installationId
  const token = (await getNotificationsTokenAsync(true)) || 'NO_TOKEN'

  const response = await API.publicModuleReply({ id, token, deviceType, deviceId })
  if (!response.ok) {
    return null
  }
  return response.data.code
}
