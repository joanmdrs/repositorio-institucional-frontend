import { Breadcrumb, Button, Form, Input, Space, Select, Upload, message, Collapse, Col, Table, Checkbox, Radio } from "antd";
import { useEntityForm } from "../../hooks/useEntityForm";
import { ArrowLeftOutlined, HomeOutlined, PlusOutlined, SaveOutlined, FileTextOutlined, DeleteOutlined } from "@ant-design/icons";
import GenericForm from "../../components/GenericForm/GenericForm";
import { useEffect, useState } from "react";
import type { TrabalhoInterface } from "../../interfaces/TrabalhoInterface";
import { atualizarTrabalho, criarTrabalho, obterTrabalhoPeloId } from "../../services/trabalho.service";
import { listarCursos } from "../../services/curso.service";
import { listarPalavrasChave } from "../../services/palavra.chave.service";
import type { SelectProps } from "antd";
import type { DefaultOptionType } from "antd/es/select";
import ModalBuscaGenerico from "../../components/ModalBuscaGenerico/ModalBuscaGenerico";
import { listarPessoas } from "../../services/pessoa.service";
import type { PessoaInterface } from "../../interfaces/PessoaInterface";

const optionsTipo = [
    {
        value: "ART",
        label: "Artigo"
    },
    {
        value: "MON",
        label: "Monogragia"
    },
    {
        value: "DIS",
        label: "Dissertação"
    },
    {
        value: "TES",
        label: "Tese"
    }
]

const optionsIdioma = [
    {
        value: "inglês",
        label: "Inglês"
    },
    {
        value: "português",
        label: "Português"
    },
    {
        value: "espanhol",
        label: "Espanhol"
    }
]

function TrabalhoForm () {
    const {
        form,
        loading,
        isEdit,
        title,
        navigate,
    } = useEntityForm<TrabalhoInterface>({
        getById: obterTrabalhoPeloId,
        create: criarTrabalho,
        update: atualizarTrabalho,
        redirectTo: "/trabalhos",
        getTitle: (isEdit) => (isEdit ? "Editar Trabalho" : "Novo Trabalho"),
    });

    const mapOptions = <T,>(
        data: T[],
        valueKey: keyof T,
        labelKey: keyof T
    ): DefaultOptionType[] =>
        data.map(item => ({
            value: item[valueKey] as string | number,
            label: String(item[labelKey]),
        }));

    const [optionsCurso, setOptionsCurso] = useState<SelectProps["options"]>([]);
    const [optionsPalavraChave, setOptionsPalavraChave] = useState<SelectProps["options"]>([]);
    const existeArquivo = (isEdit && form.getFieldValue("arquivos")?.length > 0);
    
    type PessoaSelecionada = {
        id: number;
        nome: string;
    };

    type ColecaoPessoa = 'autor' | 'orientador' | 'coorientador';

    const [openModalPessoa, setOpenModalPessoa] = useState<ColecaoPessoa | null>(null);

    const autores = Form.useWatch("autores", form) || [];
    const orientadores = Form.useWatch("orientadores", form) || [];
    const coorientadores = Form.useWatch("coorientadores", form) || [];

    const handleAddItem = (item: PessoaSelecionada, collection: ColecaoPessoa) => {
        const fieldMap = {
            autor: "autores",
            orientador: "orientadores",
            coorientador: "coorientadores",
        } as const;

        const field = fieldMap[collection];
        const current = form.getFieldValue(field) || [];

        if (!current.some((p: PessoaSelecionada) => p.id === item.id)) {
            form.setFieldValue(field, [...current, item]);
        }
    };

    const handleRemoveItem = (item: PessoaSelecionada, collection: ColecaoPessoa) => {
        const fieldMap = {
            autor: "autores",
            orientador: "orientadores",
            coorientador: "coorientadores",
        } as const;

        const field = fieldMap[collection];
        const current = form.getFieldValue(field) || [];

        form.setFieldValue(
            field,
            current.filter((p: PessoaSelecionada) => p.id !== item.id)
        );
    };


    const getColumns = (collection: ColecaoPessoa) => [
        { title: "ID", dataIndex: "id", key: "id" },
        { title: "Nome", dataIndex: "nome", key: "nome" },
        {
            title: "Ações",
            key: "acoes",
            render: (_: any, record: PessoaSelecionada) => (
                <Space>
                    <Button
                        icon={<DeleteOutlined />}
                        type="link"
                        danger
                        onClick={() => handleRemoveItem(record, collection)}
                    />
                </Space>
            ),
        },
    ];


    useEffect(() => {
        const loadData = async () => {
            const [
                cursosRes,
                palavrasRes
            ] = await Promise.all([
                listarCursos(),
                listarPalavrasChave(),
            ]);

            console.log(autores)

            setOptionsCurso(mapOptions(cursosRes.data.results, "id", "nome"));
            setOptionsPalavraChave(mapOptions(palavrasRes.data.results, "id", "termo"));

        };

        loadData();
    }, []);



    const handleSave = async (values: TrabalhoInterface & { arquivo: File }) => {
        const formData = new FormData();

        const simpleFields = [
            "titulo",
            "resumo",
            "data_defesa",
            "tipo",
            "idioma",
            "curso",
        ] as const;

        simpleFields.forEach((field) => {
            if (values[field]) {
                formData.append(field, String(values[field]));
            }
        });

       

        if (values.palavras_chave) {
            formData.append(
                "palavras_chave",
                JSON.stringify(values.palavras_chave)
            );
        }

        if (values.arquivo) {
            formData.append("arquivo", values.arquivo);
        }

        autores.forEach(p =>
            formData.append('autores', String(p.id))
        );

        orientadores.forEach(p =>
            formData.append('orientadores', String(p.id))
        );

        coorientadores.forEach(p =>
            formData.append('coorientadores', String(p.id))
        );


        if (isEdit) {
            await atualizarTrabalho(form.getFieldValue("id"), formData);
        } else {
            await criarTrabalho(formData);
        }

        message.success(
            isEdit ? "Registro atualizado com sucesso" : "Registrado realizado com sucesso"
        );
        navigate("/trabalhos");
    };



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
                        href: "/trabalhos",
                        title: (
                            <>
                                <FileTextOutlined />
                                <span>Trabalhos</span>
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
                    style={{}}
                    onFinish={handleSave}
                >
                    <Form.Item name="autores" hidden />
                    <Form.Item name="orientadores" hidden />
                    <Form.Item name="coorientadores" hidden />

                    <Collapse style={{margin: "10px 0"}}>
                    
                    <Collapse.Panel header="Trabalho" key="trabalho" forceRender>
                        <Form.Item
                            label="Título"
                            name="titulo"
                            rules={[
                                { required: true, message: "Informe o título" },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Resumo"
                            name="resumo"
                            rules={[
                                { required: true, message: "Informe o resumo" },
                            ]}
                        >
                            <Input.TextArea rows={6} />
                        </Form.Item>

                        <Form.Item
                            label="Palavras-chave"
                            name="palavras_chave"
                            rules={[
                                { required: true, message: "Informe ao menos uma palavra-chave" },
                                {
                                    validator: (_, value) =>
                                        value && value.length > 5
                                        ? Promise.reject("Máximo de 5 palavras-chave")
                                        : Promise.resolve(),
                                    },
                            ]}
                            extra="Digite e pressione Enter para adicionar (máx. 5)"
                        >
                            <Select
                                mode="tags"
                                placeholder="Ex: Engenharia de Software, IA, DevOps"
                                tokenSeparators={[","]}
                                showSearch
                                maxTagCount={5}
                                onChange={(values) => {
                                    const normalizadas = Array.from(
                                        new Map(
                                        values.map((v) => [v.toLowerCase(), v.trim()])
                                        ).values()
                                    );

                                    // garante que o form fique sincronizado
                                    form.setFieldValue("palavras_chave", normalizadas);
                                }}
                            />
                        </Form.Item>



                        <div style={{display: 'flex', gap: '10px', flexWrap: 'wrap'}}>
                            <Form.Item
                                label="Data da Defesa"
                                name="data_defesa"
                                style={{width: 'fit-content'}}
                                rules={[
                                    { required: false, message: "Informe a data da defesa " },
                                ]}
                            >
                                <Input type="date" />

                            </Form.Item>

                            <Form.Item 
                                label="Tipo" 
                                name="tipo" 
                                style={{width: '15%'}}
                                rules={[{ required: true, message: 'Por favor, selecione uma opção!' }]}>
                                <Select
                                    placeholder="Selecione"
                                    options={optionsTipo}
                                />
                            </Form.Item>

                            <Form.Item 
                                label="Idioma" 
                                name="idioma" 
                                style={{width: '15%'}}
                                rules={[{ required: false, message: 'Por favor, selecione uma opção!' }]}>
                                <Select
                                    placeholder="Selecione"
                                    options={optionsIdioma}
                                    popupMatchSelectWidth={false}
                                />
                            </Form.Item>

                            <Form.Item 
                                label="Curso" 
                                name="curso" 
                                style={{width: '15%'}}
                                rules={[{ required: true, message: 'Por favor, selecione uma opção!' }]}>
                                <Select
                                    placeholder="Selecione"
                                    options={optionsCurso}
                                    popupMatchSelectWidth={false}
                                />
                            </Form.Item>

                            



                        </div>

                        <Form.Item
                            label="Disponível para consulta ?"
                            name="disponivel_consulta"
                            rules={[{ required: true, message: 'Por favor, marque a opção!' }]}
                        >
                            <Radio.Group
                                options={[
                                    { value: true, label: 'Sim' },
                                    { value: false, label: 'Não' },
                                ]}
                            />
                        </Form.Item>

                        

                        {isEdit && form.getFieldValue("arquivos")?.length > 0 && (
                            <Form.Item label="Arquivo atual">
                                <a
                                    href={`${form.getFieldValue("arquivos")[0].arquivo}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Visualizar arquivo atual
                                </a>
                            </Form.Item>
                        )}


                        <Form.Item
                            label={existeArquivo ? "Novo Arquivo (opcional)" : "Arquivo"}
                            name="arquivo"
                            valuePropName="file"
                            getValueFromEvent={(e) => e?.file}
                            rules={[
                                { required: !existeArquivo, message: "Selecione um arquivo" }
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
                    </Collapse.Panel>
                    

                        <Collapse.Panel header="Autores" key="autores" forceRender>
                            <Button
                                icon={<PlusOutlined />}
                                type="primary"
                                onClick={() => setOpenModalPessoa('autor')}
                            >
                                Adicionar Autor
                            </Button>

                            {autores.length > 0 && (
                                <Table
                                    bordered
                                    dataSource={autores}
                                    columns={getColumns('autor')}
                                    rowKey="id"
                                />
                            )}
                        </Collapse.Panel>

                        <Collapse.Panel header="Orientador" key="orientador" forceRender>
                            <Button
                                icon={<PlusOutlined />}
                                type="primary"
                                onClick={() => setOpenModalPessoa('orientador')}
                            >
                                Adicionar Orientador
                            </Button>

                            {orientadores.length > 0 && (
                                <Table
                                    bordered
                                    dataSource={orientadores}
                                    columns={getColumns('orientador')}
                                    rowKey="id"
                                />
                            )}
                        </Collapse.Panel>

                        <Collapse.Panel header="Coorientadores" key="coorientadores" forceRender>
                            <Button
                                icon={<PlusOutlined />}
                                type="primary"
                                onClick={() => setOpenModalPessoa('coorientador')}
                            >
                                Adicionar Coorientador
                            </Button>

                            {coorientadores.length > 0 && (
                                <Table
                                    bordered
                                    dataSource={coorientadores}
                                    columns={getColumns('coorientador')}
                                    rowKey="id"
                                />
                            )}
                        </Collapse.Panel>

                    </Collapse>

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
                            onClick={() => navigate("/trabalhos")}
                        >
                            Voltar
                        </Button>
                    </Space>
                </Form>
            </GenericForm>

            <ModalBuscaGenerico
                open={!!openModalPessoa}
                title="Buscar Pessoa"
                rowKey="id"
                columns={[
                    { title: "Nome", dataIndex: "nome" },
                    { title: "Cpf", dataIndex: "cpf" },
                ]}
                fetchData={async ({ search, page }) => {
                    const res = await listarPessoas({ search, page });
                    return {
                        results: res.data.results,
                        count: res.data.count,
                    };
                }}
                selectionMode="single"
                onSelect={(pessoa: PessoaInterface) => {
                    if (openModalPessoa) {
                        handleAddItem(
                            { id: pessoa.id, nome: pessoa.nome },
                            openModalPessoa
                        );
                    }
                    setOpenModalPessoa(null);
                }}
                onCancel={() => setOpenModalPessoa(null)}
            />

            
        </div>
    );
}

export default TrabalhoForm