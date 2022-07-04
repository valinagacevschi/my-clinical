import React from 'react'
import { SafeView } from '../../components/shared'
import MedicationList from '../../components/medicationlist'
import { useRoute } from '@react-navigation/native'
import { MedicationScreenRouteProp } from '../../navigation/types'

export default function MedicationScreen(): JSX.Element {
  const route = useRoute<MedicationScreenRouteProp>()
  const { data } = route.params || {}
  return (
    <SafeView>
      <MedicationList mode={'all'} data={(data || []).filter((item) => !item.control)} />
    </SafeView>
  )
}
