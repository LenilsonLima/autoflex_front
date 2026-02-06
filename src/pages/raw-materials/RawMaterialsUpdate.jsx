import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RawMaterialsService } from "../../services/raw-materials.service";
import Loading from "../../components/layout/Loading";

const RawMaterialsUpdate = () => {
    const navigation = useNavigate();
    const params = useParams();
    const id = params?.id;
    const [rawMaterials, setRawMaterials] = useState({});
    const [loading, setLoading] = useState(true);

    const getRawMaterials = async () => {
        try {
            setLoading(true);
            const response = await RawMaterialsService.get(id);
            setRawMaterials(response);
        } catch (error) {
            alert(error.response.data?.message || 'Erro ao buscar Matéria prima.')
        } finally {
            setLoading(false);
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
            setLoading(true);
            const body = {
                code: formData?.code,
                name: formData?.name,
                stockQuantity: Number(formData?.stockQuantity)
            }
            const response = await RawMaterialsService.update(id, body);
            alert(response.data?.message || 'Matéria prima atualizado com sucesso.');
            navigation(-1);
        } catch (error) {
            alert(error.response.data?.message || 'Erro ao atualizar matéria prima.')
        } finally {
            setLoading(false);
        }
    }

    if (loading) return <Loading />;

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