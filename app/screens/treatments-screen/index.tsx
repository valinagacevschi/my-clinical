/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { ScrollView, ActivityIndicator } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useRecoilValue } from 'recoil'
import styled from 'styled-components/native'
import moment from 'moment'
import { SafeView, CardView } from '../../components/shared'
import { Colors } from '../../themes'
import { Button } from '../../components/button'
import { t } from '../../locales'
import { treatmentListState } from '../../recoil/profile/selectors'

export default function TreatmentsScreen(): JSX.Element {
  const navigation = useNavigation()
  const treatments = useRecoilValue(treatmentListState)

  console.log('rendering TreatmentsScreen')
  return (
    <SafeView>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {!treatments ? (
          <ActivityIndicator size='large' color={Colors.snow} />
        ) : treatments.length === 0 ? (
          <CardView style={{ backgroundColor: 'white' }}>
            <Title>{t('MODULE.noModule')}</Title>
            <Info style={{ textAlign: 'center' }}>{t('MODULE.checkText')}</Info>
            <Button
              text={t('MODULE.backButton')}
              type={'error'}
              style={margins}
              onPress={() => navigation.navigate('main')}
            />
          </CardView>
        ) : (
          treatments.map((item) => {
            const {
              id,
              name,
              start,
              completed,
              medic,
              medications,
              symptoms,
              surveys,
              prescription,
            } = item
            const { description, duration } = prescription || {}
            const symtomList = symptoms.map((sym) => sym.name).join(', ')
            const survelyList = surveys.map((srv) => srv.name).join(', ')
            const meds = [...new Set(medications.map((med) => med.summary))].join(', ')

            return (
              <CardView style={{ backgroundColor: 'white' }} key={`${id}`}>
                <Title numberOfLines={1}>{name}</Title>
                <Head>
                  <Subtitle>{t('MODULE.description')}</Subtitle>
                </Head>
                <Info>{description}</Info>
                {medic ? (
                  <>
                    <Head>
                      <Subtitle>{t('MODULE.medic')}</Subtitle>
                    </Head>
                    <Info>{medic?.name}</Info>
                  </>
                ) : null}
                <Head>
                  <Subtitle>{t('MODULE.active')}</Subtitle>
                  <Info></Info>
                </Head>
                <Info>
                  {moment(start).format('ddd, D MMM')} -{' '}
                  {moment(completed).format('ddd, D MMM')}, {duration} {t('MODULE.days')}
                </Info>
                <Head>
                  <Subtitle>{t('HOME.symptoms')}</Subtitle>
                </Head>
                <Info>{symtomList}</Info>
                <Head>
                  <Subtitle>{t('HOME.surveys')}</Subtitle>
                </Head>
                <Info>{survelyList}</Info>
                <Head>
                  <Subtitle>{t('MODULE.medication')}</Subtitle>
                </Head>
                {medications?.length > 0 ? (
                  <>
                    <Info>{meds}</Info>
                    <Button
                      style={margins}
                      full
                      text={t('MODULE.viewButton')}
                      onPress={() =>
                        navigation.navigate('medication', {
                          data: medications,
                        })
                      }
                    />
                  </>
                ) : (
                  <Info>{t('MODULE.noMedication')}</Info>
                )}
              </CardView>
            )
          })
        )}
      </ScrollView>
    </SafeView>
  )
}

const margins = { marginTop: 25, paddingHorizontal: 35 }

const Title = styled.Text`
  font-weight: bold;
  font-size: 24px;
  color: ${Colors.coal};
  text-align: center;
`

const Head = styled.View`
  flex-direction: row;
  justify-content: space-between;
  border-color: ${Colors.coal};
  border-bottom-width: 1px;
  width: 100%;
  padding: 5px 0;
  margin: 3px 0;
`

const Subtitle = styled.Text`
  font-size: 19px;
  font-style: italic;
  line-height: 26px;
  color: ${Colors.coal};
`

const Info = styled.Text`
  font-size: 17px;
  line-height: 24px;
  color: ${Colors.coal};
  margin-bottom: 5px;
`
