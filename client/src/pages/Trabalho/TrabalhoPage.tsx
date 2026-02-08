import { Breadcrumb, Button, Space } from "antd";
import { HomeOutlined, PlusOutlined, FileTextOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import TrabalhoList from "./TrabalhoList";


function TrabalhoPage() {
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
                                <FileTextOutlined />
                                <span> Trabalhos </span>
                            </>
                        ),
                    },
                ]}
            />

            <Space style={{ margin: '16px 0' }}>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => navigate("/novo-trabalho")}
                >
                    Novo Trabalho
                </Button>
            </Space>

            <TrabalhoList />
        </div>
    );
}

export default TrabalhoPage;
