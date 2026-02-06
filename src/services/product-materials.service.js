import { api } from "./api.js";

export const ProductMaterialsService = {
    list: async (productId) => {
        const response = await api.get("/product-materials", { params: productId ? { productId } : {} });
        return response?.data;
    },

    get: async (id) => {
        const response = await api.get(`/product-materials/${id}`);
        return response?.data;
    },

    create: async (data) => {
        const response = await api.post("/product-materials", data);
        return response?.data;
    },

    update: async (id, data) => {
        const response = await api.patch(`/product-materials/${id}`, data);
        return response?.data;
    },

    remove: async (id) => {
        const response = await api.delete(`/product-materials/${id}`);
        return response?.data;
    },
};
