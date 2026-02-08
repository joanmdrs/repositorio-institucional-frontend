import { Breadcrumb, Button, Form, Input, Select, Space } from "antd";
import {
    HomeOutlined,
    PlusOutlined,
    SettingOutlined,
    SaveOutlined,
    ArrowLeftOutlined,
} from "@ant-design/icons";
import { useEntityForm } from "../../hooks/useEntityForm";
import GenericForm from "../../components/GenericForm/GenericForm";
import { useEffect, useState } from "react";
import type { UsuarioInterface } from "../../interfaces/UsuarioInterface";
import { criarUsuario, listarGrupos, obterUsuarioPeloId } from "../../services/usuario.service";
import type { GroupInterface } from "../../interfaces/Group.interface";

function UsuarioForm() {
    const {
        form,
        loading,
        isEdit,
        title,
        handleSubmit,
        navigate,
    } = useEntityForm<UsuarioInterface>({
        getById: obterUsuarioPeloId,
        create: criarUsuario,
        update: null,
        redirectTo: "/usuarios",
        getTitle: (isEdit) => (isEdit ? "Editar Usuário" : "Novo Usuário"),
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
                        href: "/usuários",
                        title: (
                            <>
                                <SettingOutlined />
                                <span>Usuários</span>
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
                        label="Usuário"
                        name="username"
                        rules={[
                            { required: true, message: "Informe o usuário"}
                        ]}
                    >
                        <Input />
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
                            onClick={() => navigate("/usuarios")}
                        >
                            Voltar
                        </Button>
                    </Space>
                </Form>
            </GenericForm>
            
        </div>
    );
}

export default UsuarioForm;
