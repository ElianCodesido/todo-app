import { useState } from "react";
import "./TaskForm.css"
interface Props {
  onAdd: (text: string) => void;
}

export const TaskForm = ({ onAdd }: Props) => {
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
            onChange={(e) => setText(e.target.value)}
            autoFocus
            />
          <button className='button' type="submit">Add</button>
        </form>
    </div>
    </>
  );
};