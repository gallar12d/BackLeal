import { Module } from '@nestjs/common';
import { SaleService } from './sale.service';
import { SaleController } from './sale.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SaleSchema } from './schema/sale.schema';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Sale',
        schema: SaleSchema,
      },
    ]),
    ClientsModule.register([
     
      {
        name: 'USERSMICRO',
        transport: Transport.TCP,
        options: { port: 4000 },
      },
    
    ]),
  ],
  controllers: [SaleController],
  providers: [SaleService],
})
export class SaleModule {}
