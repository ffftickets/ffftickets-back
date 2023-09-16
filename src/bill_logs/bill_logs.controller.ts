import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BillLogsService } from './bill_logs.service';
import { CreateBillLogDto } from './dto/create-bill_log.dto';
import { UpdateBillLogDto } from './dto/update-bill_log.dto';

@Controller('bill-logs')
export class BillLogsController {
  constructor(private readonly billLogsService: BillLogsService) {}

  @Post()
  create(@Body() createBillLogDto: CreateBillLogDto) {
    return this.billLogsService.create(createBillLogDto);
  }

  @Get()
  findAll() {
    return this.billLogsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.billLogsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBillLogDto: UpdateBillLogDto) {
    return this.billLogsService.update(+id, updateBillLogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.billLogsService.remove(+id);
  }
}
