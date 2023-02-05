# NodeJs NestJs application product categories

Serveless application to manage product and categories

### Prerequisites

- NodeJs installed follow instructions <a href="https://nodejs.org/en/download/">NodeJs</a>
- Npm Installation
  `npm install -g npm`
- Yarn Installation
  `npm install -g yarn`
- Nestjs
  `npm install -h nestjs`
- Install aws cli follow the instructions <a href="https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html" target="_blank">Aws</a> framework for building efficient and scalable server-side applications.</p>
- Install serverless
  `npm install -g serverless`

## Installation

- On the root

```bash
$ yarn install
```

- Run serverless

```bash
$ serverless plugin install -n serverless-plugin-optimize
$ serverless plugin install -n serverless-dynamodb-local
$ serverless plugin install -n serverless-offline
```

- Install dynamodb

```bash
$ serverless dynamodb install
```

- Create a .env file with following values

```bash
IS_OFFLINE = 'true'
DYNAMODB_ENDPOINT = 'http://localhost:6000/shell'
```

- Confiure AWS local

```bash
aws configure
```

follow instructions in the following link <a href="https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html">AWS configure</a>

## Running the app

```bash
# development
$ yarn build && serverless offline start
```

## Test

```bash
# unit tests
$ yarn run test
```

## Test Deployed version

A version was deployed in order to be tested the steps to test are the following

Base Project Url: https://t1joau0d4l.execute-api.us-east-1.amazonaws.com/dev/

1. Do a POST request in order to create a category

- https://t1joau0d4l.execute-api.us-east-1.amazonaws.com/dev/categories

Payload

```bash
{
    "name": "category 1",
    "description": "details",
    "image": "s3://productscategories/shirts.jpeg"
}
```

2. List Categories with GET request

- https://t1joau0d4l.execute-api.us-east-1.amazonaws.com/dev/categories

3. delete category DELETE request

- https://t1joau0d4l.execute-api.us-east-1.amazonaws.com/dev/categories/some-id
  Payload

````bash
{
    "name": "category 1",
    "description": "details",
    "image": "s3://productscategories/shirts.jpeg"
}

4. update category UPDATE request
-  https://t1joau0d4l.execute-api.us-east-1.amazonaws.com/dev/categories/some-id

3. Create a product with a created category with a POST request
-  https://t1joau0d4l.execute-api.us-east-1.amazonaws.com/dev/products
Payload
```bash
{
    "name": "new product",
    "description": "details",
    "price": 22,
    "images": [
        "s3://productscategories/0162844_bocholt-t-shirt_500.jpeg",
        "s3://productscategories/0162844_bocholt-t-shirt_500.jpeg"
    ],
    "category": "e7469c46-0b50-4ca7-be3c-5f20e91ee511"
}
````

5. List products GET request

- https://t1joau0d4l.execute-api.us-east-1.amazonaws.com/dev/products

6. Update product PATCH request

- https://t1joau0d4l.execute-api.us-east-1.amazonaws.com/dev/products/some-id

```bash
{
    "name": "new product",
    "description": "details",
    "price": 22,
    "images": [
        "s3://productscategories/0162844_bocholt-t-shirt_500.jpeg",
        "s3://productscategories/0162844_bocholt-t-shirt_500.jpeg"
    ],
    "category": "e7469c46-0b50-4ca7-be3c-5f20e91ee511"
}
```

7. delete product DELETE request

- https://t1joau0d4l.execute-api.us-east-1.amazonaws.com/dev/products/some-id
