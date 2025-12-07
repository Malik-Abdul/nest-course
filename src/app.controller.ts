import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // Basically controllers are handling the routes
  @Get() // This is route
  getHello(): string {
    return this.appService.getHello();
  }
}
