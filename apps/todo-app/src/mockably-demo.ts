import { Mockably } from "mockably";

// Example usage of Mockably in the todo app
export const initializeMockably = async () => {
  const mockably = new Mockably({
    dbName: "todo-app-db",
    version: 1,
    offline: true,
    realtime: false,
  });

  try {
    await mockably.initialize();
    console.log("Mockably initialized successfully!");
    return mockably;
  } catch (error) {
    console.error("Failed to initialize Mockably:", error);
    throw error;
  }
};

// Example todo interface
export interface Todo {
  id?: number;
  title: string;
  completed: boolean;
  createdAt: Date;
}

// Example todo operations using Mockably
export class TodoService {
  private mockably: Mockably;

  constructor(mockably: Mockably) {
    this.mockably = mockably;
  }

  async addTodo(todo: Omit<Todo, "id" | "createdAt">): Promise<Todo> {
    const newTodo: Todo = {
      ...todo,
      createdAt: new Date(),
    };

    try {
      const result = await this.mockably.create("todos", newTodo);
      return result;
    } catch (error) {
      console.error("Failed to add todo:", error);
      throw error;
    }
  }

  async getTodos(): Promise<Todo[]> {
    try {
      return await this.mockably.read("todos");
    } catch (error) {
      console.error("Failed to get todos:", error);
      throw error;
    }
  }

  async updateTodo(id: number, updates: Partial<Todo>): Promise<Todo> {
    try {
      return await this.mockably.update("todos", id, updates);
    } catch (error) {
      console.error("Failed to update todo:", error);
      throw error;
    }
  }

  async deleteTodo(id: number): Promise<void> {
    try {
      await this.mockably.delete("todos", id);
    } catch (error) {
      console.error("Failed to delete todo:", error);
      throw error;
    }
  }
}
