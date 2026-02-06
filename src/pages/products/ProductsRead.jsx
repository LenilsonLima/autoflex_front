import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ProductsRead.module.scss";
import { GoKebabHorizontal } from "react-icons/go";
import Button from "../../components/ui/Button";
import Loading from "../../components/layout/Loading";
import Modal from "../../components/layout/Modal";
import { ProductsService } from "../../services/products.service";
import ProductModalCreate from "./ProductModalCreate";
const ProductsRead = () => {
    const [products, setProducts] = useState([]);
    const [productClicadoId, setProductClicadoId] = useState("");
    const [loading, setLoading] = useState(true);
    const [openCloseModalDelete, setOpenCloseModalDelete] = useState(false);
    const [openCloseModalAcoes, setOpenCloseModalAcoes] = useState(false);
    const [openCloseModalProductCreate, setOpenCloseModalProductCreate] = useState(false);
    const navigation = useNavigate();

    const getProducts = async () => {
        try {
            setLoading(true);
            const response = await ProductsService.list();
            setProducts(response);
        } catch (error) {
            alert(error.response?.data?.message || "Erro ao buscar produtos.");
        } finally {
            setLoading(false);
        }
    };

    const deleteProducts = async (id) => {
        try {
            setLoading(true);
            const response = await ProductsService.remove(id);
            alert(response?.message || "Item removido com sucesso");
            await getProducts();
        } catch (error) {
            alert(error.response?.data?.message || "Erro ao remover produto.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    const openDeleteModal = (id) => {
        setProductClicadoId(id);
        setOpenCloseModalDelete(true);
        setOpenCloseModalAcoes(false);
    };

    if (loading) return <Loading />;

    return (
        <div className={styles.table_container}>
            {/* <Button onClick={() => navigation("/products/create")} text="Novo Produto" /> */}
            <Button onClick={() => setOpenCloseModalProductCreate(true)} text="Novo Produto" />

            {openCloseModalAcoes && (
                <Modal
                    title="Ações"
                    text="Selecione uma das opções abaixo para continuar."
                    function_1={() => navigation(`/products/update/${productClicadoId}`)}
                    text_btn_1="Editar"
                    function_2={() => openDeleteModal(productClicadoId)}
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
                        deleteProducts(productClicadoId);
                        setOpenCloseModalDelete(false);
                    }}
                    text_btn_2="Confirmar"
                    close={() => setOpenCloseModalDelete(false)}
                />
            )}

            {openCloseModalProductCreate &&
                <ProductModalCreate
                    cancel={() => setOpenCloseModalProductCreate(false)}
                    setLoading={setLoading}
                    reloading={getProducts}
                />
            }

            <div className={styles.table_wrapper}>
                <table cellSpacing={0} className={styles.data_table}>
                    <thead className={styles.data_table_head}>
                        <tr className={styles.data_table_row}>
                            <th className={styles.data_table_header}>Nº</th>
                            <th className={styles.data_table_header}>CÓDIGO</th>
                            <th className={styles.data_table_header}>NOME</th>
                            <th className={styles.data_table_header}>PREÇO</th>
                            <th className={styles.data_table_header}>####</th>
                        </tr>
                    </thead>

                    <tbody className={styles.data_table_body}>
                        {products?.map((item, index) => (
                            <tr className={styles.data_table_row} key={item.id}>
                                <td className={styles.data_table_cell}>#{index + 1}</td>

                                <td className={styles.data_table_cell}>{item?.code}</td>
                                <td className={styles.data_table_cell}>{item?.name}</td>
                                <td className={styles.data_table_cell}>{item?.price}</td>

                                <td className={styles.data_table_cell}>
                                    <button
                                        type="button"
                                        className={styles.actions_button}
                                        aria-label="Abrir ações"
                                        onClick={() => {
                                            setOpenCloseModalAcoes(true);
                                            setProductClicadoId(item?.id);
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
    );
};

export default ProductsRead;