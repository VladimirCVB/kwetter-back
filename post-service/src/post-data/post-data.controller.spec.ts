import { Test, TestingModule } from '@nestjs/testing';
import { PostDataController } from './post-data.controller';

describe('PostDataController', () => {
  let controller: PostDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostDataController],
    }).compile();

    controller = module.get<PostDataController>(PostDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
