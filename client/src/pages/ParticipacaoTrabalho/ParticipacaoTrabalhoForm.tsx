import { Breadcrumb, Button, Form, Space, Input, Select } from "antd";
import { useEntityForm } from "../../hooks/useEntityForm";
import { ArrowLeftOutlined, HomeOutlined, PlusOutlined, SaveOutlined, TeamOutlined } from "@ant-design/icons";
import GenericForm from "../../components/GenericForm/GenericForm";
import { useState } from "react";
import type { ParticipacaoTrabalhoInterface } from "../../interfaces/ParticipacaoTrabalho.interface";
import { atualizarParticipacaoTrabalho, criarParticipacaoTrabalho, obterParticipacaoPeloId } from "../../services/participacao.trabalho.service";
import ModalBuscaGenerico from "../../components/ModalBuscaGenerico/ModalBuscaGenerico";
import { listarTrabalhos } from "../../services/trabalho.service";
import type { TrabalhoInterface } from "../../interfaces/TrabalhoInterface";
import { listarPessoas } from "../../services/pessoa.service";
import type { PessoaInterface } from "../../interfaces/PessoaInterface";

const optionsPapeis = [
    {
        value: "AUTOR",
        label: "Autor"
    }, 
    {
        value: "ORIENTADOR",
        label: "Orientador"
    },
    {
        value: "COORIENTADOR",
        label: "Coorientador"
    }
]

function ParticipacaoTrabalhoForm () {
    const {
        form,
        loading,
        isEdit,
        title,
        handleSubmit,
        navigate,
    } = useEntityForm<ParticipacaoTrabalhoInterface>({
        getById: obterParticipacaoPeloId,
        create: criarParticipacaoTrabalho,
        update: atualizarParticipacaoTrabalho,
        redirectTo: "/participacoes-trabalho",
        getTitle: (isEdit) => (isEdit ? "Editar Participação" : "Nova Participação"),
    });

    const [openTrabalho, setOpenTrabalho] = useState(false);
    const [openPessoa, setOpenPessoa] = useState(false);
    

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
                        href: "/participacoes-trabalho",
                        title: (
                            <>
                                <TeamOutlined />
                                <span>Participações</span>
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
                    style={{maxWidth: "600px" }}
                    onFinish={handleSubmit}
                >
                    
                    <Form.Item
                        label="Trabalho"
                        required
                    >
                        <Space.Compact style={{ width: "100%" }}>
                            <Form.Item
                                name="titulo_trabalho"
                                noStyle
                                rules={[
                                    { required: true, message: "Selecione um trabalho" },
                                ]}
                            >
                                <Input
                                    placeholder="Selecione um trabalho"
                                    readOnly
                                    onClick={() => setOpenTrabalho(true)}
                                />
                            </Form.Item>

                            <Button onClick={() => setOpenTrabalho(true)}>
                                Buscar
                            </Button>
                        </Space.Compact>
                    </Form.Item>

                    <Form.Item
                        name="trabalho"
                        hidden
                        rules={[
                            { required: true, message: "Trabalho é obrigatório" },
                        ]}
                    />

                    <Form.Item
                        label="Pessoa"
                        required
                    >
                        <Space.Compact style={{ width: "100%" }}>
                            <Form.Item
                                name="nome_pessoa"
                                noStyle
                                rules={[
                                    { required: true, message: "Selecione uma pessoa" },
                                ]}
                            >
                                <Input
                                    placeholder="Selecione uma pessoa"
                                    readOnly
                                    onClick={() => setOpenPessoa(true)}
                                />
                            </Form.Item>

                            <Button onClick={() => setOpenPessoa(true)}>
                                Buscar
                            </Button>
                        </Space.Compact>
                    </Form.Item>

                    <Form.Item
                        name="pessoa"
                        hidden
                        rules={[
                            { required: true, message: "Pessoa é obrigatória" },
                        ]}
                    />

                    <Form.Item 
                        name="papel" 
                        label="Papel" 
                        rules={[{required: true, message: "Selecione um papel"}]}
                    >
                        <Select showSearch options={optionsPapeis} placeholder="Selecione" />
                    </Form.Item>

                    

                    <Form.Item 
                        label="Ordem de autoria"
                        name="ordem_autoria"
                        rules={[{required: false, message: 'Por favor, informe a ordem de autoria'}]}
                    >
                        <Input type="number" />
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
                            onClick={() => navigate("/participacoes-trabalho")}
                        >
                            Voltar
                        </Button>
                    </Space>
                </Form>
            </GenericForm>

            <ModalBuscaGenerico
                open={openTrabalho}
                title="Buscar Trabalho"
                rowKey="id"
                columns={[
                    { title: "Título", dataIndex: "titulo" },
                    { title: "Ano", dataIndex: "ano_defesa" },
                ]}
                fetchData={async ({ search, page }) => {
                    const res = await listarTrabalhos({
                        search,
                        page,
                    });
                    return {
                        results: res.data.results,
                        count: res.data.count,
                    };
                }}
                selectionMode="single"
                onSelect={(trabalho: TrabalhoInterface) => {
                    form.setFieldsValue({
                        trabalho: trabalho.id,
                        titulo_trabalho: trabalho.titulo,
                    });
                    setOpenTrabalho(false);
                }}
                onCancel={() => setOpenTrabalho(false)}
            />

            <ModalBuscaGenerico
                open={openPessoa}
                title="Buscar Pessoa"
                rowKey="id"
                columns={[
                    { title: "Nome", dataIndex: "nome" },
                    { title: "Cpf", dataIndex: "cpf" },
                ]}
                fetchData={async ({ search, page }) => {
                    const res = await listarPessoas({
                        search,
                        page,
                    });
                    return {
                        results: res.data.results,
                        count: res.data.count,
                    };
                }}
                selectionMode="single"
                onSelect={(pessoa: PessoaInterface) => {
                    form.setFieldsValue({
                        pessoa: pessoa.id,
                        nome_pessoa: pessoa.nome,
                    });
                    setOpenPessoa(false);
                }}
                onCancel={() => setOpenPessoa(false)}
            />


            
        </div>
    );
}

export default ParticipacaoTrabalhoForm