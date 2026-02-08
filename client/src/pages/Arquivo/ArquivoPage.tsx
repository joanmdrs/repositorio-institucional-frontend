import { Breadcrumb, Button, Space } from "antd";
import { HomeOutlined, PlusOutlined, FolderOpenOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import ArquivoList from "./ArquivoList";


function ArquivoPage() {
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
                                <FolderOpenOutlined />
                                <span> Arquivos </span>
                            </>
                        ),
                    },
                ]}
            />

            <Space style={{ margin: '16px 0' }}>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => navigate("/novo-arquivo")}
                >
                    Novo Arquivo
                </Button>
            </Space>

            <ArquivoList />
        </div>
    );
}

export default ArquivoPage;
