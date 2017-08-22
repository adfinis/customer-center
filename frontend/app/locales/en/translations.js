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
    show: 'Show'
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
    'directions.bs.url': 'http://adfinis-sygroup.ch/en/directions-basel',
    'directions.be.url': 'http://adfinis-sygroup.ch/en/directions-bern',
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

      rhev: 'RHEV',
      'rhev.description': 'Manage your virtual servers',

      mailcleaner: 'Mail Cleaner',
      'mailcleaner.description': 'Spam Filter'
    }
  },

  nav: {
    dashboard: 'Dashboard',
    redmine: 'Redmine',
    rt: 'Request Tracker',
    symon: 'SyMonitoring',
    timescout: 'SySupport',
    wikis: 'Wikis',
    settings: 'Settings',
    profile: 'Profile',
    logout: 'Sign out'
  },

  redmine: {
    project: 'Project',
    tracker: 'Tracker',
    status: 'Status',
    priority: 'Priority',
    subject: 'Subject',
    updated: 'Updated on',

    'list-caption': 'Redmine issues of {{host}}',

    error: 'Error',
    'error-noprojects': 'No projects found'
  },

  rt: {
    status: 'Status',
    subject: 'Subject',
    updated: 'Updated on',
    created: 'Created on',

    'list-caption': 'Request Tracker'
  },

  timescout: {
    'list-caption': 'Subscriptions',
    'subscription.short': 'Sub',
    'remaining-hours': 'Remaining hours',
    history: 'History',

    'project-details': 'Project details',
    'project-name': 'Projectname',
    'total-booked': 'Total hours booked',
    'total-used': 'Total hours used',

    'list-timesheet': 'Timesheet of {{project}}',
    time: 'Time',
    description: 'Description',
    date: 'Date',
    'done-by': 'Done by',

    'lease-time': 'Lease time',
    'lease-date': 'Lease date',
    acknowledged: 'Acknowledged',
    'confirmed-by': 'Confirmed by',

    reload: 'Reload',
    'abo-reload-title': 'Abo reload',
    'abo-reload-info':
      'You are about to reload your abo. Please choose a package from below.',
    'abo-reload-success': 'Abo reload success!',
    package: 'Package',
    hours: 'Hours',
    price: 'Price',
    choose: 'Choose'
  },

  symon: {
    'list-caption': 'Monitoring',

    host: 'Host',
    status: 'Status',
    messages: 'Messages',

    'host.state': {
      danger: 'Error'
    },

    'service.state': {
      danger: 'Error',
      warning: 'Warning'
    }
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

  'user.profile': {
    email: 'Email address',
    services: 'Services',
    language: 'Language'
  }
}
