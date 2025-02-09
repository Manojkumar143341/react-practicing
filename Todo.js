import React, { useState } from "react";

export default function Todo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const apiurl = "http://localhost:8000";

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form reload
    setError(""); // Clear previous errors
    setMessage(""); // Clear previous messages

    // Check if inputs are not empty
    if (title.trim() !== "" && description.trim() !== "") {
      try {
        // API call to create a new todo
        console.log("Sending data to API:", { title, description }); // Debug log
        const response = await fetch(`${apiurl}/todos`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, description }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log("API Response:", data); // Debug log
          setTodos([...todos, data]); // Add new todo to the list
          setMessage("Todo added successfully!");
          setTitle(""); // Reset form fields
          setDescription("");
        } else {
          const errorData = await response.json();
          console.error("API Error Response:", errorData); // Debug log
          setError("Unable to create todo item. Please try again.");
        }
      } catch (err) {
        console.error("Fetch Error:", err); // Debug log
        setError("An error occurred while creating the todo item.");
      }
    } else {
      setError("Title and description cannot be empty.");
    }
  };

  return (
    <>
      <div className="row p-3 bg-success text-light">
        <h1>Todo Project with MERN Stack</h1>
      </div>
      <div className="row">
        <h3>Add Item</h3>
        {message && <p className="text-success">{message}</p>}
        {error && <p className="text-danger">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group d-flex gap-2">
            <input
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              className="form-control"
              type="text"
            />
            <input
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              className="form-control"
              type="text"
            />
            <button type="submit" className="btn btn-dark">
              Submit
            </button>
          </div>
        </form>
      </div>
      <div className="row">
        <h3>Todo List</h3>
        <ul>
          {todos.map((todo, index) => (
            <li key={index}>
              <strong>{todo.title}</strong>: {todo.description}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
