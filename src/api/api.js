import axios from "axios";
import AuthApi from "./auth.api";
import TodosApi from "./todos.api";

// auth api
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

// todos api
const TODOS_BASE_URL = "http://localhost:4000/todos";
class TODOS_API {
  #baseUrl = TODOS_BASE_URL;
  #client;
  constructor() {
    this.#client = axios.create({ baseURL: this.#baseUrl });
    this.todos = new TodosApi(this.#client);
  }
}
export const todosApi = new TODOS_API();
