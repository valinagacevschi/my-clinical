/* eslint-disable react/display-name */
import React, { Suspense, useCallback, useState } from 'react'
import { ActivityIndicator, FlatList } from 'react-native'
import styled from 'styled-components/native'
import { FontAwesome5 } from '@expo/vector-icons'
import { Colors } from '../../themes'
import { setPublicModule, usePublicModules } from './services'
import { PublicModule, PublicModuleProps } from './types'
import { t } from '../../locales'
import { Button } from '../button'
import { useSetProfileState } from '../../recoil'
import { ButtonBar, CardView, H2, Info } from '../shared'

export const TreatmentList = React.memo(() => (
  <Suspense fallback={<ActivityIndicator size='small' color='#fff' />}>
    <TreatmentFlatList />
  </Suspense>
))

function TreatmentFlatList(): JSX.Element | null {
  const setProfile = useSetProfileState()
  const { data } = usePublicModules()
  const [selected, setSelected] = useState<PublicModule>()

  const renderItem = useCallback(
    ({ item }: { item: PublicModule }) => <MyItem {...item} onSelect={onSelect} />,
    [],
  )

  const onSelect = useCallback((item: PublicModule) => {
    setSelected(item)
  }, [])

  const onFinalSelect = useCallback(async () => {
    const code = await setPublicModule(selected?.id)
    if (code) {
      setProfile((oldState) => ({ ...oldState, code }))
    }
  }, [selected])

  const keyExtractor = useCallback((item) => `awesome-child-key-${item.name}`, [])
  if (data.length === 0) {
    return null
  }

  if (selected) {
    const { name, description, duration } = selected
    return (
      <CardView>
        <H2>{name}</H2>
        <Divider />
        <Info justify>
          {t('REGISTER.description')} {description}
        </Info>
        <Divider />
        <Info justify>{t('REGISTER.duration', { duration })}</Info>
        <Divider />
        <ButtonBar>
          <Button
            text={t('back')}
            type={'error'}
            onPress={() => setSelected(undefined)}
          />
          <Button text={t('select')} onPress={onFinalSelect} />
        </ButtonBar>
      </CardView>
    )
  }

  return (
    <CardView style={margins}>
      <Info>{t('REGISTER.select')}</Info>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </CardView>
  )
}

const margins = { maxHeight: 260, paddingBottom: 15, paddingTop: 20 }

const MyItem = React.memo((item: PublicModuleProps) => {
  const { name, onSelect } = item
  return (
    <Option onPress={() => onSelect(item)}>
      <FontAwesome5 color={Colors.snow} size={20} name={'syringe'} />
      <OptionText>{name}</OptionText>
    </Option>
  )
})

const Divider = styled.View`
  height: 15px;
`

const Option = styled.TouchableOpacity`
  flex-direction: row;
  width: 100%;
  padding-vertical: 8px;
  padding-horizontal: 10px;
  padding-left: 15px;
  border: 1px solid white;
  border-radius: 25px;
  margin-vertical: 7px;
  align-items: center;
  box-shadow: 0px 1px 0px #22222255;
`

const OptionText = styled.Text`
  padding-left: 15px;
  color: ${Colors.snow};
  font-size: 16px;
`
