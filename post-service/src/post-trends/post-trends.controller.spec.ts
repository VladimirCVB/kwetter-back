import { Test, TestingModule } from '@nestjs/testing';
import { PostTrendsController } from './post-trends.controller';

describe('PostTrendsController', () => {
  let controller: PostTrendsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostTrendsController],
    }).compile();

    controller = module.get<PostTrendsController>(PostTrendsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
