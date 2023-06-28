import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { LicenseService } from './license.service';
import { CreateLicenseDto } from './dto/create-license.dto';
import { UpdateLicenseDto } from './dto/update-license.dto';
import { ApiTags } from '@nestjs/swagger';
import { Auth, GetUser } from 'src/common/helpers/decorators';
import { AppResource } from 'src/app.roles';
import { User } from 'src/user/entities/user.entity';
import axios from 'axios';
import { Response } from 'express';
import { handleError } from 'src/common/helpers/error-handler.helper';
@ApiTags('License')
@Controller('license')
export class LicenseController {
  constructor(private readonly licenseService: LicenseService) {}
  logger = new Logger(LicenseController.name);
  @Auth({
    possession: 'any',
    action: 'create',
    resource: AppResource.LICENSE,
  })
  @Post()
  async create(
    @Body() createLicenseDto: CreateLicenseDto,
    @GetUser() user: User,
    @Res() res: Response,
  ) {
    try {
      createLicenseDto.user_admin = user.id;
      this.logger.log('Creando licencia');
      const data = await this.licenseService.create(createLicenseDto);
      return res.status(HttpStatus.OK).json(data);
    } catch (error) {
      this.logger.error(error);
      const errorData = handleError(error);
      return res.status(errorData.statusCode).json(errorData);
    }
  }

  @Auth({
    possession: 'any',
    action: 'read',
    resource: AppResource.LICENSE,
  })
  @Get()
  async findAll(@Res() res: Response) {
    try {
      this.logger.log('Obteniendo todas las licencias');
      const data = await this.licenseService.findAll();
      return res.status(HttpStatus.OK).json(data);
    } catch (error) {
      this.logger.error(error);
      const errorData = handleError(error);
      return res.status(errorData.statusCode).json(errorData);
    }
  }
  @Auth({
    possession: 'any',
    action: 'read',
    resource: AppResource.LICENSE,
  })
  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      this.logger.log('Buscando licencia con id: ', id);
      const data = await this.licenseService.findOne(+id);
      return res.status(HttpStatus.OK).json(data);
    } catch (error) {
      this.logger.error(error);
      const errorData = handleError(error);
      return res.status(errorData.statusCode).json(errorData);
    }
  }

  @Auth({
    possession: 'any',
    action: 'update',
    resource: AppResource.LICENSE,
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLicenseDto: UpdateLicenseDto,
    @Res() res: Response,
  ) {
    try {
      this.logger.log('Actualizando licencia: ', id);
      const data = this.licenseService.update(+id, updateLicenseDto);
      return res.status(HttpStatus.OK).json(data);
    } catch (error) {
      this.logger.error(error);
      const errorData = handleError(error);
      return res.status(errorData.statusCode).json(errorData);
    }
  }
  @Auth({
    possession: 'any',
    action: 'delete',
    resource: AppResource.LICENSE,
  })
  @Delete(':id')
  remove(@Param('id') id: string, @Res() res: Response) {
    try {
      this.logger.log('Eliminando licencia: ', id);
      const data = this.licenseService.remove(+id);
      return res.status(HttpStatus.OK).json(data);
    } catch (error) {
      this.logger.error(error);
      const errorData = handleError(error);
      return res.status(errorData.statusCode).json(errorData);
    }
  }
}
