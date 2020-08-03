import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as Sentry from "@sentry/react";
import registerServiceWorker from "./registerServiceWorker";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";

Sentry.init({
  dsn:
    "https://83b9037e33da48268b83832a8f162095@o429099.ingest.sentry.io/5375127",
});

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
