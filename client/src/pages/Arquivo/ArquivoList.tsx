import { Button, Space, Table } from "antd";
import { useEntityList } from "../../hooks/useEntityList";
import type { ArquivoDetail } from "../../interfaces/ArquivoInterface";
import { excluirArquivo, listarArquivos } from "../../services/arquivo.service";
import { formatarDatetime } from "../../utils/converteDateTime";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";

function ArquivoList() {

    const { 
        data, 
        loading, 
        confirmState,
        requestDelete,
        confirmDelete,
        cancelDelete } =
            useEntityList<ArquivoDetail>({
            fetchAll: listarArquivos,
            deleteById: excluirArquivo,
        });

    const colunasArquivo = [
        { title: "Nome", dataIndex: "nome", key: "nome" },
        { title: "Título", dataIndex: "trabalho_titulo", key: "trabalho_titulo"},
        { title: "Criado em", dataIndex: "criado_em", key: "criado_em", render: (criado_em: string) => (
            <Space>
                {formatarDatetime(criado_em)}
            </Space>
        )},
        {
            title: "Ações",
            key: "acoes",
            render: (record: ArquivoDetail) => (
                <Space>
                    <Button
                        type="link"
                        onClick={() => window.open(`${record.arquivo}`, "_blank")}
                    >
                        Visualizar
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
                columns={colunasArquivo}
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

export default ArquivoList;
