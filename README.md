# Sentiment Analysis App

A simple web application for sentiment analysis using vanilla TypeScript, SCSS, Webcomponents, Webpack and Hugging Face API.

## Installation

1. Clone the repository:
   ```sh
   git clone <repo_url>
   cd sentiment-analysis-app
   ```
2. Install dependencies:
   ```sh
   npm install
   ```

## App Compilation

To compile code of the app, use:
```sh
npm run build
```

To watch for changes in app and recompile automatically:
```sh
npm run dev
```

## Running the Application

Simply open `index.html` in a browser or run locally using following command:
```sh
npm run dev
```

## Project Structure
```
├── dist
├── node_modules
├── src/
│   ├── components/
│   │   └── modal/
│   │       ├── sentimentModal.scss
│   │       └── sentimentModal.ts
│   ├── images/
│   │   ├── background.png
│   │   ├── favicon.png
│   │   ├── mobile-background.png
│   │   ├── negative.svg
│   │   ├── neutral.svg
│   │   └── positive.svg
│   ├── scripts/
│   │   ├── script.ts
│   │   ├── sentimentAnalysis.ts
│   │   └── webpackBundle.ts
│   ├── tests/
│   │   └── sentimentAnalysis.test.ts
│   ├── types/
│   │   └── svg.d.ts
│   ├── index.html
│   └── styles.scss
├── .gitignore
├── package.json
├── tsconfig.json
├── webpack.config.js
├── README.md
└── vitest.config.js
```

## Technologies Used
- TypeScript
- SCSS
- Webcomponents
- Webpack
- Vanilla JavaScript
- Node.js

## Challenges during coding
- styling of the Webcomponent
- configuration of the SCSS to work with Webcomponents
- proper configuration of the Webpack
- writing proper tests

## License
This project is licensed under the MIT License.
