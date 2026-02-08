import { Breadcrumb, Button, Form, Input, Space } from "antd";
import { useEntityForm } from "../../hooks/useEntityForm";
import { ArrowLeftOutlined, HomeOutlined, PlusOutlined, SaveOutlined, TagsOutlined } from "@ant-design/icons";
import GenericForm from "../../components/GenericForm/GenericForm";
import type { PalavraChaveInterface } from "../../interfaces/PalavraChaveInterface";
import { atualizarPalavraChave, criarPalavraChave, obterPalavraChavePeloId } from "../../services/palavra.chave.service";

function PalavraChaveForm () {
    const {
        form,
        loading,
        isEdit,
        title,
        handleSubmit,
        navigate,
    } = useEntityForm<PalavraChaveInterface>({
        getById: obterPalavraChavePeloId,
        create: criarPalavraChave,
        update: atualizarPalavraChave,
        redirectTo: "/palavras-chave",
        getTitle: (isEdit) => (isEdit ? "Editar Palavra-Chave" : "Nova Palavra-Chave"),
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
                        href: "/palavras-chave",
                        title: (
                            <>
                                <TagsOutlined />
                                <span>Palavras-Chave</span>
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
                        label="Termo"
                        name="termo"
                        rules={[
                            { required: true, message: "Informe o termo" },
                        ]}
                    >
                        <Input />
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
                            onClick={() => navigate("/palavras-chave")}
                        >
                            Voltar
                        </Button>
                    </Space>
                </Form>
            </GenericForm>
            
        </div>
    );
}

export default PalavraChaveForm