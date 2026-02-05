import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { useNavigate } from "react-router-dom";

const ProductMaterialsRead = () => {
    const [productMaterials, setProductMaterials] = useState([]);
    const [products, setProducts] = useState([]);
    const [productsFilter, setProductsFilter] = useState("");
    const navigation = useNavigate();

    const getProducts = async () => {
        try {
            const response = await api.get('products')
            setProducts(response.data);
        } catch (error) {
            alert(error.response.data?.message || 'Erro ao buscar produtos.')
        }
    }

    const getProductMaterials = async () => {
        try {
            const response = await api.get(`product-materials?productId=${productsFilter}`)
            setProductMaterials(response.data);
        } catch (error) {
            alert(error.response.data?.message || 'Erro ao buscar produções.')
        }
    }

    const deleteProductMaterials = async (id) => {
        try {
            const response = await api.delete(`product-materials/${id}`)
            alert(response.data?.message || 'Item removido com sucesso')
        } catch (error) {
            alert(error.response.data?.message || 'Erro ao remover produção.')
        }
    }

    useEffect(() => {
        getProductMaterials();
        getProducts();
    }, [productsFilter]);

    const deleteProductMaterialsConfirm = (id) => {
        const confirm = window.confirm('Deseja remover a produção?')
        if (confirm) {
            deleteProductMaterials(id);
        }
    }
    return (
        <div className="col">
            <button onClick={() => navigation("/product-materials/create")}>adicionar produção</button>
            <select value={productsFilter} onChange={(e) => setProductsFilter(e.target.value)}>
                <option value="">- filtrar -</option>
                {products?.map((item) => (
                    <option key={item?.id} value={item?.id}>{item?.name}</option>
                ))}
            </select>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>quantidade</th>
                        <th>produto</th>
                        <th>matéria prima</th>
                    </tr>
                </thead>
                <tbody>
                    {productMaterials?.map((item) => (
                        <tr key={item?.id}>
                            <td>{item?.id}</td>
                            <td>{item?.requiredQuantity}</td>
                            <td>{item?.product?.name}</td>
                            <td>{item?.rawMaterial?.name}</td>
                            <td>
                                <button onClick={() => navigation(`/product-materials/update/${item?.id}`)}>editar</button>
                                <button onClick={() => deleteProductMaterialsConfirm(item?.id)}>remover</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export default ProductMaterialsRead;