
import { useState } from "react";

function TodoForm({ onAdd }) {

    const [title, setTitle] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title.trim()) {
            alert("Please enter a todo");
            return;
        }

        onAdd(title.trim());
        setTitle("");
    };

    return (
        <form onSubmit={handleSubmit} className="todo-form">

            <input
                type="text"
                placeholder="Enter your task..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <button type="submit">
                Add Todo
            </button>

        </form>
    );
}

export default TodoForm;
