import { RouteProp } from '@react-navigation/native'
import { MedProps } from '../types'

export type MedicationStackParamList = {
  medication: {
    data: MedProps[]
  }
}

export type MedicationScreenRouteProp = RouteProp<MedicationStackParamList, 'medication'>

export interface SurveyLog {
  id: number
  score: number
  taken: Date
  viewed: boolean
  level?: string
  info?: string
}

export type MainStackParamList = {
  main: undefined
  symptoms: undefined
  treatment: undefined
  survey: {
    canGoBack: boolean
  }
  questions: {
    item: {
      id: number
      questions: []
    }
    onBack: (id: number, sum: number) => void
  }
  treatments: undefined
  medication: undefined
  messages: undefined
  results: {
    logs: SurveyLog[]
  }
  help: undefined
}

export type SurveyScreenRouteProp = RouteProp<MainStackParamList, 'survey'>
export type QuestionsScreenRouteProp = RouteProp<MainStackParamList, 'questions'>
export type ResultsScreenRouteProp = RouteProp<MainStackParamList, 'results'>
