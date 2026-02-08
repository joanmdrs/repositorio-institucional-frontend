import { Layout, Typography, Input, Button, Row, Col, Card, Space } from "antd";
import {
  SearchOutlined,
  BookOutlined,
  UploadOutlined,
  DatabaseOutlined,
} from "@ant-design/icons";

const { Content, Footer } = Layout;
const { Title, Paragraph } = Typography;
const { Search } = Input;
import logoImage from "../../assets/logo.png";
import CustomFooter from "../../components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import React from "react";

const Home = () => {

  const navigate = useNavigate()
  const [searchValue, setSearchValue] = React.useState("");

  const handleSearch = async (search: string) => {
    navigate(`/search/${encodeURIComponent(search)}`);
  }



  return (
    <Layout>
      <Content style={{ padding: "60px 80px" }}>
        {/* HERO */}
        <Row justify="center" style={{ marginBottom: 60 }}>
          <Col xs={24} md={18} lg={14} style={{ textAlign: "center" }}>
            <Title level={1}>Repo</Title>
            <Paragraph style={{ fontSize: 18 }}>
              Repositório institucional para armazenamento, organização e
              disseminação da produção acadêmica e científica.
            </Paragraph>

            <Search
              placeholder="Buscar por título, autor ou palavra-chave"
              onSearch={handleSearch}
              onChange={(e) => setSearchValue(e.target.value)}

              enterButton={
                <Button type="primary" icon={<SearchOutlined />} disabled={searchValue.length >= 3 ? false : true}>
                  Buscar
                </Button>
              }
              size="large"
              style={{ maxWidth: 600, marginTop: 20 }}
            />
          </Col>
        </Row>

        {/* AÇÕES PRINCIPAIS */}
        <Row gutter={[24, 24]} justify="center">
          <Col xs={24} md={8}>
            <Card hoverable>
              <Space orientation="vertical" size="middle">
                <BookOutlined style={{ fontSize: 32 }} />
                <Title level={4}>Explorar Publicações</Title>
                <Paragraph>
                  Navegue por artigos, dissertações, teses e outros materiais
                  acadêmicos.
                </Paragraph>
                <Button type="link">Explorar</Button>
              </Space>
            </Card>
          </Col>

          <Col xs={24} md={8}>
            <Card hoverable>
              <Space orientation="vertical" size="middle">
                <UploadOutlined style={{ fontSize: 32 }} />
                <Title level={4}>Submeter Trabalho</Title>
                <Paragraph>
                  Envie novos trabalhos acadêmicos para o repositório de forma
                  simples e segura.
                </Paragraph>
                <Button type="link">Submeter</Button>
              </Space>
            </Card>
          </Col>

          <Col xs={24} md={8}>
            <Card hoverable>
              <Space orientation="vertical" size="middle">
                <DatabaseOutlined style={{ fontSize: 32 }} />
                <Title level={4}>Coleções</Title>
                <Paragraph>
                  Acesse coleções organizadas por áreas do conhecimento e
                  comunidades.
                </Paragraph>
                <Button type="link">Ver coleções</Button>
              </Space>
            </Card>
          </Col>
        </Row>
      </Content>
        <CustomFooter />
    </Layout>
  );
};

export default Home;
