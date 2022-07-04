import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import styled from 'styled-components/native'
import { Button } from '../button'
import { Colors } from '../../themes'
import { t } from '../../locales'

export interface MessageInputProps {
  onPress(input: string): void
}

export function MessageInput(props: MessageInputProps): JSX.Element {
  const [input, setInput] = useState('')

  const onPress = () => {
    props.onPress(input)
    setInput('')
  }

  return (
    <View style={styles.container}>
      <Input
        multiline
        autoCorrect={true}
        blurOnSubmit={true}
        placeholder={t('MSG.input')}
        placeholderTextColor={'#e0e0e099'}
        onChangeText={(text) => setInput(text)}
        value={input}
        returnKeyType='send'
        onSubmitEditing={onPress}
      />
      <Button text={t('MSG.send')} style={styles.button} onPress={onPress} />
    </View>
  )
}

const styles = StyleSheet.create({
  button: { marginVertical: 10, paddingHorizontal: 45 },
  container: {
    marginHorizontal: 5,
    paddingBottom: 10,
  },
})

const Input = styled.TextInput`
  height: 58px;
  font-size: 16px;
  border-top-color: #77777799;
  border-left-color: #77777799;
  border-bottom-color: #dddddd99;
  border-right-color: #dddddd99;
  border-width: 0.75px;
  border-radius: 3px;
  padding-horizontal: 7px;
  padding-vertical: 5px;
  margin-top: 7px;
  margin-bottom: 5px;
  background-color: ${Colors.banner};
  color: ${Colors.snow};
`
