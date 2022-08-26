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
import { MessagePattern } from '@nestjs/microservices';
import { ClaimService } from './claim.service';
import { CreateClaimDto } from './dto/create-claim.dto';
import { UpdateClaimDto } from './dto/update-claim.dto';

@Controller('claim')
export class ClaimController {
  constructor(private readonly claimService: ClaimService) {}

  @Post()
  async create(@Res() res, @Body() createClaimDto: CreateClaimDto) {
    const claim = await this.claimService.create(createClaimDto);
    return res.status(HttpStatus.OK).json({
      claim,
    });
  }

  @Get()
  findAll() {
    return this.claimService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.claimService.findOne(+id);
  }
  @Get('claims/:id')
  findClaimsByIdentification(@Param('id') id: string) {
    return this.claimService.findClaimsByIdentification(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClaimDto: UpdateClaimDto) {
    return this.claimService.update(+id, updateClaimDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.claimService.remove(+id);
  }
  @MessagePattern({ cmd: 'get_claims' })
  async getClaimsById(id: number) {
    return this.claimService.findClaimsByIdentification(+id);
  }
}
