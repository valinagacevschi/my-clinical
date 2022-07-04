import React, { useCallback, useEffect } from 'react'
import { Linking } from 'react-native'
import * as Sentry from 'sentry-expo'

import { isCodeOk, parseUrlParams } from './app/services/utils'
import { MainRouter, OnboardingRouter, RegisterRouter } from './app/navigation'
import { NavigationContainer } from '@react-navigation/native'
import { useProfileState } from './app/recoil'

export default function AppEntry(): JSX.Element {
  const [{ onboarded, registered }, setProfile] = useProfileState()

  useEffect(() => {
    Linking.getInitialURL()
      .then((url) => {
        retrieveLinkParams({ url })
      })
      .catch((err) => {
        Sentry.Native.captureException(err)
      })

    Linking.addEventListener('url', retrieveLinkParams)
  }, [])

  const retrieveLinkParams = useCallback((event: { url: string | null }) => {
    const params = parseUrlParams(event.url || '')
    const { code } = params || {}
    if (isCodeOk(code)) {
      setProfile((oldState) => ({ ...oldState, code }))
    }
  }, [])

  return (
    <NavigationContainer>
      {!onboarded ? (
        <OnboardingRouter />
      ) : !registered ? (
        <RegisterRouter />
      ) : (
        <MainRouter />
      )}
    </NavigationContainer>
  )
}
