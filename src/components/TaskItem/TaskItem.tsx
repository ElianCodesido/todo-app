import { useState, useEffect } from "react";
import "./TaskItem.css";

interface Props {
  text: string;
  id: number;
  completed: boolean;
  onEdit: (newText: string) => void;
  onDelete: () => void;
  onToggle: () => void;
}

export const TaskItem = ({
  text,
  id,
  completed,
  onEdit,
  onDelete,
  onToggle
}: Props) => {
  const [editing, setEditing] = useState(false);
  const [newText, setNewText] = useState(text);

  const fecha = new Date(id).toLocaleString([], {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  })

  useEffect(() => {
    setNewText(text);
  }, [text]);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    onEdit(newText);
    setEditing(false);
  };

  const handleCancel = () => {
    setNewText(text);
    setEditing(false);
  };

  return (
    <div className="diver">
      <input
        type="checkbox"
        checked={completed}
        onChange={onToggle}
      />

      {editing ? (
        <form className="edit" onSubmit={handleSubmit}>
          <input
            className="editTextArea"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Escape") handleCancel();
            }}
          />
          <button type="submit">Save</button>
        </form>
      ) : (
        <div className={(completed ? "marked" : "")}>
          <p className="text">{text}</p>
        </div>
      )}

      <div className={(completed ? "marked" : "") + " date"}>
        {fecha}
      </div>
      
        {!editing && (
          <button onClick={() => setEditing(true)}>
            Edit
          </button>
        )}

        <button className="delete" onClick={onDelete}>
          Delete
        </button>
    </div>
  );
};