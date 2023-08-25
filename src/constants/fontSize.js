import { PixelRatio } from 'react-native'

const fontScale = PixelRatio.getFontScale()

const small: number = fontScale * 14
const medium: number = fontScale * 16
const large: number = fontScale * 20
const xLarge: number = fontScale * 30
const xxLarge: number = fontScale * 35

export default {
  small,
  medium,
  large,
  xLarge,
  xxLarge
}
