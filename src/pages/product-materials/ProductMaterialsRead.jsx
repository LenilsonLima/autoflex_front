import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ProductMaterialsRead.module.scss";
import { GoKebabHorizontal } from "react-icons/go";
import Loading from "../../components/layout/Loading";
import Modal from "../../components/layout/Modal";
import Button from "../../components/ui/Button";
import { ProductMaterialsService } from "../../services/product-materials.service";
import { ProductsService } from "../../services/products.service";

const ProductMaterialsRead = () => {
    const [productMaterials, setProductMaterials] = useState([]);
    const [products, setProducts] = useState([]);
    const [productsFilter, setProductsFilter] = useState("");
    const [productMaterialsClicadoId, setProductMaterialsClicadoId] = useState("");
    const [loading, setLoading] = useState(true);
    const [openCloseModalDelete, setOpenCloseModalDelete] = useState(false);
    const [openClosemodalAcoes, setOpenCloseModalAcoes] = useState(false);
    const navigation = useNavigate();

    const getProductMaterials = async () => {
        try {
            setLoading(true);
            const response = await ProductMaterialsService.list(productsFilter)
            setProductMaterials(response);
        } catch (error) {
            alert(error.response.data?.message || 'Erro ao buscar composições dos produtos.')
        } finally {
            setLoading(false);
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


    const deleteProductMaterials = async (id) => {
        try {
            setLoading(true);
            const response = await ProductMaterialsService.remove(id);
            alert(response?.message || 'Composição do produto removida com sucesso.');
            getProductMaterials();
        } catch (error) {
            alert(error.response.data?.message || 'Erro ao remover composição do produto.')
            setLoading(false);
        }
    }

    useEffect(() => {
        getProductMaterials();
    }, [productsFilter]);

    useEffect(() => {
        getProducts();
    }, []);

    const openDeleteModal = (id) => {
        setProductMaterialsClicadoId(id);
        setOpenCloseModalDelete(true);
        setOpenCloseModalAcoes(false);
    };

    if (loading) return <Loading />;

    return (
        <div className="col">
            <div className={styles.table_container}>
                <Button onClick={() => navigation("/product-materials/create")} text="Nova Composição do Produto" />
                <select
                    className={styles.select_filter}
                    value={productsFilter} onChange={(e) => setProductsFilter(e.target.value)}>
                    <option value="">filtrar por produto</option>
                    {products?.map((item) => (
                        <option key={item?.id} value={item?.id}>{item?.name}</option>
                    ))}
                </select>
                {openClosemodalAcoes && (
                    <Modal
                        title="Ações"
                        text="Selecione uma das opções abaixo para continuar."
                        function_1={() => navigation(`/product-materials/update/${productMaterialsClicadoId}`)}
                        text_btn_1="Editar"
                        function_2={() => openDeleteModal(productMaterialsClicadoId)}
                        text_btn_2="Excluir"
                        close={() => setOpenCloseModalAcoes(false)}
                    />
                )}

                {openCloseModalDelete && (
                    <Modal
                        title="Confirmar exclusão"
                        text="Tem certeza de que deseja excluir este registro? Esta ação é permanente e não poderá ser desfeita."
                        function_1={() => setOpenCloseModalDelete(false)}
                        text_btn_1="Cancelar"
                        function_2={() => {
                            deleteProductMaterials(productMaterialsClicadoId);
                            setOpenCloseModalDelete(false);
                        }}
                        text_btn_2="Confirmar"
                        close={() => setOpenCloseModalDelete(false)}
                    />
                )}

                <div className={styles.table_wrapper}>
                    <table cellSpacing={0} className={styles.data_table}>
                        <thead className={styles.data_table_head}>
                            <tr className={styles.data_table_row}>
                                <th className={styles.data_table_header}>Nº</th>
                                <th className={styles.data_table_header}>QUANTIDADE</th>
                                <th className={styles.data_table_header}>PRODUTO</th>
                                <th className={styles.data_table_header}>MATÉRIA PRIMA</th>
                                <th className={styles.data_table_header}>####</th>
                            </tr>
                        </thead>

                        <tbody className={styles.data_table_body}>
                            {productMaterials?.map((item, index) => (
                                <tr className={styles.data_table_row} key={item.id}>
                                    <td className={styles.data_table_cell}>#{index + 1}</td>
                                    <td className={styles.data_table_cell}>{item?.requiredQuantity}</td>
                                    <td className={styles.data_table_cell}>{item?.product?.name}</td>
                                    <td className={styles.data_table_cell}>{item?.rawMaterial?.name}</td>

                                    <td className={styles.data_table_cell}>
                                        <button
                                            type="button"
                                            className={styles.actions_button}
                                            aria-label="Abrir ações"
                                            onClick={() => {
                                                setOpenCloseModalAcoes(true);
                                                setProductMaterialsClicadoId(item?.id);
                                            }}
                                        >
                                            <GoKebabHorizontal />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
export default ProductMaterialsRead;