import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { useNavigate, useParams } from "react-router-dom";

const ProductMaterialsUpdate = () => {
    const [productMaterials, setProductMaterials] = useState([]);
    const [products, setProducts] = useState([]);
    const [rawMaterials, setRawMaterials] = useState([]);
    const params = useParams();
    const id = params?.id;
    const navigation = useNavigate();

    const getProductMaterials = async () => {
        try {
            const response = await api.get(`product-materials/${id}`)
            setProductMaterials(response.data);
        } catch (error) {
            alert(error.response.data?.message || 'Erro ao buscar produção.')
        }
    }

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
        getProductMaterials();
        getProducts();
        getRawMaterials();
    }, []);

    const updateProductMaterials = async (e) => {
        e.preventDefault();
        const formValues = new FormData(e.target);
        const formData = Object.fromEntries(formValues);
        try {
            const body = {
                productId: Number(formData?.productId),
                rawMaterialId: Number(formData?.rawMaterialId),
                requiredQuantity: Number(formData?.requiredQuantity)
            }
            const response = await api.patch(`product-materials/${id}`, body);
            alert(response.data?.message || 'Produção criada com sucesso.');
            navigation(-1);
        } catch (error) {
            alert(error.response.data?.message || 'Erro ao cadastrar produção.')
        }
    }

    return (
        <div className="col">
            <button onClick={() => navigation(-1)}>voltar a listagem</button>
            <form onSubmit={updateProductMaterials}>
                <select name="productId">
                    <option value="">- produto -</option>
                    {products?.map((item) => (
                        <option selected={productMaterials?.product?.id == item?.id} key={item?.id} value={item?.id}>{item?.name}</option>
                    ))}
                </select>

                <select name="rawMaterialId">
                    <option value="">- matéria prima -</option>
                    {rawMaterials?.map((item) => (
                        <option selected={productMaterials?.rawMaterial?.id == item?.id} key={item?.id} value={item?.id}>{item?.name}</option>
                    ))}
                </select>
                <input type="text" defaultValue={productMaterials?.requiredQuantity} placeholder="requiredQuantity" name="requiredQuantity" />
                <button>salvar</button>
            </form>
        </div>
    );
}
export default ProductMaterialsUpdate;