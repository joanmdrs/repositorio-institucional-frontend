import { Button, Space, Table } from "antd";
import { useNavigate } from "react-router-dom";
import { useEntityList } from "../../hooks/useEntityList";
import type { TrabalhoInterface } from "../../interfaces/TrabalhoInterface";
import { excluirTrabalho, listarTrabalhos } from "../../services/trabalho.service";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";


function TrabalhoList() {
    const navigate = useNavigate();

    const { 
        data, 
        loading, 
        confirmState,
        requestDelete,
        confirmDelete,
        cancelDelete } =
        useEntityList<TrabalhoInterface>({
        fetchAll: listarTrabalhos,
        deleteById: excluirTrabalho,
    });

    const colunasTrabalho = [
        { title: "ID", dataIndex: "id", key: "id"},
        { title: "Título", dataIndex: "titulo", key: "titulo" },
        {
            title: "Ações",
            key: "acoes",
            render: (record: TrabalhoInterface) => (
                <Space>
                    <Button
                        type="link"
                        onClick={() => navigate(`/editar-trabalho/${record.id}`)}
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
                columns={colunasTrabalho}
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

export default TrabalhoList;
