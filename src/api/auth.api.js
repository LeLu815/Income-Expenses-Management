class AuthApi {
  #client;
  #accessToken;
  constructor(client) {
    this.#client = client;
    // 인터셉터 설정
    this.#client.interceptors.request.use((config) => {
      if (this.#accessToken) {
        config.headers.Authorization = `Bearer ${this.#accessToken}`;
      }
      return config;
    });
  }

  async login(id, password) {
    const response = await this.#client.post("/login", {
      data: { id, password },
    });
    this.#accessToken = response.accessToken;
    return response;
  }

  async join(id, password, nickname) {
    const response = await this.#client.post("/register", {
      data: { id, password, nickname },
    });
    return response;
  }

  async getUserInfo() {
    const response = await this.#client.get("/user", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  }

  async patchUserInfo(avatar, nickname) {
    const response = await this.#client.get("/profile", {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: {
        avatar,
        nickname,
      },
    });
    return response;
  }
}

export default AuthApi;
