import {
  SetterOrUpdater,
  useRecoilCallback,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil'
import { asyncReset } from '../utils'
import { key, profileState, ProfileType } from './atom'

export const useProfileState = (): [ProfileType, SetterOrUpdater<ProfileType>] =>
  useRecoilState(profileState)

export const useProfileStateValue = (): ProfileType => useRecoilValue(profileState)

export const useSetProfileState = (): SetterOrUpdater<ProfileType> =>
  useSetRecoilState(profileState)

export function useResetProfileState(): () => Promise<void> {
  return useRecoilCallback(({ snapshot, set }) => async () => {
    await asyncReset(key)
    const state = await snapshot.getPromise(profileState)
    set(profileState, { ...state, registered: false, code: undefined })
  })
}
