/* eslint-disable react-native/no-inline-styles */
import React, { useRef, useCallback, useState } from 'react'
import CardStack, { Card } from 'react-native-card-stack-swiper'
import { ViewStyle, StyleSheet } from 'react-native'
import { useRecoilValue } from 'recoil'
import * as Sentry from 'sentry-expo'
import { Colors, Metrics } from '../../themes'
import { Button, ButtonType } from '../../components/button'
import { SafeView, CardView, Title, Info, Summary } from '../../components/shared'
import { useNavigation } from '@react-navigation/native'
import { t } from '../../locales'
import { symptomsState, treatmentCounters } from '../../recoil/profile/selectors'
import { API } from '../../services/api'

const BUTTON_TYPES: ButtonType[] = ['success', 'warning', 'error']

export default function SymptomsScreen(): JSX.Element {
  const navigation = useNavigation()
  const { symptoms, treatment_id } = useRecoilValue(symptomsState)
  const { surveysCount } = useRecoilValue(treatmentCounters)
  const [scores, setScores] = useState<ScoresType>({})

  const cardStackRef = useRef<CardStack>(null)

  const onPress = useCallback(async (item, result) => {
    const { id: symptom_id, medic_id } = item
    const severe = result === 2
    await symptomReply({ treatment_id, symptom_id, medic_id, severe, result })
    const score = (scores[treatment_id] || 0) + Math.pow(10, result)
    setScores((oldScores) => ({ ...oldScores, [treatment_id]: score }))
    // if !ok TODO: offline scores
    cardStackRef.current?.swipeLeft()
  }, [])

  const renderCard = useCallback((item) => {
    const { id, info, summary, options } = item
    const buttons = options && [...options]

    return (
      <Card style={styles.card} key={`key_${id}`}>
        <Title>{summary}</Title>
        <Summary style={{ marginBottom: 15 }}>{info}</Summary>
        {buttons &&
          buttons.map((opt, index) => (
            <Button
              key={`${index}`}
              full
              text={opt}
              type={BUTTON_TYPES[index]}
              onPress={() => onPress(item, index)}
            />
          ))}
      </Card>
    )
  }, [])

  const swipedAll = useCallback(async () => {
    const needSurvey = (Object.values(scores) as number[]).some((score) => score > 10)
    const scoresList = Object.entries(scores).map(([treatment_id, score]) => ({
      treatment_id,
      score,
    }))
    await treatmentReply(scoresList)
    setScores({})
    if (surveysCount > 0 && needSurvey) {
      navigation.navigate('survey', { canGoBack: true })
    }
  }, [scores])

  const renderNoMoreCards = () => {
    let title = t('SYM.title')
    let info = t('SYM.info')

    if (symptoms == null || symptoms.length === 0) {
      title = t('SYM.notFound')
      info = t('SYM.contactMD')
    }
    const inProgress = (Object.values(scores) as number[]).some((score) => score > 0)
    return (
      <CardView>
        <Title>{title}</Title>
        <Info>{info}</Info>
        <Info>{inProgress}</Info>
        <Button
          type={'error'}
          text={'Back Home'}
          onPress={() => navigation.goBack()}
          style={{ marginTop: 15, paddingHorizontal: 35 }}
        />
      </CardView>
    )
  }

  console.log('rendering SymptomsScreen')

  return (
    <SafeView>
      <CardStack
        ref={cardStackRef}
        style={styles.cardStack}
        secondCardZoom={0.65}
        verticalSwipe={false}
        disableBottomSwipe
        disableLeftSwipe
        disableRightSwipe
        disableTopSwipe
        outputRotationRange={['-0deg', '0deg', '0deg']}
        renderNoMoreCards={renderNoMoreCards}
        onSwipedAll={swipedAll}>
        {symptoms?.map((item) => renderCard(item))}
      </CardStack>
    </SafeView>
  )
}
type ScoresType = {
  [id: number]: number
}

type Styles = {
  cardStack: ViewStyle
  card: ViewStyle
}
const styles = StyleSheet.create<Styles>({
  card: {
    alignItems: 'center',
    backgroundColor: Colors.content,
    borderRadius: 15,
    justifyContent: 'center',
    padding: 20,
    shadowColor: 'rgba(30,30,30,0.5)',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,
    width: Metrics.screenWidth - 30,
  },
  cardStack: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
})

async function symptomReply(params): Promise<boolean> {
  const response = await API.symptomReply({ symptom_log: params })
  if (!response.ok) {
    Sentry.Native.captureEvent({
      sagas: 'symptomReply',
      ...response,
    })
  }
  return response.ok
}

async function treatmentReply(params): Promise<boolean> {
  const response = await API.treatmentReply({ treatment_log: params })
  if (!response.ok) {
    Sentry.Native.captureEvent({
      sagas: 'treatmentReply',
      ...response,
    })
  }
  return response.ok
}
