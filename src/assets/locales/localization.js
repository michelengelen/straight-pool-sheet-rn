import RNLanguages from 'react-native-languages';
import i18n from 'i18n-js';
import en from './en';
import de from './de';

i18n.locale = RNLanguages.language.substr(0, 2);
i18n.fallbacks = true;
i18n.defaultLocale = 'en';
i18n.translations = {en, de};

export {i18n};
