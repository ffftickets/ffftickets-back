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
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AppResource, AppRoles } from 'src/app.roles';
import { Auth } from 'src/common/helpers/decorators';

import { Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  logger = new Logger(UserController.name);

  @ApiBearerAuth()
  @Auth({
    possession: 'any',
    action: 'create',
    resource: AppResource.USER,
  })
  @Post('admin-register')
  async AdminRegistration(
    @Body() createUserDto: CreateUserDto,
    @Res() res: Response,
  ) {
    this.logger.log('Registrando usuario como administrador');
    const data = await this.userService.create(createUserDto);
    return res.status(HttpStatus.OK).json(data);
  }

  @Post('public-register')
  async PublicRegistration(
    @Body() createUserDto: CreateUserDto,
    @Res() res: Response,
  ) {
    this.logger.log('Registrando persona publica');
    this.logger.log('Correo: ', createUserDto.email);
    createUserDto.roles = [AppRoles.CUSTOMER];
    if (!createUserDto.password) {
      createUserDto.password = createUserDto.identification;
    }
    const data = await this.userService.create(createUserDto);
    return res.status(HttpStatus.OK).json(data);
  }
  @Patch(':id/unblock')
  async UnblockUser(@Param('id') id: number, @Res() res: Response) {
    this.logger.log('Desbloqueando usuario', id);
    const data = await this.userService.unblockUser(id);
    return res.status(HttpStatus.OK).json(data);
  }

  @Get('/userSeed')
  async UserSeed(@Res() res: Response) {
    this.logger.log('Creando seed de usuario');
    const data = await this.userService.createSeedUser();
    return res.status(HttpStatus.OK).json('Usuarios creados');
  }
  @Auth({
    possession: 'any',
    action: 'read',
    resource: AppResource.USER,
  })
  @Get()
  async findAll(
    @Res() res: Response,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    this.logger.log('Buscando todos los usuarios');
    const users = await this.userService.findAll(page, limit);
    return res.status(HttpStatus.OK).json(users);
  }
  @Auth({
    possession: 'any',
    action: 'read',
    resource: AppResource.USER,
  })
  @Get(':id')
  async findOne(@Param('id') id: number, @Res() res: Response) {
    this.logger.log('Buscando usuario por ID: ', id);
    const data = await this.userService.findOne({ id });
    return res.status(HttpStatus.OK).json(data);
  }

  @ApiBearerAuth()
  @Auth({
    possession: 'own',
    action: 'update',
    resource: AppResource.USER,
  })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Res() res: Response,
  ) {
    this.logger.log('Actualizando usuario: ', updateUserDto.email);
    const data = await this.userService.update(+id, updateUserDto);
    return res.status(HttpStatus.OK).json(data);
  }
  @ApiBearerAuth()
  @Auth({
    possession: 'any',
    action: 'delete',
    resource: AppResource.USER,
  })
  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    this.logger.log('Desactivando usuario: ', id);
    const data = await this.userService.remove(+id);
    return res.status(HttpStatus.OK).json(data);
  }
}
