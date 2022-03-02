import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://127.0.0.1:8000/api/tickets/",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default {
  getTodos() {
    return apiClient.get("", {
      params: {
        _limit: 3,
      },
    });
  },
  postTodo(data) {
    return apiClient.post("", data);
  },
  updateTodo(id, data) {
    return apiClient.put(`${id}`, data);
  },
  deleteTodo(id) {
    return apiClient.delete(`${id}`);
  },
};
