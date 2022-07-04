/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from 'moment'
import { MedicationProps } from '../../types'

const formatMedication = (medication: MedicationProps): any => {
  const {
    id,
    summary,
    description,
    control,
    state,
    level,
    comments,
    patient_name,
  } = medication
  let { start, end } = medication
  if (state === 'delayed') {
    start = end = moment(start).add(1, 'hours').toDate()
  }
  return {
    confirmed: state === 'skipped' || state === 'taken',
    state,
    start,
    level,
    end,
    control,
    id,
    summary,
    description,
    comments,
    patient_name,
  }
}

const formatMedications = (data: MedicationProps[]): any => data.map(formatMedication)

export const formatSurveyLogs = (data: any[]): any => {
  const newData = {}
  data.forEach((item) => {
    const { id, survey_id, treatment_id, score, taken } = item
    const key = `${survey_id}_${treatment_id}`
    const arr = newData[key]
    if (arr) {
      arr.push({ id, score, taken: new Date(taken) })
    } else {
      newData[key] = [{ id, score, taken: new Date(taken) }]
    }
  })
  return newData
}

export const formatTreatments = (data: any[]): any =>
  data.map((treatment) => {
    const { medications: oldMedications, ...rest } = treatment
    const medicationCount = (oldMedications || []).filter((m) => !m.control).length
    const controlCount = (oldMedications || []).filter((m) => m.control).length
    const medications = formatMedications(oldMedications)
    return { ...rest, medications, medicationCount, controlCount }
  })
