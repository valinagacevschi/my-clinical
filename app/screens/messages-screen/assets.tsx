/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { InputToolbar, Composer, Bubble, Send, IMessage } from 'react-native-gifted-chat'
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons'
import { Colors } from '../../themes'

export function renderBubble(props: any): React.ReactNode {
  return (
    <Bubble
      {...props}
      wrapperStyle={{
        right: { backgroundColor: Colors.page },
        left: {},
      }}
      textStyle={{
        right: { color: '#ffffff' },
        left: {},
      }}
    />
  )
}

export function renderSend(props: IMessage): JSX.Element {
  return (
    <Send {...props}>
      <View style={styles.sendingContainer}>
        <FontAwesome5 name='paper-plane' size={24} color={Colors.page} />
      </View>
    </Send>
  )
}

export function ScrollToBottomComponent(): JSX.Element {
  return (
    <View style={styles.bottomComponentContainer}>
      <MaterialCommunityIcons
        name='chevron-double-down'
        size={24}
        color={Colors.page}
        style={{}}
      />
    </View>
  )
}

export function renderInputToolbar(props: any): JSX.Element {
  return (
    <InputToolbar
      {...props}
      containerStyle={styles.container}
      primaryStyle={styles.primary}
    />
  )
}

export function renderComposer(props: any): JSX.Element {
  return (
    <Composer
      {...props}
      textInputStyle={{
        color: Colors.page,
      }}
    />
  )
}

const styles = StyleSheet.create({
  bottomComponentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: { marginTop: -20 },
  primary: {
    borderColor: '#33333333',
    borderRadius: 30,
    borderWidth: 1,
    marginHorizontal: 10,
    marginVertical: 5,
    paddingHorizontal: 10,
    paddingTop: 7,
  },
  sendingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    right: 7,
    top: -15,
  },
})
