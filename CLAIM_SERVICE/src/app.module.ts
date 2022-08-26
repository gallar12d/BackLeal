import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClaimModule } from './claim/claim.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientsModule, Transport } from '@nestjs/microservices';
const username = encodeURIComponent('api_comision_v1');
const password = encodeURIComponent('admin');
let uri = `mongodb+srv://${username}:${password}@cluster0.mczfe8k.mongodb.net/?retryWrites=true&w=majority`;

@Module({
  imports: [ClaimModule, MongooseModule.forRoot(uri)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
