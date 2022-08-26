import { Inject, Injectable } from '@nestjs/common';
import { CreateClaimDto } from './dto/create-claim.dto';
import { UpdateClaimDto } from './dto/update-claim.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Claim } from './interfaces/claim.interface';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ClaimService {
  constructor(
    @InjectModel('Claim') private readonly ClaimModule: Model<Claim>,
    @Inject('USERSMICRO') private readonly userClient: ClientProxy,

  ) {}
  async create(createClaimDto: CreateClaimDto) {
    try {
      const resp = await this.ClaimModule.create(createClaimDto);
       //enviar emit para avisar que se hizo un reclamo con esta informacion
       this.userClient.emit('claim_created', createClaimDto);
      return resp;
    } catch (error) {
      console.log(error);
    }
    // }
  }

  findAll() {
    return `This action returns all sale`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sale`;
  }
  async findClaimsByIdentification(id: number) {
    try {
      const resp = await this.ClaimModule.find({ identification: id });
      return resp;
    } catch (error) {}
  }

  async update(id: number, UpdateClaimDto: UpdateClaimDto) {}

  remove(id: number) {
    return `This action removes a #${id} sale`;
  }

  calculatePoints(value: number) {
    return Math.round(value / 1000);
  }
}
