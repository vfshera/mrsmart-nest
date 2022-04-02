import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import { create } from 'express-handlebars';
import * as csurf from 'csurf';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import * as compression from 'compression';
import helmet from 'helmet';
import { Request } from 'express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'public'));

  const exphbs = create({
    helpers: {
      toLower(str: string) {
        return str.toLowerCase();
      },
      toUpper(str: string) {
        return str.toUpperCase();
      },
      withInput(inputType?: string) {
        return inputType ?? 'text';
      },
      currentYear() {
        return new Date().getFullYear();
      },
      concat(strOne: string, strTwo: string) {
        return strOne + strTwo;
      },
      isRoute(currPath, truthyPath: string, falsyPath: string) {
        if (currPath && currPath == falsyPath) {
          return truthyPath;
        }
        return falsyPath;
      },
      isValue(value, comparisonValue, truthyValue, falsyValue) {
        if (value == comparisonValue) {
          return truthyValue;
        }
        return falsyValue;
      },
      isEven(subject, truthyValue: string, falsyValue: string) {
        return subject % 2 == 0 ? truthyValue : falsyValue;
      },
      isOdd(subject, truthyValue: string, falsyValue: string) {
        return subject % 2 != 0 ? truthyValue : falsyValue;
      },
    },
    extname: '.hbs',
    defaultLayout: 'layout',
  });

  app.engine('hbs', exphbs.engine);
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  app.use(cookieParser(process.env.APP_KEY));

  app.use(
    session({
      name: process.env.APP_NAME.replace(/ /g, '_').toUpperCase(),
      secret: process.env.APP_KEY,
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: true,
        httpOnly: true,
        domain: process.env.APP_URL,
        path: '/',
        expires: new Date(Date.now() + 60 * 60 * 1000),
      },
    }),
  );
  app.use(
    csurf({
      cookie: true,
      value: (req) => req.csrfToken(),
    }),
  );
  // app.use(helmet({ contentSecurityPolicy: false }));
  app.use(compression());

  await app.listen(3000, () =>
    console.log(`${process.env.APP_NAME} at http://localhost:3000`),
  );
}
bootstrap();
