/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import {
  SectionList,
  RefreshControl,
  View,
  SectionListData,
  TextStyle,
  ViewStyle,
} from 'react-native'
import moment from 'moment'
import * as Types from './types'
import { Colors, Metrics } from '../../themes'
import styled from 'styled-components/native'
import { FontAwesome5 } from '@expo/vector-icons'
import { H2, Separator } from '../shared'
import { MedProps } from '../../types'
import { MedicationsArrayToSet } from '../../services/utils'
import { I18n, t } from '../../locales'

export default function MedicationList(props: Types.MedicationListProps): JSX.Element {
  const { data, refreshing, onRefresh, mode, header, emptyView, footer, style } = props
  const hasData = data.length > 0
  const localStyle = {
    flexGrow: 1,
    justifyContent: hasData ? 'flex-start' : 'center',
    width: Metrics.screenWidth,
  } as ViewStyle

  const keyExtractor = (_, index) => `${index}`
  const sections = formatSections(data, mode)

  return (
    <SectionList
      contentContainerStyle={[localStyle, style]}
      sections={sections}
      renderItem={mode === 'today' ? renderLargeItem : renderItem}
      renderSectionHeader={renderHeader}
      refreshControl={
        onRefresh ? (
          <RefreshControl
            refreshing={!!refreshing}
            onRefresh={onRefresh}
            title={t('refresh')}
            tintColor='#fff'
            titleColor='#fff'
          />
        ) : undefined
      }
      ListHeaderComponent={hasData ? header : undefined}
      ListEmptyComponent={!refreshing ? emptyView : undefined}
      ListFooterComponent={footer}
      ItemSeparatorComponent={() => <Separator />}
      keyExtractor={keyExtractor}
    />
  )
}

function renderItem({ item }: Types.Item) {
  const props = item.state ? {} : { color: Colors.snow, fontWeight: 500 }

  return (
    <Item>
      <ItemText {...props} minWidth={85}>
        {moment(item.start).format('hh:mma')}
      </ItemText>
      <ItemText {...props}>{item.summary}</ItemText>
      <FontAwesome5
        size={22}
        color={Colors.snow}
        style={absRight}
        name={iconName(item)}
      />
    </Item>
  )
}

const absRight = { position: 'absolute', right: 20 } as TextStyle

function renderLargeItem({ item }: Types.Item) {
  const props = item.state
    ? {}
    : { color: Colors.snow, fontWeight: 500, fontStyle: 'italic' }
  return (
    <Item>
      <View style={{ paddingBottom: 7 }}>
        <H2 style={{ textAlign: 'left', paddingBottom: 7 }} {...props}>
          {item.summary}
        </H2>
        <ItemText {...props}>{item.description}</ItemText>
      </View>
      <FontAwesome5
        size={22}
        color={Colors.snow}
        style={{ position: 'absolute', right: 20 }}
        name={iconName(item)}
      />
    </Item>
  )
}

function renderHeader(info: { section: SectionListData<MedProps> }) {
  const {
    section: { title },
  } = info
  return (
    <Section>
      <SectionText>{title}</SectionText>
    </Section>
  )
}

function iconName(item: MedProps) {
  if (item.state === 'taken') return 'check'
  if (item.state == null) return 'clock'
  if (item.control) return 'user-md'
  return 'times'
}

const Section = styled.View`
  background-color: ${Colors.content};
  border-color: ${Colors.snow};
  border-bottom-width: 0.7px;
  justify-content: center;
  padding-vertical: 10px;
  padding-horizontal: 10px;
`

const SectionText = styled.Text`
  color: ${Colors.snow};
  font-size: 17px;
  font-weight: 500;
  text-shadow: 1px 0px #22222299;
`

const Item = styled.View<{ boderColor?: string }>`
  flex-direction: row;
  align-items: center;
  padding-vertical: 15px;
  padding-horizontal: 10px;
  border-color: ${(props) => props.boderColor || Colors.snow};
  border-bottom-width: 0px;
`

const ItemText = styled.Text<{
  minWidth?: number
  color?: string
  fontWeight?: number
  fontStyle?: string
}>`
  font-size: 16.5px;
  text-shadow: 0.7px 0px #22222299;
  min-width: ${(props) => (props.minWidth ? props.minWidth + 'px' : 'auto')};
  color: ${(props) => props.color || Colors.steel};
  font-weight: ${(props) => props.fontWeight || 400}
  font-style: ${(props) => props.fontStyle || 'normal'}
`

const formatSections = (
  meds: MedProps[],
  mode: Types.ModeType,
): Array<Types.SectionItem> => {
  moment.locale(I18n.locale)
  const dataSet = MedicationsArrayToSet(meds || [], (item) =>
    moment(item.start).format(mode === 'today' ? 'HH:mm' : 'YYYY-MM-DD'),
  )
  const sections: Types.SectionItem[] = Object.entries(dataSet).map(
    ([key, data], index: number) => ({
      title:
        mode === 'today'
          ? `${key}`
          : t('day', { index: index + 1, date: moment(key).format('ddd, DD MMMM') }),
      data,
    }),
  )
  return sections
}
