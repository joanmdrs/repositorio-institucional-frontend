import { Button, Space, Table } from "antd";
import { useNavigate } from "react-router-dom";
import { useEntityList } from "../../hooks/useEntityList";
import type { PalavraChaveInterface } from "../../interfaces/PalavraChaveInterface";
import { excluirPalavraChave, listarPalavrasChave } from "../../services/palavra.chave.service";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";


function PalavraChaveList() {
    const navigate = useNavigate();

    const { 
        data, 
        loading, 
        confirmState,
        requestDelete,
        confirmDelete,
        cancelDelete } =
        useEntityList<PalavraChaveInterface>({
        fetchAll: listarPalavrasChave,
        deleteById: excluirPalavraChave,
    });

    const colunasPalavrasChave = [
        { title: "ID", dataIndex: "id", key: "id" },
        { title: "Termo", dataIndex: "termo", key: "termo" },
        {
            title: "Ações",
            key: "acoes",
            render: (record: PalavraChaveInterface) => (
                <Space>
                    <Button
                        type="link"
                        onClick={() => navigate(`/editar-palavra-chave/${record.id}`)}
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
                columns={colunasPalavrasChave}
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

export default PalavraChaveList;
