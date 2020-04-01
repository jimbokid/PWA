[![Coverage Status](https://coveralls.io/repos/github/jimbokid/PWA/badge.svg?branch=master&service=github)](https://coveralls.io/github/jimbokid/PWA?branch=master)
[![Build Status](https://travis-ci.org/jimbokid/PWA.svg?branch=master)](https://travis-ci.org/jimbokid/PWA)

# Progressive web application example

## Attention
Before you start application you need `.env` file with all configs, [contact with me](mailto:jimbokid89@gmail.com) and I'll send you .env file,
or u can't create your own with yours own firebase storage.

List of parameters:
- REACT_APP_API_KEY
- REACT_APP_AUTH_DOMAIN
- REACT_APP_DATABASE_URL
- REACT_APP_PROJECT_ID
- REACT_APP_STORAGE_BUCKET
- REACT_APP_MESSAGING_SENDER_ID

## Demo
[click here to look demo](https://react-pwa-d4fd9.firebaseapp.com/)

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br>
For unit testing I use Jest.

### `yarn run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

## Auto deploy with CI

Also I setuped auto-deploy after any changes at master branch.
I use [https://travis-ci.org/](https://travis-ci.org/)

## Progressive web application optimization

I use next solutions to speed up my application
- Lazy load for images wich is not in view port
- Service workers for offline work & for speed up all next visits after first
- Infinite scroll

## Lightouse results (WIP)
[click here to view lighthouse report](https://googlechrome.github.io/lighthouse/viewer/?gist=d133973a0fd70c377be07f0914abe76e)

