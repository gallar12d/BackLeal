import { Inject, Injectable } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Sale } from './interfaces/sale.interface';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class SaleService {
  constructor(
    @InjectModel('Sale') private readonly SaleModule: Model<Sale>,
    @Inject('USERSMICRO') private readonly userClient: ClientProxy,
  ) {}
  async create(createSaleDto: CreateSaleDto) {
    
    try {
      const resp = await this.SaleModule.create(createSaleDto);
      //enviar emit para avisar que se hizo una venta con esta informacion
      this.userClient.emit('sale_created', createSaleDto);
      return resp;
    } catch (error) {
      console.log(error);
    }
  }

  findAll() {
    return `This action returns all sale`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sale`;
  }
  async findSalesByIdentification(id: number) {
    try {
      const resp = await this.SaleModule.find({ identification: id });
      return resp;
    } catch (error) {}
  }

  async update(id: number, updateSaleDto: UpdateSaleDto) {}

  remove(id: number) {
    return `This action removes a #${id} sale`;
  }

  calculatePoints(value: number) {
    return Math.round(value / 1000);
  }
}
