import bodyParser from 'body-parser';

export default function initializeBodyParser(app) {
  app.use(
    bodyParser.json({
      type: ['application/json', 'application/vnd.api+json'],
    })
  );
}
