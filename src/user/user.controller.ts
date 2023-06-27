import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AppResource, AppRoles } from 'src/app.roles';
import { Auth, GetUser } from 'src/common/helpers/decorators';
import { User } from './entities/user.entity';
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
  async AdminRegistration(@Body() createUserDto: CreateUserDto) {
    this.logger.log('Registrando usuario como administrador');
    const data = await this.userService.create(createUserDto);
    return data;
  }

  @Post('public-register')
  async PublicRegistration(@Body() createUserDto: CreateUserDto) {
    this.logger.log('Registrando persona publica');
    this.logger.log('Correo: ', createUserDto.email);
    createUserDto.roles = [AppRoles.CUSTOMER];
    const data = await this.userService.create(createUserDto);
    return { data };
  }

  @Get('/userSeed')
  async UserSeed() {
    this.logger.log('Creando seed de usuario');
    const data = await this.userService.createSeedUser();
    return { message: 'Users created' };
  }
  @Auth({
    possession: 'any',
    action: 'read',
    resource: AppResource.USER,
  })
  @Get()
  async findAll() {
    this.logger.log('Buscando todos los usuarios');
    return await this.userService.findAll();
  }
  @Auth({
    possession: 'any',
    action: 'read',
    resource: AppResource.USER,
  })
  @Get(':id')
  findOne(@Param('id') id: number) {
    this.logger.log('Buscando usuario por ID: ', id);
    return this.userService.findOne({ id });
  }

  @ApiBearerAuth()
  @Auth({
    possession: 'own',
    action: 'update',
    resource: AppResource.USER,
  })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    this.logger.log('Actualizando usuario: ', updateUserDto.email);
    const updateUser = await this.userService.update(+id, updateUserDto);
    return updateUser;
  }
  @ApiBearerAuth()
  @Auth({
    possession: 'any',
    action: 'delete',
    resource: AppResource.USER,
  })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    this.logger.log('Desactivando usuario: ', id);
    return await this.userService.remove(+id);
  }
}
