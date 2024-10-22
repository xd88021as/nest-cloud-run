import { Test, TestingModule } from '@nestjs/testing';
import { IdentityService } from '../services/identity.service';
import { UserIdentityController } from './user-identity.controller';

describe('UserIdentityController', () => {
  let controller: UserIdentityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserIdentityController],
      providers: [IdentityService],
    }).compile();

    controller = module.get<UserIdentityController>(UserIdentityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
