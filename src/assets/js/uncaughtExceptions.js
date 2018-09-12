if(!isDev()) {
  Raven.config('https://a9e956f1b16a4aef87de8d1160260e7c@sentry.io/1254138').install();
}

process.on('uncaughtException', function (err) {
  if(!isDev()) {
    Raven.captureException(err);
  }
  Power.updateState(false);
})
