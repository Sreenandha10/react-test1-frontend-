import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function AddTodo() {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("Pending");
  const navigate = useNavigate();

  const addTodo = (e) => {
    e.preventDefault();

    fetch("http://localhost:3000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: title,
        status: status
      })
    })
      .then((res) => res.json())
      .then(() => navigate("/todos"));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-5">Add New Todo</h1>

        <form onSubmit={addTodo}>
          <label className="block font-semibold mb-2">Todo Title</label>

          <input
            type="text"
            placeholder="Enter todo title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border p-2 rounded mb-4"
            required
          />

          <label className="block font-semibold mb-2">Status</label>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border p-2 rounded mb-5"
          >
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded"
          >
            Add Todo
          </button>
        </form>

        <Link
          to="/todos"
          className="block text-center mt-4 text-blue-500"
        >
          ← Back to Todo List
        </Link>
      </div>
    </div>
  );
}

export default AddTodo;

