import { Test, TestingModule } from '@nestjs/testing';
import { UserDataGatewayController } from './user-data-gateway.controller';

describe('UserGatewayController', () => {
  let controller: UserDataGatewayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserDataGatewayController],
    }).compile();

    controller = module.get<UserDataGatewayController>(
      UserDataGatewayController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
