import * as React from 'react'
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import OnboardingScreen from '../screens/onboarding-screen'
import RegisterScreen from '../screens/register-screen'
import MainScreen from '../screens/main-screen'
import HelpScreen from '../screens/help-screen'
import ResultsScreen from '../screens/results-screen'
import MessagesScreen from '../screens/messages-screen'
import SymptomsScreen from '../screens/symptoms-screen'
import TreatmentScreen from '../screens/treatment-screen'
import SurveysScreen, { QuestionsScreen } from '../screens/surveys-screen'
import TreatmentsScreen from '../screens/treatments-screen'
import MedicationScreen from '../screens/treatments-screen/medication'
import SettingsScreen from '../screens/settings-screen'
import TodayScreen from '../screens/today-screen'
import { IconButton } from '../components/iconbutton'
import { Colors } from '../themes'
import iconTab from './icontab'
import MedicationsScreen from '../screens/medications-screen'
import { MainStackParamList, MedicationStackParamList } from './types'
import { t } from '../locales'
import { isIphoneX } from '../themes/Metrics'

const iconLeft = (props) => IconButton({ ...props, name: 'arrow-left' })

const defaultOptions: StackNavigationOptions = {
  headerStyle: {
    backgroundColor: Colors.page,
    shadowColor: '#22222266',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    height: isIphoneX() ? 95 : 65,
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontSize: 24,
    textAlign: 'center',
    // ...Platform.select({
    //   android: { width: '80%' },
    // }),
  },
  headerLeftContainerStyle: {},
}

const TodayStack = createStackNavigator()
function TodayStackScreen(): JSX.Element {
  return (
    <TodayStack.Navigator>
      <TodayStack.Screen
        name='today'
        component={TodayScreen}
        options={{ ...defaultOptions, title: t('NAV.today') }}
      />
    </TodayStack.Navigator>
  )
}
const MedicationStack = createStackNavigator<MedicationStackParamList>()
function MedicationStackScreen(): JSX.Element {
  return (
    <MedicationStack.Navigator>
      <MedicationStack.Screen
        name='medication'
        component={MedicationsScreen}
        options={{ ...defaultOptions, title: t('NAV.medication') }}
      />
    </MedicationStack.Navigator>
  )
}
const SettingsStack = createStackNavigator()
function SettingsStackScreen(): JSX.Element {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name='settings'
        component={SettingsScreen}
        options={{ ...defaultOptions, title: t('NAV.settings') }}
      />
    </SettingsStack.Navigator>
  )
}

const Tab = createBottomTabNavigator()
function MainTabScreen() {
  return (
    <Tab.Navigator
      lazy={true}
      backBehavior={'initialRoute'}
      tabBarOptions={{
        allowFontScaling: false,
        activeTintColor: Colors.snow,
        inactiveTintColor: Colors.steel,
        showLabel: false,
        style: {
          height: isIphoneX() ? 75 : 60,
          backgroundColor: Colors.banner,
          // marginBottom: 0,
        },
      }}>
      <Tab.Screen
        name='main'
        component={MainScreen}
        options={{
          tabBarIcon: (props) => iconTab({ name: 'clinic-medical', ...props }),
        }}
      />
      <Tab.Screen
        name='today'
        component={TodayStackScreen}
        options={{
          tabBarIcon: (props) => iconTab({ name: 'calendar-check', ...props }),
        }}
      />
      <Tab.Screen
        name='medication'
        component={MedicationStackScreen}
        options={{
          tabBarIcon: (props) => iconTab({ name: 'medkit', ...props }),
        }}
      />
      <Tab.Screen
        name='settings'
        component={SettingsStackScreen}
        options={{
          tabBarIcon: (props) => iconTab({ name: 'cog', ...props }),
        }}
      />
    </Tab.Navigator>
  )
}

const OnboardingStack = createStackNavigator()
export function OnboardingRouter(): JSX.Element {
  return (
    <OnboardingStack.Navigator>
      <OnboardingStack.Screen
        name='onboarding'
        component={OnboardingScreen}
        options={{ headerShown: false }}
      />
    </OnboardingStack.Navigator>
  )
}

const RegisterStack = createStackNavigator()
export function RegisterRouter(): JSX.Element {
  return (
    <RegisterStack.Navigator>
      <RegisterStack.Screen
        name='register'
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
    </RegisterStack.Navigator>
  )
}

const MainStack = createStackNavigator<MainStackParamList>()
export function MainRouter(): JSX.Element {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name='main'
        component={MainTabScreen}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name='symptoms'
        component={SymptomsScreen}
        options={{
          ...defaultOptions,
          title: t('NAV.checkSymptoms'),
          headerLeft: (props) => iconLeft(props),
        }}
      />
      <MainStack.Screen
        name='treatment'
        component={TreatmentScreen}
        options={{
          ...defaultOptions,
          title: t('NAV.treatmentToday'),
          headerLeft: (props) => iconLeft(props),
        }}
      />
      <MainStack.Screen
        name='survey'
        component={SurveysScreen}
        options={{
          ...defaultOptions,
          title: t('NAV.takeSurvey'),
          headerLeft: (props) => iconLeft(props),
        }}
      />
      <MainStack.Screen
        name='questions'
        component={QuestionsScreen}
        options={{
          ...defaultOptions,
          title: t('NAV.answerQuestions'),
          headerLeft: (props) => iconLeft(props),
        }}
      />
      <MainStack.Screen
        name='treatments'
        component={TreatmentsScreen}
        options={{
          ...defaultOptions,
          title: t('NAV.clinicalModules'),
          headerLeft: (props) => iconLeft(props),
        }}
      />
      <MainStack.Screen
        name='medication'
        component={MedicationScreen}
        options={{
          ...defaultOptions,
          title: t('NAV.medication'),
          headerLeft: (props) => iconLeft(props),
        }}
      />
      <MainStack.Screen
        name='messages'
        component={MessagesScreen}
        options={{
          ...defaultOptions,
          title: t('NAV.messagesToGP'),
          headerLeft: (props) => iconLeft(props),
        }}
      />
      <MainStack.Screen
        name='results'
        component={ResultsScreen}
        options={{
          ...defaultOptions,
          title: t('NAV.surveysResults'),
          headerLeft: (props) => iconLeft(props),
        }}
      />
      <MainStack.Screen
        name='help'
        component={HelpScreen}
        options={{
          ...defaultOptions,
          title: t('NAV.aboutApp'),
          headerLeft: (props) => iconLeft(props),
        }}
      />
    </MainStack.Navigator>
  )
}
