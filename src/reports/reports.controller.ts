import { Body, Controller, Post } from '@nestjs/common';
import { CreateReportDto } from './dtos/CreateReportDto';

@Controller('reports')
export class ReportsController {
  findOne() {}

  @Post()
  createReport(@Body() body: CreateReportDto) {}

  updateOne() {}
}
