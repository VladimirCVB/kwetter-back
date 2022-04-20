import { Test, TestingModule } from '@nestjs/testing';
import { AdminGatewayController } from './admin-gateway.controller';

describe('AdminGatewayController', () => {
  let controller: AdminGatewayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminGatewayController],
    }).compile();

    controller = module.get<AdminGatewayController>(AdminGatewayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
