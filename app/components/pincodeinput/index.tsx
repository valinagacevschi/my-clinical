/* eslint-disable prefer-spread */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useRef, useEffect, useImperativeHandle } from 'react'
import { View, Text, TextInput, I18nManager } from 'react-native'
import { View as AnimatableView } from 'react-native-animatable'
import styles from './styles'
import { PinCodeInputProps } from './types'

type PinCodeInputHandle = {
  focus: () => void
  blur: () => void
  clear: () => void
  shake: () => Promise<any>
}

export function PinCodeInput(
  props: PinCodeInputProps,
  ref: React.ForwardedRef<PinCodeInputHandle>,
): JSX.Element {
  const [maskDelayed, setMaskDelayed] = useState(false)
  const [focused, setFocused] = useState(false)

  const viewRef = useRef(null)
  const inputRef = useRef<TextInput>(null)
  const maskTimeout = useRef<NodeJS.Timeout>()

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return () => global.clearTimeout(maskTimeout.current!)
  }, [])

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
    blur: () => inputRef.current?.blur(),
    clear: () => inputRef.current?.clear(),
    shake: () => {
      if (animated && viewRef.current != null) {
        const animRef = viewRef.current ? viewRef.current : null
        if (animRef) {
          const animMethod = animRef['shake'] as any
          return animMethod ? animMethod(650) : new Promise(() => null)
        }
      }
      return new Promise((_, reject) => reject(new Error('Animations are disabled')))
    },
  }))

  const {
    value = '',
    codeLength = 6,
    cellSize = 42,
    cellSpacing = 6,
    placeholder = '',
    password = false,
    mask = '*',
    cellStyleFilled,
    testID,
    onTextChange,
    onFulfill,
    onBackspace,
    onFocus,
    onBlur,
    keyboardType = 'numeric',
    autoFocus = true,
    restrictToNumbers = true,
    containerStyle = styles.containerDefault,
    cellStyle = styles.cellDefault,
    cellStyleFocused = styles.cellFocusedDefault,
    textStyle = styles.textStyleDefault,
    textStyleFocused = styles.textStyleFocusedDefault,
    animationFocused = 'pulse',
    animated = true,
    editable = true,
    inputProps = {},
    disableFullscreenUI = true,
    maskDelay = 200,
  } = props

  function _inputCode(code: string) {
    if (restrictToNumbers) {
      code = (code.match(/[0-9]/g) || []).join('')
    }

    if (onTextChange) {
      onTextChange(code)
    }
    if (code.length === codeLength && onFulfill) {
      onFulfill(code)
    }

    // handle password mask
    const localMaskDelay = !!password && code.length > value.length // only when input new char
    setMaskDelayed(localMaskDelay)

    if (localMaskDelay) {
      // mask password after delay
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      global.clearTimeout(maskTimeout.current!)
      maskTimeout.current = setTimeout(() => {
        setMaskDelayed(false)
      }, maskDelay)
    }
  }

  function _keyPress(event) {
    if (event.nativeEvent.key === 'Backspace') {
      if (value === '' && onBackspace) {
        onBackspace()
      }
    }
  }

  function _onFocused() {
    setFocused(true)
    if (typeof onFocus === 'function') {
      onFocus()
    }
  }

  function _onBlurred() {
    setFocused(false)
    if (typeof onBlur === 'function') {
      onBlur()
    }
  }

  function renderThings(idx: number) {
    const cellFocused = focused && idx === value.length
    const filled = idx < value.length
    const last = idx === value.length - 1
    const showMask = filled && password && (!maskDelayed || !last)
    const isPlaceholderText = typeof placeholder === 'string'
    const isMaskText = typeof mask === 'string'
    const pinCodeChar = value.charAt(idx)

    let cellText = ''
    if (filled || placeholder !== null) {
      if (showMask && isMaskText) {
        cellText = mask as string
      } else if (!filled && isPlaceholderText) {
        cellText = placeholder as string
      } else if (pinCodeChar) {
        cellText = pinCodeChar
      }
    }

    const placeholderComponent = !isPlaceholderText ? placeholder : null
    const maskComponent = showMask && !isMaskText ? mask : null
    const isCellText = typeof cellText === 'string'

    return (
      <AnimatableView
        key={idx}
        style={[
          {
            width: cellSize,
            height: cellSize + 20,
            marginLeft: cellSpacing / 2,
            marginRight: cellSpacing / 2,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          },
          cellStyle,
          cellFocused ? cellStyleFocused : {},
          filled ? cellStyleFilled : {},
        ]}
        animation={
          idx === value.length && focused && animated ? animationFocused : undefined
        }
        iterationCount='infinite'
        duration={500}>
        {isCellText && !maskComponent && (
          <Text style={[textStyle, cellFocused ? textStyleFocused : {}]}>{cellText}</Text>
        )}

        {!isCellText && !maskComponent && placeholderComponent}
        {isCellText && maskComponent}
      </AnimatableView>
    )
  }

  return (
    <AnimatableView
      ref={viewRef}
      style={[
        {
          alignItems: 'stretch',
          flexDirection: 'row',
          justifyContent: 'center',
          position: 'relative',
          width: cellSize * codeLength + cellSpacing * (codeLength - 1),
          height: cellSize,
          alignSelf: 'center',
          marginBottom: 15,
        },
        containerStyle,
      ]}>
      <View
        style={{
          position: 'absolute',
          margin: 0,
          height: '100%',
          flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
          alignItems: 'center',
        }}>
        {Array.apply(null, Array(codeLength)).map((_, idx) => renderThings(idx))}
      </View>
      <TextInput
        disableFullscreenUI={disableFullscreenUI}
        value={value}
        ref={inputRef}
        onChangeText={_inputCode}
        onKeyPress={_keyPress}
        onFocus={() => _onFocused()}
        onBlur={() => _onBlurred()}
        spellCheck={false}
        autoFocus={autoFocus}
        keyboardType={keyboardType}
        numberOfLines={1}
        caretHidden
        maxLength={codeLength}
        selection={{
          start: value.length,
          end: value.length,
        }}
        style={{
          flex: 1,
          opacity: 0,
          alignSelf: 'center',
          textAlign: 'center',
        }}
        testID={testID || undefined}
        editable={editable}
        {...inputProps}
      />
    </AnimatableView>
  )
}

export default React.forwardRef(PinCodeInput)
