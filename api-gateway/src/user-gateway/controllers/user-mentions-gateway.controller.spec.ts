import { Test, TestingModule } from '@nestjs/testing';
import { UserMentionsGatewayController } from './user-mentions-gateway.controller';

describe('UserGatewayController', () => {
  let controller: UserMentionsGatewayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserMentionsGatewayController],
    }).compile();

    controller = module.get<UserMentionsGatewayController>(
      UserMentionsGatewayController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
