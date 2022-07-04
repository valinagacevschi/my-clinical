import * as React from 'react'
import { TouchableOpacity, ViewStyle, TouchableOpacityProps } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import { Colors, Metrics } from '../../themes'

export interface IconButtonProps extends TouchableOpacityProps {
  name?: string
  color?: string
  size?: number
  style?: ViewStyle | ViewStyle[]
}
const BUTTON_SIZE = 50

export function IconButton(props: IconButtonProps): JSX.Element {
  const { name, color, size, style: styleOverride, ...rest } = props

  const viewStyle: ViewStyle = {
    justifyContent: 'center',
    alignItems: 'center',
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    shadowOffset: { width: 0, height: 1 },
    shadowColor: Colors.shadow,
    shadowOpacity: 1,
    borderRadius: BUTTON_SIZE / 2,
    zIndex: 9999,
  }

  const attributes = {
    name: name || 'ambulance',
    color: color || Colors.snow,
    size: size || BUTTON_SIZE / 1.75,
  }
  return (
    <TouchableOpacity style={[viewStyle, styleOverride]} {...rest}>
      <FontAwesome5 {...attributes} />
    </TouchableOpacity>
  )
}

export const middalePosition = (Metrics.screenWidth - BUTTON_SIZE) / 2
