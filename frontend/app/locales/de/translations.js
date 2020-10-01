export default {
  de: 'Deutsch',
  en: 'Englisch',

  global: {
    'search-placeholder': 'Suche...',
    Username: 'Benutzername',
    Password: 'Passwort',
    save: 'Speichern',
    delete: 'Löschen',
    edit: 'bearbeiten',
    search: 'Suchen',
    empty: 'Keine Einträge gefunden',
    cancel: 'Abbrechen',
    show: 'Anzeigen',
    back: 'Zurück',
    error: 'Oops etwas ist schief gelaufen'
  },

  components: {
    'uk-pagination': {
      page: 'Seite',
      of: 'von',
      next: 'Nächste Seite',
      prev: 'Vorherige Seite'
    }
  },

  login: {
    login: 'Login',
    'logging-in': 'Login',
    'forgot-password': 'Passwort vergessen?',
    'send-new-password': 'Neues Passwort senden',
    'sent-new-password':
      'Anweisungen zum zurücksetzen des Passwortes wurden an Ihre E-Mail geschickt',
    'your-new-password-is:': 'Dein neues Passwort ist:',
    'missing-identification': 'Bitte geben Sie einen Benutzernamen an',
    'back-to-login': 'Zurück zum Login'
  },

  index: {
    greeting: 'Willkommen im Customer Center',
    'our-tools': 'Unsere Tools',
    'contact-us': 'Kontaktieren Sie uns',
    'create-ticket': 'Support ticket erstellen',
    location: 'Standort {{location}}',
    locationLink: 'https://adfinis.com/kontakt/#standorte',
    fax: 'Fax',
    phone: 'Tel',
    tools: {
      timed: 'Credits / Reports',
      'timed.description': 'Support Abonnemente'
    }
  },

  nav: {
    dashboard: 'Übersicht',
    timed: 'Credits / Reports',
    settings: 'Einstellungen',
    logout: 'Logout'
  },

  timed: {
    breadcrumbs: {
      reload: 'Aufladen',
      overview: 'Übersicht'
    },
    hours: 'Stunden',
    date: 'Datum',
    accept: 'Bestätigen',
    deny: 'Löschen',
    time: {
      total: 'Totales Guthaben',
      used: 'Gebrauchtes Guthaben',
      ordered: 'Bestellte Zeit',
      unconfirmed: 'Ausstehende Zeit'
    },

    durations: {
      minute: {
        one: 'Minute',
        other: 'Minuten'
      },
      hour: {
        one: 'Stunde',
        other: 'Stunden'
      }
    },

    index: {
      title: 'Abonnements',
      charge: 'Aufladen',
      details: 'Details'
    },

    reload: {
      price: 'Preis',
      select: 'Wählen Sie ein Paket aus',
      success: 'Ihre Bestellung wurde erfolgreich verarbeitet.',
      error:
        'Bei der Verarbeitung Ihrer Bestellung ist ein Fehler aufgetreten. Bitte vergewissern Sie sich ob die Bestellung verarbeitet wurde und falls nicht, versuchen Sie es noch einmal.',
      charge: 'Aufladen',
      'error-loading':
        'Die Bestellungen für dieses Projekt konten nicht geladen werden. Bitte versuchen Sie es erneut.',
      noPackage: {
        title: 'Es scheint als hätten Sie keine Pakete.',
        text:
          'Um ihre Zeit aufzuladen, kontaktieren Sie bitte unseren Support unter:',
        phone: 'Telefon'
      }
    },

    detail: {
      expense: 'Aufwände',
      charges: 'Bestellungen',
      effort: 'Aufwand',
      employee: 'Mitarbeiter',
      description: 'Beschreibung',
      acknowledged: 'Bestätigt',
      amount: 'Anzahl Stunden',
      errorLoading:
        'Es ist ein Problem aufgetreten beim laden der Daten. Bitte versuchen Sie es erneut',
      loadMore: 'Mehr laden'
    },
    admin: {
      subscriptions: 'Abonnements',
      'confirm-subscription': 'Bestellung bestätigen',
      reload: 'Aufladen',
      customer: 'Kunde',
      project: 'Projekt',
      projects: 'Projekte',
      billingType: 'Verrechnungs Art',
      admin: 'Admin',
      confirmSuccess: 'Bestellung akzeptiert.',
      confirmDeny: 'Bestellung abgelehnt.',
      'reload-form-error': 'Bitte geben Sie nur valide Nummern ein.',
      form: 'Anzahl Stunden/Minuten:',
      filter: 'Filter',
      timeAlmostConsumedFilter: 'Zeit fast verbraucht'
    }
  },

  dashboard: {
    locations: 'Standorte',
    links: {
      timed: 'Alle Projekte anzeigen',
      tickets: 'Alle Tickets anzeigen'
    },
    remaining: ' übrig.',
    headers: { contact: 'Kontakt', tickets: 'Tickets', support: 'Support' },
    'contact-info':
      'Von Montag-Freitag sind wir während den Bürozeiten (08:00 bis 17:30 Uhr) für Sie da.',
    'support-info':
      'Sie brauchen Support? Kontaktieren Sie uns per Mail oder Telefonisch.',
    tickets: { open: 'offene Tickets', recent: 'Top 3 aktualisierte Tickets' }
  }
}
