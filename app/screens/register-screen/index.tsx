/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from 'react'
import {
  KeyboardAvoidingView,
  Keyboard,
  Clipboard,
  Platform,
  KeyboardAvoidingViewProps,
  View,
  StyleSheet,
} from 'react-native'
import { SafeView, CardView, Info, H1 } from '../../components/shared'
import PinCodeInput from '../../components/pincodeinput'
import { t } from '../../locales'
import { TreatmentList } from '../../components/treatmentlist'
import { useProfileState } from '../../recoil'
import { isCodeOk } from '../../services/utils'

const kavProps: KeyboardAvoidingViewProps | undefined = {
  behavior: 'position',
  ...Platform.select({
    ios: {
      keyboardVerticalOffset: 20,
    },
    android: {
      keyboardVerticalOffset: 0,
    },
  }),
}

export default function RegisterScreen(): JSX.Element {
  type PinCodeHandle = React.ElementRef<typeof PinCodeInput>
  const [{ registered, code: profileCode }, setProfile] = useProfileState()
  const [code, setCode] = useState('')
  const pinInput = useRef<PinCodeHandle>(null)

  useEffect(() => {
    if (!profileCode && !registered) {
      pinInput.current?.shake()
      setCode('')
    }
  }, [registered, profileCode])

  useEffect(() => {
    const load = async () => {
      const clipCode = await Clipboard.getString()
      if (isCodeOk(clipCode)) {
        setCode(clipCode)
        Clipboard.setString('')
      }
    }
    load()
  }, [])

  useEffect(() => {
    if (isCodeOk(code)) {
      setProfile((oldState) => ({ ...oldState, code }))
    }
  }, [code])

  const onStartShouldSetResponder = () => {
    Keyboard.dismiss()
    return false
  }

  const onTouchEndCapture = () => pinInput.current?.focus()

  const onTextChange = (code) => setCode(code)

  console.log('rendering RegisterScreen')
  return (
    <SafeView
      style={styles.safeView}
      onStartShouldSetResponder={onStartShouldSetResponder}>
      <H1 style={styles.header}>{t('REGISTER.welcome')}</H1>
      <KeyboardAvoidingView enabled {...kavProps}>
        <View style={styles.quad} />
        <TreatmentList />
        <View style={styles.single} />
        <CardView onTouchEndCapture={onTouchEndCapture}>
          <Info style={styles.info}>{t('REGISTER.enter_code')}</Info>
          <PinCodeInput
            ref={pinInput}
            value={code}
            onTextChange={onTextChange}
            autoFocus={false}
            keyboardType='number-pad'
          />
        </CardView>
      </KeyboardAvoidingView>
    </SafeView>
  )
}

const styles = StyleSheet.create({
  header: {
    fontSize: 28,
    position: 'absolute',
    top: 70,
  },
  info: { fontSize: 18, marginBottom: 10, paddingHorizontal: 5 },
  quad: { height: 80 },
  safeView: {
    justifyContent: 'center',
  },
  single: { height: 20 },
})
