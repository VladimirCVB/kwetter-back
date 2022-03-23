import { Test, TestingModule } from '@nestjs/testing';
import { UserMentionsController } from './user-mentions.controller';

describe('UserMentionsController', () => {
  let controller: UserMentionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserMentionsController],
    }).compile();

    controller = module.get<UserMentionsController>(UserMentionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
