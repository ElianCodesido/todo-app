import { useEffect, useState } from "react";
import {
  getTodos,
  createTodo,
  updateTodo,
  removeTodo,
} from "../services/todoService";
import type { Task } from "../types/Task";

export interface LoadingState {
  add: boolean;
  delete: boolean;
  edit: boolean;
  toggle: boolean;
}

export interface UseTodoReturn {
  tasks: Task[];
  error: Error | null;
  loading: LoadingState;
  addTodo: (title: string) => Promise<void>;
  editTodo: (id: number, title: string) => Promise<void>;
  deleteTodo: (id: number) => Promise<void>;
  toggleTodo: (id: number) => Promise<void>;
}

export const useTodo = (): UseTodoReturn => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<LoadingState>({
    add: false,
    delete: false,
    edit: false,
    toggle: false,
  });

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const data = await getTodos();
        setTasks(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(Error(err.message));
        }
      }
    };

    fetchTodos();
  }, []);

  const addTodo = async (title: string) => {
    const tempId = Date.now();

    const newTask: Task = {
      id: tempId,
      title,
      completed: false,
    };

    // optimistic UI
    setTasks((prev) => [...prev, newTask]);

    try {
      setLoading((prev) => ({ ...prev, add: true }));
      const data = await createTodo({
        title,
        completed: false,
      });

      // replace temp id with real id
      setTasks((prev) =>
        prev.map((task) =>
          task.id === tempId ? { ...task, id: data.id } : task,
        ),
      );
    } catch (err) {
      if (err instanceof Error) {
        setError(Error(err.message));
      }
      // rollback
      setTasks((prev) => prev.filter((task) => task.id !== tempId));
    } finally {
      setLoading((prev) => ({ ...prev, add: false }));
    }
  };
  const editTodo = async (id: number, newTitle: string) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    const updatedTask = {
      ...task,
      title: newTitle,
    };

    // UI optimist
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, title: newTitle } : task,
      ),
    );
    try {
      setLoading((prev) => ({ ...prev, edit: true }));
      await updateTodo(id, {
        title: updatedTask.title,
        completed: updatedTask.completed,
      });
    } catch (err) {
      if (err instanceof Error) {
        setError(Error(err.message));
      }
      // rollback
      setTasks((prev) =>
        prev.map((task) =>
          task.id === id ? { ...task, title: task.title } : task,
        ),
      );
    } finally {
      setLoading((prev) => ({ ...prev, edit: false }));
    }
  };
  const deleteTodo = async (id: number) => {
    const prevTasks = [...tasks];
    setTasks((prev) => prev.filter((t) => t.id !== id));
    try {
      setLoading((prev) => ({ ...prev, delete: true }));
      await removeTodo(id);
    } catch (err) {
      if (err instanceof Error) {
        setError(Error(err.message));
      }
      setTasks(prevTasks);
    } finally {
      setLoading((prev) => ({ ...prev, delete: false }));
    }
  };
  const toggleTodo = async (id: number) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    const updatedTask = {
      ...task,
      completed: !task.completed,
    };

    setTasks((prev) => prev.map((t) => (t.id === id ? updatedTask : t)));

    try {
      setLoading((prev) => ({ ...prev, toggle: true }));
      await updateTodo(id, {
        title: updatedTask.title,
        completed: updatedTask.completed,
      });
    } catch (err) {
      setTasks((prev) => prev.map((t) => (t.id === id ? task : t)));
      if (err instanceof Error) {
        setError(Error(err.message));
      }
    } finally {
      setLoading((prev) => ({ ...prev, toggle: false }));
    }
  };
  return {
    tasks,
    error,
    loading,
    addTodo,
    editTodo,
    deleteTodo,
    toggleTodo,
  };
};
