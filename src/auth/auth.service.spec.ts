import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';

describe('AuthService', () => {
  let service: AuthService;
  let userServices: UsersService

    const mockUserServices = {
        createUser: jest.fn(),
        verifyUser: jest.fn(),
        findByEmail: jest.fn(),
    }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, {
        provide: UsersService,
        useValue: mockUserServices
      }],
    }).compile();

    service = module.get(AuthService)
    userServices = module.get(UsersService)
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    const user = await service.createUser("Max Land Empire", "maxlandempire@gmail.com", "password");
    expect(user).toBeDefined();
  });
});
