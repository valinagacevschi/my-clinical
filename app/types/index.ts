export interface MedProps {
  summary: string
  description: string
  start: Date
  control: boolean
  state: string | null
}

export interface MedicationProps extends MedProps {
  id: number
  description: string
  patient_name: string
  comments: string | null
  state: string | null
  level?: string
  confirmed: boolean
  start_time?: string
  end?: Date
  sequence?: number
  day?: string
  today?: boolean
  pastDay?: boolean
}

export interface State {
  startup: Startup
  profile: Profile
  surveys: Surveys
  symptoms: Symptoms
  medications: Medications
  treatments: Treatments
  messages: Messages
}

export interface Startup {
  rehydrated: boolean
}

export interface Profile {
  registered: boolean
  onboarded: boolean
  token: string
  codes: Array<string>
  code: string
  fetching: boolean
  error: string
  location: { lat: number; lon: number }
  hash: { hash: string; date: string }
}

export interface Treatment {
  id: number
  name: string
  start: string
  completed: string
  level: 'G' | 'O' | 'R'
  score: number
  medic: { id: number; name: string }
  patient: { name: string }
}

export interface Log {
  id: number
  treatment_id: number
  score: number
  viewed: boolean
  created_at: string
}

export interface Message {
  id: number
  content: string
  viewed: boolean
  date: string
}

export interface Treatments extends BaseRedux {
  payload: Treatment[]
  logs: Log[]
}

export interface Medications extends BaseRedux {
  payload: Array<any>
}

export interface Surveys extends BaseRedux {
  payload: Array<any>
  logs: Array<any>
}

export interface Symptoms extends BaseRedux {
  payload: Array<any>
  scores: any
}

export interface Messages extends BaseRedux {
  payload: Message[]
}

interface BaseRedux {
  fetching: boolean
  error: boolean
}
