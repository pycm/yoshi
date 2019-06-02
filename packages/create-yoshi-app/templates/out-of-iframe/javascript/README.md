# out of iframe app

## Setup

```
npm install
```

**Configure chrome to allow invalid certificates for resources loaded from localhost**

> The viewer is running on `https` thus we need to serve our application on `https` as well. Yoshi is using a self signed certificate which is `invalid` for chrome.

Paste the following in Chrome's omnibox:

```
chrome://flags/#allow-insecure-localhost
```

Change the highlighted flag from `Disabled` to `Enabled`.

## Local development

**Try your local viewer app in a production viewer:**

> This command runs `yoshi start` and opens a production viewer with the ooi develpment app installed. It points to your local viewer script and viewer app.

```
npm start
```

**Try your local editor app and settings panel in a production editor:**

> This command runs `yoshi start` and opens a production editor with the ooi develpment app installed. It points to your local editor app and settings panel.

```
npm run start:editor
```

## testing

Run `npm start` or `npm start:editor` (both runs the dev-servers), open another terminal and run `npx jest --watch`.

#### Test viewer app

Test the viewer app against production viewer, using the ooi development app that points to your local viewer app and viewer script.

See `__tests__/e2e/viewerApp.e2e.js` to see an example.

#### Test editor app & settings panel

> Testing against production editor similarly to the viewer app is problematic due to the editor loading time and required authentication.

When running the tests, yoshi bootstraps your `dev/server.js` as configured in `jest-yoshi.config.js`.

See `__tests__/e2e/editorApp.e2e.js` to see an example.

<!-- See `__tests__/e2e/settingsPanel.e2e.js` to see an example. -->

## Deployment

### Setup in dev center

Configure your app on the dev center, follow the step-by-step [instructions](http://wixplorer.wixpress.com/out-of-iframe/guides/DEV%20Center%20Configuration).
