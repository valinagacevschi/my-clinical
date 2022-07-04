import React from 'react'
import { useRecoilValue } from 'recoil'
import { CardView, Title, H3, ButtonBar } from '../shared'
import { Button } from '../button'
import { t } from '../../locales'
import { symptomsState } from '../../recoil/profile/selectors'

export interface EmptyCardProps {
  title: string
  info: string
  question: string
  navigation: any
}

export function EmptyCard(props: EmptyCardProps): JSX.Element {
  const { title, info, question, navigation } = props
  const { symptoms } = useRecoilValue(symptomsState)
  const noSymptoms = symptoms?.length ?? 0 === 0
  return (
    <CardView>
      <Title>{title}</Title>
      <H3>
        {info}
        {noSymptoms ? '' : question}
      </H3>
      <ButtonBar style={margin}>
        <Button
          text={noSymptoms ? t('backHome') : t('notNow')}
          type={'error'}
          onPress={() => navigation.navigate('main')}
        />
        {noSymptoms ? null : (
          <Button text={t('yes')} onPress={() => navigation.navigate('symptoms')} />
        )}
      </ButtonBar>
    </CardView>
  )
}

const margin = { marginTop: 25 }

export default EmptyCard
