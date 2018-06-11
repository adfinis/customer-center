export default {
  de: 'German',
  en: 'English',

  global: {
    Username: 'Username',
    Password: 'Password',
    save: 'save',
    delete: 'delete',
    edit: 'edit',
    search: 'Search',
    empty: 'There is nothing to show here - yet!',
    cancel: 'Cancel',
    show: 'Show',
    back: 'Back'
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
    directions: 'Directions',
    'directions.bs.url':
      'https://www.adfinis-sygroup.ch/de/kontakt/directions-basel.html',
    'directions.be.url':
      'https://www.adfinis-sygroup.ch/de/kontakt/directions-bern.html',
    fax: 'Fax',
    phone: 'Phone',
    tools: {
      redmine: 'Redmine',
      'redmine.description': 'Managing tasks, bugs, etc.',

      gitlab: 'Gitlab',
      'gitlab.description': 'Code repository',

      rt: 'Request Tracker',
      'rt.description': 'Support-Requests by email',

      poweradmin: 'PowerAdmin',
      'poweradmin.description': 'DNS zone management',

      symonitoring: 'SyMonitoring',
      'symonitoring.description': 'Monitoring of servers and services',

      sysupport: 'SySupport',
      'sysupport.description': 'Support subscriptions',

      ppa: 'PPA',
      'ppa.description': 'Manage your web-hostings',

      rhev: 'RHV',
      'rhev.description': 'Manage your virtual servers',

      mailcleaner: 'Mail Cleaner',
      'mailcleaner.description': 'Spam Filter'
    }
  },

  nav: {
    dashboard: 'Dashboard',
    vault: 'Vault',
    sysupport: 'SySupport',
    settings: 'Settings',
    logout: 'Sign out'
  },

  vault: {
    metadata: 'Metadata',
    secrets: 'Secrets',
    add: 'Add Entry',
    'delete-entry': 'Delete entire entry',
    value: 'Value',
    'save-success': 'Changes were saved.',
    'clipboard-success': 'The secret was saved to your clipboard.',
    'clipboard-error': 'The secret could not be saved to your clipboard.'
  },

  sysupport: {
    breadcrumbs: {
      reload: 'Reload',
      overview: 'Overview'
    },
    hours: 'Hours',
    date: 'Date',
    accept: 'Confirm',
    deny: 'Delete',

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
      title: 'Sysupport Subscriptions',
      time: {
        total: 'Time Total',
        used: 'Time Used'
      },
      charge: 'Reload',
      details: 'Details'
    },

    reload: {
      price: 'Price',
      select: 'Select a Subscription-Package',
      success: 'Your order was saved successfully.',
      error:
        'An error occured while processing your order. Please check if your order was saved and if not, try again.',
      charge: 'Reload'
    },

    detail: {
      expense: 'Expense',
      charges: 'Past Charges',
      effort: 'Effort',
      employee: 'Employee',
      description: 'Description',
      acknowledged: 'Acknowledged',
      amount: 'Amount'
    },
    admin: {
      subscriptions: 'Subscriptions',
      'confirm-subscription': 'Confirm subscriptions',
      customer: 'Customer',
      project: 'Project',
      projects: 'Projects',
      billingType: 'Billing Type',
      orderedTime: 'Time Ordered',
      usedTime: 'Time Used',
      timeTotal: 'Time Total',
      unconfirmedTime: 'Needs confirmation',
      admin: 'Admin',
      confirmSuccess: 'Order accepted.',
      confirmDeny: 'Order denied.'
    }
  }
}
