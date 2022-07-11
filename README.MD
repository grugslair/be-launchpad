## Introduction
---
This repo will provide endpoints for grug lair website, such as:
* project list
* project detail
* etc

## Tech stack
---
* **Framework**: [Express](https://github.com/expressjs/express)
* **ORM**: [Sequelize](https://github.com/sequelize/sequelize)
* **Auth**: [JWT](github.com/auth0/node-jsonwebtoken)
* **Code**: [ESlint](https://github.com/eslint/eslint)
* **Development**: [nodemon](https://github.com/remy/nodemon)
* **Other**: [dotenv](https://github.com/motdotla/dotenv)
* **Hapi plugins**: [boom, joi, glue](https://hapi.dev/plugins/)

## Getting Started
---
### Installation
Clone from the repo and then install all the dependencies that required

```bash
git clone https://YOUR_USERNAME@github.com/ssnar/grug-backend.git

cd grug-backend

npm install
```

### Usage
```bash
tsc

npm run migrate

npm run start
```

### API Documentation
TBA

## Structure
---
```YAML
.
├── src                      # API stuff
│   ├── config               # Configuration files
│   ├── routes               # API Routing
│   ├── modules              # Modules to handle requests
│   └── database             # Databases files
├── dist                     # Compiled scripts
├── .env                     # Environment variables
├── .sequelizerc             # Sequelize CLI config
├── package.json             # Project config file
├── tsconfig.json            # Typescript config file
├── vercel.json              # Vercel config file
└── README.md 
```

## License
[MIT](https://choosealicense.com/licenses/mit/)