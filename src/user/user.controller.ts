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
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AppResource, AppRoles } from 'src/app.roles';
import { Auth } from 'src/common/helpers/decorators';
import { handleError } from 'src/common/helpers/error-handler.helper';
import { Response } from 'express';
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
    try {
      this.logger.log('Registrando usuario como administrador');
      const data = await this.userService.create(createUserDto);
      return res.status(HttpStatus.OK).json(data);
    } catch (error) {
      this.logger.error(error);
      const errorData = handleError(error);
      return res.status(errorData.statusCode).json(errorData);
    }
  }

  @Post('public-register')
  async PublicRegistration(
    @Body() createUserDto: CreateUserDto,
    @Res() res: Response,
  ) {
    try {
      this.logger.log('Registrando persona publica');
      this.logger.log('Correo: ', createUserDto.email);
      createUserDto.roles = [AppRoles.CUSTOMER];
      const data = await this.userService.create(createUserDto);
      return res.status(HttpStatus.OK).json(data);
    } catch (error) {
      this.logger.error(error);
      const errorData = handleError(error);
      return res.status(errorData.statusCode).json(errorData);
    }
  }

  @Get('/userSeed')
  async UserSeed(@Res() res: Response) {
    try {
      this.logger.log('Creando seed de usuario');
      const data = await this.userService.createSeedUser();
      return res.status(HttpStatus.OK).json('Usuarios creados');
    } catch (error) {
      this.logger.error(error);
      const errorData = handleError(error);
      return res.status(errorData.statusCode).json(errorData);
    }
  }
  @Auth({
    possession: 'any',
    action: 'read',
    resource: AppResource.USER,
  })
  @Get()
  async findAll(@Res() res: Response) {
    try {
      this.logger.log('Buscando todos los usuarios');
      const users = await this.userService.findAll();
      return res.status(HttpStatus.OK).json(users);
    } catch (error) {
      this.logger.error(error);
      const errorData = handleError(error);
      return res.status(errorData.statusCode).json(errorData);
    }
  }
  @Auth({
    possession: 'any',
    action: 'read',
    resource: AppResource.USER,
  })
  @Get(':id')
  async findOne(@Param('id') id: number, @Res() res: Response) {
    try {
      this.logger.log('Buscando usuario por ID: ', id);
      const data = this.userService.findOne({ id });
      return res.status(HttpStatus.OK).json(data);
    } catch (error) {
      this.logger.error(error);
      const errorData = handleError(error);
      return res.status(errorData.statusCode).json(errorData);
    }
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
    try {
      this.logger.log('Actualizando usuario: ', updateUserDto.email);
      const data = await this.userService.update(+id, updateUserDto);
      return res.status(HttpStatus.OK).json(data);
    } catch (error) {
      this.logger.error(error);
      const errorData = handleError(error);
      return res.status(errorData.statusCode).json(errorData);
    }
  }
  @ApiBearerAuth()
  @Auth({
    possession: 'any',
    action: 'delete',
    resource: AppResource.USER,
  })
  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    try {
      this.logger.log('Desactivando usuario: ', id);
      const data = await this.userService.remove(+id);
      return res.status(HttpStatus.OK).json(data);
    } catch (error) {
      this.logger.error(error);
      const errorData = handleError(error);
      return res.status(errorData.statusCode).json(errorData);
    }
  }
}
