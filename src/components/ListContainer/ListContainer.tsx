import { useTodo } from "../../hooks";
import { TaskList, DraggableWindow, Toast } from "../../components";
interface Props {
  id: number;
  title: string;
  onDelete: () => void;
}
export const ListContainer = ({ id, title, onDelete }: Props) => {
  const todo = useTodo();

  return (
    <DraggableWindow idList={id} headerTitle={title} handleClose={onDelete}>
      {todo.error && <Toast message={todo.error.message} />}
      <TaskList {...todo} />
    </DraggableWindow>
  );
};
