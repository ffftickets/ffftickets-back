import { Test, TestingModule } from '@nestjs/testing';
import { BillLogsService } from './bill_logs.service';

describe('BillLogsService', () => {
  let service: BillLogsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BillLogsService],
    }).compile();

    service = module.get<BillLogsService>(BillLogsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
