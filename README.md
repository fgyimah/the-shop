# tendoSHOP

![App Version](https://img.shields.io/badge/version-0.1.0-green.svg)
![Typescript version](https://img.shields.io/badge/typescript-3.9.7-blue.svg)
![React version](https://img.shields.io/badge/react-17.0.0-blue)

E-commerce shopping cart application written in typescript using the ReactJS framework, as firebase as backend.

## Getting Started

To begin the following are recommended

- Node v12.8 or higher
- Yarn v1.22.0 or higher
- Firebase account

To begin the project is development mode

- Install NodeJS and Yarn
- Clone the repository from the Github URL
- Run `yarn install` or simply `yarn` to install all the project's dependencies.
- Create a firebase project and allow email authentication, google authentication, firestore with permission set to read and write by unauthorized users.
- Copy the `.env.example` file and create a duplicate with the name `.env` and fill in the firebase credentials.
- Run `yarn start` to run the project in development mode

## Dependencies

> Note that not all dependencies are written here, this list is limited to core project dependencies only

- `react` - Core Frontend library for building reusable components
- `@material-ui/core && @material/icons` - Material design system component and icons library for react
- `firebase` - Javascript firebase client for connecting to firebase.
- `formik` - library for easy management of forms in a react application
- `react-paystack` - For integrating paystack payment api into react apps
- `react-router-dom` - For routing in react apps
- `react-router-config` - For declaring react routes in a declarative way
- `react-share` - For easy sharing to social application from a react app
- `react-spinners` - For loading animations in react apps
- `react-tabs` - For easy tab implementation in react apps
- `react-toastify` - For displaying nice toast messages in react applications
- `redux` - State management tool for javascript apps
- `react-redux` - For connecting react apps to redux states
- `redux-thunk` - For writing redux actions that returns functions instead of objects
- `redux-persist` - For saving redux state, even over full page refresh
- `redux-devtools-extension` - For connecting redux apps to the redux devtools extension in chrome, firefox and edge browsers
- `styled-components` - For declaring styles for react apps in a component based structure
- `typescript` - Allows for typescript support and compilation
- `yup` - For Easy form validation, Yup + Formik = 🤩

## Application Structure

All programming is done in the `src` folder.

The `src` folder is structured as follows:

```bash
.
+--- components/  # Common components to be shared among different pages
+--- helpers/     # Helper files
+--- layouts/     # Contains application layout files
+--- pages/       # Contains actual pages in the application
+--- store/       # Contains all data related to redux state
+--- theme/       # Contains global styles of the application
+--- @types.ts    # Contains general typescript interfaces on common Objects
+--- App.tsx      # Root component of the entire application
+--- firebase.ts  # Contains firebase initial setup
+--- index.tsx    # Starting point of the application
+--- routes.ts    # Contains the routes declarations of the application
```

# Deployment

> Application is initially deployed to netlify with [this URL](https://tendo-shop.netlify.app)
