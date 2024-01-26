import BackendService from './BackendService';

class UserService extends BackendService {
  private readonly path = 'usuarios';
}

export const userService = new UserService();