import { Body, Controller, Get, Post, Render, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AppService } from './app.service';
import { AUTH_ACTION_LAYOUT } from './constants/layouts';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('pages/welcome')
  welcome() {
    return this.appService.welcome();
  }

  @Get('login')
  @Render('pages/auth/login')
  loginPage() {
    const { siteInfo } = this.appService.getSiteInfo();

    return { siteInfo, layout: AUTH_ACTION_LAYOUT };
  }

  @Post('login')
  login(@Body() body, @Res() res: Response) {
    console.log(body);

    res.redirect('/login');
  }
}
