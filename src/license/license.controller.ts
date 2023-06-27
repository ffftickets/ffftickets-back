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
  ) {
    createLicenseDto.userAdmin = user.id;
    this.logger.log('Creando licencia');
    return await this.licenseService.create(createLicenseDto);
  }

 
  @Get('download')
  async downloadFile(@Res() res: Response) {
    try {
      const fileUrl = 'https://firebasestorage.googleapis.com/v0/b/barbados1569-47458.appspot.com/o/PPX-GIB%20Guia%20de%20implementaci%C3%B3n%20de%20Bot%C3%B3n%20de%20pagos%204.2.pdf?alt=media&token=358adecf-1254-4d2d-9f65-1107771472cc'; // Reemplaza con la URL del archivo que deseas descargar

      const response = await axios.get(fileUrl, {
        responseType: 'stream',
      });

      res.set({
        'Content-Type':' application/pdf',
        'Content-Disposition': response.headers['content-disposition'],
      });
console.log(response)
      response.data.pipe(res);
    } catch (error) {
      console.error('Error al descargar el archivo:', error);
      res.status(500).send('Error al descargar el archivo');
    }
  }


  @Auth({
    possession: 'any',
    action: 'read',
    resource: AppResource.LICENSE,
  })
  @Get()
  async findAll() {
    this.logger.log('Obteniendo todas las licencias');
    return await this.licenseService.findAll();
  }
  @Auth({
    possession: 'any',
    action: 'read',
    resource: AppResource.LICENSE,
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    this.logger.log('Buscando licencia con id: ', id);
    return await this.licenseService.findOne(+id);
  }

  @Auth({
    possession: 'any',
    action: 'update',
    resource: AppResource.LICENSE,
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLicenseDto: UpdateLicenseDto) {
    this.logger.log('Actualizando licencia: ', id);
    return this.licenseService.update(+id, updateLicenseDto);
  }
  @Auth({
    possession: 'any',
    action: 'delete',
    resource: AppResource.LICENSE,
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    this.logger.log('Eliminando licencia: ', id);
    return this.licenseService.remove(+id);
  }
}
