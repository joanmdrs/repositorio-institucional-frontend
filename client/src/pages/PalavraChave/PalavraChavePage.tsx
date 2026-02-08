import { Breadcrumb, Button, Space } from "antd";
import { HomeOutlined, PlusOutlined, TagsOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import PalavraChaveList from "./PalavraChaveList";


function PalavraChavePage() {
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
                                <TagsOutlined />
                                <span> Palavras-Chave </span>
                            </>
                        ),
                    },
                ]}
            />

            <Space style={{ margin: '16px 0' }}>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => navigate("/nova-palavra-chave")}
                >
                    Nova Palavra-Chave
                </Button>
            </Space>

            <PalavraChaveList />
        </div>
    );
}

export default PalavraChavePage;
