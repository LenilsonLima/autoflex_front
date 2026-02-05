import { api } from "../../services/api";
import { useNavigate } from "react-router-dom";

const ProductsCreate = () => {
    const navigation = useNavigate();
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
            const response = await api.post('products', body);
            alert(response.data?.message || 'Produto criado com sucesso.');
            navigation(-1);
        } catch (error) {
            alert(error.response.data?.message || 'Erro ao cadastrar produto.')
        }
    }

    return (
        <div className="col">
            <button onClick={() => navigation(-1)}>voltar a listagem</button>
            <form onSubmit={createProduct}>
                <input type="text" placeholder="code" name="code" />
                <input type="text" placeholder="name" name="name" />
                <input type="text" placeholder="price" name="price" />
                <button>salvar</button>
            </form>
        </div>
    );
}
export default ProductsCreate;