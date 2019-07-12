import React from 'react';
import { IntlProvider, addLocaleData } from 'react-intl';
import de from 'react-intl/locale-data/de';
import en from 'react-intl/locale-data/en';
import es from 'react-intl/locale-data/es';
import fr from 'react-intl/locale-data/fr';

addLocaleData([...de, ...en, ...es, ...fr]);

interface Message {
  back: string;
  close: string;
  last: string;
  next: string;
  open: string;
  skip: string;
  restart: string;
}

interface Messages {
  [key: string]: Message;
}

interface IntlProps {
  locale: string;
}

const messages: Messages = {
  de: {
    back: 'Zurück',
    close: 'Schließen',
    last: 'Zuletzt',
    next: 'Nächster',
    open: 'Öffnet den Dialog',
    restart: 'Starten Sie die Tour neu',
    skip: 'Überspringen',
  },
  en: {
    back: 'Back',
    close: 'Close',
    last: 'Last',
    next: 'Next',
    open: 'Open the dialog',
    restart: 'Restart the tour',
    skip: 'Skip',
  },
  es: {
    back: 'Espalda',
    close: 'Cerrar',
    last: 'Último',
    next: 'Siguiente',
    open: 'Abre el dialogo',
    restart: 'Reiniciar el tour',
    skip: 'Omitir',
  },
  fr: {
    back: 'Retour',
    close: 'Fermer',
    last: 'Dernier',
    next: 'Suivant',
    open: 'Ouvrir le dialogue',
    restart: 'Redémarrer le tour',
    skip: 'Sauter',
  },
};

export default class Intl extends React.Component<IntlProps, {}> {
  public render() {
    const { children, locale } = this.props;

    return (
      <IntlProvider locale={locale} messages={messages[locale]}>
        {children}
      </IntlProvider>
    );
  }
}
