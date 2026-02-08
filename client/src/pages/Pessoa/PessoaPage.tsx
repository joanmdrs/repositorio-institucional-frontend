import { Breadcrumb, Button, Space } from "antd";
import { HomeOutlined, PlusOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import PessoaList from "./PessoaList";


function PessoaPage() {
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
                                <UserOutlined />
                                <span> Pessoas </span>
                            </>
                        ),
                    },
                ]}
            />

            <Space style={{ margin: '16px 0' }}>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => navigate("/nova-pessoa")}
                >
                    Nova Pessoa
                </Button>
            </Space>

            <PessoaList />
        </div>
    );
}

export default PessoaPage;
