import React from 'react'
import { IconButton } from '../iconbutton'
import { HeaderView, HeaderTitle } from '../shared'
import { HeaderProps } from './types'
import { isIphoneX } from '../../themes/Metrics'

function Header(props: HeaderProps): JSX.Element {
  const { name, title, shadow, onPressLeft, onPressRight } = props
  const top = isIphoneX() ? 50 : 26
  const iconStyle = { top, left: 5 }
  const iconButtonStyle = { top, right: 15 }

  return (
    <HeaderView shadow={shadow}>
      {onPressLeft && (
        <IconButton
          name={name || 'bars'}
          style={iconStyle}
          onPress={() => onPressLeft()}
        />
      )}
      <HeaderTitle>{title}</HeaderTitle>
      {onPressRight && (
        <IconButton
          name={'weather-windy'}
          style={iconButtonStyle}
          onPress={() => onPressRight()}
        />
      )}
    </HeaderView>
  )
}

export function header(title: string): JSX.Element {
  return <Header title={title} shadow={true} />
}
