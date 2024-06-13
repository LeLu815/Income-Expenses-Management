class AuthApi {
  #client;
  constructor(client) {
    this.#client = client;
  }
  async login(id, password) {
    const response = await this.#client.post("/login", {
      id,
      password,
    });
  }
  async join(id, password, nickname) {
    const response = await this.#client.post("/register", {
      id,
      password,
      nickname,
    });
  }
}

export default AuthApi;
