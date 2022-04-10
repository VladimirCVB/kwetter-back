import { Test, TestingModule } from '@nestjs/testing';
import { UserFollowGatewayController } from './user-follow-gateway.controller';

describe('UserGatewayController', () => {
  let controller: UserFollowGatewayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserFollowGatewayController],
    }).compile();

    controller = module.get<UserFollowGatewayController>(UserFollowGatewayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
