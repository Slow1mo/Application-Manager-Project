# Project: Application Manager
The project is made for the technical interview at WireDelta for the Full Stack Developer position.

## Motivation
The motivation behind the project is to use a Typescript/Javascript BE with a Typescript/Javascript FE for better readability and reausable code and create a secure, scalable RESTful API and a simple FE. The user, either company/employer or person/unemployed should be able to login and make an application for a job ad. The employer should be able to login and view and read applications and either delete them or change their status, for example if the applicant is hired.


## Code style
Nothing special here. As standard as it gets.

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
 
## Screenshots
Include logo/demo screenshot etc.

## Tech/framework used

- [NestJS](https://electron.atom.io)
- [PostgreSQL](https://www.postgresql.org/)
- [React](https://www.reactjs.org/)
- [TypeORM](https://www.typeorm.io)
- [JWT](https://www.jwt.io)
- [Passport.js](http://www.passportjs.org/)
- HTML
- CSS/SCSS/Styled Components
- JSON

## Features
My project stands out because Nest provides a modular approach to organizing code that is flexible enough to be extended yet Nest provides out-of-the-box architecture for the backend. Nest takes full advantage of TS decorators, as Nest is organized in terms of modules. They are classes annotated with Module() . In my app I use AppModule, AuthModule for user management and ApplicationsModule for application management. For secure user management, I use bcrypt for password hashing,passport.js and jwt, so an attacker won't be able to go to jwt.io and decode the passwords. For data transfer, I use DTOs and TypeORM, which is an ORM that supports latest TypeScript/Javascript versions and frameworks. My frontend is very simple to use and is built with React, styled components which is great for mobile devices and Material UI.

## Code Example

##### application.controller.ts snippet
```ts
import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe, UseGuards, Logger } from '@nestjs/common';
import { CreateApplicationDTO } from './DTO/create-application.dto';
import { ApplicationStatusValidationPipe } from './pipes/application-status-validation.pipe';
import { Application } from './application.entity';
import { ApplicationStatus } from './application-status.enum';
import { GetApplicationsFilterDTO } from './DTO/get-application-filter.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { ApplicationsService } from './applications.service';

@Controller('applications')
@UseGuards(AuthGuard())
export class ApplicationsController {
  private logger = new Logger('ApplicationsController');
  constructor(private applicationsService: ApplicationsService) {}

  @Get()
  getApplications(@Query(ValidationPipe) filterDTO: GetApplicationsFilterDTO, @GetUser() user: User): Promise<Application[]> {
    this.logger.verbose(`User "${user.username}" retrieving all applications. Filters: ${JSON.stringify(filterDTO)}`);
    return this.applicationsService.getApplications(filterDTO, user);
    
  }

  @Get('/:id')
  getApplicationById(@Param('id', ParseIntPipe) id: number,
  @GetUser() user: User,): Promise<Application> {
    return this.applicationsService.getApplicationById(id, user);
  }
```
## Installation

```bash
$ npm install
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

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Resources
[NestJS Documentation](https://docs.nestjs.com/)
[Material UI SignIn/SignUp](https://material-ui.com/getting-started/templates/) [NestJs TypeORM relationships](https://www.youtube.com/watch?v=F_oOtaxb0L8) [](https://wanago.io/2020/06/22/api-nestjs-relationships-postgres-typeorm/)


## License
A short snippet describing the license (MIT, Apache etc)

MIT © [Cristian Claudiu Sandu]()
