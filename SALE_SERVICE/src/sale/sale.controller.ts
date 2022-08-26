import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { SaleService } from './sale.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { MessagePattern } from '@nestjs/microservices';

@Controller('sale')
export class SaleController {
  constructor(private readonly saleService: SaleService) {}

  @Post()
  async create(@Res() res, @Body() createSaleDto: CreateSaleDto) {
    const sale = await this.saleService.create(createSaleDto);
    return res.status(HttpStatus.OK).json({
      sale,
    });
  }

  @Get()
  findAll() {
    return this.saleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.saleService.findOne(+id);
  }
  @Get('sales/:id')
  findSalesByIdentification(@Param('id') id: string) {
    return this.saleService.findSalesByIdentification(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSaleDto: UpdateSaleDto) {
    return this.saleService.update(+id, updateSaleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.saleService.remove(+id);
  }
  @MessagePattern({ cmd: 'get_sales' })
  async getSalesById(id: number) {
    return await this.saleService.findSalesByIdentification(+id);
  }
}
