import { MdClose } from 'react-icons/md';
import styles from './ProductModalCreate.module.scss';
import { ProductsService } from '../../services/products.service';

const ProductModalCreate = ({ cancel, setLoading, reloading }) => {
    const createProduct = async (e) => {
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
            const response = await ProductsService.create(body);
            alert(response.message || 'Produto criado com sucesso.');
            cancel();
            reloading();
        } catch (error) {
            alert(error.response.data?.message || 'Erro ao cadastrar produto.')
            setLoading(false);
        }
    }
    return (
        <div className={styles.container_product_create}>
            <form onSubmit={createProduct}>
                <div className={styles.area_close}>
                    <span>NOVO PRODUTO</span>
                    <MdClose onClick={cancel} />
                </div>
                <label for="">
                    <span>Código:</span>
                    <input type="text" placeholder='Código do produto' name='code' />
                </label>

                <label for="">
                    <span>Nome:</span>
                    <input type="text" placeholder='Nome do produto' name='name' />
                </label>

                <label for="">
                    <span>Preço:</span>
                    <input type="text" placeholder='Preço do produto' name='price' />
                </label>
                <button>Salvar</button>
            </form>
        </div>
    )
}
export default ProductModalCreate;