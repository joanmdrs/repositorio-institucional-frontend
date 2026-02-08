import { Button, Space, Table } from "antd";
import { useNavigate } from "react-router-dom";
import { useEntityList } from "../../hooks/useEntityList";
import type { DepartamentoInterface } from "../../interfaces/DepartamentoInterface";
import { excluirDepartamento, listarDepartamentos } from "../../services/departamento.service";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";


function DepartamentoList() {
    const navigate = useNavigate();

    const { 
        data, 
        loading,
        confirmState,
        requestDelete,
        confirmDelete,
        cancelDelete } =
        useEntityList<DepartamentoInterface>({
        fetchAll: listarDepartamentos,
        deleteById: excluirDepartamento,
    });

    const colunasDepartamentos = [
        { title: "ID", dataIndex: "id", key: "id"},
        { title: "Nome", dataIndex: "nome", key: "nome" },
        { title: "Sigla", dataIndex: "sigla", key: "sigla" },
        { title: "Código", dataIndex: "codigo", key: "codigo" },
        {
            title: "Ações",
            key: "acoes",
            render: (record: DepartamentoInterface) => (
                <Space>
                    <Button
                        type="link"
                        onClick={() => navigate(`/editar-departamento/${record.id}`)}
                    >
                        Editar
                    </Button>

                    <Button
                        type="link"
                        danger
                        onClick={() => requestDelete(record)}
                    >
                        Excluir
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <>
            <Table
                loading={loading}
                dataSource={data}
                columns={colunasDepartamentos}
                rowKey="id"
            />
            <ConfirmModal
                open={confirmState.open}
                title="Confirmar exclusão"
                danger
                loading={confirmState.loading}
                confirmText="Excluir"
                description={
                    <p>
                        Tem certeza que deseja excluir ?
                    </p>
                }
                onConfirm={confirmDelete}
                onCancel={cancelDelete}
            />
        </>
        
    );
}

export default DepartamentoList;
