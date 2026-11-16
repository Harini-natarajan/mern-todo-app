
import { useState } from "react";

function TodoList({ todos, onDelete, onToggle, onUpdate }) {

    const [editId, setEditId] = useState(null);
    const [editTitle, setEditTitle] = useState("");

    const handleEdit = (todo) => {
        setEditId(todo._id);
        setEditTitle(todo.title);
    };

  const handleUpdate = (id) => {

    console.log("Todo ID:", id);
    console.log("New Title:", editTitle);

    if (!editTitle.trim()) {
        alert("Todo title cannot be empty");
        return;
    }

    onUpdate(id, editTitle.trim());

    setEditId(null);
    setEditTitle("");
};

    return (
        <div className="todo-list">

            {todos.map((todo) => (

                <div className="todo-item" key={todo._id}>

                    {editId === todo._id ? (

                        <>
                            <input
                                type="text"
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                            />

                            <button onClick={() => handleUpdate(todo._id)}>
                                Save
                            </button>

                            <button onClick={() => setEditId(null)}>
                                Cancel
                            </button>
                        </>

                    ) : (

                        <>
                            <span
                                style={{
                                    textDecoration: todo.completed
                                        ? "line-through"
                                        : "none"
                                }}
                            >
                                {todo.title}
                            </span>

                            <div>
                                <button onClick={() => handleEdit(todo)}>
                                    Edit
                                </button>

                                <button onClick={() => onToggle(todo)}>
                                    {todo.completed ? "Undo" : "Complete"}
                                </button>

                                <button onClick={() => onDelete(todo._id)}>
                                    Delete
                                </button>
                            </div>
                        </>

                    )}

                </div>

            ))}

        </div>
    );
}

export default TodoList;
