import { Button, Space, Table } from "antd";
import { useNavigate } from "react-router-dom";
import { useEntityList } from "../../hooks/useEntityList";
import type { PessoaInterface } from "../../interfaces/PessoaInterface";
import { excluirPessoa, listarPessoas } from "../../services/pessoa.service";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";

function PessoaList() {
    const navigate = useNavigate();

    const {
        data,
        loading,
        confirmState,
        requestDelete,
        confirmDelete,
        cancelDelete,
    } = useEntityList<PessoaInterface>({
        fetchAll: listarPessoas,
        deleteById: excluirPessoa,
    });
    
    const colunasPessoas = [
        { title: "ID", dataIndex: "id", key: "id"},
        { title: "Nome", dataIndex: "nome", key: "nome" },
        { title: "CPF", dataIndex: "cpf", key: "cpf"},
        {
            title: "Ações",
            key: "acoes",
            render: (record: PessoaInterface) => (
                <Space>
                    <Button
                        type="link"
                        onClick={() => navigate(`/editar-pessoa/${record.id}`)}
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
                columns={colunasPessoas}
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

export default PessoaList;
