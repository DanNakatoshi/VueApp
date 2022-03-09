import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// const headers = {"X-CSRFTOKEN": "<csrf_token_very_long_string_goes_here>"}

export default {
  getTickets() {
    return apiClient.get("tickets/");
  },
  postTicket(data) {
    return apiClient.post("tickets/", data, );
  },
  updateTicket(id, data) {
    return apiClient.patch(`tickets/${id}/`, data);
  },
  deleteTicket(id) {
    return apiClient.delete(`tickets/${id}`);
  },
  getStoreName() {
    return apiClient.get("store/");
  },
  getStaffName() {
    return apiClient.get("staff/");
  },
  getTicketCategories() {
    return apiClient.get("ticket-categories/");
  },
};
