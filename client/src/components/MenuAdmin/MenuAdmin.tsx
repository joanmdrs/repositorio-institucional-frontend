import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import {
    UserOutlined,
    ApartmentOutlined,
    BookOutlined,
    TagsOutlined,
    FileTextOutlined,
    SettingOutlined,
    FolderOpenOutlined,
    TeamOutlined,
    LayoutOutlined
} from "@ant-design/icons";

function MenuAdmin() {
    const navigate = useNavigate();

    return (
        <Menu
            mode="inline"
            theme="dark"
            onClick={({ key }) => navigate(key)}
        >
            <Menu.Item key="/" icon={<LayoutOutlined />}>
                Dashboard
            </Menu.Item>

            <Menu.Item key="/pessoas" icon={<UserOutlined />}>
                Pessoas
            </Menu.Item>

            <Menu.Item key="/departamentos" icon={<ApartmentOutlined />}>
                Departamentos
            </Menu.Item>

            <Menu.Item key="/cursos" icon={<BookOutlined />}>
                Cursos
            </Menu.Item>

            <Menu.Item key="/palavras-chave" icon={<TagsOutlined />}>
                Palavras-chave
            </Menu.Item>

            <Menu.Item key="/trabalhos" icon={<FileTextOutlined />}>
                Trabalhos
            </Menu.Item>

            <Menu.Item key="/participacoes-trabalho" icon={<TeamOutlined />}>
                Participações
            </Menu.Item>

            <Menu.Item key="/usuarios" icon={<SettingOutlined />}>
                Usuários
            </Menu.Item>

            <Menu.Item key="/arquivos" icon={<FolderOpenOutlined />}>
                Arquivos
            </Menu.Item>
        </Menu>
    );
}

export default MenuAdmin;
