import { Test, TestingModule } from '@nestjs/testing';
import { EventPromoterController } from './event-promoter.controller';
import { EventPromoterService } from './event-promoter.service';

describe('EventPromoterController', () => {
  let controller: EventPromoterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventPromoterController],
      providers: [EventPromoterService],
    }).compile();

    controller = module.get<EventPromoterController>(EventPromoterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
