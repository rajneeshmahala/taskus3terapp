import { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const API = "http://localhost:5000/api/tasks";

  useEffect(() => {
    axios.get(API).then(res => setTasks(res.data));
  }, []);

  const addTask = async () => {
    if (!title) return;
    const res = await axios.post(API, { title });
    setTasks([...tasks, res.data]);
    setTitle("");
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>🚀 TaskFlow</h1>
      <input value={title} onChange={e => setTitle(e.target.value)} />
      <button onClick={addTask}>Add</button>
      <ul>
        {tasks.map(t => <li key={t._id}>{t.title}</li>)}
      </ul>
    </div>
  );
}