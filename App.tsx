import React, { Suspense } from 'react'
import { StatusBar, Modal, ActivityIndicator } from 'react-native'
import { RecoilRoot } from 'recoil'
import 'expo-asset'
import * as Sentry from 'sentry-expo'
import AppEntry from './AppEntry'
import { Colors } from './app/themes'
import './app/config'

Sentry.init({
  dsn: 'https://f938a733dd18427a9e0f3c67e9733808@o371315.ingest.sentry.io/5327835',
  enableInExpoDevelopment: false,
  enableAutoSessionTracking: true,
  debug: false,
})

export default function App(): JSX.Element {
  return (
    <RecoilRoot>
      <StatusBar backgroundColor={Colors.bar} barStyle='light-content' />
      <Suspense fallback={<ActivityIndicator />}>
        <AppEntry />
      </Suspense>
      <Modal animationType='slide' transparent={true} visible={false} />
    </RecoilRoot>
  )
}
