import { BarChartOutlined, DownloadOutlined, FileTextOutlined, FolderOpenOutlined, PlusOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Col, Image, Row, Space, Statistic, Typography } from "antd";
import { use, useEffect, useState } from "react";
import { listarTrabalhos } from "../../services/trabalho.service";
import { listarArquivos } from "../../services/arquivo.service";
import { listarParticipacaoTrabalho } from "../../services/participacao.trabalho.service";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

function DashboardPage() {

    const navigate = useNavigate();
    const [stats, setStats] = useState({
    trabalhos: 0,
    arquivos: 0,
    autores: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    const fetchData = async () => {
        try {
        const responses = await Promise.all([
            listarTrabalhos(),
            listarArquivos(),
            listarParticipacaoTrabalho(),
        ]);

        setStats({
            trabalhos: responses[0].data.count,
            arquivos: responses[1].data.count,
            autores: responses[2].data.count,
        });
        } catch (err) {
        console.error(err);
        } finally {
        setLoading(false);
        }
    };

    fetchData();
    }, []);

    const handleNovoTrabalho = () => {
        navigate("/novo-trabalho");
    }


    return (
        <div style={{ padding: 24 }}>
            <Title level={3}>Repositório Institucional</Title>

            {/* Indicadores */}
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} md={8}>
                    <Card >
                        <Statistic
                            loading={loading}
                            title="Trabalhos"
                            value={stats.trabalhos}
                            prefix={<FileTextOutlined />}
                        />
                    </Card>
                </Col>

                <Col xs={24} sm={12} md={8}>
                    <Card>
                        <Statistic
                            loading={loading}
                            title="Arquivos"
                            value={stats.arquivos}
                            prefix={<FolderOpenOutlined />}
                        />
                    </Card>
                </Col>

                <Col xs={24} sm={12} md={8}>
                    <Card>
                        <Statistic
                            loading={loading}
                            title="Autores"
                            value={stats.autores}
                            prefix={<UserOutlined />}
                        />
                    </Card>
                </Col>

                
            </Row>

        {/* Ações rápidas */}
        <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
            <Col xs={24} md={12}>
                <Card title="Ações Rápidas">
                    <Space wrap>
                        <Button onClick={() => handleNovoTrabalho()} type="primary" icon={<PlusOutlined />}>
                            Novo Trabalho
                        </Button>

                        <Button icon={<FolderOpenOutlined />}>
                            Enviar Arquivo
                        </Button>

                        <Button icon={<BarChartOutlined />}>
                            Relatórios
                        </Button>
                    </Space>
                </Card>
            </Col>

            <Col xs={24} md={12}>
                <Card title="Resumo do Sistema">
                    <p>📚 Repositório ativo para armazenamento e consulta de produções acadêmicas.</p>
                    <p>🔍 Pesquisas por autor, curso, ano e tipo de trabalho.</p>
                    <p>⬇️ Downloads controlados e auditáveis.</p>
                </Card>
            </Col>
        </Row>
    </div>
  );
}

export default DashboardPage;