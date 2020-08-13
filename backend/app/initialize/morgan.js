import morgan from 'morgan';

export default function initializeMorgan(app) {
  const env = app.get('env');

  /* istanbul ignore next */
  if (env === 'production') {
    app.use(morgan('combined'));
  } else if (env === 'development') {
    app.use(morgan('dev'));
  }
}
