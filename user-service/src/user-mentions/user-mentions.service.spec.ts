import { Test, TestingModule } from '@nestjs/testing';
import { UserMentionsService } from './user-mentions.service';

describe('UserMentionsService', () => {
  let service: UserMentionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserMentionsService],
    }).compile();

    service = module.get<UserMentionsService>(UserMentionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
