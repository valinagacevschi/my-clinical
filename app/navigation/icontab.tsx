import React from 'react'
import { Platform } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import { isIphoneX } from '../themes/Metrics'

interface IconProps {
  name: string
  color?: string
  focused?: boolean
}

const style = { marginTop: Platform.OS === 'ios' ? (isIphoneX() ? 15 : 0) : 0 }
export default function iconTab(props: IconProps): JSX.Element {
  return <FontAwesome5 {...props} size={props.focused ? 26 : 22} style={style} />
}
