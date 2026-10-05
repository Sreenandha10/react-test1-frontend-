import { Routes, Route } from "react-router-dom";
import TodoList from "./pages/TodoList";
import AddTodo from "./pages/AddTodo";
import Edit from "./pages/Edit";

function App() {
  return (
    <Routes>
      <Route path="/" element={<TodoList />} />
      <Route path="/todos" element={<TodoList />} />
      <Route path="/add-todo" element={<AddTodo />} />
      <Route path="/edit-todo/:id" element={<Edit />} />
    </Routes>
  );
}

export default App;