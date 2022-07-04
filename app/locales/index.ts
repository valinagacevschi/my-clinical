import * as Localization from 'expo-localization'
import i18n, { t } from 'i18n-js'
import moment from 'moment'
import 'moment/locale/fr'

import en from './en'
import fr from './fr'
import es from './es'
import de from './de'

i18n.translations = { en, fr, es, de }

i18n.locale = Localization.locale
i18n.fallbacks = true
moment.locale(i18n.locale)

export { i18n as I18n, t, Localization }
