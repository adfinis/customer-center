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
    back: 'Back',
    error: 'Oops something went wrong'
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
    gitlab: 'Projects',
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
      title: 'Sysupport Subscriptions',
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
      amount: 'Amount'
    },
    admin: {
      subscriptions: 'Subscriptions',
      'confirm-subscription': 'Confirm subscriptions',
      customer: 'Customer',
      project: 'Project',
      projects: 'Projects',
      billingType: 'Billing Type',
      admin: 'Admin',
      confirmSuccess: 'Order accepted.',
      confirmDeny: 'Order denied.'
    }
  },

  gitlab: {
    projects: 'Projects',
    groups: 'Groups',
    commitsSince: 'Show Changes since:',
    allGroups: 'All Groups',
    placeholder: 'Search...',
    table: {
      project: 'Project',
      commits: 'Changes',
      pipelines: 'Pipelines'
    },
    commit: {
      one: '1 Change',
      other: '{{count}} Changes'
    },
    errors: {
      group: 'An error ocurred while loading the following group:',
      commits:
        'An error occured while loading the changes for the following group:',
      pipelines:
        'An error occured while loading the pipelines for the following group:'
    },
    empty: {
      groups: 'No GitLab groups found.',
      commits: 'There are no changes in the specified time span.',
      pipelines: 'The project has no pipelines.'
    },
    'pipeline-table': {
      stage: 'Stage',
      status: 'Status'
    },
    status: {
      failed: 'Failed',
      passed: 'Passed',
      created: 'Created',
      pending: 'Pending',
      running: 'Running'
    }
  }
}
