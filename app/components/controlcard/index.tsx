import React from 'react'
import { ViewStyle, TextStyle, StyleSheet } from 'react-native'
import styled from 'styled-components/native'
import { Card } from 'react-native-card-stack-swiper'
import { Button } from '../../components/button'
import { Colors, Metrics } from '../../themes'
import { MedicationProps } from '../../types'

export interface ControlCardProps {
  item: MedicationProps
  style?: ViewStyle | ViewStyle[]
  textStyle?: TextStyle | TextStyle[]
  onPressLeft?(): void
  onPressRight?(): void
}

export function ControlCard(props: ControlCardProps): JSX.Element {
  const { summary, description, pastDay } = props.item
  const { onPressLeft, onPressRight } = props

  const yesButton = 'Confirmed'
  const noButton = 'Later'
  return (
    <Card
      style={[
        styles.cardStyle,
        { backgroundColor: pastDay ? Colors.lateCard : Colors.content },
      ]}>
      <Summary>{summary}</Summary>
      <Description>{description}</Description>
      <ButtonBar>
        <Button text={noButton} type={'error'} onPress={onPressLeft} />
        <Button text={yesButton} onPress={onPressRight} />
      </ButtonBar>
    </Card>
  )
}

interface Styles {
  cardStyle: ViewStyle
}
const styles = StyleSheet.create<Styles>({
  cardStyle: {
    borderRadius: 15,
    padding: 20,
    shadowColor: 'rgba(30,30,30,0.5)',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,
    width: Metrics.screenWidth - 30,
  },
})

const Summary = styled.Text`
  text-align: center;
  font-size: 25px;
  line-height: 50px;
  color: ${Colors.snow};
`

const Description = styled.Text`
  text-align: center;
  font-size: 22px;
  line-height: 40px;
  color: ${Colors.snow};
`

const ButtonBar = styled.View`
  flex-direction: row;
`
