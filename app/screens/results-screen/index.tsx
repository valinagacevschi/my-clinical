/* eslint-disable react-native/no-inline-styles */
import React, { useCallback } from 'react'
import { FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useRecoilValue } from 'recoil'
import moment from 'moment'
import { FontAwesome5 } from '@expo/vector-icons'
import styled from 'styled-components/native'
import { Colors } from '../../themes'
import { SafeView, Bold, CardView, Title, H3 } from '../../components/shared'
import { Button } from '../../components/button'
import { SurveyLog } from '../../navigation/types'
import { t } from '../../locales'
import { surveyLogsState, useForce } from '../../recoil/profile/selectors'

export default function ResultsScreen(): JSX.Element {
  const navigation = useNavigation()
  const logs = useRecoilValue(surveyLogsState)
  const onRefresh = useForce()

  const noData = logs.length === 0

  const onPress = useCallback(() => navigation.navigate('main'), [])

  console.log('rendering ResultsScreen')
  return (
    <SafeView wide>
      <FlatList
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: noData ? 'center' : 'flex-start',
        }}
        data={logs}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        refreshing={false}
        onRefresh={onRefresh}
        ListEmptyComponent={
          <>
            <CardView>
              <Title>{t('SRV.notFound')}</Title>
              <H3>{t('SRV.noSurvey')}</H3>
              <Button
                text={t('backHome')}
                type={'error'}
                style={{ marginTop: 25, paddingHorizontal: 35 }}
                onPress={onPress}
              />
            </CardView>
          </>
        }
      />
    </SafeView>
  )
}

function keyExtractor(item): string {
  return `${item.id}`
}

function renderItem({ item }: { item: SurveyLog }): JSX.Element {
  const { score, taken, level, info, viewed } = item
  const targetColor = level === 'ON TARGET' ? Colors.warning : Colors.success
  const color = level === 'OFF TARGET' ? Colors.error : targetColor
  return (
    <ScoreBar>
      <Score color={color}>
        <Number>{score}</Number>
      </Score>
      <Heading>
        {`${moment(taken).format('ddd, D MMM')}`} - <Bold>{level}</Bold>
      </Heading>
      <Info>{info}</Info>
      {viewed && (
        <FontAwesome5
          name='check'
          color='white'
          size={18}
          style={{ position: 'absolute', right: 20, top: '50%', marginTop: -9 }}
        />
      )}
    </ScoreBar>
  )
}

const ScoreBar = styled.View`
  min-height: 60px;
  padding-vertical: 5px;
  padding-left: 70px;
  padding-right: 45px;
  border-color: #f9f9f9aa;
  border-bottom-width: 0.8px;
`

const Score = styled.View<{ color?: string }>`
  position: absolute;
  left: 10px;
  top: 50%;
  margin-top: -18px;
  justify-content: center;
  align-items: center;
  width: 45px;
  height: 45px;
  border-radius: 25px;
  background-color: ${(props) => props.color || Colors.error};
  box-shadow: 0px 1px 0 #22222277;
`

const Number = styled.Text`
  font-size: 18px;
  color: #fff;
  box-shadow: 0 1px 0 #22222299;
`

const Info = styled.Text`
  color: ${Colors.snow};
  line-height: 18px;
  box-shadow: 0 0.8px 0 #22222255;
`

const Heading = styled.Text`
  color: ${Colors.snow};
  box-shadow: 0 1px 0 #22222255;
  font-size: 18px;
  padding-vertical: 5px;
`
