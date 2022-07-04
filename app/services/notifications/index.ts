import { Platform, Alert, Linking } from 'react-native'
import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions'
import Constants from 'expo-constants'
import moment from 'moment'
import calcHash from 'object-hash'
import { isDenied, getMedicationDataSet } from '../utils'
import { MedProps } from '../../types'

interface LocalDailyRequest {
  content: Notifications.NotificationContentInput
  trigger:
    | Notifications.DailyTriggerInput
    | Notifications.DailyNotificationTrigger
    | Notifications.NotificationTriggerInput
}

type HashDate = { hash: string; date: string }

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
})

export const resetBadges = (): Promise<boolean> => Notifications.setBadgeCountAsync(0)

export const registerNoificationListeners = (navigation): void => {
  Notifications.addNotificationResponseReceivedListener(({ notification }) => {
    handleNotification(notification, navigation)
  })
  Notifications.addNotificationReceivedListener((notification) => {
    handleNotification(notification, navigation)
  })
}

export const getNotificationsTokenAsync = async (
  warn: boolean,
): Promise<string | null> => {
  if (await isDenied(Permissions.NOTIFICATIONS)) {
    if (warn) {
      !__DEV__ &&
        Alert.alert(
          'Notifications',
          '\nHey! You might want to enable notifications to get treatment reminders.',
          [{ text: 'OK', onPress: () => Linking.openURL('app-settings:') }],
        )
    }
    console.log('Permissions.NOTIFICATIONS denied')
    return null
  }
  if (Constants.isDevice) {
    setNotificationChannel()
    const token = await Notifications.getExpoPushTokenAsync()
    return token.data
  }
  return 'NO-TOKEN'
}

export const updateLocalNotifications = async (
  medications: Array<MedProps>,
  hashDate: HashDate,
): Promise<string | null> => {
  await Notifications.cancelAllScheduledNotificationsAsync()
  await Notifications.scheduleNotificationAsync(createDailyNotification())

  if (medications.length === 0) {
    return null
  }

  const notes = getMedicationDataSet(medications)
  const hash: string = calcHash(notes)
  const date = moment().format('YYYY-MM-DD')
  const { hash: oldHash, date: oldDate } = hashDate
  if (hash === oldHash && date === oldDate) {
    return null
  }

  for (const key in notes) {
    await Notifications.scheduleNotificationAsync(
      createLocalNotification(notes[key], moment(key)),
    )
  }

  return hash
}

export const testNotification = async (): Promise<string> =>
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Test Local Push',
      body: 'It`s time to evaluate your symptoms',
      data: { screen: 'treatment' },
    },
    trigger: { seconds: 5 },
  })

const handleNotification = (
  notification: Notifications.Notification,
  navigation: any,
) => {
  resetBadges()
  const screen = getScreenFrom(notification)
  if (screen) {
    navigation.navigate(screen)
  }
}

const setNotificationChannel = () => {
  if (Platform.OS !== 'android') {
    return
  }
  Notifications.setNotificationChannelAsync('default', {
    name: 'default',
    importance: Notifications.AndroidImportance.MAX,
    vibrationPattern: [0, 250, 250, 250],
    lightColor: '#FF231F7C',
  })
}

const getScreenFrom = (notification: Notifications.Notification): string | null => {
  const {
    request: {
      content: { data },
    },
  } = notification
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const body: any = 'body' in data ? data.body : data
  const screen = 'screen' in body ? body.screen : null
  alert(`note: ${screen} ${JSON.stringify(notification.request)}`)
  return screen
}

const createLocalNotification = (
  note: string,
  keyDate: moment.Moment,
): LocalDailyRequest => {
  const count = parseInt(note)
  const content: Notifications.NotificationContentInput = {
    title: `${keyDate.format('h:mma')}`,
    body: `It's time to take ${note}`,
    data: { screen: 'treatment' },
    badge: isNaN(count) ? 1 : count,
  }
  const trigger = {
    seconds: moment.duration(moment().diff(keyDate)).asSeconds(),
  }
  return { content, trigger }
}

const createDailyNotification = (): LocalDailyRequest => {
  const content: Notifications.NotificationContentInput = {
    title: '19:30',
    body: 'It`s time to evaluate your symptoms',
    data: { screen: 'symptoms' },
    badge: 1,
  }
  return {
    content,
    trigger: {
      hour: 19,
      minute: 30,
      ...Platform.select({
        ios: { type: 'daily' },
        android: { repeats: true },
      }),
    },
  }
}
