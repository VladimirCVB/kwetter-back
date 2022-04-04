import { Test, TestingModule } from '@nestjs/testing';
import { AdminGatewayService } from './admin-gateway.service';

describe('AdminGatewayService', () => {
  let service: AdminGatewayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminGatewayService],
    }).compile();

    service = module.get<AdminGatewayService>(AdminGatewayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
