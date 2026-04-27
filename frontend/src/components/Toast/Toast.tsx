import { useEffect, useRef, useState } from "react";

export const Toast = ({ message }: { message: string }) => {
  const [visibleMessage, setVisibleMessage] = useState("");
  const timerRef = useRef<number | null>(null);

  const startTimer = () => {
    clearTimer();

    timerRef.current = window.setTimeout(() => {
      setVisibleMessage("");
    }, 3000);
  };

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    if (!message) return;

    setVisibleMessage(message);
    startTimer();

    return clearTimer;
  }, [message]);

  if (!visibleMessage) return null;

  return (
    <div
      onMouseEnter={clearTimer}
      onMouseLeave={startTimer}
      style={{
        position: "fixed",
        top: 20,
        right: 20,
        background: "red",
        color: "white",
        padding: "10px 20px",
        borderRadius: "8px",
        cursor: "pointer",
      }}
    >
      {visibleMessage}
    </div>
  );
};
