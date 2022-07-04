/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { View } from 'react-native'
import { Video } from 'expo-av'
import { Metrics } from '../../themes'

interface Props {
  currentMessage: {
    video?: string
  }
}

export function renderMessageVideo({
  currentMessage: { video: uri = '' },
}: Props): JSX.Element {
  return (
    <View style={{ padding: 0 }}>
      <Video
        resizeMode='contain'
        useNativeControls
        shouldPlay={false}
        source={{ uri }}
        style={{
          width: Metrics.screenWidth - 60,
          height: (Metrics.screenWidth - 60) / 2,
        }}
      />
    </View>
  )
}
