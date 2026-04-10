import { useEffect, useState } from "react";
import { TaskItem } from "../TaskItem/TaskItem";
import { TaskForm } from "../TaskForm/TaskForm";
import { ToggleShow } from "../ToggleShow/ToggleShow";

interface Props {
  idList: number;
}

type Task = {
  id: number;
  text: string;
  completed: boolean;
};

export const TaskList = ({ idList }: Props) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem("tasks-" + idList);
    return saved ? (JSON.parse(saved) as Task[]) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks-" + idList, JSON.stringify(tasks));
  }, [tasks]);

  const createTask = (text: string) => {
    setTasks((prev) => [
      ...prev,
      {
        id: Date.now(),
        text,
        completed: false,
      },
    ]);
  };

  const editeTask = (id: number, newText: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, text: newText } : t)),
    );
  };

  const deleteTask = (id: number) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleCompleted = (id: number) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  };

  return (
    <>
      <div>
        <TaskForm onAdd={createTask} />
        <ToggleShow header="Active">
          {tasks
            .filter((t) => !t.completed)
            .map((tarea) => (
              <TaskItem
                key={tarea.id}
                text={tarea.text}
                id={tarea.id}
                completed={tarea.completed}
                onEdit={(newText) => editeTask(tarea.id, newText)}
                onDelete={() => deleteTask(tarea.id)}
                onToggle={() => toggleCompleted(tarea.id)}
              />
            ))}
        </ToggleShow>

        <ToggleShow header="Completed">
          {tasks
            .filter((t) => t.completed)
            .map((tarea) => (
              <TaskItem
                key={tarea.id}
                text={tarea.text}
                id={tarea.id}
                completed={tarea.completed}
                onEdit={(newText) => editeTask(tarea.id, newText)}
                onDelete={() => deleteTask(tarea.id)}
                onToggle={() => toggleCompleted(tarea.id)}
              />
            ))}
        </ToggleShow>
      </div>
    </>
  );
};
