# GoodBuy

![Vercel](http://therealsujitk-vercel-badge.vercel.app/?app=goodbuy)
![Lines of code](https://img.shields.io/tokei/lines/github/code-goodbuy/goodbuy-nextjs)
![GitHub repo size](https://img.shields.io/github/repo-size/code-goodbuy/goodbuy-nextjs)
![GitHub top language](https://img.shields.io/github/languages/top/code-goodbuy/goodbuy-nextjs)
![GitHub package.json dependency version (prod)](https://img.shields.io/github/package-json/dependency-version/code-goodbuy/goodbuy-nextjs/next)
![GitHub last commit](https://img.shields.io/github/last-commit/code-goodbuy/goodbuy-nextjs)
![GitHub contributors](https://img.shields.io/github/contributors/code-goodbuy/goodbuy-nextjs)

![Icon](https://i.postimg.cc/G3XWbdwc/favicon-1024x1024.png)

[GoodBuy](https://github.com/code-goodbuy/goodbuy-nodejs) frontend app built using nextjs, typescript and tailwindcss.

Working preview: [goodbuy.vercel.app](https://goodbuy.vercel.app).

## Project Status 🚧

The development of the project is still in progress. Currently we are working on the profile page and on the home page. The social functionalities that will allow the users to follow each other and see each other's acitity are also under development, as well as the scanner functionalities.

## Installation 📦

Prerequisites: ```nodejs v15.6.0``` or newer and ```npm 7.4.0``` or newer.

To install this project and run it locally, please follow the following steps:

1. Open the terminal in the desired directory and run ```git clone https://github.com/code-goodbuy/goodbuy-nextjs.git```;
2. Navigate to the repository (```cd goodbuy-nextjs```);
3. Navigate to the branch you are interested in (```git checkout BRANCH_NAME```);
4. Install the npm packages by running ```npm i ```;
5. Either run the development server with ```npm run dev``` or build and run the app for better performances by running ```npm run build && npm run start```;
6. Visit http://localhost:3000

## Testing 🧪

This app uses Jest, Testing-Library, and Cypress for Unit, Integration, and End-to-End tests.

You can run the Unit and Integration tests by simply running ```npm run test```.

If you want to run the End-to-End tests, make sure you build and start the app, then, in another terminal window run either ```npm run cy:run``` (to run Cypress without its GUI) or ```npm run cy:open``` (to run Cypress with its GUI).
