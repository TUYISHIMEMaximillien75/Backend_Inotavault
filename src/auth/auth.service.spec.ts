import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';

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
    const user = await service.Register({ name: "Max Land Empire", email: "maxlandempire@gmail.com", password: "password" });
    expect(user).toBeDefined();
  });
});
