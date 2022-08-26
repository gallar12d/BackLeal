import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  // @MessagePattern({ cmd: 'get_sales' })
  // getSalesById(id: number) {
  //   console.log('entra con id ' + id)
  //   // return this.saleService.findSalesByIdentification(+id)
  // }
}
