/* eslint-disable @typescript-eslint/no-explicit-any */
export default {
  // Functions return fixtures
  getTreatments: (): any => {
    return {
      ok: true,
      data: require('../../fixtures/treatments.json'),
    }
  },
  getTreatmentLogs: (): any => ({}),
  getMedications: (): any => ({
    ok: true,
    data: require('../../fixtures/medications.json'),
  }),
  getSymptoms: (): any => ({
    ok: true,
    data: require('../../fixtures/symptoms.json'),
  }),
  getSurveys: (): any => ({}),
  getSurveyLogs: (): any => ({}),
  treatmentReply: (): any => ({}),
  medicationReply: (): any => ({}),
  symptomReply: (): any => ({}),
  surveyReply: (): any => ({}),
  getMessages: (): any => ({
    ok: true,
    data: require('../../fixtures/messages.json'),
  }),
  setCode: (): any => ({
    ok: true,
  }),
  saveToken: (): any => ({
    ok: true,
  }),
}
