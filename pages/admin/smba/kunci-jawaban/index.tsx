import Selects from "@/components/Ui/Selects";
import { OptionsKodePaket, optionsJenisProduk, optionsKelompokUjian } from "@/data/smba/data";
import { Button } from "@material-tailwind/react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { useReactToPrint } from "react-to-print";
import { Box } from "@mantine/core";
import { DataTable, DataTableSortStatus } from "mantine-datatable";
import { PAGE_SIZES } from "@/components/go-kasir/data";
import { sortBy } from "lodash";

const data = [
    {
        id: 1,
        noUrut: 10,
        kodePaket: "K001",
        kelompokUjian: "MATEMATIKA",
        bab: "01.19.02. Menentukan suatu Vektor",
        idSoal: "04554808",
        jenisProduk: "e-Empati Mandiri",
        tipeSoal: "Mandiri",
        level: "1",
        kunciJawaban: "A",
        kodeSumber: "Tes Book",
    },
    {
        id: 2,
        noUrut: 10,
        kodePaket: "K001",
        kelompokUjian: "LOGIKA",
        bab: "01.19.02. Menentukan suatu Vektor",
        idSoal: "04554808",
        jenisProduk: "e-Empati Wajib",
        tipeSoal: "Mandiri",
        level: "1",
        kunciJawaban: "A",
        kodeSumber: "Tes Book",
    },
    {
        id: 3,
        noUrut: 10,
        kodePaket: "K001",
        kelompokUjian: "LOGIKA",
        bab: "01.19.02. Menentukan suatu Vektor",
        idSoal: "04554808",
        jenisProduk: "e-EPB",
        tipeSoal: "Mandiri",
        level: "1",
        kunciJawaban: "A",
        kodeSumber: "Tes Book",
    },
];

const Kuncijawaban = () => {
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [page, setPage] = useState(1);
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: "noUrut",
        direction: "asc",
    });
    const sortedRecords = useMemo(() => sortBy(data, "noUrut"), []);
    const [records, setRecords] = useState(sortedRecords.slice(0, pageSize));

    const tableRef = useRef(null);

    const [selectValue, setSelectValue] = useState({
        jenisproduk: "",
        kelompokujian: "",
        kodepaket: "",
    });

    const handleChange = (name, value) => {
        setSelectValue((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCetak = useReactToPrint({
        content: () => tableRef.current,
    });

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecords(data.slice(from, to));
    }, [page, pageSize]);

    useEffect(() => {
        const datas = sortBy(data, sortStatus.columnAccessor);
        setRecords(sortStatus.direction === "desc" ? datas.reverse() : data);
    }, [sortStatus]);

    return (
        <>
            <div className="flex flex-wrap items-end gap-x-4">
                <Selects label="Jenis Produk" data={optionsJenisProduk} withAsterisk required onChange={(value) => handleChange("jenisproduk", value)} />
                <Selects label="Kelompok Ujian" data={optionsKelompokUjian} withAsterisk required onChange={(value) => handleChange("kelompokujian", value)} />
                <Selects label="Kode Paket" data={OptionsKodePaket} withAsterisk required onChange={(value) => handleChange("kodepaket", value)} />
                <Button className="bg-info" color="indigo">
                    Lihat
                </Button>

                {data.length > 0 && (
                    <>
                        <Button className="bg-primary" onClick={handleCetak}>
                            Cetak
                        </Button>

                        <DownloadTableExcel filename="kunci jawaban" sheet="kunci jawaban" currentTableRef={tableRef.current}>
                            <Button className="bg-success">Ekspor</Button>
                        </DownloadTableExcel>
                    </>
                )}
            </div>

            <Box sx={{ height: records.length > 10 ? 750 : "auto" }} className="mt-4">
                <div ref={tableRef}>
                    <DataTable
                        className="z-0"
                        withColumnBorders
                        highlightOnHover
                        shadow="sm"
                        records={records}
                        columns={[
                            {
                                accessor: "number",
                                title: "No",
                                render: (number: any) => data.indexOf(number) + 1,
                            },
                            { accessor: "noUrut", title: "No. Urut", sortable: true },
                            { accessor: "idSoal", title: "ID Soal", sortable: true },
                            { accessor: "kelompokUjian", title: "Kelompok Ujian", sortable: true },
                            { accessor: "bab", title: "BAB", sortable: true },
                            { accessor: "kodeSumber", title: "Kode Sumber", sortable: true },
                            { accessor: "tipeSoal", title: "Tipe Soal", sortable: true },
                            { accessor: "level", title: "Level", sortable: true },
                            { accessor: "kunciJawaban", title: "Kunci Jawaban", sortable: true },
                        ]}
                        totalRecords={data.length}
                        sortStatus={sortStatus}
                        onSortStatusChange={setSortStatus}
                        recordsPerPage={pageSize}
                        page={page}
                        paginationSize="sm"
                        onPageChange={(p) => setPage(p)}
                        recordsPerPageOptions={PAGE_SIZES}
                        onRecordsPerPageChange={setPageSize}
                        paginationText={({ from, to, totalRecords }) => `Records ${from} - ${to} of ${totalRecords}`}
                    />
                </div>
            </Box>
        </>
    );
};

export default Kuncijawaban;
