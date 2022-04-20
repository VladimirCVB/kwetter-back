import { Test, TestingModule } from '@nestjs/testing';
import { PostGatewayController } from './post-gateway.controller';

describe('PostGatewayController', () => {
  let controller: PostGatewayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostGatewayController],
    }).compile();

    controller = module.get<PostGatewayController>(PostGatewayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
