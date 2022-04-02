import { Body, Controller, Get, Post, Render, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AppService } from './app.service';
import { AUTH_ACTION_LAYOUT } from './constants/layouts';
import { Csrf } from './decorators/csrf.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('pages/welcome')
  welcome(@Req() req: Request) {
    return this.appService.welcome(req.route.path);
  }

  @Get('login')
  @Render('pages/auth/login')
  loginPage(@Res() res: Response, @Csrf() csrfToken) {
    const { siteInfo } = this.appService.getSiteInfo();

    res.setHeader('csrf-token', csrfToken);
    return {
      siteInfo,
      layout: AUTH_ACTION_LAYOUT,
      csrfToken,
    };
  }

  @Post('login')
  login(@Body() body, @Res() res: Response) {
    console.log(body);

    res.redirect('/login');
  }
}
