import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';

import { create } from 'express-handlebars';

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
    },
    extname: '.hbs',
    defaultLayout: 'layout',
  });

  app.engine('hbs', exphbs.engine);
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  await app.listen(3000, () =>
    console.log(`${process.env.APP_NAME} at http://localhost:3000`),
  );
}
bootstrap();
