import React, { useCallback, useState } from 'react'
import { ScrollView, RefreshControl, Switch } from 'react-native'
import * as Linking from 'expo-linking'
import * as Updates from 'expo-updates'
import styled from 'styled-components/native'
import { FontAwesome5 } from '@expo/vector-icons'
import * as Sentry from 'sentry-expo'
import { SafeView } from '../../components/shared'
import { getConfig, version } from '../../config'
import { Colors } from '../../themes'
import { testNotification } from '../../services/notifications'
import { useNavigation } from '@react-navigation/native'
import { I18n, t, Localization } from '../../locales'
import { useProfileState, useResetProfileState } from '../../recoil/profile'

export default function SettingsScreen(): JSX.Element {
  const resetProfile = useResetProfileState()
  const navigation = useNavigation()
  const [{ code, token }, setProfileState] = useProfileState()
  const [count, setCount] = useState(0)
  const [refreshing, setRefresing] = useState(false)

  const pushNotes = useCallback(async () => {
    testNotification()
  }, [])

  const toggleSwitch = useCallback(() => {
    const locale = I18n.locale !== 'en' ? 'en' : Localization.locale
    I18n.locale = locale
    setProfileState((oldProfile) => ({ ...oldProfile, locale }))
  }, [I18n.locale])

  const onRefresh = async () => {
    setRefresing(true)
    try {
      const { isAvailable } = await Updates.checkForUpdateAsync()
      if (isAvailable) {
        await Updates.fetchUpdateAsync()
        await Updates.reloadAsync()
      }
    } catch (e) {
      Sentry.Native.captureException(e)
    }
    setRefresing(false)
  }

  const { url } = getConfig()
  const link = Linking.makeUrl('/', { code })
  const paddingTop = { paddingTop: 5 }
  console.log('rendering SettingsScreen')

  return (
    <SafeView wide>
      <ScrollView
        style={paddingTop}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <Group>
          <SwitchLine
            icon='h-square'
            color={'#00ff00bb'}
            text={t('SET.switchLang')}
            toggleSwitch={toggleSwitch}
          />
          <Line
            icon='h-square'
            color={'#00ff00bb'}
            onPress={() => navigation.navigate('treatments')}>
            {t('SET.clinicalModules')}
          </Line>
          <Line
            icon='file-medical'
            color={'#00ff00bb'}
            onPress={() => navigation.navigate('results')}>
            {t('SET.surveyResults')}
          </Line>
        </Group>
        <Group>
          <Line
            icon='info-circle'
            color={'#2288ff'}
            onPress={() => navigation.navigate('help')}>
            {t('SET.aboutApp')}
          </Line>
        </Group>
        <Group>
          <Line icon='trash' color={'#ff0000bb'} onPress={() => resetProfile()}>
            {t('SET.deleteData')}
          </Line>
        </Group>
        <Group>
          <Line icon='code' color={'#00ff00bb'} onPress={() => alert(code)}>
            {t('SET.moduleCode')}
          </Line>
          {count > 8 ? (
            <>
              <Line icon='link' color={'#ff9900'} onPress={() => alert(url)}>
                {t('SET.apiEndpoint')}
              </Line>
              <Line icon='link' color={'#ff9900'} onPress={() => alert(link)}>
                {t('SET.deepLink')}
              </Line>
              <Line
                icon='globe'
                color={'#ff9900'}
                onPress={() => alert(Updates.updateId)}>
                {t('SET.updateID')}
              </Line>
              <Line icon='comment-alt' color={'#ff9900'} onPress={() => alert(token)}>
                {t('SET.pushToken')}
              </Line>
              <Line icon='comment-dots' color={'#ff9900'} onPress={pushNotes}>
                {t('SET.testPush')}
              </Line>
            </>
          ) : null}
          <Line
            icon='code-branch'
            color={'#00ff00bb'}
            hideCaret
            onPress={() => setCount(count + 1)}>
            {t('SET.version', { version })}
          </Line>
        </Group>
      </ScrollView>
    </SafeView>
  )
}

type LineProps = {
  onPress?: () => void
  icon: string
  color?: string
  hideCaret?: boolean
  children: React.ReactNode
}
type IconProps = {
  color: string
  name?: string
}

const Line = (props: LineProps) => {
  return (
    <LineButton onPress={props.onPress}>
      <Icon name={props.icon} color={props.color || 'transparent'} />
      <LineText>{props.children}</LineText>
      {props.onPress && !props.hideCaret && <Caret />}
    </LineButton>
  )
}
type SwitchLineProps = {
  icon: string
  color: string
  text: string
  toggleSwitch: () => void
}
const SwitchLine = (props: SwitchLineProps) => {
  return (
    <LineView>
      <Icon name={props.icon} color={props.color || 'transparent'} />
      <LineText>{props.text}</LineText>
      <Switch
        ios_backgroundColor={Colors.translucid}
        onValueChange={props.toggleSwitch}
        value={I18n.locale === 'fr'}
      />
    </LineView>
  )
}
const Icon = (props: IconProps) => (
  <Bubble color={props.color}>
    <FontAwesome5 name={props.name} color={Colors.snow} size={24} />
  </Bubble>
)

const Caret = () => <FontAwesome5 name={'chevron-right'} color={'white'} size={20} />
const Group = styled.View`
  margin: 5px;
  background-color: ${Colors.banner};
  border: 1px solid #f9f9f944;
  border-radius: 3px;
`

const LineView = styled.View`
  flex-direction: row;
  padding-vertical: 10px;
  padding-left: 5px;
  padding-right: 5px;
  border-color: #f9f9f944;
  border-bottom-width: 0.85px;
  align-items: center;
`
const LineButton = styled.TouchableOpacity`
  flex-direction: row;
  padding-vertical: 10px;
  padding-left: 5px;
  padding-right: 5px;
  border-color: #f9f9f944;
  border-bottom-width: 0.85px;
  align-items: center;
`

const LineText = styled.Text`
  flex: 1;
  align-self: center;
  color: ${Colors.snow};
  font-size: 18px;
  margin-left: 10px;
  padding-right: 10px;
`

const Bubble = styled.View<{ color: string }>`
  background-color: ${(props) => props.color || '#00000000'};
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 5px;
  box-shadow: 0 1px 1px #22222255;
`
