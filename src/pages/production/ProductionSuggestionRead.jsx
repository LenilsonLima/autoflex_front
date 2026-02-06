import { useEffect, useState } from "react";
import styles from "./ProductionSuggestionRead.module.scss";
import Loading from "../../components/layout/Loading";
import { ProductionService } from "../../services/production.service";

const ProductionSuggestionRead = () => {
    const [productionSuggestionRead, setProductionSuggestionRead] = useState([]);
    const [loading, setLoading] = useState(true);

    const getProductionSuggestion = async () => {
        try {
            setLoading(true);
            const response = await ProductionService.suggestion()
            setProductionSuggestionRead(response);
            console.log(response);
            
        } catch (error) {
            alert(error.response.data?.message || 'Erro ao buscar sugestão.')
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getProductionSuggestion();
    }, []);

    if (loading) return <Loading />;

    return (
        <div className={styles.table_container}>
            <div className={styles.table_wrapper}>
                <table cellSpacing={0} className={styles.data_table}>
                    <thead className={styles.data_table_head}>
                        <tr className={styles.data_table_row}>
                            <th className={styles.data_table_header}>Nº</th>
                            <th className={styles.data_table_header}>PRODUTO ID</th>
                            <th className={styles.data_table_header}>CÓDIGO</th>
                            <th className={styles.data_table_header}>NOME</th>
                            <th className={styles.data_table_header}>PREÇO</th>
                            <th className={styles.data_table_header}>QUANTIDADE</th>
                            <th className={styles.data_table_header}>TOTAL</th>
                            <th className={styles.data_table_header}>TOTAL GERAL</th>
                        </tr>
                    </thead>

                    <tbody className={styles.data_table_body}>
                        {productionSuggestionRead?.items?.map((item, index) => (
                            <tr key={index} className={styles.data_table_row}>
                                <td className={styles.data_table_cell}>#{index + 1}</td>
                                <td className={styles.data_table_cell}>{item?.productId}</td>
                                <td className={styles.data_table_cell}>{item?.code}</td>
                                <td className={styles.data_table_cell}>{item?.name}</td>
                                <td className={styles.data_table_cell}>{item?.unitPrice}</td>
                                <td className={styles.data_table_cell}>{item?.quantity}</td>
                                <td className={styles.data_table_cell}>{item?.total}</td>
                                <td className={styles.data_table_cell}>{productionSuggestionRead?.grandTotal}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default ProductionSuggestionRead;