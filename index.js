import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://723bbab6b7898283f3b67a6ae33a80da@o4510992089481216.ingest.de.sentry.io/4510992093937744",
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true
});

const container = document.getElementById("app");
const root = createRoot(container);
root.render(<App />);