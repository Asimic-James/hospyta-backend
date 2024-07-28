<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# NestJS User Management and Post System

## Description

This project is a NestJS application that provides user management, post creation, and interaction features. It includes user authentication using JWT, post creation, commenting, and upvoting/downvoting posts. The application uses MongoDB for data storage and Swagger for API documentation.


This README provides a comprehensive overview of your project, including setup instructions, API documentation, and security considerations.


## Features

- User registration and authentication
- JWT-based authentication
- Post creation, editing, and deletion
- Commenting on posts
- Upvoting and downvoting posts
- Filtering and sorting posts by category and upvotes
- Swagger API documentation

## Prerequisites

- Node.js (v14 or higher)
- MongoDB database

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Asimic-James/hospyta-backend
   cd hospyta-backend
2.
```
npm install

3. MONGO_URI=mongodb_uri
JWT_SECRET=jwt_secret
```

## Folder Structure

```bash
src/
│
├── auth/
│   ├── auth.module.ts
│   ├── auth.service.ts
│   ├── jwt.strategy.ts
│   ├── local.strategy.ts
│   └── login.dto.ts
│
├── users/
│   ├── users.module.ts
│   ├── users.service.ts
│   ├── users.controller.ts
│   ├── user.schema.ts
│   └── create-user.dto.ts
│
├── posts/
│   ├── posts.module.ts
│   ├── posts.service.ts
│   ├── posts.controller.ts
│   ├── post.schema.ts
│   └── create-post.dto.ts
│
├── comments/
│   ├── comments.module.ts
│   ├── comments.service.ts
│   ├── comments.controller.ts
│   ├── comment.schema.ts
│   └── create-comment.dto.ts
│
├── app.controller.ts
├── app.module.ts
└── main.ts
```



## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## API Documentation

- The Swagger API documentation is available at http://localhost:3000/api-docs.


## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```



## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).


## License

Nest is [MIT licensed](LICENSE).
