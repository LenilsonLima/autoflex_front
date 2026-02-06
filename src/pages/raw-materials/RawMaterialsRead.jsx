import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./RawMaterialsRead.module.scss";
import { GoKebabHorizontal } from "react-icons/go";
import Loading from "../../components/layout/Loading";
import Button from "../../components/ui/Button";
import Modal from "../../components/layout/Modal";
import { RawMaterialsService } from "../../services/raw-materials.service";

const RawMaterialsRead = () => {
    const [rawMaterials, setRawMaterials] = useState([]);
    const [rawMaterialsReadClicadoId, setRawMaterialsReadClicadoId] = useState("");
    const [loading, setLoading] = useState(true);
    const [openCloseModalDelete, setOpenCloseModalDelete] = useState(false);
    const [openCloseModalAcoes, setOpenCloseModalAcoes] = useState(false);
    const navigation = useNavigate();

    const getRawMaterials = async () => {
        try {
            setLoading(true);
            const response = await RawMaterialsService.list()
            setRawMaterials(response);
        } catch (error) {
            alert(error.response?.data?.message || 'Erro ao buscar matéria prima.')
        } finally {
            setLoading(false);
        }
    }

    const deleteRawMaterials = async (id) => {
        try {
            setLoading(true);
            const response = await RawMaterialsService.remove(id);
            alert(response?.message || 'Item removido com sucesso');
            getRawMaterials();
        } catch (error) {
            alert(error.response?.data?.message || 'Erro ao remover matéria prima.')
            setLoading(false);
        }
    }

    useEffect(() => {
        getRawMaterials();
    }, []);

    const openDeleteModal = (id) => {
        setRawMaterialsReadClicadoId(id);
        setOpenCloseModalDelete(true);
        setOpenCloseModalAcoes(false);
    };

    if (loading) return <Loading />;

    return (
        <div className="col">
            <div className={styles.table_container}>
                <Button onClick={() => navigation("/raw-materials/create")} text="Nova Matéria Prima" />

                {openCloseModalAcoes && (
                    <Modal
                        title="Ações"
                        text="Selecione uma das opções abaixo para continuar."
                        function_1={() => navigation(`/raw-materials/update/${rawMaterialsReadClicadoId}`)}
                        text_btn_1="Editar"
                        function_2={() => openDeleteModal(rawMaterialsReadClicadoId)}
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
                            deleteRawMaterials(rawMaterialsReadClicadoId);
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
                                <th className={styles.data_table_header}>CÓDIGO</th>
                                <th className={styles.data_table_header}>NOME</th>
                                <th className={styles.data_table_header}>QUANTIDADE</th>
                                <th className={styles.data_table_header}>####</th>
                            </tr>
                        </thead>

                        <tbody className={styles.data_table_body}>
                            {rawMaterials?.map((item, index) => (
                                <tr className={styles.data_table_row} key={item.id}>
                                    <td className={styles.data_table_cell}>#{index + 1}</td>

                                    <td className={styles.data_table_cell}>{item?.code}</td>
                                    <td className={styles.data_table_cell}>{item?.name}</td>
                                    <td className={styles.data_table_cell}>{item?.stockQuantity}</td>

                                    <td className={styles.data_table_cell}>
                                        <button
                                            type="button"
                                            className={styles.actions_button}
                                            aria-label="Abrir ações"
                                            onClick={() => {
                                                setOpenCloseModalAcoes(true);
                                                setRawMaterialsReadClicadoId(item?.id);
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
export default RawMaterialsRead;