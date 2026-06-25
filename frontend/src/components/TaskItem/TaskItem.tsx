import { useState, useEffect } from "react";
import "./TaskItem.css";
import type { LoadingState } from "../../hooks";

interface Props {
  text: string;
  //id: number;
  createdAt: string;
  completed: boolean;
  loading: Omit<LoadingState, "add">;
  onEdit: (newText: string) => void;
  onDelete: () => void;
  onToggle: () => void;
}

export const TaskItem = ({
  text,
  createdAt,
  completed,
  loading,
  onEdit,
  onDelete,
  onToggle,
}: Props) => {
  const [editing, setEditing] = useState(false);
  const [newText, setNewText] = useState(text);

  const date = new Date(createdAt).toLocaleString([], {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  useEffect(() => {
    setNewText(text);
  }, [text]);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!(text === newText)) onEdit(newText);
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
        disabled={loading.toggle}
      />

      {editing ? (
        <form className="edit" onSubmit={handleSubmit}>
          <input
            className="editTextArea"
            value={newText}
            onChange={(e) => {
              if (e.target.value.length <= 30) {
                setNewText(e.target.value);
              }
            }}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Escape") handleCancel();
            }}
          />
          <button type="submit" disabled={loading.edit}>
            Save
          </button>
        </form>
      ) : (
        <div className={completed ? "marked" : ""}>
          <p className="text">{text}</p>
        </div>
      )}

      <div className={(completed ? "marked" : "") + " date"}>{date}</div>

      {!editing && (
        <button onClick={() => setEditing(true)} disabled={loading.edit}>
          Edit
        </button>
      )}

      <button className="delete" onClick={onDelete} disabled={loading.delete}>
        Delete
      </button>
    </div>
  );
};
