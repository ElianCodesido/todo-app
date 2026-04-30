import { useTodo } from "../../hooks";
import { TaskList, DraggableWindow, Toast } from "..";
interface Props {
  id: number;
  title: string;
  listId: number;
  onEdit: (newTitle: string) => void;
  onDelete: () => void;
}
export const ListContainer = ({
  id,
  title,
  onEdit,
  onDelete,
  listId,
}: Props) => {
  const todo = useTodo(listId);

  return (
    <DraggableWindow
      idList={id}
      headerTitle={title}
      onEdit={onEdit}
      handleClose={onDelete}
    >
      {todo.error && <Toast message={todo.error.message} />}
      <TaskList {...todo} />
    </DraggableWindow>
  );
};
