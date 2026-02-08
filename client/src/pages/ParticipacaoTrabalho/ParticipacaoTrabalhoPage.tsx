import { Breadcrumb, Button, Space } from "antd";
import { HomeOutlined, PlusOutlined, TeamOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import ParticipacaoTrabalhoList from "./ParticipacaoTrabalhoList";


function ParticipacaoTrabalhoPage() {
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
                                <TeamOutlined />
                                <span> Participações </span>
                            </>
                        ),
                    },
                ]}
            />

            <Space style={{ margin: '16px 0' }}>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => navigate("/nova-participacao")}
                >
                    Nova Participação
                </Button>
            </Space>

            <ParticipacaoTrabalhoList />
        </div>
    );
}

export default ParticipacaoTrabalhoPage;
