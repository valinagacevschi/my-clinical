/* eslint-disable react-native/no-inline-styles */
import React, { useCallback } from 'react'
import { View } from 'react-native'
import { useRecoilValue } from 'recoil'
import { SafeView, Info, H2 } from '../../components/shared'
import { Button } from '../../components/button'
import MedicationList from '../../components/medicationlist'
import EmptyCard from '../../components/emptycard'
import { useNavigation } from '@react-navigation/native'
import { t } from '../../locales'
import { todayMedicationState, useForce } from '../../recoil/profile/selectors'

export default function TodayScreen(): JSX.Element {
  const navigation = useNavigation()
  const medications = useRecoilValue(todayMedicationState)
  const forceUpdate = useForce()

  const renderHeader = useCallback(
    () => (
      <View style={{ marginHorizontal: 20, paddingBottom: 20 }}>
        <Info>{t('TODAY.headerInfo')}</Info>
        <Button
          text={t('TODAY.confirm')}
          style={{ width: '100%', marginVertical: 25 }}
          onPress={() => navigation.navigate('treatment')}
        />
        <H2>{t('TODAY.heading')}</H2>
      </View>
    ),
    [navigation],
  )

  console.log('rendering TodayScreen')
  return (
    <SafeView wide>
      <MedicationList
        mode='today'
        data={medications}
        onRefresh={forceUpdate}
        header={renderHeader}
        footer={<View style={{ margin: 20 }} />}
        emptyView={
          <EmptyCard
            title={t('TODAY.title')}
            info={t('TODAY.info')}
            question={t('TODAY.question')}
            navigation={navigation}
          />
        }
      />
    </SafeView>
  )
}
