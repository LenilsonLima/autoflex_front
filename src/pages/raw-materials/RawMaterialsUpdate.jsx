import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { useNavigate, useParams } from "react-router-dom";

const RawMaterialsUpdate = () => {
    const navigation = useNavigate();
    const params = useParams();
    const id = params?.id;
    const [rawMaterials, setRawMaterials] = useState({});

    const getRawMaterials = async () => {
        try {
            const response = await api.get(`raw-materials/${id}`);
            setRawMaterials(response.data);
        } catch (error) {
            alert(error.response.data?.message || 'Erro ao buscar Matéria prima.')
        }
    }

    useEffect(() => {
        getRawMaterials();
    }, []);

    const createRawMaterialsUpdate = async (e) => {
        e.preventDefault();
        const formValues = new FormData(e.target);
        const formData = Object.fromEntries(formValues);
        try {
            const body = {
                code: formData?.code,
                name: formData?.name,
                stockQuantity: Number(formData?.stockQuantity)
            }
            const response = await api.patch(`raw-materials/${id}`, body);
            alert(response.data?.message || 'Matéria prima atualizado com sucesso.');
            navigation(-1);
        } catch (error) {
            alert(error.response.data?.message || 'Erro ao atualizar matéria prima.')
        }
    }

    return (
        <div className="col">
            <button onClick={() => navigation(-1)}>voltar a listagem</button>
            <form onSubmit={createRawMaterialsUpdate}>
                <input type="text" placeholder="code" name="code" defaultValue={rawMaterials?.code} />
                <input type="text" placeholder="name" name="name" defaultValue={rawMaterials?.name} />
                <input type="text" placeholder="stockQuantity" name="stockQuantity" defaultValue={rawMaterials?.stockQuantity} />
                <button>salvar</button>
            </form>
        </div>
    );
}
export default RawMaterialsUpdate;