import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { useNavigate } from "react-router-dom";

const ProductsRead = () => {
    const [products, setProducts] = useState([]);
    const navigation = useNavigate();

    const getProducts = async () => {
        try {
            const response = await api.get('products')
            setProducts(response.data);
        } catch (error) {
            alert(error.response.data?.message || 'Erro ao buscar produtos.')
        }
    }

    const deleteProducts = async (id) => {
        try {
            const response = await api.delete(`products/${id}`)
            alert(response.data?.message || 'Item removido com sucesso')
        } catch (error) {
            alert(error.response.data?.message || 'Erro ao remover produto.')
        }
    }

    useEffect(() => {
        getProducts();
    }, []);

    const deleteProduct = (id) => {
        const confirm = window.confirm('Deseja remover o produto?')
        if (confirm) {
            deleteProducts(id);
        }
    }
    return (
        <div className="col">
            <button onClick={() => navigation("/products/create")}>adicionar produto</button>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>CODE</th>
                        <th>NAME</th>
                        <th>PRICE</th>
                    </tr>
                </thead>
                <tbody>
                    {products?.map((item) => (
                        <tr key={item?.id}>
                            <td>{item?.id}</td>
                            <td>{item?.code}</td>
                            <td>{item?.name}</td>
                            <td>{item?.price}</td>
                            <td>
                                <button onClick={() => navigation(`/products/update/${item?.id}`)}>editar</button>
                                <button onClick={() => deleteProduct(item?.id)}>remover</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export default ProductsRead;