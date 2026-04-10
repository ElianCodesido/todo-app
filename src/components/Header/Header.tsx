import { useState } from "react";
import "./Header.css";
import { Modal } from "../../components";
export const Header = () => {
  const [showContact, setShowContact] = useState(false);
  return (
    <div className="header">
      <div id="title">
        <h1 className="margin">To-Do App</h1>
        <p className="margin smaller">by Elian Codesido</p>
      </div>
      <div className="info">
        <span className="info-span" onClick={() => setShowContact(true)}>
          Contact
        </span>
      </div>

      {showContact && (
        <Modal onClose={() => setShowContact(false)}>
          <h2>Contact</h2>
          <p>Email: elian.codesido@outlook.com</p>
          <p>
            GitHub:{" "}
            <a href="https://github.com/ElianCodesido">
              github.com/ElianCodesido
            </a>
          </p>
        </Modal>
      )}
    </div>
  );
};
