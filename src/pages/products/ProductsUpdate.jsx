import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { useNavigate, useParams } from "react-router-dom";

const ProductsUpdate = () => {
    const navigation = useNavigate();
    const params = useParams();
    const id = params?.id;
    const [product, setProduct] = useState({});

    const getProducts = async () => {
        try {
            const response = await api.get(`products/${id}`);
            setProduct(response.data);
        } catch (error) {
            alert(error.response.data?.message || 'Erro ao buscar produto.')
        }
    }

    useEffect(() => {
        getProducts();
    }, []);

    const createProduct = async (e) => {
        e.preventDefault();
        const formValues = new FormData(e.target);
        const formData = Object.fromEntries(formValues);
        try {
            const body = {
                code: formData?.code,
                name: formData?.name,
                price: Number(formData?.price)
            }
            const response = await api.patch(`products/${id}`, body);
            alert(response.data?.message || 'Produto atualizado com sucesso.');
            navigation(-1);
        } catch (error) {
            alert(error.response.data?.message || 'Erro ao atualizar produto.')
        }
    }

    return (
        <div className="col">
            <button onClick={() => navigation(-1)}>voltar a listagem</button>
            <form onSubmit={createProduct}>
                <input type="text" placeholder="code" name="code" defaultValue={product?.code} />
                <input type="text" placeholder="name" name="name" defaultValue={product?.name} />
                <input type="text" placeholder="price" name="price" defaultValue={product?.price} />
                <button>salvar</button>
            </form>
        </div>
    );
}
export default ProductsUpdate;