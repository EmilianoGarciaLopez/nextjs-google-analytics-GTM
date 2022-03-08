# Nextjs Google Analytics

[![npm version](https://badge.fury.io/js/nextjs-google-analytics.svg)](https://badge.fury.io/js/nextjs-google-analytics)
[![codecov](https://codecov.io/gh/MauricioRobayo/nextjs-google-analytics/branch/main/graph/badge.svg?token=ywhhMAVgON)](https://codecov.io/gh/MauricioRobayo/nextjs-google-analytics)
[![CodeFactor](https://www.codefactor.io/repository/github/mauriciorobayo/nextjs-google-analytics/badge)](https://www.codefactor.io/repository/github/mauriciorobayo/nextjs-google-analytics)

**Google Analytics for Next.js**
## Installation

```bash
npm install --save nextjs-google-analytics-gtm
```

## Usage

### Note:
This package must be used with a GTM server container, so you **MUST** define the following environment variable:

```bash
NEXT_PUBLIC_GTM_DOMAIN="www.yourdomain.com" 
```

Your _Google Analytics measurement id_ is read from `NEXT_PUBLIC_GA_MEASUREMENT_ID` environment variable, so make sure it is set in your production environment:

- [Vercel](https://vercel.com/docs/environment-variables)
- [Netlify](https://www.netlify.com/blog/2020/12/10/environment-variables-in-next.js-and-netlify/)

If the variable is not set or is empty, nothing will be loaded, making it safe to work in development.

To load it and test it on development, add:

```
NEXT_PUBLIC_GA_MEASUREMENT_ID="G-XXXXXXXXXX"
```

to your `.env.local` file.

## Scripts

Use the `GoogleAnalytics` component to load the gtag scripts. You can add it to a [custom Document](https://nextjs.org/docs/advanced-features/custom-document) component and this will take care of including the necessary scripts for every page (or you could add it on a per page basis if you need more control):

```tsx
// pages/document.tsx
import Document, {
  DocumentContext,
  Html,
  Head,
  Main,
  NextScript,
} from "next/document";
import { GoogleAnalytics } from "nextjs-google-analytics-gtm";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }
  render() {
    return (
      <Html>
        <Head>
          <GoogleAnalytics />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
```

## Page views

To track all pages views, call the `usePagesViews` hook inside a [custom App](https://nextjs.org/docs/advanced-features/custom-app) component, make sure to include the necessary gtag scripts with the `GoogleAnalytics` component:

```tsx
// pages/_app.tsx
import { GoogleAnalytics, usePagesViews } from "nextjs-google-analytics";

const App = ({ Component, pageProps }) => {
  usePagesViews();

  return (
    <>
      <Component {...pageProps} />
    </>
  );
};

export default App;
```

The module also exports a `pageView` function that you can use if you need more control.

## Custom event

You can use the `event` function to track a custom event:

```tsx
import { useState } from "react";
import Page from "../components/Page";
import { event } from "nextjs-google-analytics";

export function Contact() {
  const [message, setMessage] = useState("");

  const handleInput = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    event("submit_form", {
      category: "Contact",
      label: message,
    });

    setState("");
  };

  return (
    <Page>
      <h1>This is the Contact page</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Message:</span>
          <textarea onChange={handleInput} value={message} />
        </label>
        <button type="submit">submit</button>
      </form>
    </Page>
  );
}
```

## Web Vitals

To send [Next.js web vitals](https://nextjs.org/docs/advanced-features/measuring-performance#sending-results-to-analytics) to Google Analytics you can use a custom event on the `reportWebVitals` function inside a [custom App](https://nextjs.org/docs/advanced-features/custom-app) component:

```tsx
// pages/_app.tsx
import { event } from "nextjs-google-analytics";

export function reportWebVitals({ id, name, label, value }) {
  event(name, {
    category: label === "web-vital" ? "Web Vitals" : "Next.js custom metric",
    value: Math.round(name === "CLS" ? value * 1000 : value), // values must be integers
    label: id, // id unique to current page load
    nonInteraction: true, // avoids affecting bounce rate.
  });
}

const App = ({ Component, pageProps }) => {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
};

export default App;
```

If you are using TypeScript,you can import `NextWebVitalsMetric` from `next/app`:

```tsx
import type { NextWebVitalsMetric } from "next/app";

export function reportWebVitals(metric: NextWebVitalsMetric) {
  // ...
}
```

## TypeScript

The module is written in TypeScript and type definitions are included.

## Contributing

Contributions, issues and feature requests are welcome!

## Show your support

Give a ⭐️ if you like this project!

## LICENSE

[MIT](./LICENSE)
