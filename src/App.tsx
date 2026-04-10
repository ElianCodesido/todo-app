import './App.css'
import {Header, TaskList, DraggableWindow} from './components'
import {useEffect, useState} from 'react'

function App() {

  type ListItem = {
    id: number;
    text: string;
    
  };
  
  const [lists, setLists] = useState<ListItem[]>(() => {
    const saved = localStorage.getItem("taskLists");
    return saved ? (JSON.parse(saved) as ListItem[]) : [];
  });
  
  const [text, setText] = useState("");
  const handleAdd = () => {
    if (!text.trim()) return;
    setLists(prev => [...prev, {text, id: Date.now()}]);
    setText("");
  };
  const handleDelete = (id:number) => {
    setLists(prev => prev.filter(l => l.id !== id));
  }
  useEffect(() => {
    localStorage.setItem("taskLists", JSON.stringify(lists));
  }, [lists]);

  return (
    <>

    <div className='app'>
    <Header/>
      <div className='taskAdder'>
        <input
          value={text}
          placeholder='Task list name'
          onChange={(e) => {e.target.value.length <= 25 ? setText(e.target.value) : null}}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleAdd();
          }}
          />
        <button onClick={handleAdd}>Add Task List</button>
      </div>

      <div className='tasklists-container'>
        {lists.map(name => (
          <DraggableWindow key={name.id} idList={name.id} headerTitle={name.text} handleClose={() => handleDelete(name.id)}>
            <TaskList idList={name.id}/>
          </DraggableWindow>
        ))}
      </div>
    </div> 
    </>
  )
}

export default App
