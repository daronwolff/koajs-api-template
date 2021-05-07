# Koa Wolff

Koa JS API + Mongo DB template

This repository contains APIS for:

- Todos
- User Authentication
- Mongo DB integration

## Endpoints

```txt
GET /v1/todos
POST /v1/todos
GET /v1/todos/:todoId
PUT /v1/todos/:todoId
DELETE /v1/todos/:todoId

POST /auth/register
POST /auth/activate-account
POST /auth/login
POST /auth/forgot-password
POST /auth/reset-password
```

## Project setup

1.- Download this repo

2.- `npm i`

3.- `mongo` is required

## How to use

Run app
`npm run start`

Run for development
`npm run dev`

## Directories

### config

Configuration files

### constants

Directory for constant variables, example error message texts, status codes

### routes

API routes. Routes should include controllers and joi validations

### models

Database models

### middlewares

Koa middlewares

### services

Services to connect the controllers to database models

### validations

Joi validations for routes. Use following verbs to describe the validation type: [list, get, create, update, delete]

Example for POST:

```javascript
  create: {
    body: {
      name: rules
        .stringRequired
        .min(constants.NAME_MIN)
        .max(constants.NAME_MAX),
      desc: rules.string
        .min(constants.DESC_MIN)
        .max(constants.DESC_MAX),
    },
    type: 'json',
  },
```

### helpers

Pure functions (Given the same inputs, always returns the same output).

### constants

Constant values

### controllers

Handler functions

### Coding style

https://github.com/google/eslint-config-google & https://google.github.io/styleguide/jsguide.html

## Versioning

### Types

*feat* new feature

*fix* bug fix

*refactor* refactoring code

*style* formatting, missing semicolon, linter suggestions... no code change.

*doc* changes in documentation

*test* adding or refactoring tests, no production code change

### Branching

Branches must use following structure:
`<type>/title`

Example:
`feat/login-endpoint`

### Commits

```
<type>: Title
# notice this breakline

Description of commit
```

Example:

```
feat: Adding endpoint for login

Login endpoint was added:
Path: /api/v1/login

Body:
{
  "username": "joe",
  "pass": "·84kdu4443**?¿"
}

```

## API documentation

To generate the api HTML documentation check `/docs/contract` directory
