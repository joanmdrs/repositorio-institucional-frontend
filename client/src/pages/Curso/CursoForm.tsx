import { Breadcrumb, Button, Form, Input, Space, Select } from "antd";
import { useEntityForm } from "../../hooks/useEntityForm";
import { ArrowLeftOutlined, HomeOutlined, PlusOutlined, SaveOutlined, BookOutlined } from "@ant-design/icons";
import GenericForm from "../../components/GenericForm/GenericForm";
import type { CursoInterface } from "../../interfaces/CursoInterface";
import { atualizarCurso, criarCurso, obterCursoPeloId } from "../../services/curso.service";
import { useEffect, useState } from "react";
import { listarDepartamentos } from "../../services/departamento.service";
import type { DepartamentoInterface } from "../../interfaces/DepartamentoInterface";

const optionsNiveis = [
    {
        value: "graduacao",
        label: "Graduação"
    },
    {
        value: "pos_graduacao",
        label: "Pós-Graduação"
    },
    {
        value: "tecnico",
        label: "Técnico"
    }
]

function CursoForm () {
    const {
        form,
        loading,
        isEdit,
        title,
        handleSubmit,
        navigate,
    } = useEntityForm<CursoInterface>({
        getById: obterCursoPeloId,
        create: criarCurso,
        update: atualizarCurso,
        redirectTo: "/cursos",
        getTitle: (isEdit) => (isEdit ? "Editar Curso" : "Novo Curso"),
    });

    const [optionsDepartamentos, setOptionsDepartamentos] = useState<DepartamentoInterface[]>([])

    useEffect(() => {
        const fetchDepartamentos = async () => {
            const response = await listarDepartamentos();

            const departamentos = response.data.map((item: DepartamentoInterface) => {
                return {
                    value: item.id,
                    label: item.nome
                }
            });

            setOptionsDepartamentos(departamentos)

        }

        fetchDepartamentos()
    }, [])

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
                        href: "/cursos",
                        title: (
                            <>
                                <BookOutlined />
                                <span>Cursos</span>
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
                            { required: false, message: "Informe a sigla" },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item 
                        label="Nível" 
                        name="nivel" 
                        style={{width: 'fit-content'}}
                        rules={[{ required: true, message: 'Por favor, selecione uma opção!' }]}>
                        <Select
                            defaultValue="Selecione"
                            options={optionsNiveis}
                        />
                    </Form.Item>

                    <Form.Item 
                        label="Departamento" 
                        name="departamento" 
                        style={{width: 'fit-content'}}
                        rules={[{ required: true, message: 'Por favor, selecione uma opção!' }]}>
                        <Select
                            defaultValue="Selecione"
                            options={optionsDepartamentos}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Descrição"
                        name="descricao"
                        rules={[
                            { required: false, message: "Informe a descrição" },
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
                            onClick={() => navigate("/cursos")}
                        >
                            Voltar
                        </Button>
                    </Space>
                </Form>
            </GenericForm>
            
        </div>
    );
}

export default CursoForm