import React, { useState, useEffect } from 'react'
import { View, Image, Text, StyleSheet, StatusBar } from 'react-native'
import AppIntro from 'rn-falcon-app-intro'
import styled from 'styled-components/native'
import * as Sentry from 'sentry-expo'

import { Metrics, Colors } from '../../themes'
import { getNotificationsTokenAsync } from '../../services/notifications'
import { t } from '../../locales'
import { useSetProfileState } from '../../recoil'

export default function OnboardingScreen(): JSX.Element {
  const [notify, setNotify] = useState(false)
  const setProfile = useSetProfileState()

  useEffect(() => {
    StatusBar.setHidden(true)
    return () => StatusBar.setHidden(false)
  }, [])

  const onNext = (index: number) => {
    if (index === 1 && !notify) {
      setTimeout(() => {
        getNotificationsTokenAsync(true)
          .then((token = 'NO_TOKEN') => {
            setNotify(true)
            setProfile((oldProfile) => ({ ...oldProfile, token }))
          })
          .catch((err) => {
            Sentry.Native.captureException(err)
            console.log('ERR', err)
          })
      }, 850)
    }
  }

  const onSkip = (index: number) => {
    if (index < 1 && !notify) {
      getNotificationsTokenAsync(true)
        .then((token = 'NO_TOKEN') => {
          setProfile((oldProfile) => ({ ...oldProfile, token }))
        })
        .catch((err) => {
          Sentry.Native.captureException(err)
          console.log('ERR', err)
        })
    }
    onDone()
  }

  const onDone = () => {
    setProfile((oldProfile) => ({ ...oldProfile, onboarded: true }))
  }

  return (
    <View style={styles.container}>
      <AppIntro
        onSkipBtnClick={onSkip}
        onDoneBtnClick={onDone}
        onNextBtnClick={onNext}
        onSlideChange={onNext}
        dotColor={Colors.page}
        height={Metrics.screenHeight}
        activeDotColor={Colors.content}
        leftTextColor={Colors.page}
        rightTextColor={Colors.page}
        doneBtnLabel={<Button title={t('done')} />}
        skipBtnLabel={<Button title={t('skip')} />}>
        <View style={styles.slide}>
          <Image
            source={require('./img/slide1.png')}
            resizeMode={'contain'}
            style={styles.absolute}
          />
          <Title>{t('ONB.slideOne')}</Title>
          <Info>{t('ONB.slideOneDetails')}</Info>
        </View>
        <View style={styles.slide}>
          <Image
            source={require('./img/slide2.png')}
            resizeMode={'contain'}
            style={styles.absolute}
          />
          <Title>{t('ONB.slideTwo')}</Title>
          <Info>{t('ONB.slideTwoDetails')}</Info>
        </View>
        <View style={styles.slide}>
          <Image
            source={require('./img/slide3.png')}
            resizeMode={'contain'}
            style={styles.absolute}
          />
          <Title>{t('ONB.slideThree')}</Title>
          <Info>{t('ONB.slideThreeDetails')}</Info>
        </View>
      </AppIntro>
    </View>
  )
}

const Button = ({ title }: { title: string }) => (
  <Text style={styles.button}>{title}</Text>
)

const Title = styled.Text`
  color: ${Metrics.isIphoneX() ? '#222' : '#fff'};
  font-size: 24px;
  padding-bottom: 15px;
  font-weight: bold;
  text-align: center;
  padding-top: ${Metrics.isIphoneX() ? 420 : 0}px;
`

const Info = styled.Text`
  color: ${Metrics.isIphoneX() ? '#222' : '#fff'};
  font-size: 16px;
  text-align: center;
  padding-horizontal: 40px;
`

const styles = StyleSheet.create({
  absolute: {
    borderColor: 'transparent',
    borderWidth: 0.1,
    bottom: 0,
    height: Metrics.screenHeight,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    width: Metrics.screenWidth,
  },
  button: {
    fontSize: 20,
  },
  container: { flex: 1, marginTop: Metrics.screenOffset },
  slide: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    paddingTop: 230,
    position: 'relative',
    width: Metrics.screenWidth,
  },
})
