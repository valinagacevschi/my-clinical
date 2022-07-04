import {
  ViewStyle,
  TextStyle,
  TextInputProps,
  ImageStyle,
  KeyboardTypeOptions,
} from 'react-native'
import { CustomAnimation } from 'react-native-animatable'

export interface PinCodeInputProps {
  value: string
  codeLength?: number
  cellSize?: number
  cellSpacing?: number
  placeholder?: string | React.ReactElement
  mask?: string | React.ReactElement
  maskDelay?: number
  maskTimeout?: number
  password?: boolean
  autoFocus?: boolean
  restrictToNumbers?: boolean
  containerStyle?: ViewStyle
  cellStyle?: ViewStyle
  cellStyleFocused?: ViewStyle
  cellStyleFilled?: ViewStyle
  textStyle?: TextStyle
  textStyleFocused?: TextStyle

  animated?: boolean
  animationFocused?: string | CustomAnimation<TextStyle & ViewStyle & ImageStyle>
  disableFullscreenUI?: boolean

  onFulfill?: (code: string) => void
  onChangeText?: () => void
  onBackspace?: () => void
  onTextChange: (code: string) => void
  onFocus?: () => void
  onBlur?: () => void
  testID?: string
  keyboardType?: KeyboardTypeOptions
  editable?: boolean
  inputProps?: TextInputProps
}
