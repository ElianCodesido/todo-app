import { useState, type ReactNode } from "react";
import "./ToggleShow.css";

interface Props {
  header: string;
  children: ReactNode;
}

export const ToggleShow = ({ header, children }: Props) => {
  const [open, setOpen] = useState(true);
  return (
    <div className="toggleShow">
      <div className="toggleHeader" onClick={() => setOpen(!open)}>
        <p className="header-text">{header}</p>
        <p className="header-text">{open ? "←" : "→"}</p>
      </div>

      {open && <div className="list">{children}</div>}
    </div>
  );
};
