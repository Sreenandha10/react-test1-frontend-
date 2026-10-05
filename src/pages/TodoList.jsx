import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://react-test1-server.onrender.com/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data));
  }, []);

  const deleteTodo = (id) => {
    setDeleteId(id);
  };

  const confirmDelete = () => {
    fetch(`https://react-test1-server.onrender.com/todos/${deleteId}`, {
      method: "DELETE"
    }).then(() => {
      setTodos(todos.filter((todo) => todo.id !== deleteId));
      setDeleteId(null);
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">Todo List</h1>

        <div className="text-center mb-6">
          <Link to="/add-todo" className="bg-blue-500 text-white px-5 py-2 rounded">
            + Add Todo
          </Link>
        </div>

        {todos.map((todo) => (
          <div key={todo.id} className="bg-white p-4 mb-4 rounded shadow flex justify-between items-center">
            <div>
              <h2 className="text-lg font-bold">{todo.title}</h2>
              <p className="text-gray-600">Status: {todo.status}</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => navigate(`/edit-todo/${todo.id}`)}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {deleteId && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-lg text-center">
              <h2 className="text-lg font-bold mb-4">Delete this todo?</h2>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={confirmDelete}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Yes
                </button>
                <button
                  onClick={() => setDeleteId(null)}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TodoList;

