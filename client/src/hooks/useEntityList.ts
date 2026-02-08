import { useEffect, useState } from "react";
import { message } from "antd";
import type { AxiosResponse } from "axios";

interface ApiListResponse<T> {
    results?: T[];
    data?: T[];
}

interface UseEntityListProps<T> {
    fetchAll: (params?: any) => Promise<AxiosResponse<ApiListResponse<T>>>;
    deleteById?: (id: number) => Promise<AxiosResponse<any>>;
    initialParams?: any;
}

export function useEntityList<T>({
    fetchAll,
    deleteById,
    initialParams,
}: UseEntityListProps<T>) {
    const [data, setData] = useState<T[]>([]);
    const [loading, setLoading] = useState(false);
    const [params, setParams] = useState(initialParams);

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<T | null>(null);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const loadData = async (customParams?: any) => {
        try {
            setLoading(true);

            const response = await fetchAll(customParams ?? params);

            // DRF pagination OU lista simples
            const list =
                response.data?.results ??
                response.data?.data ??
                [];

            setData(list);
        } catch (error) {
            console.error(error);
            message.error("Erro ao carregar dados");
            setData([]);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!deleteById) return;

        try {
            await deleteById(id);
            message.success("Registro excluído com sucesso");
            setData(prev => prev.filter(item => item.id !== id));
        } catch (error) {
            console.error(error);
            message.error("Erro ao excluir registro");
        }
    };

    const requestDelete = (item: T) => {
        setSelectedItem(item);
        setConfirmOpen(true);
    };

    const cancelDelete = () => {
        setConfirmOpen(false);
        setSelectedItem(null);
    };

    const confirmDelete = async () => {
        if (!deleteById || !selectedItem) return;

        try {
            setConfirmLoading(true);
            await deleteById(selectedItem.id);
            message.success("Registro excluído com sucesso");
            setData(prev => prev.filter(item => item.id !== selectedItem.id));
            cancelDelete();
        } catch (error) {
            console.error(error);
            message.error("Erro ao excluir registro");
        } finally {
            setConfirmLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    return {
        data,
        loading,
        reload: loadData,
        setParams,
        handleDelete,
        confirmState: {
            open: confirmOpen,
            item: selectedItem,
            loading: confirmLoading,
        },
        requestDelete,
        confirmDelete,
        cancelDelete,
    };
}
