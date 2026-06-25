import { TaskItem } from "../TaskItem/TaskItem";
import { TaskForm } from "../TaskForm/TaskForm";
import { ToggleShow } from "../ToggleShow/ToggleShow";
import type { UseTodoReturn } from "../../hooks/useTodo";
export const TaskList = ({
  tasks,
  loading,
  addTodo,
  editTodo,
  deleteTodo,
  toggleTodo,
}: Omit<UseTodoReturn, "error">) => {
  return (
    <>
      <div>
        <TaskForm onAdd={addTodo} loading={loading.add} />
        <ToggleShow header="Active">
          {tasks
            .filter((t) => !t.completed)
            .map((todo) => (
              <TaskItem
                key={todo.id}
                text={todo.title}
                createdAt={todo.createdAt}
                completed={todo.completed}
                loading={loading}
                onEdit={(newtitle) => editTodo(todo.id, newtitle)}
                onDelete={() => deleteTodo(todo.id)}
                onToggle={() => toggleTodo(todo.id)}
              />
            ))}
        </ToggleShow>

        <ToggleShow header="Completed">
          {tasks
            .filter((t) => t.completed)
            .map((todo) => (
              <TaskItem
                key={todo.id}
                text={todo.title}
                createdAt={todo.createdAt}
                completed={todo.completed}
                loading={loading}
                onEdit={(newtitle) => editTodo(todo.id, newtitle)}
                onDelete={() => deleteTodo(todo.id)}
                onToggle={() => toggleTodo(todo.id)}
              />
            ))}
        </ToggleShow>
      </div>
    </>
  );
};
