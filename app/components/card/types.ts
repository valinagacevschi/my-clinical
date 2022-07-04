import Animated from 'react-native-reanimated'

export interface Profile {
  id: string
  name: string
  age: number
  profile: string
}

export interface CardProps {
  profile: Profile
  likeOpacity?: Animated.Value<number> | number
  nopeOpacity?: Animated.Value<number> | number
}

export interface ProfilesProps {
  profiles: Profile[]
}

export interface ProfilesState {
  profiles: Profile[]
}
