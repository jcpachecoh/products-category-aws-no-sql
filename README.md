# NodeJs NestJs application product categories

Serveless application to manage product and categories

### Prerequisites

- NodeJs installed follow instructions <a href="https://nodejs.org/en/download/">NodeJs</a>
- Npm Installation
  `npm install -g npm`
- Nestjs
  `npm install -h nestjs`
- Install aws cli follow the instructions <a href="https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html" target="_blank">Aws</a> framework for building efficient and scalable server-side applications.</p>
- Install serverless
  `npm install -g serverless`

## Installation

On the root

```bash
$ yarn install
```

Run serverless

```bash
$ serverless plugin install -n serverless-plugin-optimize
$ serverless plugin install -n serverless-dynamodb-local
$ serverless plugin install -n serverless-offline
```

Install dynamodb

```bash
$ serverless dynamodb install
$ serverless plugin install -n serverless-dynamodb-local
$ serverless plugin install -n serverless-offline
```

Create a .env file with following values

```bash
IS_OFFLINE = 'true'
DYNAMODB_ENDPOINT = 'http://localhost:6000/shell'
```

Confiure aws local

## Running the app

```bash
# development
$ yarn build && serverless offline start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# watch
$ yarn run test:watch

# test coverage
$ yarn run test:cov
```
