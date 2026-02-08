import { Form, message } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { onlyNumbers } from "../utils/sanitize";

interface UseEntityFormProps<T> {
    getById: (id: number) => Promise<{ data: any }>;
    create: (data: T) => Promise<{ data: any }>;
    update: (id: number, data: T) => Promise<{ data: any }>;
    redirectTo: string;
    getTitle?: (isEdit: boolean) => string;
}

export function useEntityForm<T>({
    getById,
    create,
    update,
    redirectTo,
    getTitle,
}: UseEntityFormProps<T>) {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const [loading, setLoading] = useState(false);
    const isEdit = !!id;

    useEffect(() => {
        if (!isEdit) {
            form.resetFields();
            return;
        }

        const loadData = async () => {
            try {
                setLoading(true);
                const response = await getById(Number(id));
                form.setFieldsValue(response.data);
            } catch {
                message.error("Erro ao carregar dados");
                navigate(redirectTo);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [id, form]);

    const sanitizePayload = (values: any) => {
        const numericFields = ["cpf", "telefone"];
        const payload = { ...values };

        numericFields.forEach((field) => {
            if (payload[field]) {
                payload[field] = onlyNumbers(payload[field]);
            }
        });

        return payload;
    };



    const handleSubmit = async (values: T) => {
        try {
            setLoading(true);

            const payload = sanitizePayload(values);

            if (isEdit) {
                await update(Number(id), payload);
            } else {
                await create(payload);
            }

            message.success(
                isEdit
                    ? "Registro atualizado com sucesso"
                    : "Registro realizado com sucesso"
            );
            navigate(redirectTo);
        } catch {
            message.error("Erro ao salvar dados");
        } finally {
            setLoading(false);
        }
    };


    return {
        form,
        loading,
        isEdit,
        title: getTitle?.(isEdit),
        handleSubmit,
        navigate,
    };
}
