import {
  Avatar,
  Button,
  Card,
  Col,
  Descriptions,
  Row,
  Typography,
  Space
} from "antd";
import {
  UserOutlined,

  EditOutlined
} from "@ant-design/icons";
import { useAuth } from "../../auth/auth.hook";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

function ProfilePage() {
    const { user } = useAuth();
    const navigate = useNavigate();
    
    const handleEditarPerfil = () => {  
        navigate(`/editar-pessoa/${user?.id_pessoa}`);
    }

    return (
        <div style={{ padding: 24 }}>
            <Title level={3}>Meu Perfil</Title>

            <Row gutter={[16, 16]}>
                {/* Dados do usuário */}
                <Col xs={24} md={8}>
                    <Card>
                        <Space orientation="vertical" size="large" style={{ width: "100%", textAlign: "center" }}>
                            <Avatar size={96} icon={<UserOutlined />} />

                            <div>
                                <Title level={4} style={{ marginBottom: 0 }}>
                                    {user?.nome}
                                </Title>
                            </div>

                            <Button 
                                type="primary" 
                                icon={<EditOutlined />} 
                                onClick={handleEditarPerfil}
                                disabled={!user?.id_pessoa}
                            >
                                Editar Perfil
                            </Button>
                        </Space>
                    </Card>
                </Col>

                {/* Informações */}
                <Col xs={24} md={16}>
                    <Card title="Informações Pessoais">
                        <Descriptions column={1} bordered>
                            <Descriptions.Item label="Nome">
                                {user?.nome}
                            </Descriptions.Item>
                            <Descriptions.Item label="E-mail">
                                {user?.email}
                            </Descriptions.Item>
                            <Descriptions.Item label="Perfil">
                                {user?.groups.join(", ")}
                            </Descriptions.Item>
                        </Descriptions>
                    </Card>
                </Col>
            </Row>

        </div>
    );
}

export default ProfilePage;
