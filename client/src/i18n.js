// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          'Português': 'Portuguese',
          'Inglês': 'English',
        },
      },
      pt: {
        translation: {
          'Português': 'Português',
          'Inglês': 'Inglês',
        },
      },
    },
    lng: 'pt',
    fallbackLng: 'pt',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
