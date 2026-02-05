import { api } from "./api.js";

export const RawMaterialsService = {
    list: () => api.get("/raw-materials").then((r) => r.data),
    create: (data) => api.post("/raw-materials", data).then((r) => r.data),
    update: (id, data) => api.patch(`/raw-materials/${id}`, data).then((r) => r.data),
    remove: (id) => api.delete(`/raw-materials/${id}`).then((r) => r.data),
};