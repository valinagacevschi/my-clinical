import React from 'react'
import { View } from 'react-native'
import { useRecoilValue } from 'recoil'
import { SafeView } from '../../components/shared'
import MedicationList from '../../components/medicationlist'
import EmptyCard from '../../components/emptycard'
import { useNavigation } from '@react-navigation/native'
import { t } from '../../locales'
import { medicationState, useForce } from '../../recoil/profile/selectors'

export default function MedicationsScreen(): JSX.Element {
  const payload = useRecoilValue(medicationState)
  const forceUpdate = useForce()
  const navigation = useNavigation()
  const margin = { margin: 20 }
  console.log('render MedicationsScreen')
  return (
    <SafeView wide>
      <MedicationList
        mode='all'
        data={payload}
        onRefresh={forceUpdate}
        emptyView={() => (
          <EmptyCard
            title={t('MEDICATIONS.title')}
            info={t('MEDICATIONS.info')}
            question={t('MEDICATIONS.question')}
            navigation={navigation}
          />
        )}
        footer={<View style={margin} />}
      />
    </SafeView>
  )
}
