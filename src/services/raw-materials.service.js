import { api } from "./api.js";

export const RawMaterialsService = {
    list: async () => {
        const response = await api.get("/raw-materials");
        return response?.data;
    },
    
    get: async (id) => {
        const response = await api.get(`/raw-materials/${id}`);
        return response?.data;
    },

    create: async (data) => {
        const response = await api.post("/raw-materials", data);
        return response?.data;
    },

    update: async (id, data) => {
        const response = await api.patch(`/raw-materials/${id}`, data);
        return response?.data;
    },

    remove: async (id) => {
        const response = await api.delete(`/raw-materials/${id}`);
        return response?.data;
    },
};
