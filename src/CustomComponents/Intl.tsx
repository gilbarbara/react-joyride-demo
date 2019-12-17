import React from 'react';
import { IntlProvider } from 'react-intl';

interface Messages {
  [key: string]: any;
}

interface IntlProps {
  locale: string;
}

export const messages: Messages = {
  de: {
    back: 'Zurück',
    close: 'Schließen',
    last: 'Zuletzt',
    next: 'Nächster',
    open: 'Öffnet den Dialog',
    restart: 'Starten Sie die Tour neu',
    skip: 'Überspringen',
    title: 'Sie können benutzerdefinierte Komponenten verwenden!',
    with: 'mit',
  },
  en: {
    back: 'Back',
    close: 'Close',
    last: 'Last',
    next: 'Next',
    open: 'Open the dialog',
    restart: 'Restart the tour',
    skip: 'Skip',
    title: 'You can use custom components!',
    with: 'with',
  },
  es: {
    back: 'Espalda',
    close: 'Cerrar',
    last: 'Último',
    next: 'Siguiente',
    open: 'Abre el dialogo',
    restart: 'Reiniciar el tour',
    skip: 'Omitir',
    title: '¡Puedes usar componentes personalizados!',
    with: 'con',
  },
  fr: {
    back: 'Retour',
    close: 'Fermer',
    last: 'Dernier',
    next: 'Suivant',
    open: 'Ouvrir le dialogue',
    restart: 'Redémarrer le tour',
    skip: 'Sauter',
    title: 'Vous pouvez utiliser des composants personnalisés!',
    with: 'avec',
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
