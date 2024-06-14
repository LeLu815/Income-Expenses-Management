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
  updateToken(token) {
    this.#accessToken = token;
    return null;
  }

  async login({ id, password }) {
    const response = await this.#client.post("/login", {
      id,
      password,
    });
    this.#accessToken = response.data.accessToken;

    return response;
  }

  logout() {
    this.#accessToken = null;
    sessionStorage.clear();
  }

  async join({ id, password, nickname }) {
    const response = await this.#client.post("/register", {
      id,
      password,
      nickname,
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

  async patchUserInfo({ avatar, nickname }) {
    const formData = new FormData();
    formData.append("avatar", avatar);
    formData.append("nickname", nickname);
    const response = await this.#client.patch("/profile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  }
}

export default AuthApi;
