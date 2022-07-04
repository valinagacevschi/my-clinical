import * as Permissions from 'expo-permissions'
import moment from 'moment'
import { MedProps } from '../../types'

type Start = string | Date | moment.Moment

type DataSet = {
  [key: string]: Array<MedProps>
}
type NotesSet = {
  [key: string]: string
}

const now = () => (__DEV__ ? moment('2020-12-26 18:20:00') : moment())

export const isPastDay = (start: Start): boolean =>
  moment(now()).isSame(moment(start).add(1, 'day'), 'day')

export const isToday = (start: Start): boolean => moment(start).isSame(now(), 'day')

export const isTillNow = (start: Start): boolean =>
  moment(start).isBefore(now()) && moment(start).isSame(now(), 'day')

export const postponed = (start: Start): string => moment(start).add(1, 'hours').format()

export const parseUrlParams = (url: string): { code: string | null } | null => {
  const regex = /[?&]([^=#]+)=([^&#]*)/g
  const params = { code: null }
  let match: RegExpExecArray | null
  while ((match = regex.exec(url))) {
    params[match[1]] = match[2]
  }
  if (Object.keys(params).length > 0) {
    return params
  }
  return null
}

export const isCodeOk = (code: string): boolean => /^\d{6}$/gm.test(code)

export const isDenied = async (
  permission: Permissions.PermissionType,
): Promise<boolean> => {
  const permissionResponse = await Permissions.getAsync(permission)
  const { status: existingStatus } = permissionResponse
  let finalStatus = existingStatus

  if (existingStatus !== 'granted') {
    const { status } = await Permissions.askAsync(permission)
    finalStatus = status
  }
  return finalStatus !== 'granted'
}

export const MedicationsArrayToSet = (
  data: Array<MedProps>,
  callback: (item: MedProps) => string,
): DataSet => {
  const dataSet = {}
  const array = [...data]
  array
    .sort((a, b) => +new Date(a.start) - +new Date(b.start))
    .forEach((item) => {
      const key = `${callback(item)}`
      const arr = dataSet[key]
      if (arr) {
        arr.push({ ...item })
      } else {
        dataSet[key] = [{ ...item }]
      }
    })
  return dataSet
}

export const getMedicationDataSet = (medications: Array<MedProps>): NotesSet => {
  const dataSet = MedicationsArrayToSet(medications, (item: MedProps) =>
    moment(item.start).format('YYYY-MM-DD HH:mm'),
  )
  const notes: NotesSet = {}
  for (const key in dataSet) {
    const count = dataSet[key].length
    notes[key] = count > 1 ? `${count} medications` : `${dataSet[key][0].summary}`
  }
  return notes
}
