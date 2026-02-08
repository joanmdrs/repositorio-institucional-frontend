import { Button, Space, Table } from "antd";
import { useNavigate } from "react-router-dom";
import { useEntityList } from "../../hooks/useEntityList";
import type { CursoInterface } from "../../interfaces/CursoInterface";
import { excluirCurso, listarCursos } from "../../services/curso.service";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";

function CursoList() {
    const navigate = useNavigate();

    const { 
        data, 
        loading,
        confirmState,
        requestDelete,
        confirmDelete,
        cancelDelete
     } =
        useEntityList<CursoInterface>({
        fetchAll: listarCursos,
        deleteById: excluirCurso,
    });

    const colunasCursos = [
        { title: "ID", dataIndex: "id", key: "id"},
        { title: "Nome", dataIndex: "nome", key: "nome" },
        { title: "Sigla", dataIndex: "sigla", key: "sigla" },
        { title: "Nível", dataIndex: "nivel", key: "nivel"},
        { title: "Departamento", dataIndex: "departamento_nome", key: "departamento_nome"},
        {
            title: "Ações",
            key: "acoes",
            render: (record: CursoInterface) => (
                <Space>
                    <Button
                        type="link"
                        onClick={() => navigate(`/editar-curso/${record.id}`)}
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
                columns={colunasCursos}
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

export default CursoList;
