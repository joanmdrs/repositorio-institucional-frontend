import { Table } from "antd";
import { useEntityList } from "../../hooks/useEntityList";
import type { UsuarioInterface } from "../../interfaces/UsuarioInterface";
import { excluirUsuario, listarUsuarios } from "../../services/usuario.service";
import { CheckCircleFilled, CloseCircleFilled } from "@ant-design/icons";

function UsuarioList() {

    const { data, loading, handleDelete } =
        useEntityList<UsuarioInterface>({
        fetchAll: listarUsuarios,
        deleteById: excluirUsuario,
    });

    const colunasUsuarios = [
        { title: "ID", dataIndex: "id", key: "id" },
        { title: "Username", dataIndex: "username", key: "username" },
        { title: "E-mail", dataIndex: "email", key: "email"},
        { title: "Grupos", dataIndex: "groups_detail", key: "groups_detail", render: (_: any, record: UsuarioInterface) => (
            <span>{record.groups_detail.map(group => group.name).join(", ")}</span>
        )},
        { title: "Superuser", dataIndex: "is_superuser", key: "is_superuser", render: (is_superuser: boolean) => (
            <span>{is_superuser ? <CheckCircleFilled style={{color: "#52c41a"}} /> : <CloseCircleFilled style={{color: "red"}} />}</span>
        )},
    ];

    return (
        <Table
            loading={loading}
            dataSource={data}
            columns={colunasUsuarios}
            rowKey="id"
        />
    );
}

export default UsuarioList;
