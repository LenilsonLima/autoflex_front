import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { useNavigate } from "react-router-dom";

const ProductMaterialsCreate = () => {
    const [products, setProducts] = useState([]);
    const [rawMaterials, setRawMaterials] = useState([]);
    const navigation = useNavigate();

    const getProducts = async () => {
        try {
            const response = await api.get('products')
            setProducts(response.data);
        } catch (error) {
            alert(error.response.data?.message || 'Erro ao buscar produtos.')
        }
    }

    const getRawMaterials = async () => {
        try {
            const response = await api.get('raw-materials')
            setRawMaterials(response.data);
        } catch (error) {
            alert(error.response.data?.message || 'Erro ao buscar matéria prima.')
        }
    }

    useEffect(() => {
        getProducts();
        getRawMaterials();
    }, []);

    const createProductMaterials = async (e) => {
        e.preventDefault();
        const formValues = new FormData(e.target);
        const formData = Object.fromEntries(formValues);
        try {
            const body = {
                productId: Number(formData?.productId),
                rawMaterialId: Number(formData?.rawMaterialId),
                requiredQuantity: Number(formData?.requiredQuantity)
            }
            const response = await api.post('product-materials', body);
            alert(response.data?.message || 'Produção criada com sucesso.');
            navigation(-1);
        } catch (error) {
            alert(error.response.data?.message || 'Erro ao cadastrar produção.')
        }
    }

    return (
        <div className="col">
            <button onClick={() => navigation(-1)}>voltar a listagem</button>
            <form onSubmit={createProductMaterials}>
                <select name="productId">
                    <option value="">- produto -</option>
                    {products?.map((item) => (
                        <option key={item?.id} value={item?.id}>{item?.name}</option>
                    ))}
                </select>

                <select name="rawMaterialId">
                    <option value="">- matéria prima -</option>
                    {rawMaterials?.map((item) => (
                        <option key={item?.id} value={item?.id}>{item?.name}</option>
                    ))}
                </select>
                <input type="text" placeholder="requiredQuantity" name="requiredQuantity" />
                <button>salvar</button>
            </form>
        </div>
    );
}
export default ProductMaterialsCreate;