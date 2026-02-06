import { api } from "./api.js";

export const ProductionService = {
    suggestion: async () => {
        const response = await api.get("/production/suggestion");
        return response?.data;
    },
};