import styled from 'styled-components/native'
import { Colors, Metrics } from '../../themes'

export const SafeView = styled.SafeAreaView<{
  wide?: boolean
  onStartShouldSetResponder?: (e) => boolean
}>`
  flex: 1;
  align-items: ${(props) => (props.wide ? 'stretch' : 'center')};
  justify-content: space-evenly;
  background-color: ${Colors.page};
`

export const CardView = styled.View<{ marginTop?: number }>`
  background-color: ${Colors.content};
  width: ${Metrics.screenWidth - 30}px;
  border-radius: 15px;
  shadow-color: rgba(30, 30, 30, 0.5);
  shadow-offset: 0px 3px;
  shadow-opacity: 0.5;
  padding: 40px 20px;
  margin-top: -20px;
  align-self: center;
  margin-top: ${(props) => props.marginTop || '0'};
`

export const Title = styled.Text`
  font-weight: bold;
  font-size: 24px;
  color: ${Colors.snow};
  text-align: center;
  margin-bottom: 20px;
`

export const H1 = styled.Text`
  color: ${Colors.snow};
  font-size: 24px;
  line-height: 32px;
  text-align: center;
`

export const H2 = styled.Text`
  color: ${Colors.snow};
  font-size: 21px;
  line-height: 28px;
  text-align: center;
`

export const H3 = styled.Text`
  color: ${Colors.snow};
  font-size: 18px;
  line-height: 26px;
  text-align: center;
`

export const Summary = styled.Text`
  font-size: 18px;
  color: ${Colors.snow};
  text-align: center;
  line-height: 26px;
`

export const Info = styled.Text<{ justify?: boolean; left?: boolean }>`
  font-size: 16px;
  line-height: 24px;
  color: ${Colors.snow};
  text-align: ${(props) =>
    props.justify ? 'justify' : props.justify ? 'left' : 'center'};
`

export const Loader = styled.ActivityIndicator`
  position: absolute;
  top: ${Metrics.screenHeight / 2 - 36}px;
  left: ${Metrics.screenWidth / 2 - 16}px;
`

export const Bold = styled.Text`
  font-weight: bold;
`

export const ImageIcon = styled.Image`
  width: 42px;
  height: 42px;
  position: absolute;
  left: 20px;
  top: 40px;
`

export const HeaderView = styled.View<{ clear?: boolean; shadow?: boolean }>`
  padding-top: ${Metrics.headerPadding}px;
  height: ${Metrics.headerSize}px;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => (props.clear ? Colors.clear : Colors.page)};
  shadow-color: ${(props) => (props.clear ? Colors.clear : '#22222266')};
  shadow-offset: 0px 3px;
  shadow-opacity: ${(props) => (props.shadow ? 0.5 : 0)};
  z-index: 9999;
`

export const HeaderTitle = styled.Text`
  color: ${Colors.snow};
  font-size: 24px;
`

export const BigButton = styled.TouchableOpacity`
  position: relative;
  min-height: ${Metrics.screenHeight / 4}px;
  width: ${Metrics.screenWidth - 80}px;
  align-items: center;
  justify-content: center;
  background-color: ${Colors.banner};
  shadow-color: #22222266;
  shadow-offset: 0px 5px;
  shadow-opacity: 0.85;
  margin-vertical: 20px;
  border-radius: 40px;
`

export const ButtonBar = styled.View`
  flex-direction: row;
  justify-content: space-around;
`

export const Separator = styled.View`
  border-color: ${Colors.snow};
  border-bottom-width: 0.7px;
`
