import { Test, TestingModule } from '@nestjs/testing';
import { PostTrendsService } from './post-trends.service';

describe('PostTrendsService', () => {
  let service: PostTrendsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostTrendsService],
    }).compile();

    service = module.get<PostTrendsService>(PostTrendsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
