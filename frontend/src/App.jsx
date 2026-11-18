
import { useState, useEffect } from "react";
import "./App.css";

import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import AIAssistant from "./components/AIAssistant";

import {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo,
    deleteAllTodos
} from "./services/todoService";

function App() {

    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // 1. FETCH ALL TODOS
    const fetchTodos = async () => {
        try {
            setLoading(true);

            const response = await getTodos();

            setTodos(response.data);
            setError("");

        } catch (error) {
            setError("Failed to fetch todos");
            console.log(error);

        } finally {
            setLoading(false);
        }
    };

    // 2. LOAD TODOS WHEN COMPONENT MOUNTS
    useEffect(() => {
        fetchTodos();
    }, []);

    // 3. ADD TODO
    const handleAdd = async (title) => {
        try {
            const response = await createTodo(title);

            setTodos((prevTodos) => [
                ...prevTodos,
                response.data.todo
            ]);

        } catch (error) {
            alert(error.response?.data?.message || "Failed to add todo");
        }
    };

    // 4. DELETE TODO
    const handleDelete = async (id) => {
        try {
            await deleteTodo(id);

            setTodos((prevTodos) =>
                prevTodos.filter((todo) => todo._id !== id)
            );

        } catch (error) {
            alert("Failed to delete todo");
        }
    };

    // 5. COMPLETE / UNDO TODO
    const handleToggle = async (todo) => {
        try {
            const response = await updateTodo(todo._id, {
                completed: !todo.completed
            });

            setTodos((prevTodos) =>
                prevTodos.map((item) =>
                    item._id === todo._id
                        ? response.data.todo
                        : item
                )
            );

        } catch (error) {
            alert("Failed to update todo");
        }
    };


// 7. UPDATE TODO TITLE
const handleUpdate = async (id, newTitle) => {
    try {
        const response = await updateTodo(id, {
            title: newTitle
        });

        console.log("Update response:", response.data);

        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo._id === id
                    ? response.data.todo
                    : todo
            )
        );

    } catch (error) {
        console.log("Update error:", error.response?.data || error);

        alert(error.response?.data?.message || "Failed to update todo");
    }
};

    // 6. DELETE ALL TODOS
    const handleDeleteAll = async () => {
        if (!window.confirm("Are you sure you want to delete all todos?")) {
            return;
        }

        try {
            await deleteAllTodos();
            setTodos([]);

        } catch (error) {
            alert("Failed to delete all todos");
        }
    };

    

return (
    <div className="app-layout">

        <aside className="sidebar">
            <div className="brand">
                <div className="brand-logo">✓</div>
                <span>Taskly<span className="brand-dot">.</span></span>
            </div>

            <p className="nav-label">WORKSPACE</p>

            <div className="nav-item active">
                <span>▦</span> Overview
            </div>

            <div className="nav-item">
                <span>◷</span> My Tasks
            </div>

            <div className="sidebar-bottom">
                <div className="user-card">
                    <div className="user-avatar">H</div>
                    <div>
                        <strong>My Workspace</strong>
                        <small>Personal account</small>
                    </div>
                </div>
            </div>
        </aside>

        <main className="main-content">

            <header className="topbar">
                <div>
                    <span className="breadcrumb">Workspace / Overview</span>
                    <h1>My Dashboard</h1>
                </div>

                <div className="topbar-right">
                    <span className="today-label">
                        ✦ Stay productive
                    </span>
                    <div className="top-avatar">H</div>
                </div>
            </header>

            <section className="welcome-card">
                <div className="welcome-content">
                    <span className="welcome-tag">YOUR PERSONAL SPACE</span>
                    <h2>Make today count.</h2>
                    <p>
                        A little progress each day adds up to big results.
                        Let's get things done!
                    </p>
                </div>

                <div className="welcome-decoration">✦</div>
            </section>

            <section className="stats-grid">

                <div className="stat-card">
                    <div className="stat-top">
                        <span>Total tasks</span>
                        <span className="stat-icon">▤</span>
                    </div>
                    <h2>{todos.length}</h2>
                    <p>Tasks in your workspace</p>
                </div>

                <div className="stat-card">
                    <div className="stat-top">
                        <span>Completed</span>
                        <span className="stat-icon green-icon">✓</span>
                    </div>
                    <h2>
                        {todos.filter(todo => todo.completed).length}
                    </h2>
                    <p>Successfully finished</p>
                </div>

                <div className="stat-card">
                    <div className="stat-top">
                        <span>Pending</span>
                        <span className="stat-icon orange-icon">◷</span>
                    </div>
                    <h2>
                        {todos.filter(todo => !todo.completed).length}
                    </h2>
                    <p>Waiting to be completed</p>
                </div>

            </section>

            <section className="progress-card">
                <div className="progress-heading">
                    <div>
                        <h3>Daily progress</h3>
                        <p>Keep moving forward!</p>
                    </div>

                    <strong>
                        {todos.length
                            ? Math.round(
                                (todos.filter(todo => todo.completed).length
                                / todos.length) * 100
                              )
                            : 0}%
                    </strong>
                </div>

                <div className="progress-track">
                    <div
                        className="progress-fill"
                        style={{
                            width: `${todos.length
                                ? (todos.filter(todo => todo.completed).length
                                / todos.length) * 100
                                : 0}%`
                        }}
                    />
                </div>
            </section>

            <AIAssistant />

            <section className="tasks-panel">

                <div className="tasks-heading">
                    <div>
                        <span className="section-eyebrow">STAY ORGANIZED</span>
                        <h2>Your Tasks</h2>
                        <p>Manage and track your activities.</p>
                    </div>

                    {todos.length > 0 && (
                        <button
                            className="clear-all-btn"
                            onClick={handleDeleteAll}
                        >
                            Clear all
                        </button>
                    )}
                </div>

                <div className="add-task-box">
                    <TodoForm onAdd={handleAdd} />
                </div>

                {loading && (
                    <p className="status-message">Loading tasks...</p>
                )}

                {error && (
                    <p className="error-message">{error}</p>
                )}

                {!loading && !error && (
                    <TodoList
                        todos={todos}
                        onDelete={handleDelete}
                        onToggle={handleToggle}
                        onUpdate={handleUpdate}
                    />
                )}

            </section>

            <footer className="page-footer">
                Designed for focus. Built for progress.
            </footer>

        </main>
    </div>
);

}

export default App;
