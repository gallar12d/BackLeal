import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    console.log('entra hello')
    return 'Hello World! diego';
  }
}
