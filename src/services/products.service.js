import { api } from "./api";

export const ProductsService = {
    list: async () => {
        const response = await api.get("/products")
        return response?.data || [];
    },

    get: async (id) => {
        const response = await api.get(`/products/${id}`);
        return response?.data || [];
    },

    create: async (data) => {
        const response = await api.post("/products", data);
        return response?.data || [];
    },

    update: async (id, data) => {
        const response = await api.patch(`/products/${id}`, data);
        return response?.data || [];
    },

    remove: async (id) => {
        const response = await api.delete(`/products/${id}`);
        return response?.data || [];
    },
};