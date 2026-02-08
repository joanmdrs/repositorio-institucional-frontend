import { Breadcrumb, Button, Space } from "antd";
import { HomeOutlined, PlusOutlined, ApartmentOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import DepartamentoList from "./DepartamentoList";


function DepartamentoPage() {
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
                                <ApartmentOutlined />
                                <span> Departamentos </span>
                            </>
                        ),
                    },
                ]}
            />

            <Space style={{ margin: '16px 0' }}>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => navigate("/novo-departamento")}
                >
                    Novo Departamento
                </Button>
            </Space>

            <DepartamentoList />
        </div>
    );
}

export default DepartamentoPage;
