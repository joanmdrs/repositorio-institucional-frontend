import { Button, Space, Table } from "antd";
import { useEntityList } from "../../hooks/useEntityList";
import type { ParticipacaoTrabalhoInterface } from "../../interfaces/ParticipacaoTrabalho.interface";
import { excluirParticipacaoTrabalho, listarParticipacaoTrabalho } from "../../services/participacao.trabalho.service";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";

function ParticipacaoTrabalhoList() {

    const navigate = useNavigate()
    const { 
        data, 
        loading, 
        confirmState,
        requestDelete,
        confirmDelete,
        cancelDelete } =
        useEntityList<ParticipacaoTrabalhoInterface>({
        fetchAll: listarParticipacaoTrabalho,
        deleteById: excluirParticipacaoTrabalho,
    });

    const colunasParticipacao = [
        { title: "ID", dataIndex: "id", key: "id" },
        { title: "Nome", dataIndex: "nome_pessoa", key: "nome_pessoa" },
        { title: "Trabalho", dataIndex: "titulo_trabalho", key: "titulo_trabalho" },
        { title: "Papel", dataIndex: "nome_papel", key: "nome_papel" },
        {
            title: "Ações",
            key: "acoes",
            render: (record: ParticipacaoTrabalhoInterface) => (
                <Space>
                    <Button
                        type="link"
                        onClick={() => navigate(`/editar-participacao/${record.id}`)}
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
                columns={colunasParticipacao}
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

export default ParticipacaoTrabalhoList;
