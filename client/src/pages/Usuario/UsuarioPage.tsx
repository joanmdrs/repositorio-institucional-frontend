import { Breadcrumb, Button, Space } from "antd";
import { HomeOutlined, PlusOutlined, SettingOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import UsuarioList from "./UsuarioList";


function UsuarioPage() {
    const navigate = useNavigate();

    return (
        <div>
            <Breadcrumb
                style={{ margin: '10px 10px 0' }}
                items={[
                    {
                        title: <HomeOutlined />,
                    },
                    {
                        title: (
                            <>
                                <SettingOutlined />
                                <span> Usuários </span>
                            </>
                        ),
                    },
                ]}
            />

            <div style={{ marginTop: '16px' }}>
                <UsuarioList />
                {/* <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => navigate("/novo-usuario")}
                >
                    Novo Usuário
                </Button> */}
            </div>

        </div>
    );
}

export default UsuarioPage;
