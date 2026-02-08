import { SearchOutlined } from "@ant-design/icons";
import { Button, Col, Input, Layout, Row, Spin, Typography } from "antd";
import { useParams } from "react-router-dom";
import { listarTrabalhos } from "../../services/trabalho.service";
import { useEffect, useState } from "react";

const { Title, Paragraph } = Typography;
const { Content } = Layout;
const { Search } = Input;

function RenderSearchPage() {

    const { search } = useParams();
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false);

    const handleSearch = async (search: string) => {
        // Implementar lógica de busca aqui
        setLoading(true)
        const res = await listarTrabalhos({search, page: 1});
        console.log(res.data);
        setData(res.data.results);
        setLoading(false)
    }

    useEffect(() => { 

        const fetchData = async () => {
            if (search) {
                await handleSearch(search);
            }
        }
        fetchData();
    }, [search]);

    
    return (
        <Layout> 
            <Content style={{ padding: "60px 80px" }}>
                <Row justify="center" style={{ marginBottom: 60 }}>
                    <Col xs={24} md={18} lg={14} style={{ textAlign: "center" }}>
                        <Search
                            placeholder={`${search || "Buscar por título, autor ou palavra-chave"}`}
                            onSearch={handleSearch}
                    
                            enterButton={
                                <Button type="primary" icon={<SearchOutlined />}>
                                    Buscar
                                </Button>
                            }
                            size="large"
                            style={{ maxWidth: 600, marginTop: 20 }}
                        />
                        <Title> Resultados da busca </Title>
                    </Col>
                </Row>
                
                <Row justify={"center"}>

                    {/* Aqui serão renderizados os resultados da busca */}

                    {loading ? (
                        <Spin size="large" />
                    ) : 
                        <Col >

                                { data.length === 0 ? (
                                    <Paragraph>Nenhum resultado encontrado.</Paragraph>
                                ) : (
                                    <div>
                                        {data.map((trabalho: any) => (
                                            <div key={trabalho.id}>
                                                <Title level={4}>{trabalho.titulo}</Title>
                                                <Paragraph>Ano: {trabalho.ano_defesa}</Paragraph>
                                            </div>
                                        ))}
                                    </div>                                
                                )}      
                        </Col>
                    }
                </Row>

                
            </Content>
        </Layout>
    )
}

export default RenderSearchPage;