import { Test, TestingModule } from '@nestjs/testing';
import { UserLogGatewayController } from './user-log-gateway.controller';

describe('UserGatewayController', () => {
  let controller: UserLogGatewayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserLogGatewayController],
    }).compile();

    controller = module.get<UserLogGatewayController>(UserLogGatewayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
