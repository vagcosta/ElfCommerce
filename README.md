# ElfCommerce

<img src="https://image.flaticon.com/icons/svg/235/235111.svg" width="64" />

<p>
  <img src="https://img.shields.io/badge/React-16.4.+-lightblue.svg">
  <img src="https://img.shields.io/badge/Redux-4.0.+-purple.svg">
  <img src="https://img.shields.io/badge/Nodejs-8.10.+-green.svg">
  <img src="https://img.shields.io/badge/Express-4.16.+-black.svg">
  <img src="https://img.shields.io/badge/Boostrap-4.+-purple.svg">
  <img src="https://img.shields.io/badge/MySQL-5.7.+-blue.svg">
</p>

An open source ecommerce dashboard written in ReactJS + ExpressJS. Manage your online business in one place.

## Demo account

Username: test@test.com

Password: 123

[Dashboard demo](https://ccwukong.github.io/) (Continue developing)


## Installation

Step 1, clone this repo

Step 2, add the ***.env*** file in root directory with environment settings:

```

tokenSecret=REPLACE_THIS_WITH_ANY_LONG_RANDOM_STRING
host=YOUR_MYSQL_SERVER_CONNECTION_STRING
user=YOUR_MYSQL_USER
password=YOUR_MYSQL_USER_PASSWORD
database=YOUR_MYSQL_DATABASE_NAME

```
Step 3, install all dependancies for ExpressJS

**Yarn**
```console
yarn install
```

**NPM**

```console
npm install
```

Step 4, install all dependancies for ReactJS

**Yarn**
```console
cd client && yarn install
```

**NPM**

```console
cd client && npm install
```

Step 5, create your own config.js in **client/src** directory with following settings:

```javascript
const config = {
  apiDomain: 'YOUR_API_DOMAIN',
  accessTokenKey: 'THE_KEY_FOR_LOCAL_STORAGE_TO_STORE_ACCESS_TOKEN',
  googleApiKey: 'GOOGLE_API_KEY',
};

export default config;
```

Step 6, set up database

Before run the following command, make sure you already created a database and have it configured in your **.env** file.

```javascript
yarn db:migrate
```

## How to run this?

**Yarn**

```console
yarn client
```

**NPM**

```console
npm run client
```

## Unit Test

For every main directory (components, containers etc.), there should be a \_\_tests\_\_ directory for all unit test cases.
```console
yarn test [test_directory]
```


## How to contribute to this project?

Your contribution is appreicated. For the purpose of having good project management, I encourage you to understand the project structure and *way of working* before you start to contribute to this project.

```
├── client                       # The web frontend written in ReactJS
│   ├── public                   # Static public assets and uploads
│   ├── src                      # ReactJS source code
│   │   ├── actions              # Actions and Action creators of Redux
│   │   ├── apis                 # Files for REST APIs
│   │   │   ├── mocks            # Mocked API response
│   │   ├── components           # React components
│   │   |   ├── __tests__        # Unit test for components
│   │   ├── containers           # React containers
│   │   |   ├── __tests__        # Unit test for containers
│   │   ├── reducers             # React reducers
│   │   |   ├── __tests__        # Unit test for reducers
│   │   ├── sagas                # Redux saga files
│   │   |   ├── __tests__        # Unit test for sagas
│   │   ├── translations         # All language translation .json files
│   │   └── App.css              # Your customized styles should be added here
│   │   └── App.js               # ** Where React webapp routes configured.
│   │   └── index.js             # React webapp start point
│   │   └── config.js            # All global configurations(not included in this repo)
└── .travis.yml                  # Travis CI config file
└── .eslintrc.json               # **Don't change settings here.
└── package.json                 # All project dependancies
└── .env                         # Global environment variables(not included in this repo)
└── app.js                       # Restful APIs written in ExpressJS
└── app.local.js                 # Wrapper file for claudia.js
└── README.md                    # **Don't change contents here.
```

### 1. Always work on your own feature or bugfix branch.

You will need to follow the naming convention if it's a new feature:
**feature/xxx-xxx-xx**

or **fix/xxx-xxx-xx** if it's a bug or other type of fixing branch.


### 2. Always run eslint

Before creating a PR, you should run:
```console
yarn lint:client
```
to make sure all formatting or other issues have been properly fixed.

...

## About the logo

Icons made by [Freepik](https://www.freepik.com) from [www.flaticon.com](https://www.flaticon.com) is licensed by [CC 3.0 BY](http://creativecommons.org/licenses/by/3.0)


## License
Elf Commerce is [Apache-2.0 licensed.](https://github.com/ccwukong/elfcommerce/blob/master/LICENSE)
