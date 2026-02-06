import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductMaterialsService } from "../../services/product-materials.service";
import { ProductsService } from "../../services/products.service";
import { RawMaterialsService } from "../../services/raw-materials.service";
import Loading from "../../components/layout/Loading";

const ProductMaterialsUpdate = () => {
    const [productMaterials, setProductMaterials] = useState([]);
    const [products, setProducts] = useState([]);
    const [rawMaterials, setRawMaterials] = useState([]);
    const [loading, setLoading] = useState(true);
    const params = useParams();
    const id = params?.id;
    const navigation = useNavigate();

    const getProductMaterials = async () => {
        try {
            const response = await ProductMaterialsService.get(id)
            setProductMaterials(response);
        } catch (error) {
            alert(error.response.data?.message || 'Erro ao buscar composição do produto.')
        }
    }

    const getProducts = async () => {
        try {
            const response = await ProductsService.list()
            setProducts(response);
        } catch (error) {
            alert(error.response.data?.message || 'Erro ao buscar produtos.')
        }
    }

    const getRawMaterials = async () => {
        try {
            setLoading(true);
            const response = await RawMaterialsService.list()
            setRawMaterials(response);
        } catch (error) {
            alert(error.response.data?.message || 'Erro ao buscar matéria prima.')
        } finally {
            setLoading(false);
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
            setLoading(true);
            const body = {
                productId: Number(formData?.productId),
                rawMaterialId: Number(formData?.rawMaterialId),
                requiredQuantity: Number(formData?.requiredQuantity)
            }
            const response = await ProductMaterialsService.update(id, body);
            alert(response?.message || 'Composição do produto atualizada com sucesso.');
            navigation(-1);
        } catch (error) {
            alert(error.response.data?.message || 'Erro ao cadastrar composição do produto.')
        } finally {
            setLoading(false);
        }
    }

    if (loading) return <Loading />;

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