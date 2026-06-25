import { useCallback, useEffect, useRef, useState } from "react";

export const Toast = ({ message }: { message: string }) => {
  const [visibleMessage, setVisibleMessage] = useState("");
  const timerRef = useRef<number | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);
  const startTimer = useCallback(() => {
    clearTimer();

    timerRef.current = window.setTimeout(() => {
      setVisibleMessage("");
    }, 3000);
  }, [clearTimer]);

  useEffect(() => {
    if (!message) return;

    // defer setting state to avoid synchronous setState inside effect
    const id = window.setTimeout(() => {
      setVisibleMessage(message);
      startTimer();
    }, 0);

    return () => {
      clearTimeout(id);
      clearTimer();
    };
  }, [message, startTimer, clearTimer]);

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
