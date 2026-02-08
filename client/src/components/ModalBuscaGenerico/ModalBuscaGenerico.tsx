import { Modal, Table, Input } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";

interface ModalBuscaProps<T> {
    open: boolean;
    title: string;
    columns: ColumnsType<T>;
    fetchData: (params: {
        search?: string;
        page?: number;
    }) => Promise<{
        results: T[];
        count: number;
    }>;
    onSelect?: (record: T) => void;
    onSelectMany?: (records: T[]) => void;
    onCancel: () => void;
    rowKey: keyof T;
    selectionMode?: "single" | "multiple";
}

function ModalBuscaGenerico<T extends object>({
    open,
    title,
    columns,
    fetchData,
    onSelect,
    onSelectMany,
    onCancel,
    rowKey,
    selectionMode = "single",
}: ModalBuscaProps<T>) {
    const [data, setData] = useState<T[]>([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [selectedRows, setSelectedRows] = useState<T[]>([]);

    const loadData = async () => {
        setLoading(true);
        try {
            const res = await fetchData({ search, page });
            setData(res.results);
            setTotal(res.count);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (open) loadData();
    }, [search, page]);

    return (
        <Modal
            open={open}
            title={title}
            onCancel={onCancel}
            width={800}
            destroyOnHidden
            footer={
                selectionMode === "multiple"
                    ? [
                          <button
                              key="cancel"
                              onClick={onCancel}
                              className="ant-btn"
                          >
                              Cancelar
                          </button>,
                          <button
                              key="ok"
                              className="ant-btn ant-btn-primary"
                              disabled={!selectedRows.length}
                              onClick={() => onSelectMany?.(selectedRows)}
                          >
                              Selecionar ({selectedRows.length})
                          </button>,
                      ]
                    : null
            }
        >
            <Input.Search
                placeholder="Buscar..."
                allowClear
                onSearch={(value) => {
                    setSearch(value);
                    setPage(1);
                }}
                onChange={(value) => {
                    
                }}
                style={{ marginBottom: 16 }}
            />

            <Table
                rowKey={(record) => String(record[rowKey])}
                columns={columns}
                dataSource={data}
                loading={loading}
                pagination={{
                    current: page,
                    total,
                    onChange: (p) => setPage(p),
                }}
                rowSelection={
                    selectionMode === "multiple"
                        ? {
                              selectedRowKeys,
                              onChange: (keys, rows) => {
                                  setSelectedRowKeys(keys);
                                  setSelectedRows(rows);
                              },
                          }
                        : undefined
                }
                onRow={
                    selectionMode === "single"
                        ? (record) => ({
                              onClick: () => onSelect?.(record),
                          })
                        : undefined
                }
            />
        </Modal>
    );
}

export default ModalBuscaGenerico