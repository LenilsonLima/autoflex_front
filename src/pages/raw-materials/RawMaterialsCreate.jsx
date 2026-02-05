import { api } from "../../services/api";
import { useNavigate } from "react-router-dom";

const RawMaterialsCreate = () => {
    const navigation = useNavigate();
    const createRawMaterials = async (e) => {
        e.preventDefault();
        const formValues = new FormData(e.target);
        const formData = Object.fromEntries(formValues);
        try {
            const body = {
                code: formData?.code,
                name: formData?.name,
                stockQuantity: Number(formData?.stockQuantity)
            }
            const response = await api.post('raw-materials', body);
            alert(response.data?.message || 'Matéria prima criado com sucesso.');
            navigation(-1);
        } catch (error) {
            alert(error.response.data?.message || 'Erro ao cadastrar matéria prima.')
        }
    }

    return (
        <div className="col">
            <button onClick={() => navigation(-1)}>voltar a listagem</button>
            <form onSubmit={createRawMaterials}>
                <input type="text" placeholder="code" name="code" />
                <input type="text" placeholder="name" name="name" />
                <input type="text" placeholder="stockQuantity" name="stockQuantity" />
                <button>salvar</button>
            </form>
        </div>
    );
}
export default RawMaterialsCreate;