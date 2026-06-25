import { useState } from "react";
import "./TaskForm.css";
interface Props {
  onAdd: (text: string) => void;
  loading: boolean;
}

export const TaskForm = ({ onAdd, loading }: Props) => {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!text.trim()) return; // evita tareas vacías

    onAdd(text);
    setText(""); // limpia input
  };

  return (
    <>
      <div className="input">
        <form className="form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter the task"
            value={text}
            onChange={(e) => {
              if (e.target.value.length <= 30) {
                setText(e.target.value);
              }
            }}
            autoFocus
          />
          <button disabled={loading} className="button" type="submit">
            Add
          </button>
        </form>
      </div>
    </>
  );
};
