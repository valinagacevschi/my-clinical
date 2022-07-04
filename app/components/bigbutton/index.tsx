/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react'
import {
  Animated,
  TouchableOpacity,
  StyleSheet,
  TouchableOpacityProps,
  View,
} from 'react-native'
import { Colors, Metrics } from '../../themes'
import { LinearGradient } from 'expo-linear-gradient'
import { H1, Info } from '../shared'

export interface BigButtonProps extends TouchableOpacityProps {
  title?: string
  subtitle?: string
  count?: number
  style?: any
  textStyle?: any
  flex?: number
  disabled?: boolean
  animatedValue?: Animated.Value
}

export function BigButton(props: BigButtonProps): JSX.Element {
  const {
    title,
    subtitle,
    count,
    style: styleOverride,
    textStyle: textStyleOverride,
    flex = 1,
    disabled = false,
    animatedValue,
    ...rest
  } = props

  const gradientDisabled = [
    'rgba(200, 200, 218, 0.15)',
    'rgba(220, 200, 218, 0.15)',
    'rgba(240, 200, 218, 0.15)',
  ]
  const gradientEnabled = [
    'rgba(100, 200, 218, 0.35)',
    'rgba(120, 200, 218, 0.35)',
    'rgba(140, 200, 218, 0.15)',
  ]
  const gradient = disabled ? gradientDisabled : gradientEnabled

  const flexStyle = { flex: 1 }
  const marginTop = { marginTop: 10 }

  const styles = StyleSheet.create({
    bullet: {
      alignItems: 'center',
      backgroundColor: Colors.error,
      borderRadius: 30,
      height: 30,
      justifyContent: 'center',
      position: 'absolute',
      right: 20,
      shadowColor: '#22222277',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.85,
      top: 20,
      width: 30,
    },
    gradientStyle: {
      alignItems: 'center',
      borderRadius: 19,
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 15,
      width: '100%',
    },
    shadowTextStyle: {
      textShadowColor: '#222',
      textShadowOffset: { width: 0, height: 0.5 },
      textShadowRadius: 0.5,
    },
    textStyle: {
      color: disabled ? Colors.ricePaper : Colors.snow,
      ...textStyleOverride,
    },
    viewStyle: {
      backgroundColor: Colors.banner,
      borderRadius: 20,
      flex,
      marginBottom: 20,
      shadowColor: '#22222266',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.85,
      width: Metrics.screenWidth - 60,
      ...styleOverride,
    },
  })

  const translateX = animatedValue
    ? animatedValue.interpolate({ inputRange: [0, 1], outputRange: [-360, 0] })
    : 0

  return (
    <Animated.View
      style={{
        ...styles.viewStyle,
        transform: [{ translateX }],
      }}>
      <TouchableOpacity activeOpacity={0.45} style={flexStyle} {...rest}>
        <LinearGradient
          style={styles.gradientStyle}
          locations={[0, 0.2, 0.9]}
          colors={gradient}>
          {!!count && (
            <View style={styles.bullet}>
              <Info maxFontSizeMultiplier={1.1}>{count}</Info>
            </View>
          )}
          <H1 style={[styles.textStyle, styles.shadowTextStyle]}>{title}</H1>
          {subtitle && (
            <Info style={[styles.textStyle, styles.shadowTextStyle, marginTop]}>
              {subtitle}
            </Info>
          )}
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  )
}
