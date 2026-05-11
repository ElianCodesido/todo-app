import { useEffect, useState } from "react";
import {
  getLists,
  createList,
  updateList,
  removeList,
} from "../services/listService";
import type { List } from "../types/";
import type { LoadingState } from "./useTodo";

export interface UseListReturn {
  lists: List[];
  error: Error | null;
  loading: Omit<LoadingState, "toggle">;
  addList: (title: string) => Promise<void>;
  editList: (id: number, title: string) => Promise<void>;
  deleteList: (id: number) => Promise<void>;
}

export const useList = (): UseListReturn => {
  const [lists, setlists] = useState<List[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<Omit<LoadingState, "toggle">>({
    add: false,
    delete: false,
    edit: false,
  });

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const data = await getLists();
        setlists(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(Error(err.message));
        }
      }
    };

    fetchTodos();
  }, []);

  const addList = async (title: string) => {
    const tempId = Date.now();

    const newList: List = {
      id: tempId,
      title,
    };

    // optimistic UI
    setlists((prev) => [...prev, newList]);

    try {
      setLoading((prev) => ({ ...prev, add: true }));
      const data = await createList(title);

      // replace temp id with real id
      setlists((prev) =>
        prev.map((list) =>
          list.id === tempId ? { ...list, id: data.id } : list,
        ),
      );
    } catch (err) {
      if (err instanceof Error) {
        setError(Error(err.message));
      }
      // rollback
      setlists((prev) => prev.filter((list) => list.id !== tempId));
    } finally {
      setLoading((prev) => ({ ...prev, add: false }));
    }
  };

  const editList = async (id: number, title: string) => {
    setLoading((prev) => ({ ...prev, edit: true }));

    try {
      await updateList(id, { title });

      setlists((prev) => prev.map((t) => (t.id === id ? { ...t, title } : t)));
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading((prev) => ({ ...prev, edit: false }));
    }
  };

  const deleteList = async (id: number) => {
    const prevlists = [...lists];
    setlists((prev) => prev.filter((l) => l.id !== id));
    try {
      setLoading((prev) => ({ ...prev, delete: true }));
      await removeList(id);
    } catch (err) {
      if (err instanceof Error) {
        setError(Error(err.message));
      }
      setlists(prevlists);
    } finally {
      setLoading((prev) => ({ ...prev, delete: false }));
    }
  };

  return {
    lists,
    error,
    loading,
    addList,
    editList,
    deleteList,
  };
};
