import { Routes, Route, Navigate, HashRouter } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout.jsx";

import ProductsRead from "../pages/products/ProductsRead.jsx";
import ProductsCreate from "../pages/products/ProductsCreate.jsx";
import ProductsUpdate from "../pages/products/ProductsUpdate.jsx";
import RawMaterialsRead from "../pages/raw-materials/RawMaterialsRead.jsx";
import RawMaterialsCreate from "../pages/raw-materials/RawMaterialsCreate.jsx";
import RawMaterialsUpdate from "../pages/raw-materials/RawMaterialsUpdate.jsx";
import ProductMaterialsRead from "../pages/product-materials/ProductMaterialsRead.jsx";
import ProductMaterialsCreate from "../pages/product-materials/ProductMaterialsCreate.jsx";
import ProductMaterialsUpdate from "../pages/product-materials/ProductMaterialsUpdate.jsx";
import ProductionSuggestionRead from "../pages/production/ProductionSuggestionRead.jsx";

export default function AppRoutes() {
    return (
        <HashRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route path="/" element={<Navigate to="/products" replace />} />
                    <Route path="/products" element={<ProductsRead />} />
                    <Route path="/products/create" element={<ProductsCreate />} />
                    <Route path="/products/update/:id" element={<ProductsUpdate />} />

                    <Route path="/raw-materials" element={<RawMaterialsRead />} />
                    <Route path="/raw-materials/create" element={<RawMaterialsCreate />} />
                    <Route path="/raw-materials/update/:id" element={<RawMaterialsUpdate />} />

                    <Route path="/product-materials" element={<ProductMaterialsRead />} />
                    <Route path="/product-materials/create" element={<ProductMaterialsCreate />} />
                    <Route path="/product-materials/update/:id" element={<ProductMaterialsUpdate />} />

                    <Route path="/production" element={<ProductionSuggestionRead />} />
                </Route>
            </Routes>
        </HashRouter>
    );
}