import React, { useState } from 'react'
import {
  View,
  ViewStyle,
  TextStyle,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native'
import styled from 'styled-components/native'
import moment from 'moment'
import { Button } from '../../components/button'
import { Colors, Metrics } from '../../themes'
import { MedicationProps } from '../../types'
import { ButtonBar } from '../shared'
import { t } from '../../locales'

export interface MedicationCardProps {
  item: MedicationProps
  style?: ViewStyle | ViewStyle[]
  textStyle?: TextStyle | TextStyle[]
  onPressLeft?(arg0: string): void
  onPressRight?(): void
}

export function MedicationCard(props: MedicationCardProps): JSX.Element {
  const { summary, description, start, pastDay, patient_name } = props.item
  const { onPressLeft, onPressRight } = props
  const [input, setInput] = useState('')

  const backgroundColor = pastDay ? Colors.lateCard : Colors.content
  const topLabel = pastDay
    ? t('MED.notYet')
    : t('MED.shouldTake', { who: patient_name || 'you' })
  const confirmLabel = pastDay ? t('MED.oldConfirm') : t('MED.confirm')
  const yesButton = pastDay ? t('yes') : t('MED.taken')
  const noButton = pastDay ? t('no') : t('notNow')
  const marginTop = { marginTop: pastDay ? 0 : 15 }

  const onPress = () => (onPressLeft ? onPressLeft(input) : undefined)

  return (
    <KeyboardAvoidingView enabled behavior='position' keyboardVerticalOffset={215}>
      <View style={[styles.cardStyle, { backgroundColor }]}>
        <Label>
          {topLabel}{' '}
          <Bold>{moment(start).format(pastDay ? 'H:mm on DD MMM ' : 'H:mm')}</Bold>
        </Label>
        <Summary>{summary}</Summary>
        {description && <Description>{description}</Description>}
        <Description>
          <Bold>{confirmLabel}</Bold>
        </Description>
        {pastDay && (
          <Input
            multiline
            autoCorrect={false}
            placeholder={t('MED.reason')}
            placeholderTextColor={Colors.steel}
            onChangeText={(text) => setInput(text)}
            value={input}
          />
        )}
        <ButtonBar style={marginTop}>
          <Button text={noButton} type={'error'} onPress={onPress} />
          <Button text={yesButton} onPress={onPressRight} />
        </ButtonBar>
      </View>
    </KeyboardAvoidingView>
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

const Label = styled.Text`
  text-align: center;
  line-height: 32px;
  font-size: 16px;
  color: ${Colors.snow};
`
const Bold = styled.Text`
  font-weight: bold;
`

const Summary = styled.Text`
  text-align: center;
  font-size: 25px;
  line-height: 40px;
  color: ${Colors.snow};
`

const Description = styled.Text`
  text-align: center;
  font-size: 18px;
  line-height: 26px;
  color: ${Colors.snow};
`

const Input = styled.TextInput`
  height: 58px;
  font-size: 18px;
  border-color: #ee7700;
  border-width: 1px;
  border-radius: 5px;
  padding-horizontal: 10px;
  padding-vertical: 5px;
  margin-vertical: 10px;
  background-color: ${Colors.translucid};
  color: ${Colors.snow};
`
