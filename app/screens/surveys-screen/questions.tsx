/* eslint-disable react-native/no-inline-styles */
import React, { useState, useRef, useCallback } from 'react'
import styled from 'styled-components/native'
import { Card } from 'react-native-card-stack-swiper'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../themes'
import { SafeView } from '../../components/shared'
import { FontAwesome5 } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import { QuestionsScreenRouteProp } from '../../navigation/types'
import { t } from '../../locales'
import { isIphoneX } from '../../themes/Metrics'

const sum = (arr) => arr.reduce((total, num) => total + num, 0)

export default function QuestionsScreen(): JSX.Element {
  const carousel = useRef<Carousel>(null)
  const navigation = useNavigation()
  const route = useRoute<QuestionsScreenRouteProp>()
  const {
    item: { id, questions },
    onBack,
  } = route.params
  const [score, setScore] = useState(new Array(questions.length).fill(0))
  const [activeSlide, setActiveSlide] = useState(0)

  const buttonPress = useCallback(
    (item, index) => {
      const { points } = item
      score[index] = points
      setScore(score)
      setTimeout(() => {
        carousel.current?.snapToNext()
      }, 0)
      if (index === questions.length - 1) {
        onBack(id, sum(score))
        navigation.goBack()
      }
    },
    [activeSlide],
  )

  const renderCard = useCallback(
    ({ item, index }) => {
      const { name, text, answers } = item
      return (
        <Card style={styles.card} key={`key_${index})`}>
          <Info>{name}</Info>
          <Bullet>
            <BulletText maxFontSizeMultiplier={1.1}>{score[index]}</BulletText>
          </Bullet>
          <Summary>{text}</Summary>
          {[...answers].map((opt, ind) => (
            <Option key={`${ind}`} onPress={() => buttonPress(opt, index)}>
              <FontAwesome5 color={Colors.snow} size={24} name={'check'} />
              <OptionText>{opt.text}</OptionText>
            </Option>
          ))}
        </Card>
      )
    },
    [activeSlide],
  )

  const sliderWidth = Metrics.screenWidth
  const itemWidth = Metrics.screenWidth - 30

  return (
    <SafeView>
      <Carousel
        ref={carousel}
        data={questions}
        renderItem={renderCard}
        sliderWidth={sliderWidth}
        itemWidth={itemWidth}
        firstItem={activeSlide}
        useScrollView={true}
        contentContainerCustomStyle={{ alignItems: 'center' }}
        onSnapToItem={(index) => setActiveSlide(index)}
      />
      <Pagination
        dotsLength={questions.length}
        activeDotIndex={activeSlide}
        dotColor={'rgba(255, 255, 255, 0.92)'}
        inactiveDotColor={Colors.snow}
        activeDotColor={Colors.error}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        carouselRef={carousel}
      />
      <ScoreBar>
        <Score>{t('SRV.total')} </Score>
        <Bullet style={styles.bullet}>
          <BulletText>{sum(score)}</BulletText>
        </Bullet>
      </ScoreBar>
    </SafeView>
  )
}

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

const Info = styled.Text`
  text-align: center;
  line-height: 48px;
  font-size: 24px;
  color: ${Colors.snow};
`

const Summary = styled.Text`
  text-align: center;
  font-size: 18px;
  line-height: 26px;
  color: ${Colors.snow};
`

const ScoreBar = styled.View`
  position: absolute;
  bottom: ${isIphoneX() ? 80 : 45}px;
  flex-direction: row;
  align-items: center;
`

const Score = styled.Text`
  font-size: 16px;
  color: ${Colors.snow};
`

const Bullet = styled.View`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 30px;
  height: 30px;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  background-color: ${Colors.error};
  box-shadow: 0px 1px 0px #22222255;
`

const BulletText = styled.Text`
  text-align: center;
  color: ${Colors.snow};
`

const styles = StyleSheet.create({
  bullet: { left: 10, position: 'relative', right: undefined, top: undefined },
  card: {
    alignItems: 'center',
    backgroundColor: Colors.content,
    borderRadius: 15,
    justifyContent: 'center',
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
