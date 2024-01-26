import BackendService from "./BackendService";

interface GetTokenBody {
  usuario: string;
  password: string;
}

class TokenService extends BackendService {
  private readonly path = "token";

  async login(body: GetTokenBody) {
    return await super.postQuery({
      path: this.path,
      body,
    });
  }
  
}

export const tokenService = new TokenService();
