import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
describe('UsersService', () => {
  let service: UsersService;
  let repo: Repository<User>

  const mockUserRepo = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
    find: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  }


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, {
        provide: getRepositoryToken(User),
        useValue: mockUserRepo
      }],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repo = module.get(getRepositoryToken(User));
  });

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('should  create a user', async () => {
    mockUserRepo.findOne.mockResolvedValue(null);
    mockUserRepo.create.mockReturnValue({
      name: "Max Land Empire",
      email: "maxlandempire@gmail.com",
      password: "hashedPassword",
    })

    mockUserRepo.save.mockResolvedValue({
      id: "uuid",
    })

    const user = await service.createUser("Max Land Empire", "maxlandempire@gmail.com", "password");

    expect(user).toBeDefined();
    expect(repo.save).toHaveBeenCalledWith({
      name: "Max Land Empire",
      email: "maxlandempire@gmail.com",
      password: "hashedPassword",
    })
    expect(user).toEqual({
      id: expect.any(String),
      name: "Max Land Empire",
      email: "maxlandempire@gmail.com",
      password: expect.any(String),
    });
    expect(repo.findOne).toHaveBeenCalledWith({
      where: {
        email: "maxlandempire@gmail.com",
      },
    });
    expect(repo.create).toHaveBeenCalledWith({
      name: "Max Land Empire",
      email: "maxlandempire@gmail.com",
      password: "hashedPassword",
    });
    expect(repo.save).toHaveBeenCalledWith({
      name: "Max Land Empire",
      email: "maxlandempire@gmail.com",
      password: "hashedPassword",
    });

  });

  it('should throw error if user already exist', async () => {
    mockUserRepo.findOne.mockResolvedValue({
      name: "Max Land Empire",
      email: "maxlandempire@gmail.com",
      password: "hashedPassword",
    })
    await expect(service.createUser("Max Land Empire", "maxlandempire@gmail.com", "password")).rejects.toThrow("User already exist");
  });
});
