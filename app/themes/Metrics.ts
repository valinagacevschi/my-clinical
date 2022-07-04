import { Dimensions, Platform } from 'react-native'

const { width, height } = Dimensions.get('window')

export const isIphoneX = (): boolean =>
  Platform.OS === 'ios' && (isIPhoneXSize() || isIPhoneXrSize() || isIPhone12Size())

export const isIPhoneXSize = (): boolean => height == 812 || width == 812
export const isIPhoneXrSize = (): boolean => height == 896 || width == 896
export const isIPhone12Size = (): boolean => height == 844 || width == 844

export const HEADER_SIZE = isIphoneX() ? 105 : 80
export const HEADER_PADDING = isIphoneX() ? 40 : 15
const OFFSET = -80

// Used via Metrics.baseMargin
const metrics = {
  marginHorizontal: 10,
  marginVertical: 10,
  section: 25,
  baseMargin: 10,
  doubleBaseMargin: 20,
  smallMargin: 5,
  doubleSection: 50,
  horizontalLineHeight: 1,
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  navBarHeight: Platform.OS === 'ios' ? 64 : 54,
  buttonRadius: 4,
  icons: {
    tiny: 15,
    small: 20,
    medium: 30,
    large: 45,
    xl: 50,
  },
  images: {
    small: 20,
    medium: 40,
    large: 60,
    logo: 200,
  },
  headerSize: HEADER_SIZE,
  headerPadding: HEADER_PADDING,
  screenOffset: isIphoneX() ? OFFSET : 0,
  isIphoneX: (): boolean => isIphoneX(),
}

export default metrics
