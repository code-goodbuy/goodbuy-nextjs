# GoodBuy NextJS

![Vercel](http://therealsujitk-vercel-badge.vercel.app/?app=goodbuy)
![Lines of code](https://img.shields.io/tokei/lines/github/code-goodbuy/goodbuy-nextjs)
![GitHub repo size](https://img.shields.io/github/repo-size/code-goodbuy/goodbuy-nextjs)
![GitHub top language](https://img.shields.io/github/languages/top/code-goodbuy/goodbuy-nextjs)
![GitHub package.json dependency version (prod)](https://img.shields.io/github/package-json/dependency-version/code-goodbuy/goodbuy-nextjs/next)
![GitHub last commit](https://img.shields.io/github/last-commit/code-goodbuy/goodbuy-nextjs)
![GitHub contributors](https://img.shields.io/github/contributors/code-goodbuy/goodbuy-nextjs)

<img src="https://i.postimg.cc/G3XWbdwc/favicon-1024x1024.png" align="right" width="400"/>

[GoodBuy](https://github.com/code-goodbuy/goodbuy-nodejs) frontend app built using nextjs, typescript and tailwindcss.

🚀 Working preview: [goodbuy.vercel.app](https://goodbuy.vercel.app).

## Project Status 🚧

The development of the project is still in progress. Currently we are working on the profile page and on the home page. The social functionalities that will allow the users to follow each other and see each other's acitity are also under development, as well as the scanner functionalities.

## Installation 📦

Prerequisites: `nodejs v15.6.0` or newer and `npm 7.4.0` or newer.

To install this project and run it locally, please follow the following steps:

1. Open the terminal in the desired directory and run `git clone https://github.com/code-goodbuy/goodbuy-nextjs.git`;
2. Navigate to the repository (`cd goodbuy-nextjs`);
3. Navigate to the branch you are interested in (`git checkout BRANCH_NAME`);
4. Install the npm packages by running `npm i `;
5. Either run the development server with `npm run dev` or build and run the app for better performances by running `npm run build && npm run start`;
6. Visit http://localhost:3000.

## Testing 🧪

This app uses Jest, Testing-Library, and Cypress for Unit, Integration, and End-to-End tests.

You can run the Unit and Integration tests by simply running `npm run test`.

If you want to run the End-to-End tests, make sure you build and start the app, then, in another terminal window run either `npm run cy:run` (to run Cypress without its GUI) or `npm run cy:open` (to run Cypress with its GUI).

## Project Structure 🏗

Here is a description of the content of each folder in the directory:

```
.                           # Root directory.
├── __mocks__               # Jest mocking configuration for CSS and other static files.
├── __tests__               # Unit and Integration tests using Jest and Testing Library.
│   ├── api                 # Tests for proxy routes and functions.
│   ├── auth                # Tests for authentication components and logic.
│   ├── landingPage         # Tests for landing page components.
│   ├── profile             # Tests for profile page components and logic.
│   └── utility             # Tests for the barcode scanner scanner component.
├── components              # Components.
|   ├── auth                # Authentication components and functions.
│   ├── common              # Components shared across the web app.
│   ├── home                # Homepage components.
│   ├── landingPage         # Landing page components.
│   ├── profile             # Profile components.
│   └── utility             # Barcode scanner components.
├── cypress                 # End-to-End tests using Cypress.
│   ├── e2e                 # End-to-End tests.
│   ├── fixtures            # Cypress configuration for mocked data.
|   ├── plugins             # Cypress configuration for plugins.
│   └── support             # Custom Cypress methods and configuration.
├── lib                     # App logic and types.
│   ├── apiFunctions        # Logic for the proxy routes.
│   ├── contexts            # React contexts used by the app.
|   ├── hooks               # Custom hooks.
|   ├── testUtils           # Utilities for unit and integration tests.
│   └── types               # TypeScript types.
├── pages                   # Pages accessible by the user and serverless functions.
│   ├── api                 # Serverless functions, proxy routes to communicate with the backend.
|   |   └── dev             # Development temporary routes to fetch mock data not yet available in the backend.
│   └── user                # '/user/[username]' dynamic route.
├── public                  # Static files and PWA configurations.
│   ├── icons               # Icons used by the application.
│   └── pics                # Pictures used in the application.
└── styles                  # Custom CSS classes using Tailwind.
```

## Current Features 🔥

The features currently available in this app include:

- Secure authentication with HTTP-only Cookies;
- Email Confirmation;
- Dark mode;
- Responsive design in each page;
- HTTP proxy for requests forwarding & handling;
- Barcode Scanner (not yet implemented);
- Unit, Integration, and End-to-End tests;
- Deployed on Vercel;
- Performance optimization and possibility to install the app as a PWA;
- Possibility to edit profile data.

## Upcoming Features 🔮

The features that will be implemented soon in the future include:

- Feed caching;
- Barcode Scanner Implementation;
- Followers and Likes;
- History of Scanned Products;
- Homepage feed (with real data);
- Improved user search;
- Suggested (real) users;
- Legal Details (Terms and Conditions, EULA notice, impressum).

## Reflection 💭

The goal for this project was to build an MVP for GoodBuy, an app that would store information about the environmental footprint of products and let its users access those information by scanning a product.<br/>
While building what we have so far of the web application, I had the chance to learn some modern technology used in the field such as TailwindCSS, TypeScript, and React with its framework Nextjs.<br/>
I also learned how to build the features listed in the [Current Features](https://github.com/code-goodbuy/goodbuy-nextjs/tree/profile#current-features-) section, often using some third-party libraries and implementing those myself by reading the official documentation.<br/>
During this project, it often felt as I was racing against time, and that was probably the biggest challenge I faced. I did not really overcome this challenge since we do not have an MVP yet, but many of the features left to implement listed in the [Upcoming Features](https://github.com/code-goodbuy/goodbuy-nextjs/tree/profile#upcoming-features-) section should be really easy to implement once their related API endpoint is ready.<br/>
