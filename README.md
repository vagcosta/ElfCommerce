# <img src="https://image.flaticon.com/icons/svg/235/235111.svg" width="64" /> ElfCommerce

<p>
  <img src="https://img.shields.io/badge/React-16.4.+-lightblue.svg">
  <img src="https://img.shields.io/badge/Redux-4.0.+-purple.svg">
  <img src="https://img.shields.io/badge/Nodejs-8.10.+-green.svg">
  <img src="https://img.shields.io/badge/Express-4.16.+-black.svg">
  <img src="https://img.shields.io/badge/Boostrap-4.+-purple.svg">
  <img src="https://img.shields.io/badge/MySQL-5.7.+-blue.svg">
</p>

ElfCommerce is an open source ecommerce dashboard written in ReactJS + ExpressJS and curretly under active development. The goal of this project is to provide a data-driven backoffice solution for SMEs. It will allow yout to manage your inventory, orders, supply chain, shipments, payments and everything else in one place with intuitive UI.

Please join me to work on this special project together. I'm looking for volunteers:

- Coders: React, Node
- UX designers
- Supply Chain domain experts

## ElfCommerce is suitable for

- Online store businesses
- Retail businesses
- F&B businesses
- Importers & Exporters
- Dropshippers

## Demo account

Username: test@test.com

Password: 123

[Dashboard demo](https://ccwukong.github.io/) (Continue developing)

<img src="https://media.giphy.com/media/6utXdpDYcFfa3szDcI/giphy.gif" />

## Installation

Step 1, clone this repo

Step 2, add the **_.env_** file in **server** directory with environment settings:

```
tokenSecret=REPLACE_THIS_WITH_ANY_LONG_RANDOM_STRING
dbHost=MYSQL_SERVER_CONNECTION_STRING
dbUser=MYSQL_USER
dbPassword=MYSQL_USER_PASSWORD
dbName=MYSQL_DATABASE_NAME
testDbName=MYSQL_DATABASE_NAME_FOR_INTEGRATION_TEST
sendgridApiKey=SENDGRID_API_KEY
sendgridDailyLimit=SENDGRID_DAILY_LIMIT_FOR_FREETIER
elasticemailApiKey=ELASTICEMAIL_API_KEY
elasticemailDailyLimit=ELASTICEMAIL_DAILY_LIMIT_FOR_FREETIER
passwordCallbackUrl=https://www.example.com
senderEmail=SYSTEM_EMAIL_SENDER_EMAIL
```

Step 3, install all dependancies for ExpressJS

```console
cd server && yarn install
```

Step 4, install all dependancies for ReactJS

```console
cd client && yarn install
```

Step 5, create your own config.js in **client/src** directory with following settings:

```javascript
const config = {
  apiDomain: 'API_DOMAIN',
  accessTokenKey: 'THE_KEY_FOR_LOCAL_STORAGE_TO_STORE_ACCESS_TOKEN',
  googleApiKey: 'GOOGLE_API_KEY',
  mediaFileDomain: 'http://localhost:8080', //If you allow images to be uploaded to your local server
  saveMediaFileLocal: false, //Set this to true if you allow images to be uploaded to your local server
  sendgridApiKey: 'SENDGRID_API_KEY',
  sendgridDailyLimit: 'SENDGRID_DAILY_LIMIT_FOR_FREETIER',
  elasticemailApiKey: 'ELASTICEMAIL_API_KEY',
  elasticemailDailyLimit: 'ELASTICEMAIL_DAILY_LIMIT_FOR_FREETIER',
  passwordCallbackUrl: 'https://www.example.com',
  senderEmail: 'SYSTEM_EMAIL_SENDER_EMAIL',
};

export default config;
```

Step 6, set up database

Before run the following command, make sure you already created a database and have it configured in your **.env** file.

```javascript
cd server && yarn db:migrate
```

Step 7 (Optional), if you wanna deploy the RESTful API to AWS lambda function using ClaudiaJS, please make sure you follow [the instructions](https://medium.freecodecamp.org/express-js-and-aws-lambda-a-serverless-love-story-7c77ba0eaa35).

**ClaudiaJS doesn't create a Lambda function with environment variables from the .env file, thus you'll need to put all environment varibles in a .json file and run the following command when creating a Lambda function for the first time:**

```console
claudia create --handler lambda.handler --deploy-proxy-api --region AWS_REGION_NAME --set-env-from-json FILE_PATH
```

## How to run this?

```console
cd client && yarn start
```

## Unit Test

For every main directory (components, containers etc.), there should be a \_\_tests\_\_ directory for all unit test cases.

```console
cd clint && yarn test [test_directory]
cd server && yarn test [test_directory]
```

## How to contribute to this project?

Your contribution is appreicated. For the purpose of having good project management, I encourage you to understand the project structure and _way of working_ before you start to contribute to this project.

**_Project restructured based on Fractal + ducks for greater scalability_**

````
├── .circleci                    # CircleCI config file
├── client                       # The web frontend written in ReactJS
│   ├── public                   # Static public assets and uploads
│   ├── src                      # ReactJS source code
│   │   ├── components           # Shared components, like Button, Input etc.
│   │   │   ├── __tests__        # Unit test for components
│   │   ├── pages                # Top level components
│   │   │   ├── __tests__        # Unit test for containers
│   │   │   ├── ...              # Sub components of top level components
│   │   ├── modules              # Actions + Reducers using ducks file structure
│   │   │   ├── __tests__        # Unit test for reducers
│   │   ├── utils                # Utilities like language, date utils, string utils etc.
│   │   │   ├── languages        # All language translation .json files
│   │   │   │   └── en.json      # Language file
│   │   └── App.css              # Your customized styles should be added here
│   │   └── App.js               # ** Where React webapp routes configured.
│   │   └── index.js             # React webapp start point
│   │   └── config.js            # All global configurations(not included in this repo)
├── server                       # The web server part
│   ├── db                       # Directory for database raw sql file, migration script etc.
│   ├── exceptions               # Directory for all API exception types
│   ├── models                   # Directory for all API models
│   │   ├── tests                # Directory for all API models test cases
│   │   └── account.js           # User model
│   │   └── auth.js              # Authentication model
│   │   └── categorty.js         # Category model
│   │   └── index.js             # Aggregates all model files
│   │   └── manufacturer.js      # Manufacturer model
│   │   └── order.js             # Order model
│   │   └── product.js           # Product model
│   │   └── public.js            # Public data model
│   │   └── report.js            # Report model
│   │   └── store.js             # Store model
│   │   └── supplier.js          # Supplier model
│   │   ├── vendor               # For 3rd party modules
│   ├── routes                   # Directory for all router files
│   │   └── auth.js              # Router for authentication endpoints
│   │   └── category.js          # Router for category endpoints
│   │   └── common.js            # Router for public data endpoints
│   │   └── index.js             # Aggregates all router files
│   │   └── manufacturer.js      # Router for manufacturer endpoints
│   │   └── order.js             # Router for order endpoints
│   │   └── product.js           # Router for product endpoints
│   │   └── store.js             # Router for store endpoints
│   │   └── supplier.js          # Router for supplier endpoints
│   │   ├── vendor               # For 3rd party modules
│   ├── uploads                  # Directory for image uploading, will be created automatically(not included in this repo)
│   └── .env                     # Global environment variables(not included in this repo)
│   └── app.js                   # Restful APIs written in ExpressJS
│   └── app.local.js             # Wrapper file for claudia.js
│   └── lambda.js                # Used by claudiajs for severless deployment, **Don't change contents here.
│   └── package.json             # All project dependancies
│   └── middlewares.js           # Middlewares for ExpressJS routes
└── .eslintrc.json               # **Don't change settings here.
└── .prettierrc                  # **Don't change settings here.
└── LICENSE                      # Project license file, **Don't change contents here.
└── README.md                    # **Don't change contents here.
### 1. Always work on your own feature or bugfix branch.

You will need to follow the naming convention if it's a new feature:
**feature/xxx-xxx-xx**

or **fix/xxx-xxx-xx** if it's a bug or other type of fixing branch.

### 2. Always run eslint

Before creating a PR, you should run:

```console
yarn lint:client
````

to make sure all formatting or other issues have been properly fixed.

...

## About the logo

Icons made by [Freepik](https://www.freepik.com) from [www.flaticon.com](https://www.flaticon.com) is licensed by [CC 3.0 BY](http://creativecommons.org/licenses/by/3.0)

## License

Elf Commerce is [Apache-2.0 licensed.](https://github.com/ccwukong/elfcommerce/blob/master/LICENSE)
