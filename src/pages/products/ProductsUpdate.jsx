import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductsService } from "../../services/products.service";
import Loading from "../../components/layout/Loading";

const ProductsUpdate = () => {
    const navigation = useNavigate();
    const params = useParams();
    const id = params?.id;
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);

    const getProducts = async () => {
        try {
            setLoading(true);
            const response = await ProductsService.get(id);
            setProduct(response);
        } catch (error) {
            alert(error.response.data?.message || 'Erro ao buscar produto.')
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getProducts();
    }, []);

    const updateProduct = async (e) => {
        e.preventDefault();
        const formValues = new FormData(e.target);
        const formData = Object.fromEntries(formValues);
        try {
            setLoading(true);
            const body = {
                code: formData?.code,
                name: formData?.name,
                price: Number(formData?.price)
            }
            const response = await ProductsService.update(id, body);
            alert(response?.message || 'Produto atualizado com sucesso.');
            navigation(-1);
        } catch (error) {
            alert(error.response.data?.message || 'Erro ao atualizar produto.')
        } finally {
            setLoading(false);

        }
    }

    if (loading) return <Loading />;

    return (
        <div className="col">
            <button onClick={() => navigation(-1)}>voltar a listagem</button>
            <form onSubmit={updateProduct}>
                <input type="text" placeholder="code" name="code" defaultValue={product?.code} />
                <input type="text" placeholder="name" name="name" defaultValue={product?.name} />
                <input type="text" placeholder="price" name="price" defaultValue={product?.price} />
                <button>salvar</button>
            </form>
        </div>
    );
}
export default ProductsUpdate;