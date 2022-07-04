import * as React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import Animated from 'react-native-reanimated'
import { CardProps } from './types'

export function Card(props: CardProps): JSX.Element {
  const { profile, likeOpacity = 0, nopeOpacity = 0 } = props
  return (
    <View style={StyleSheet.absoluteFill}>
      <View style={styles.overlay}>
        <View style={styles.header}>
          <Animated.View style={[styles.like, { opacity: likeOpacity }]}>
            <Text style={styles.likeLabel}>LIKE</Text>
          </Animated.View>
          <Animated.View style={[styles.nope, { opacity: nopeOpacity }]}>
            <Text style={styles.nopeLabel}>NOPE</Text>
          </Animated.View>
        </View>
        <View style={styles.footer}>
          <Text style={styles.name}>{profile.name}</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  like: {
    borderColor: '#6ee3b4',
    borderRadius: 5,
    borderWidth: 4,
    padding: 8,
  },
  likeLabel: {
    color: '#6ee3b4',
    fontSize: 32,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 32,
  },
  nope: {
    borderColor: '#ec5288',
    borderRadius: 5,
    borderWidth: 4,
    padding: 8,
  },
  nopeLabel: {
    color: '#ec5288',
    fontSize: 32,
    fontWeight: 'bold',
  },
  overlay: {
    backgroundColor: 'white',
    borderColor: 'red',
    borderWidth: 3,
    flex: 1,
    justifyContent: 'space-between',
    padding: 16,
  },
})
