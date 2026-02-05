import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { useNavigate } from "react-router-dom";

const RawMaterialsRead = () => {
    const [rawMaterials, setRawMaterials] = useState([]);
    const navigation = useNavigate();

    const getRawMaterials = async () => {
        try {
            const response = await api.get('raw-materials')
            setRawMaterials(response.data);
        } catch (error) {
            alert(error.response.data?.message || 'Erro ao buscar matéria prima.')
        }
    }

    const deleteRawMaterials = async (id) => {
        try {
            const response = await api.delete(`raw-materials/${id}`)
            alert(response.data?.message || 'Item removido com sucesso')
        } catch (error) {
            alert(error.response.data?.message || 'Erro ao remover matéria prima.')
        }
    }

    useEffect(() => {
        getRawMaterials();
    }, []);

    const deleteProduct = (id) => {
        const confirm = window.confirm('Deseja remover a matéria prima?')
        if (confirm) {
            deleteRawMaterials(id);
        }
    }
    return (
        <div className="col">
            <button onClick={() => navigation("/raw-materials/create")}>adicionar matéria prima</button>
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>code</th>
                        <th>name</th>
                        <th>stockQuantity</th>
                    </tr>
                </thead>
                <tbody>
                    {rawMaterials?.map((item) => (
                        <tr key={item?.id}>
                            <td>{item?.id}</td>
                            <td>{item?.code}</td>
                            <td>{item?.name}</td>
                            <td>{item?.stockQuantity}</td>
                            <td>
                                <button onClick={() => navigation(`/raw-materials/update/${item?.id}`)}>editar</button>
                                <button onClick={() => deleteProduct(item?.id)}>remover</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export default RawMaterialsRead;