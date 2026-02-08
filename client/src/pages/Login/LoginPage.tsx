import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/auth.hook";
import {
  Button,
  Form,
  Input,
  message,
  Card,
  Typography,
  Space,
} from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import type { LoginRequest } from "../../auth/auth.types";
import HeaderLogin from "./HeaderLogin";
import CustomFooter from "../../components/Footer/Footer";

const { Title, Text } = Typography;

export default function LoginPage() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    async function handleSubmit({ username, password }: LoginRequest) {
        try {
            setLoading(true);
            await login(username, password);
            message.success("Login realizado com sucesso!");
            navigate("/");
        } catch {
            message.error("Usuário ou senha inválidos");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div
        style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#f5f7fa",
        }}
        >
        <HeaderLogin />

        {/* Conteúdo central */}
        <div
            style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "24px",
            }}
        >
            <Card
                style={{ width: 360 }}
                variant="outlined"
                styles={{
                    body: { padding: 32 },
                }}
            >
                <Space orientation="vertical" size="large" style={{ width: "100%" }}>
                    {/* Título */}
                    <div>
                        <Title level={3} style={{ marginBottom: 0 }}>
                            Bem-vindo
                        </Title>
                        <Text type="secondary">
                            Entre com suas credenciais para continuar
                        </Text>
                    </div>

                    {/* Formulário */}
                    <Form
                        layout="vertical"
                        onFinish={handleSubmit}
                        autoComplete="off"
                        disabled={loading}
                    >
                        <Form.Item
                            label="Usuário"
                            name="username"
                            rules={[
                                { required: true, message: "Informe seu usuário" },
                            ]}
                        >
                            <Input
                                prefix={<UserOutlined />}
                                placeholder="Digite seu usuário"
                                autoFocus
                            />
                        </Form.Item>

                        <Form.Item
                            label="Senha"
                            name="password"
                            rules={[
                                { required: true, message: "Informe sua senha" },
                            ]}
                        >
                            <Input.Password
                                prefix={<LockOutlined />}
                                placeholder="Digite sua senha"
                            />
                        </Form.Item>

                        <Form.Item style={{ marginBottom: 8 }}>
                            <Button
                                type="primary"
                                htmlType="submit"
                                size="large"
                                loading={loading}
                                block
                            >
                                Entrar
                            </Button>
                        </Form.Item>

                        <Form.Item style={{ marginBottom: 0 }}>
                            <Button
                                type="link"
                                block
                                onClick={() => navigate("/forgot-password")}
                            >
                                Esqueci minha senha
                            </Button>
                        </Form.Item>
                    </Form>
                </Space>
            </Card>
        </div>

            <CustomFooter />
        </div>
    );
}
