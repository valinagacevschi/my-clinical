import { atom } from 'recoil'
import { I18n } from '../../locales'
import { defaultAsync, localStorageEffect } from '../utils'
import { setCodeEffect } from './effects'

export type ProfileType = {
  registered: boolean
  onboarded: boolean
  token: string | null
  code?: string
  locale: string
}

const defaultState: ProfileType = {
  registered: false,
  onboarded: false,
  token: null,
  code: undefined,
  locale: I18n.locale,
}

export const key = 'profileState'

export const profileState = atom<ProfileType>({
  key,
  default: defaultAsync(key, defaultState),
  effects_UNSTABLE: [localStorageEffect(key), setCodeEffect],
})
