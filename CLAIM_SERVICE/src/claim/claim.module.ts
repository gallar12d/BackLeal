import { Module } from '@nestjs/common';
import { ClaimService } from './claim.service';
import { ClaimController } from './claim.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ClaimSchema } from './schema/claim.schema';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Claim',
        schema: ClaimSchema,
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
  controllers: [ClaimController],
  providers: [ClaimService],
})
export class ClaimModule {}
