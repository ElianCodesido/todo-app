import "./App.css";
import { Header, ListContainer, Toast } from "./components";
import { useState } from "react";
import { useList } from "./hooks/useList";
import { useAuth } from "./hooks/useAuth";
import { Auth } from "./components/Auth/Auth";
function App() {
  //states
  const [text, setText] = useState("");
  //handlers
  const { lists, error, loading, addList, editList, deleteList } = useList();
  const { user, register, login } = useAuth();

  return (
    <>
      <div className="app">
        {error && <Toast message="Todo List Error" />}
        <Header />
        {!user && <Auth register={register} login={login} />}

        <div className="taskAdder">
          <input
            value={text}
            placeholder="Task list name"
            onChange={(e) => {
              if (e.target.value.length <= 25) {
                setText(e.target.value);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") addList(text);
            }}
          />
          <button disabled={loading.add} onClick={() => addList(text)}>
            Add Task List
          </button>
        </div>

        <div className="tasklists-container">
          {lists.map((list) => (
            <ListContainer
              key={list.id}
              id={list.id}
              title={list.title}
              listId={list.id}
              onEdit={(newText) => editList(list.id, newText)}
              onDelete={() => deleteList(list.id)}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
