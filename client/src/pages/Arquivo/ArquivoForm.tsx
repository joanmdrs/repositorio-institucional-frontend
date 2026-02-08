import { Breadcrumb, Button, Form, message, Select, Space, Upload } from "antd";
import {
    HomeOutlined,
    PlusOutlined,
    SaveOutlined,
    FolderOpenOutlined,
    FileTextOutlined,
    ArrowLeftOutlined,
} from "@ant-design/icons";
import { useEntityForm } from "../../hooks/useEntityForm";
import GenericForm from "../../components/GenericForm/GenericForm";
import type { ArquivoCreate } from "../../interfaces/ArquivoInterface";
import { criarArquivo, obterArquivoPeloId } from "../../services/arquivo.service";
import { useEffect, useState } from "react";
import { listarTrabalhos } from "../../services/trabalho.service";
import type { TrabalhoInterface } from "../../interfaces/TrabalhoInterface";


function ArquivoForm() {
    const {
        form,
        loading,
        isEdit,
        title,
        handleSubmit,
        navigate,
    } = useEntityForm<ArquivoCreate>({
        getById: obterArquivoPeloId,
        create: null,
        update: null,
        redirectTo: "/autores",
        getTitle: (isEdit) => (isEdit ? "Editar Autor" : "Novo Autor"),
    });

    const [optionsTrabalho, setOptionsTrabalho] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            const response = await listarTrabalhos();
            const trabalhos = response.data.map((item: TrabalhoInterface) => {
                return {
                    value: item.id,
                    label: item.titulo
                }
            })

            setOptionsTrabalho(trabalhos)
        }
        loadData()
    })

    const handleSave = async (values: any) => {
        const formData = new FormData();

        if (values.trabalho) {
            formData.append("trabalho", values.trabalho)
        }
        if (values.arquivo) {
            formData.append("arquivo", values.arquivo);
        }

        await criarArquivo(formData)
        message.success(
            isEdit ? "Registro atualizado com sucesso" : "Registrado realizado com sucesso"
        );
        navigate("/arquivos");

    }

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
                        href: "/arquivos",
                        title: (
                            <>
                                <FolderOpenOutlined />
                                <span>Arquivos</span>
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
                    onFinish={handleSave}
                >
                    <Form.Item 
                        label="Trabalho" 
                        name="trabalho" 
                        style={{width: '100%'}}
                        rules={[{ required: true, message: 'Por favor, selecione uma opção!' }]}>
                        <Select
                            placeholder="Selecione"
                            options={optionsTrabalho}
                            popupMatchSelectWidth={false}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Arquivo"
                        name="arquivo"
                        valuePropName="file"
                        getValueFromEvent={(e) => e?.file}
                        rules={[
                            { required: true, message: "Selecione um arquivo" }
                        ]}
                    >
                        <Upload
                            beforeUpload={() => false}
                            maxCount={1}
                            accept=".pdf,.doc,.docx"
                        >
                            <Button icon={<FileTextOutlined />}>
                                Selecionar arquivo
                            </Button>
                        </Upload>
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
                            onClick={() => navigate("/arquivos")}
                        >
                            Voltar
                        </Button>
                    </Space>
                </Form>
            </GenericForm>
            
        </div>
    );
}

export default ArquivoForm;
