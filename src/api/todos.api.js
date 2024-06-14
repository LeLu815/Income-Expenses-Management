class TodosApi {
  #client;
  constructor(client) {
    this.#client = client;
  }
  async getTodos() {
    const response = await this.#client.get();
    return response;
  }
  async postTodos(todo) {
    const response = await this.#client.post("", todo);
    return response;
  }
  async patchTodos({ id, newTodo }) {
    console.log("patchTodos :", id, newTodo);
    const response = await this.#client.patch(`/${id}`, newTodo);
    return response;
  }
  async deleteTodos(id) {
    const response = await this.#client.patch(`/${id}`);
    return response;
  }
}

export default TodosApi;
