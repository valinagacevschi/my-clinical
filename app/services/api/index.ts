import apisauce from 'apisauce'
import { getConfig, reactotron } from '../../config'

const TIMEOUT = 3000
const { url } = getConfig()

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const create = (baseURL = url): any => {
  const api = apisauce.create({
    baseURL,
    headers: {
      'Cache-Control': 'no-cache',
      // Authorization: `Basic secret-token`,
      'Accept': 'application/json',
    },
    timeout: TIMEOUT,
  })

  if (__DEV__) {
    api.addMonitor(reactotron.apisauce)
  }

  const getTreatments = (params) => api.post('treatments/', params)

  const getSurveyLogs = (params) => api.post('survey_logs/', params)

  const getMessages = (params) => api.post('messages/', params)

  const treatmentReply = (params) => api.post('treatment/', params)

  const medicationReply = (params) => api.post('medication/', params)

  const symptomReply = (params) => api.post('symptom/', params)

  const surveyReply = (params) => api.post('survey/', params)

  const messageReply = (params) => api.post('message/', params)

  const setCode = (params) => api.post('code/', params)

  const getPublicModules = () => api.post('published/', {})

  const publicModuleReply = (params) => api.post('provision', params)

  return {
    setCode,
    getTreatments,
    getSurveyLogs,
    getMessages,
    treatmentReply,
    medicationReply,
    symptomReply,
    surveyReply,
    messageReply,
    getPublicModules,
    publicModuleReply,
  }
}

export const API = create()

export default { create }

export const testAsync = async (param: string): Promise<string> => {
  console.log('testAsync', param)
  return `==${param}==`
}
