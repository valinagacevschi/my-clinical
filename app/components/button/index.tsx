import * as React from 'react'
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  ViewStyle,
  TextStyle,
  TouchableOpacityProps,
} from 'react-native'
import { Colors, Metrics } from '../../themes'

export type ButtonType = 'primary' | 'success' | 'warning' | 'error'

export interface ButtonProps extends TouchableOpacityProps {
  text?: string
  style?: ViewStyle | ViewStyle[]
  textStyle?: TextStyle | TextStyle[]
  full?: boolean
  type?: ButtonType
  color?: string
}

interface Styles {
  viewStyle: ViewStyle
  textStyle: TextStyle
}

export function Button(props: ButtonProps): JSX.Element {
  const {
    text,
    style: styleOverride,
    textStyle: textStyleOverride,
    full,
    type,
    color,
    ...rest
  } = props

  const backgroundColor = color ? color : Colors[type || 'success']

  const styles = StyleSheet.create<Styles>({
    textStyle: { color: Colors.snow, fontSize: 16, ...textStyleOverride },
    viewStyle: {
      alignItems: 'center',
      alignSelf: 'center',
      backgroundColor,
      borderRadius: 40,
      justifyContent: 'center',
      marginHorizontal: 10,
      marginVertical: 6,
      minWidth: full ? Metrics.screenWidth - 80 : '45%',
      paddingHorizontal: 10,
      paddingVertical: 8,
      shadowColor: Colors.shadow,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 1,
      ...styleOverride,
    },
  })

  return (
    <TouchableOpacity style={styles.viewStyle} {...rest}>
      <Text style={styles.textStyle}>{text}</Text>
    </TouchableOpacity>
  )
}
