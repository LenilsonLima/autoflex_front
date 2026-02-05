import { api } from "./api.js";

export const ProductMaterialsService = {
    list: (productId) =>
        api.get("/product-materials", { params: productId ? { productId } : {} }).then((r) => r.data),

    create: (data) => api.post("/product-materials", data).then((r) => r.data),

    update: (id, data) => api.patch(`/product-materials/${id}`, data).then((r) => r.data),

    remove: (id) => api.delete(`/product-materials/${id}`).then((r) => r.data),
};