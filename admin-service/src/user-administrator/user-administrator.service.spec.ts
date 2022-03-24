import { Test, TestingModule } from '@nestjs/testing';
import { UserAdministratorService } from './user-administrator.service';

describe('UserAdministratorService', () => {
  let service: UserAdministratorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserAdministratorService],
    }).compile();

    service = module.get<UserAdministratorService>(UserAdministratorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
