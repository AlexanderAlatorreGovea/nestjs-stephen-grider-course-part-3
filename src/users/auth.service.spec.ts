import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { UsersService } from './users.service';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;

  beforeEach(async () => {
    // Create a fake copy of the user's service
    // find and create are mock the auth find and create method
    // if anyone asks for a copy of the Users's service give them a copy of
    // fake user's service
    fakeUsersService = {
      find: () => Promise.resolve([]),
      create: (email: string, password: string) =>
        Promise.resolve({
          id: 1,
          email,
          password,
        } as User),
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
      ],
    }).compile();

    service = module.get(AuthService);
  });
  it('can create an istance of the auth service', async () => {
    expect(service).toBeDefined();
  });

  it('creates a new user with a salted and hash password', async () => {
    const user = await service.signup('alex@ssdfs.com', 'asdf');

    expect(user.password).not.toEqual('asdf');
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('throws an error if user signs up with an email that is in use', async () => {
    fakeUsersService.find = () =>
      Promise.resolve([
        { id: 1, email: 'user@domain.pl', password: 'pass' } as User,
      ]);

    try {
      await service.signup('a@a.pl', 'pass');
    } catch (err) {
      expect(err.message).toBe('email in use.');
    }
  });

  it('throws sign in is called with an unused email', async () => {
    try {
      await service.signup('a@a.pl', 'pass');
    } catch (err) {
      expect(err.message).toBe('email in use.');
    }
  });

  it('throws  if invalid password is provided', async () => {
    fakeUsersService.find = () =>
      Promise.resolve([
        { id: 1, email: 'user@domain.pl', password: 'pass' } as User,
      ]);

    try {
      await service.signup('a@a.pl', 'pasasdfs');
    } catch (err) {
      expect(err.message).toBe('email in use.');
    }
  });

  it('returns a user if correct password is provided', async () => {
    fakeUsersService.find = () =>
      Promise.resolve([
        { id: 1, email: 'user@domain.pl', password: 'pass' } as User,
      ]);

    const user = await service.signin('user@domain.pl', 'pass');
    expect(user).toBeDefined();
  });
});
