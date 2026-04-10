import { useState, useRef, useEffect, type ReactNode} from "react";
import "./DraggableWindow.css"
type Props = {
  headerTitle: string;
  children: ReactNode;
  idList: number;
  handleClose: () => void;
};
type Position = {
  x: number;
  y: number;
}

export function DraggableWindow({headerTitle,children,idList,handleClose}: Props) {
  const [position, setPosition] = useState<Position>(() => {
    try {
      const saved = localStorage.getItem("position-" + idList);
      return saved ? (JSON.parse(saved) as Position) : { x: 100, y: 100 };
    } catch {
      return { x: 100, y: 100 };
    }
  });
  useEffect(() => {
    localStorage.setItem("position-" + idList, JSON.stringify(position));
  }, [position]);
  
  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    dragging.current = true;

  

    offset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  useEffect(() => {
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!dragging.current) return;
      const newX = e.clientX - offset.current.x;
      const newY = e.clientY - offset.current.y;

    setPosition({
      x: newX,
      y: Math.max(0, newY), 
    });
    };

    const handleMouseUp = () => {
      dragging.current = false;

    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <>
      <div
        style={{
          position: "absolute",
          left: position.x,
          top: position.y,
        }}>
          <div className='window'>
            <div className="window-header" onMouseDown={(e) => handleMouseDown(e)}>
              <div><p className="window-title">{headerTitle}</p></div>
                <div className="window-actions">
                  <button className="btn close" onClick={handleClose}>×</button>
                </div>
            </div>
            <div className='window-content'>
              {children}
            </div>
          </div>
      </div>
    </>
  );
}