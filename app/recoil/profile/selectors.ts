import moment from 'moment'
import { atom, selector, useSetRecoilState } from 'recoil'
import * as Sentry from 'sentry-expo'
import { API } from '../../services/api'
import { formatTreatments } from '../../services/transforms'
import { isPastDay, isTillNow, isToday } from '../../services/utils'
import { profileState } from './atom'

const ForceReload = atom({ key: 'forcereload', default: 0 })

export const useForce = (): (() => void) => {
  const setter = useSetRecoilState(ForceReload)
  return () => setter((v) => v + 1)
}

export const treatmentListState = selector({
  key: 'treatmentListState',
  get: async ({ get }) => {
    get(ForceReload)
    const { code } = get(profileState)
    const response = await API.getTreatments({ codes: [code], full: true })
    if (!response.ok) {
      Sentry.Native.captureEvent({
        currentTreatment: 'getTreatments',
        ...response,
      })
    }
    return formatTreatments(response.data)
  },
})

export const surveyLogsState = selector({
  key: 'surveyLogsState',
  get: async ({ get }) => {
    get(ForceReload)
    const { code } = get(profileState)
    const response = await API.getSurveyLogs({ codes: [code] })
    if (!response.ok) {
      Sentry.Native.captureEvent({
        currentTreatment: 'getTreatments',
        ...response,
      })
    }
    return response.data
  },
})

export const messagesState = selector({
  key: 'messagesState',
  get: async ({ get }) => {
    get(ForceReload)
    const { code } = get(profileState)
    const response = await API.getMessages({ codes: [code] })
    if (!response.ok) {
      Sentry.Native.captureEvent({
        currentTreatment: 'getMessages',
        ...response,
      })
    }
    return response.data
  },
})

/**
 * MEDICATION SELECTORS
 */

const treatmentState = selector({
  key: 'teatmentState',
  get: ({ get }) => {
    const treatments = get(treatmentListState)
    if (treatments.length === 0) return {}
    const { id, name, medications, symptoms, surveys } = treatments[0]
    return { id, name, medications, symptoms, surveys }
  },
})

export const firstTreatment = selector({
  key: 'firstTreatment',
  get: ({ get }) => {
    const { id, name } = get(treatmentState)
    return { id, name }
  },
})

export const newMedicationState = selector({
  key: 'newMedicationState',
  get: ({ get }) => {
    const { medications } = get(treatmentState)
    if (medications == null) return {}
    const toConfirm = medications
      .filter(
        (item) => (isTillNow(item.start) || isPastDay(item.start)) && !item.confirmed,
      )
      .sort((a, b) => moment(a.start).valueOf() - moment(b.start).valueOf())
      .map((item) => ({
        pastDay: isPastDay(item.start),
        ...item,
      }))
    return {
      toConfirm,
      noData: medications.length === 0,
    }
  },
})

export const medicationState = selector({
  key: 'medicationState',
  get: ({ get }) => {
    const { medications } = get(treatmentState)
    return medications || []
  },
})

export const todayMedicationState = selector({
  key: 'todayMedicationState',
  get: ({ get }) => {
    const meds = get(medicationState)
    return meds.filter((item) => isToday(item.start) && !item.comtrol)
  },
})

export const treatmentCounters = selector({
  key: 'treatmentCounters',
  get: ({ get }) => {
    const { medications, symptoms, surveys } = get(treatmentState)
    if (medications == null) return {}
    const today = medications?.filter((item) => !item.confirmed && isTillNow(item.start))
      ?.length
    const old = medications?.filter((item) => !item.confirmed && isPastDay(item.start))
      ?.length
    const total = medications?.filter((item) => !item.control).length
    const taken = medications?.filter((item) => item.confirmed).length
    const symptomsCount = symptoms?.length ?? 0
    const surveysCount = surveys?.length ?? 0
    return { today, old, total, taken, symptomsCount, surveysCount }
  },
})

export const symptomsState = selector({
  key: 'symptomsState',
  get: ({ get }) => {
    const { symptoms, id } = get(treatmentState)
    return { symptoms, treatment_id: id }
  },
})

export const surveysState = selector({
  key: 'surveysState',
  get: ({ get }) => {
    const { surveys, id } = get(treatmentState)
    return { surveys, treatment_id: id }
  },
})
