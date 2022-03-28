import { Test, TestingModule } from '@nestjs/testing';
import { UserAdministratorController } from './user-administrator.controller';

describe('UserAdministratorController', () => {
  let controller: UserAdministratorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserAdministratorController],
    }).compile();

    controller = module.get<UserAdministratorController>(
      UserAdministratorController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
