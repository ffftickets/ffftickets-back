import { Module } from '@nestjs/common';
import { LocalitiesService } from './localities.service';
import { LocalitiesController } from './localities.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { Localities } from './entities/localities.entity';
import { EventModule } from 'src/event/event.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Localities]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    EventModule,

  ],
  controllers: [LocalitiesController],
  providers: [LocalitiesService],
  exports:[LocalitiesService]
})
export class LocalitiesModule {}
