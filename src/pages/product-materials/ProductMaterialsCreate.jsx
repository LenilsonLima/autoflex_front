import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProductMaterialsService } from "../../services/product-materials.service";
import { RawMaterialsService } from "../../services/raw-materials.service";
import { ProductsService } from "../../services/products.service";

const ProductMaterialsCreate = () => {
    const [products, setProducts] = useState([]);
    const [rawMaterials, setRawMaterials] = useState([]);
    const navigation = useNavigate();

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
            const response = await RawMaterialsService.list()
            setRawMaterials(response);
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
            const response = await ProductMaterialsService.create(body);
            alert(response.data?.message || 'Composição do produto criada com sucesso.');
            navigation(-1);
        } catch (error) {
            alert(error.response.data?.message || 'Erro ao cadastrar composição do produto.')
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