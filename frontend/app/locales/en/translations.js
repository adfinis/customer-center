export default {
  de: 'German',
  en: 'English',

  global: {
    'search-placeholder': 'Search...',
    Username: 'Username',
    Password: 'Password',
    save: 'save',
    delete: 'delete',
    edit: 'edit',
    search: 'Search',
    empty: 'There is nothing to show here - yet!',
    cancel: 'Cancel',
    show: 'Show',
    back: 'Back',
    error: 'Oops something went wrong'
  },

  components: {
    'uk-pagination': {
      page: 'Page',
      of: 'of',
      next: 'Next',
      prev: 'Previous'
    }
  },

  login: {
    login: 'Sign in',
    'logging-in': 'Signing in',
    'forgot-password': 'Forgot password?',
    'send-new-password': 'Send new password',
    'sent-new-password':
      'Instructions to reset your password have been sent to your email',
    'your-new-password-is:': 'Your new password is:',
    'missing-identification': 'Please provide an username',
    'back-to-login': 'Back to login'
  },

  index: {
    greeting: 'Welcome',
    'our-tools': 'Our tools',
    'contact-us': 'Contact us',
    'create-ticket': 'Create support ticket',
    location: 'Location {{location}}',
    locationLink: 'https://adfinis.com/en/contact/#standorte',
    fax: 'Fax',
    phone: 'Phone',
    tools: {
      timed: 'Credits / Reports',
      'timed.description': 'Support subscriptions'
    }
  },

  nav: {
    dashboard: 'Dashboard',
    vault: 'Vault',
    timed: 'Credits / Reports',
    settings: 'Settings',
    logout: 'Sign out'
  },

  timed: {
    breadcrumbs: {
      reload: 'Reload',
      overview: 'Overview'
    },
    hours: 'Hours',
    date: 'Date',
    accept: 'Confirm',
    deny: 'Delete',
    time: {
      total: 'Time Total',
      used: 'Time Used',
      ordered: 'Time Ordered',
      unconfirmed: 'Needs confirmation'
    },

    durations: {
      minute: {
        one: 'Minute',
        other: 'Minutes'
      },
      hour: {
        one: 'Hour',
        other: 'Hours'
      }
    },
    index: {
      title: 'Credits / Reports',
      charge: 'Reload',
      details: 'Details'
    },

    reload: {
      price: 'Price',
      select: 'Select a Subscription-Package',
      success: 'Your order was saved successfully.',
      error:
        'An error occured while processing your order. Please check if your order was saved and if not, try again.',
      charge: 'Reload',
      'error-loading':
        "The orders for his project couldn't be loaded. Please try again.",
      noPackage: {
        title:
          "It seems like there aren't any Subscription Packages available.",
        text: 'To charge your time, please contact our Support under:',
        phone: 'Call'
      }
    },

    detail: {
      expense: 'Expense',
      charges: 'Past Charges',
      effort: 'Effort',
      employee: 'Employee',
      description: 'Description',
      acknowledged: 'Acknowledged',
      amount: 'Amount',
      errorLoading:
        'A Problem occured while fetching the data. Please try again.',
      loadMore: 'Load more'
    },
    admin: {
      subscriptions: 'Subscriptions',
      'confirm-subscription': 'Confirm subscriptions',
      reload: 'Reload',
      customer: 'Customer',
      project: 'Project',
      projects: 'Projects',
      billingType: 'Billing Type',
      admin: 'Admin',
      confirmSuccess: 'Order accepted.',
      confirmDeny: 'Order denied.',
      'reload-form-error': 'Please enter only valid numbers',
      form: 'Number of hours/minutes:',
      filter: 'Filter',
      timeAlmostConsumedFilter: 'Time almost consumed'
    }
  },

  dashboard: {
    locations: 'Locations',
    links: { timed: 'Show all projects', tickets: 'Show all tickets' },
    remaining: ' remaining.',
    headers: { contact: 'Contact', tickets: 'Tickets', support: 'Support' },
    'contact-info':
      'From Monday-Friday we are available for you during office hours (08:00 to 17:30).',
    'support-info': 'You need support? Contact us by mail or by phone.',
    tickets: { open: 'open tickets', recent: 'Top 3 most recently updated' }
  }
}
