// import { Platform, Alert, Linking } from 'react-native';
// import { Notifications } from 'expo'
// import Constants from 'expo-constants';
// import * as Permissions from 'expo-permissions';
// import moment from 'moment'
// import calcHash from 'object-hash';
// import { NavigationStackProp } from '@react-navigation/stack'
// import { isDenied, getMedicationDataSet } from '../utils';
// import { HashDate } from './types';
// import { MedProps } from '../../types';

// export const resetBadges = () =>
//   Platform.OS === 'ios' ? Notifications.setBadgeNumberAsync(0) : null;

// export const registerNoificationListeners = (
//   navigation: NavigationStackProp
// ) => {
//   Notifications.addListener(notification => {
//     handleNotification(notification, navigation);
//   });
// };

// export const getNotificationsTokenAsync = async (
//   warn: boolean
// ): Promise<string> => {
//   if (await isDenied(Permissions.NOTIFICATIONS)) {
//     if (warn) {
//       !__DEV__ &&
//         Alert.alert(
//           'Notifications',
//           '\nHey! You might want to enable notifications to get treatment reminders.',
//           [{ text: 'OK', onPress: () => Linking.openURL('app-settings:') }]
//         );
//     }
//     return null;
//   }
//   setNotificationChannel();
//   if (Constants.isDevice) {
//     const token = await Notifications.getExpoPushTokenAsync();
//     console.log('token', token);
//     return token;
//   }
//   return 'NO-TOKEN';
// };

// enum Repeat {
//   minute = 'minute',
//   hour = 'hour',
//   day = 'day',
//   week = 'week',
//   month = 'month',
//   year = 'year'
// }

// export const updateLocalNotifications = async (
//   medications: Array<MedProps>,
//   hashDate: HashDate
// ): Promise<string> => {
//   await Notifications.cancelAllScheduledNotificationsAsync();
//   const { localNotification, schedulingOptions } = createDailyNotification();
//   await Notifications.scheduleLocalNotificationAsync(
//     localNotification,
//     schedulingOptions
//   );

//   if (medications.length === 0) {
//     return null;
//   }

//   const notes = getMedicationDataSet(medications);
//   const hash: string = calcHash(notes);
//   const date = moment().format('YYYY-MM-DD');
//   const { hash: oldHash, date: oldDate } = hashDate;
//   if (hash === oldHash && date === oldDate) {
//     return null;
//   }

//   for (const key in notes) {
//     const { localNotification, schedulingOptions } = createLocalNotification(
//       notes[key],
//       moment(key)
//     );
//     await Notifications.scheduleLocalNotificationAsync(
//       localNotification,
//       schedulingOptions
//     );
//   }

//   return hash;
// };

// export const testNotification = async () =>
//   await Notifications.scheduleLocalNotificationAsync(
//     {
//       title: `Test Local Push`,
//       body: `It's time to evaluate your symptoms`,
//       data: { screen: 'treatment' }
//     },
//     { time: new Date().getTime() + 5000 }
//   );

// const handleNotification = (notification, navigation: NavigationStackProp) => {
//   resetBadges();
//   const screen = getScreenFrom(notification);
//   if (screen) {
//     navigation.navigate(screen);
//   }
// };

// const setNotificationChannel = () => {
//   if (Platform.OS !== 'android') {
//     return;
//   }
//   Notifications.createChannelAndroidAsync('default', {
//     name: 'default',
//     sound: true,
//     priority: 'max',
//     vibrate: [0, 250, 250, 250]
//   });
// };

// const getScreenFrom = (notification: Notification): string | null => {
//   const { data } = notification;
//   const body: any = 'body' in data ? data.body : data;
//   const screen = 'screen' in body ? body.screen : null;
//   return screen;
// };

// const createLocalNotification = (note: string, keyDate: moment.Moment) => {
//   const count = parseInt(note);
//   let localNotification = {
//     title: `${keyDate.format('h:mma')}`,
//     body: `It's time to take ${note}`,
//     data: { screen: 'treatment' },
//     badge: isNaN(count) ? 1 : count
//   };
//   const schedulingOptions = { time: keyDate.toDate() };
//   return { localNotification, schedulingOptions };
// };

// const createDailyNotification = () => ({
//   localNotification: {
//     title: `19:30`,
//     body: `It's time to evaluate your symptoms`,
//     data: { screen: 'symptoms' },
//     badge: 1
//   },
//   schedulingOptions: {
//     time: moment('19:30', 'HH:mm').toDate(),
//     repeat: Repeat.day
//   }
// });
