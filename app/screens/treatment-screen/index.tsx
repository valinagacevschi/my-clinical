/* eslint-disable react-native/no-inline-styles */
import React, { useState, useRef, useCallback } from 'react'
import CardStack from 'react-native-card-stack-swiper'
import { ViewStyle, StyleSheet, Keyboard } from 'react-native'
import { useRecoilValue } from 'recoil'
import * as Sentry from 'sentry-expo'
import { MedicationCard } from '../../components/medicationcard'
import { ControlCard } from '../../components/controlcard'
import { Button } from '../../components/button'
import { SafeView, CardView, Title, Info, ButtonBar } from '../../components/shared'
import { isToday } from '../../services/utils'
import { useNavigation } from '@react-navigation/native'
import { t } from '../../locales'
import { newMedicationState } from '../../recoil/profile/selectors'
import { API } from '../../services/api'

export default function TreatmentScreen(): JSX.Element {
  const navigation = useNavigation()
  const { toConfirm, noData } = useRecoilValue(newMedicationState)

  const [noMore, setNoMore] = useState(false)
  const [comments, setComments] = useState(null)
  const cardStack = useRef<CardStack>(null)

  const swipeLeft = useCallback(
    async (index) => {
      const { id, control, start, state: oldState } = toConfirm[index]
      const delayed = oldState == 'delayed'
      const today = isToday(start)
      const state = control ? null : delayed ? 'skipped' : today ? 'delayed' : 'skipped'
      await medicationReply({ id, state, comments })
      if (comments) {
        setComments(null)
      }
    },
    [comments, toConfirm],
  )

  const swipeRight = useCallback(
    async (index) => {
      const { id, control } = toConfirm[index]
      const state = control ? 'confirmed' : 'taken'
      await medicationReply({ id, state })
    },
    [toConfirm],
  )

  const swipeCardLeft = () => cardStack?.current?.swipeLeft()
  const swipeCardRight = () => cardStack?.current?.swipeRight()

  const onPressLeft = (input) => {
    if (input) {
      setComments(input)
    }
    swipeCardLeft()
  }

  const renderCard = (item, index) =>
    item.control ? (
      <ControlCard
        key={`key_${index})`}
        item={item}
        onPressLeft={() => swipeCardLeft()}
        onPressRight={() => swipeCardRight()}
      />
    ) : (
      <MedicationCard
        key={`key_${index})`}
        item={item}
        onPressLeft={onPressLeft}
        onPressRight={() => swipeCardRight()}
      />
    )

  const renderNoMoreCards = () =>
    noMore && (
      <NoMedication title={t('TMT.title')} info={t('TMT.info')}>
        <ButtonBar style={{ marginTop: 25 }}>
          <Button text={t('notNow')} type={'error'} onPress={() => navigation.goBack()} />
          <Button
            text={t('HOME.symptoms')}
            onPress={() => navigation.navigate('symptoms')}
          />
        </ButtonBar>
      </NoMedication>
    )

  function onStartShouldSetResponder() {
    Keyboard.dismiss()
    return false
  }

  console.log('rendering TreatmentScreen')
  return (
    <SafeView onStartShouldSetResponder={onStartShouldSetResponder}>
      {noData ? (
        <NoMedication title={t('TMT.notFound')} info={t('TMT.contactMD')}>
          <Button
            text={t('backHome')}
            type={'error'}
            style={{ marginTop: 25, paddingHorizontal: 35 }}
            onPress={() => navigation.goBack()}
          />
        </NoMedication>
      ) : toConfirm == null || toConfirm.length === 0 ? (
        <NoMedication title={t('TMT.notToday')} info={t('TMT.warning')}>
          <Button
            text={t('HOME.symptoms')}
            style={{ marginVertical: 25, paddingHorizontal: 35 }}
            onPress={() => navigation.navigate('symptoms')}
          />
        </NoMedication>
      ) : (
        <CardStack
          ref={cardStack}
          style={styles.cardStack}
          secondCardZoom={0.65}
          verticalSwipe={false}
          outputRotationRange={['-45deg', '0deg', '45deg']}
          renderNoMoreCards={renderNoMoreCards}
          onSwipedRight={(index) => swipeRight(index)}
          onSwipedLeft={(index) => swipeLeft(index)}
          onSwipedAll={() => setNoMore(true)}>
          {toConfirm.map((item, index) => renderCard(item, index))}
        </CardStack>
      )}
    </SafeView>
  )
}
async function medicationReply(params) {
  const response = await API.medicationReply(params)
  if (!response.ok) {
    Sentry.Native.captureEvent({
      sagas: 'medicationReply',
      ...response,
    })
  }
}

export interface NoMedicationProps {
  title: string
  info: string
  children?: React.ReactNode
}

const NoMedication = (props: NoMedicationProps) => {
  return (
    <CardView>
      <Title>{props.title}</Title>
      <Info>{props.info}</Info>
      {props.children}
    </CardView>
  )
}

interface Styles {
  cardStack: ViewStyle
}
const styles = StyleSheet.create<Styles>({
  cardStack: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
})
