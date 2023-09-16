import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BillsFffService } from './bills_fff.service';
import { CreateBillsFffDto } from './dto/create-bills_fff.dto';
import { UpdateBillsFffDto } from './dto/update-bills_fff.dto';
import { Auth } from 'src/common/helpers/decorators';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Facturas')
@Auth()
@Controller('bills-fff')
export class BillsFffController {
  constructor(private readonly billsFffService: BillsFffService) {}




  @Get()
  findAll() {
    return this.billsFffService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.billsFffService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBillsFffDto: UpdateBillsFffDto) {
    //return this.billsFffService.update(+id, updateBillsFffDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.billsFffService.remove(+id);
  }
}
