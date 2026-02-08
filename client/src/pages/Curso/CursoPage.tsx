import { Breadcrumb, Button, Space } from "antd";
import { BookOutlined, HomeOutlined, PlusOutlined,  } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import CursoList from "./CursoList";


function CursoPage() {
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
                                <BookOutlined />
                                <span> Cursos </span>
                            </>
                        ),
                    },
                ]}
            />

            <Space style={{ margin: '16px 0' }}>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => navigate("/novo-curso")}
                >
                    Novo Curso
                </Button>
            </Space>

            <CursoList />
        </div>
    );
}

export default CursoPage;
