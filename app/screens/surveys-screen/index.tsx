/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useState } from 'react'
import styled from 'styled-components/native'
import { ScrollView } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useRecoilValue } from 'recoil'
import moment from 'moment'
import * as Sentry from 'sentry-expo'
import { Colors } from '../../themes'
import { Button } from '../../components/button'
import { SafeView, CardView, Title, ButtonBar, H3 } from '../../components/shared'
import QuestionsScreen from './questions'
import { SurveyScreenRouteProp } from '../../navigation/types'
import { t } from '../../locales'
import { surveysState } from '../../recoil/profile/selectors'
import { API } from '../../services/api'

export default function SurveysScreen(): JSX.Element {
  const navigation = useNavigation()
  const route = useRoute<SurveyScreenRouteProp>()
  const { canGoBack } = route.params || {}

  const [score, setScore] = useState(0)
  const { surveys, treatment_id } = useRecoilValue(surveysState)

  const onBack = useCallback(
    async (survey_id: number, score: number) => {
      setScore(score)
      await surveyReply({ treatment_id, survey_id, score, timestamp: +new Date() })
    },
    [treatment_id],
  )

  const goBack = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'main' }],
    })
  }

  const ongoing = score > 0
  const buttonText = ongoing ? t('SRV.retake') : t('SRV.start')
  console.log('rendering SurveysScreen')

  return (
    <SafeView wide>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          paddingVertical: 40,
        }}>
        {surveys == null || surveys.length <= 0 ? (
          <CardView>
            <Title>{t('SRV.notFound')}</Title>
            <H3>{t('SRV.noSurvey')}</H3>
            <Button
              text={t('backHome')}
              type={'error'}
              style={{ marginTop: 25, paddingHorizontal: 35 }}
              onPress={() => navigation.navigate('main')}
            />
          </CardView>
        ) : (
          surveys.map((item) => {
            const { id, name, summary, survey_logs: logs } = item
            const hasLogs = logs && logs.length > 0
            return (
              <CardView key={`${id}`} style={{ marginVertical: 40 }}>
                <Title>{name}</Title>
                {!(ongoing || hasLogs) ? (
                  <Summary>{summary}</Summary>
                ) : ongoing ? (
                  <Summary center>{t('SRV.success', { score })}</Summary>
                ) : (
                  <Summary>
                    {t('SRV.done', {
                      lastScore: logs[0].score,
                      lastDate: moment(logs[0].taken).format('dddd, DD MMMM YYYY'),
                      later: moment(logs[0].taken)
                        .add(4, 'weeks')
                        .format('dddd, DD MMMM YYYY'),
                    })}
                  </Summary>
                )}
                <ButtonBar>
                  {canGoBack && (
                    <Button text={t('notNow')} type={'error'} onPress={() => goBack()} />
                  )}
                  <Button
                    text={buttonText}
                    full={!canGoBack}
                    onPress={() => navigation.navigate('questions', { item, onBack })}
                  />
                </ButtonBar>
              </CardView>
            )
          })
        )}
      </ScrollView>
    </SafeView>
  )
}

export { QuestionsScreen, SurveysScreen }

const Summary = styled.Text<{ center?: boolean }>`
  font-size: 16px;
  line-height: 24px;
  color: ${Colors.snow};
  text-align: ${(props) => (props.center ? 'center' : 'left')};
  padding-bottom: 10px;
`

async function surveyReply(params): Promise<boolean> {
  const response = await API.surveyReply({ survey_log: params })
  if (!response.ok) {
    Sentry.Native.captureEvent({
      sagas: 'surveyReply',
      ...response,
    })
  }
  return response.ok
}
