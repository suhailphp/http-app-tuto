import * as Sentry from "@sentry/react";

function init() {
  Sentry.init({
    dsn:
      "https://83b9037e33da48268b83832a8f162095@o429099.ingest.sentry.io/5375127",
  });
}

function log(error) {
  Sentry.captureException(error);
}

export default { init, log };
