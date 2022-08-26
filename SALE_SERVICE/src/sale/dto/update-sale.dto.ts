import { PartialType } from '@nestjs/mapped-types';
import { CreateSaleDto } from './create-sale.dto';

export class UpdateSaleDto extends PartialType(CreateSaleDto) {
  readonly value: number;
  readonly detail: string;
  readonly identification: number;
  readonly createdAt: Date;
}
