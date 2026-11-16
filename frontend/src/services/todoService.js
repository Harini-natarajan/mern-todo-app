import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api/todos"
});

// GET all todos
export const getTodos = () => {
    return API.get("/");
};

// CREATE todo
export const createTodo = (title) => {
    return API.post("/", { title });
};

// UPDATE todo
export const updateTodo = (id, updatedData) => {
    return API.put(`/${id}`, updatedData);
};

// DELETE one todo
export const deleteTodo = (id) => {
    return API.delete(`/${id}`);
};

// DELETE all todos
export const deleteAllTodos = () => {
    return API.delete("/");
};