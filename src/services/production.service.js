import { api } from "./api.js";

export const ProductionService = {
    suggestion: () => api.get("/production/suggestion").then((r) => r.data),
};