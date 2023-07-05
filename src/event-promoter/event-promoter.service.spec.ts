import { Test, TestingModule } from '@nestjs/testing';
import { EventPromoterService } from './event-promoter.service';

describe('EventPromoterService', () => {
  let service: EventPromoterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventPromoterService],
    }).compile();

    service = module.get<EventPromoterService>(EventPromoterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
