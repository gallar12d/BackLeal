import { PartialType } from '@nestjs/mapped-types';
import { CreateClaimDto } from './create-claim.dto';

export class UpdateClaimDto extends PartialType(CreateClaimDto) {
  readonly points: number;
  readonly detail: string;
  readonly identification: number;
  readonly createdAt: Date;
}
