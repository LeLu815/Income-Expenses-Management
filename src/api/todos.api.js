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
    const response = await this.#client.get();
    const currentPost = response.data.find((post) => post.id === postId);
    return currentPost;
  }
  async postTodos(todo) {
    const response = await this.#client.post("", todo);
    return response;
  }
  async patchTodos({ id, newTodo }) {
    const response = await this.#client.patch(`/${id}`, newTodo);
    return response;
  }
  async deleteTodos(id) {
    const response = await this.#client.delete(`/${id}`);
    return response;
  }
}

export default TodosApi;
