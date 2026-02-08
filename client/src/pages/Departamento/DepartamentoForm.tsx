import { Breadcrumb, Button, Form, Input, Space } from "antd";
import {
    HomeOutlined,
    PlusOutlined,
    SaveOutlined,
    ArrowLeftOutlined,
    ApartmentOutlined,
} from "@ant-design/icons";
import { useEntityForm } from "../../hooks/useEntityForm";
import GenericForm from "../../components/GenericForm/GenericForm";
import type { DepartamentoInterface } from "../../interfaces/DepartamentoInterface";
import { atualizarDepartamento, criarDepartamento, obterDepartamentoPeloId } from "../../services/departamento.service";

function DepartamentoForm() {
    const {
        form,
        loading,
        isEdit,
        title,
        handleSubmit,
        navigate,
    } = useEntityForm<DepartamentoInterface>({
        getById: obterDepartamentoPeloId,
        create: criarDepartamento,
        update: atualizarDepartamento,
        redirectTo: "/departamentos",
        getTitle: (isEdit) => (isEdit ? "Editar Departamento" : "Novo Departamento"),
    });

    return (
        <div>
            {/* Breadcrumb */}
            <Breadcrumb
                style={{ margin: "16px" }}
                items={[
                    {
                        href: "/",
                        title: <HomeOutlined />,
                    },
                    {
                        href: "/departamento",
                        title: (
                            <>
                                <ApartmentOutlined />
                                <span>Departamentos</span>
                            </>
                        ),
                    },
                    {
                        title: (
                            <>
                               { isEdit ? <SaveOutlined /> : <PlusOutlined /> }
                                <span>{title}</span>
                            </>
                        ),
                    },
                ]}
            />

            <GenericForm>
                <Form
                    form={form}
                    layout="vertical"
                    style={{ maxWidth: 600 }}
                    onFinish={handleSubmit}
                >
                    <Form.Item
                        label="Nome"
                        name="nome"
                        rules={[
                            { required: true, message: "Informe o nome" },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Sigla"
                        name="sigla"
                        rules={[
                            { required: true, message: "Informe a sigla" },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Código"
                        name="codigo"
                        rules={[
                            { required: false, message: "Informe o código" },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Descrição"
                        name="descricao"
                        rules={[
                            {required: false, message: "Informe a descrição"}
                        ]}
                    >   
                        <Input.TextArea rows={4} />
                    </Form.Item>

                    {/* Ações */}
                    <Space>
                        <Button
                            type="primary"
                            htmlType="submit"
                            icon={<SaveOutlined />}
                            loading={loading}
                        >
                            {isEdit ? "Atualizar" : "Salvar"}
                        </Button>

                        <Button
                            icon={<ArrowLeftOutlined />}
                            onClick={() => navigate("/autores")}
                        >
                            Voltar
                        </Button>
                    </Space>
                </Form>
            </GenericForm>
            
        </div>
    );
}

export default DepartamentoForm;
