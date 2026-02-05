import { useEffect, useState } from "react";
import { api } from "../../services/api";

const ProductionSuggestionRead = () => {
    const [productionSuggestionRead, setProductionSuggestionRead] = useState([]);

    const getProductionSuggestion = async () => {
        try {
            const response = await api.get('production/suggestion')
            setProductionSuggestionRead(response.data);
        } catch (error) {
            alert(error.response.data?.message || 'Erro ao buscar sugestão.')
        }
    }

    useEffect(() => {
        getProductionSuggestion();
    }, []);

    return (
        <div className="col">
            <table>
                <thead>
                    <tr>
                        <th>productId</th>
                        <th>code</th>
                        <th>name</th>
                        <th>unitPrice</th>
                        <th>quantity</th>
                        <th>total</th>
                        <th>grandTotal</th>
                    </tr>
                </thead>
                <tbody>
                    {productionSuggestionRead?.items?.map((item, index) => (
                        <tr key={index}>
                            <td>{item?.productId}</td>
                            <td>{item?.code}</td>
                            <td>{item?.name}</td>
                            <td>{item?.unitPrice}</td>
                            <td>{item?.quantity}</td>
                            <td>{item?.total}</td>
                            <td>{productionSuggestionRead?.grandTotal}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export default ProductionSuggestionRead;