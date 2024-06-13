import axios from "axios";
import AuthApi from "./auth.api";

const BASE_URL = "https://moneyfulpublicpolicy.co.kr";

class API {
  #baseUrl = BASE_URL;
  #client;

  constructor() {
    this.#client = axios.create({ baseURL: this.#baseUrl });
    this.auth = new AuthApi(this.#client);
  }
}

const api = new API();

export default api;
