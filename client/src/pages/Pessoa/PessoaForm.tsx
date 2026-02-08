import { Breadcrumb, Button, Form, Input, Select, Space } from "antd";
import {
    HomeOutlined,
    PlusOutlined,
    UserOutlined,
    SaveOutlined,
    ArrowLeftOutlined,
} from "@ant-design/icons";
import { useEntityForm } from "../../hooks/useEntityForm";
import GenericForm from "../../components/GenericForm/GenericForm";
import type { PessoaInterface } from "../../interfaces/PessoaInterface";
import { atualizarPessoa, criarPessoa, obterPessoaPeloId } from "../../services/pessoa.service";
import { useEffect, useState } from "react";
import { listarGrupos } from "../../services/usuario.service";
import type { GroupInterface } from "../../interfaces/Group.interface";
import { validarCPF } from "../../utils/validators";
import { maskCPF, maskTelefone } from "../../utils/mask";

const optionsTitulacao = [
    {
        value: "GRAD",
        label: "Graduação"
    },
    {
        value: "ESPE",
        label: "Especialista"
    },
    {
        value: "MEST",
        label: "Mestrado"
    },
    {
        value: "DOUT",
        label: "Doutorado"
    }, 
    {
        value: "POSDOUT",
        label: "Pós-Doutorado"
    }
]

function PessoaForm() {
    const {
        form,
        loading,
        isEdit,
        title,
        handleSubmit,
        navigate,
    } = useEntityForm<PessoaInterface>({
        getById: obterPessoaPeloId,
        create: criarPessoa,
        update: atualizarPessoa,
        redirectTo: "/pessoas",
        getTitle: (isEdit) => (isEdit ? "Editar Pessoa" : "Nova Pessoa"),
    });

    const [optionsGrupos, setOptionsGrupos] = useState([])

    useEffect(() => {
        const loadData = async () => {
            const resGrupos = await listarGrupos()
            const grupos = resGrupos.data.map((item: GroupInterface) => {
                return {
                    value: item.id,
                    label: item.name
                }
            })
            setOptionsGrupos(grupos)

            
        }
        loadData();
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
                        href: "/pessoas",
                        title: (
                            <>
                                <UserOutlined />
                                <span>Pessoas</span>
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
                        label="CPF"
                        name="cpf"
                        rules={[
                            { required: true, message: "Informe o CPF" },
                            {
                                validator: (_, value) =>
                                    value && validarCPF(value)
                                        ? Promise.resolve()
                                        : Promise.reject("CPF inválido"),
                            },
                        ]}
                    >
                        <Input
                            maxLength={14}
                            onChange={(e) =>
                                form.setFieldValue("cpf", maskCPF(e.target.value))
                            }
                        />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { type: "email", message: "Email inválido" },
                            { required: true, message: "Informe o email" },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Telefone"
                        name="telefone"
                        rules={[
                            { required: true, message: "Informe o telefone" },
                        ]}
                    >
                        <Input
                            maxLength={15}
                            onChange={(e) =>
                                form.setFieldValue("telefone", maskTelefone(e.target.value))
                            }
                        />
                    </Form.Item>

                    <Form.Item
                        label="Titulação"
                        name="titulacao_maxima"
                        rules={[{ required: true, message: 'Por favor, selecione uma titulação!'}]}
                    >
                        <Select
                            showSearch 
                            options={optionsTitulacao} />
                    </Form.Item>

                    <Form.Item 
                        label="Usuário"
                        name="username"
                        rules={[
                            { required: true, message: "Informe o usuário"}
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            { required: !isEdit, message: 'Por favor, informe sua senha!' }
                        ]}
                    >
                        <Input.Password name="password" />
                    </Form.Item>
                    
                    <Form.Item
                        label="Grupos"
                        name="groups"
                        rules={[{ required: true, message: 'Por favor, selecione um grupo!'}]}
                    >
                        <Select
                            mode="multiple"
                            showSearch 
                            options={optionsGrupos} />
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
                            onClick={() => navigate("/pessoas")}
                        >
                            Voltar
                        </Button>
                    </Space>
                </Form>
            </GenericForm>
            
        </div>
    );
}

export default PessoaForm;
