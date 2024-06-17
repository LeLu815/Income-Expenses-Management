import { USER_ID } from "../util/constant";

class TodosApi {
  #client;
  constructor(client) {
    this.#client = client;
  }
  async getTodos() {
    const response = await this.#client.get();
    return response;
  }
  async getTodo(postId) {
    const response = await this.#client.get("", { params: { id: postId } });
    return response.data[0];
  }
  async postTodos(todo) {
    const response = await this.#client.post("", todo);
    return response;
  }
  async patchTodos({ id, newTodo, userId }) {
    const todo = await this.getTodo(userId);
    if (todo[USER_ID] === userId) {
      const response = await this.#client.patch(`/${id}`, newTodo);
      return response;
    } else {
      throw new Error("작성자의 아이디와 일치하지 않습니다.");
    }
  }
  async deleteTodos({ id, userId }) {
    const todo = await this.getTodo(userId);
    if (todo[USER_ID] === userId) {
      const response = await this.#client.delete(`/${id}`);
      return response;
    } else {
      throw new Error("작성자의 아이디와 일치하지 않습니다.");
    }
  }
}

export default TodosApi;
