/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react'
import {
  View,
  Animated,
  Easing,
  AppState,
  Platform,
  BackHandler,
  StyleSheet,
} from 'react-native'
import { useRecoilValue } from 'recoil'
import { useNavigation } from '@react-navigation/native'
import * as Sentry from 'sentry-expo'
import { Colors } from '../../themes'
import { SafeView, Title, Info, Loader } from '../../components/shared'
import { BigButton } from '../../components/bigbutton'
import { resetBadges, getNotificationsTokenAsync } from '../../services/notifications'
import { IconButton } from '../../components/iconbutton'
import { t } from '../../locales'
import { useProfileState } from '../../recoil'
import {
  firstTreatment,
  treatmentCounters,
  useForce,
} from '../../recoil/profile/selectors'

const animatedOptions = {
  toValue: 1,
  duration: 500,
  delay: 200,
  easing: Easing.out(Easing.quad),
  useNativeDriver: true,
}

export default function MainScreen(): JSX.Element {
  const [{ token }, setProfile] = useProfileState()
  const { today, old, symptomsCount, surveysCount } = useRecoilValue(treatmentCounters)
  const treatment = useRecoilValue(firstTreatment)
  const forceUpdate = useForce()

  const [appState, setAppState] = useState(AppState.currentState)
  const done = useRef(false)
  const navigation = useNavigation()
  const animatedButtons = [
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
  ]

  useEffect(() => {
    if (done.current) {
      done.current = false
      Animated.parallel([
        Animated.timing(animatedButtons[0], {
          ...animatedOptions,
        }),
        Animated.timing(animatedButtons[1], {
          ...animatedOptions,
          delay: 500,
        }),
        Animated.timing(animatedButtons[2], {
          ...animatedOptions,
          delay: 800,
        }),
      ]).start()
    }
  })

  useEffect(() => {
    if (token == null) {
      getNotificationsTokenAsync(true)
        .then((token = 'NO_TOKEN') => {
          setProfile((oldProfile) => ({ ...oldProfile, token }))
        })
        .catch((err) => {
          Sentry.Native.captureException(err)
        })
    }
    AppState.addEventListener('change', handleAppStateChange)
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonPressAndroid)
    const unsubscribe = navigation.addListener('focus', () => {
      reload()
    })
    done.current = true

    return () => {
      unsubscribe()
      AppState.removeEventListener('change', handleAppStateChange)
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonPressAndroid)
    }
  }, [])

  const reload = () => {
    resetBadges()
    forceUpdate()
  }

  const handleBackButtonPressAndroid = () => {
    return navigation.isFocused()
  }

  const handleAppStateChange = (state: any) => {
    setAppState(state)
    done.current = true
    if (state === 'active') {
      reload()
    }
  }

  const count = old + today
  const days =
    old == 0 ? t('HOME.today') : today == 0 ? t('HOME.yesterday') : t('HOME.both')

  const hasSymptoms = symptomsCount > 0
  const symptomSubtitle = hasSymptoms
    ? t('HOME.symptoms_text')
    : t('HOME.symptoms_text_empty')

  const hasTreatment = count > 0
  const emptySubtitle =
    count === 0 ? t('HOME.treatment_text_zero') : t('HOME.treatment_text_empty')
  const treatmentSubtitle = hasTreatment
    ? t('HOME.treatment_text', { count, days })
    : emptySubtitle

  const hasSurveys = surveysCount > 0
  const surveySubtitle = hasSurveys
    ? t('HOME.surveys_text')
    : t('HOME.surveys_text_empty')
  console.log('rendering MainScreen')
  return (
    <SafeView>
      {count < 0 || appState === 'inactive' ? (
        <Loader size='large' color={Colors.snow} />
      ) : (
        <>
          <View style={styles.flex}>
            <View style={styles.title}>
              <Info>{t('HOME.welcome')}</Info>
              <Title style={styles.titleText}>{treatment.name}</Title>
            </View>
            <IconButton
              name='comments'
              onPress={() => navigation.navigate('messages')}
              style={styles.iconButton}
            />
            <BigButton
              flex={3}
              title={t('HOME.symptoms')}
              animatedValue={animatedButtons[0]}
              subtitle={symptomSubtitle}
              onPress={() => navigation.navigate('symptoms')}
              disabled={!hasSymptoms}
            />
            <BigButton
              flex={3}
              animatedValue={animatedButtons[1]}
              count={count}
              title={t('HOME.treatment')}
              subtitle={`${treatmentSubtitle}`}
              onPress={() => navigation.navigate('treatment')}
              disabled={!hasTreatment}
            />
            <BigButton
              flex={3}
              animatedValue={animatedButtons[2]}
              count={count}
              title={t('HOME.surveys')}
              subtitle={`${surveySubtitle}`}
              onPress={() => navigation.navigate('survey')}
              disabled={!hasSurveys}
            />
          </View>
        </>
      )}
    </SafeView>
  )
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  iconButton: {
    position: 'absolute',
    right: -15,
    top: Platform.OS === 'ios' ? -5 : 5,
  },
  title: { marginBottom: 20, marginTop: 45 },
  titleText: { marginTop: 20 },
})
