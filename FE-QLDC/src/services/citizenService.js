import api from "../lib/api";

export const citizenService = {
  // Get all citizens
  getAll: async (params = {}) => {
    const { data } = await api.get("/citizens", { params });
    return data;
  },

  // Get citizen by ID
  getById: async (id) => {
    const { data } = await api.get(`/citizens/${id}`);
    return data;
  },

  // Create citizen
  create: async (citizenData) => {
    const { data } = await api.post("/citizens", citizenData);
    return data;
  },

  // Update citizen
  update: async (id, citizenData) => {
    const { data } = await api.put(`/citizens/${id}`, citizenData);
    return data;
  },

  // Delete citizen
  delete: async (id) => {
    const { data } = await api.delete(`/citizens/${id}`);
    return data;
  },

  // Get statistics
  getStats: async () => {
    const { data } = await api.get("/citizens/stats");
    return data;
  },
};
