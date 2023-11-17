import Selects from "@/components/Ui/Selects";
import { Box } from "@mantine/core";
import { Button } from "@material-tailwind/react";
import { sortBy } from "lodash";
import { DataTable, DataTableSortStatus } from "mantine-datatable";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { BiPrinter } from "react-icons/bi";
import { BsCardList } from "react-icons/bs";

interface DatasProps {
    namaBab: string;
    jumlahSoal: number;
    peluang: string;
}

const initialData: DatasProps = {
    namaBab: "Paragraf ",
    jumlahSoal: 34,
    peluang: "Normal",
};

const datas: DatasProps[] = Array.from({ length: 40 }, (_, index) => ({
    ...initialData,
}));

const PAGE_SIZES = [10, 20, 30];

const optionsMapel = [
    { value: "Bahasa Indonesia", label: "Bahasa Indonesia" },
    { value: "Matematika", label: "Matematika" },
    { value: "Bahasa Inggris", label: "Bahasa Inggris" },
];

const optionsBab = [
    { value: "Paragraf", label: "Paragraf" },
    { value: "Matrix", label: "Matrix" },
    { value: "Trigonometri", label: "Trigonometri" },
];

const Index = () => {
    const router = useRouter();
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [page, setPage] = useState(1);
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: "namaBab",
        direction: "asc",
    });

    const sortedRecords = useMemo(() => sortBy(datas, "namaBab"), []);
    const [records, setRecords] = useState(sortedRecords.slice(0, pageSize));
    const [selectedRowData, setSelectedRowData] = useState<any>(null);
    const [editorLoaded, setEditorLoaded] = useState<boolean>(false);
    const [data, setData] = useState<string>("");

    const [openModalListSoal, setOpenModalListSoal] = useState(false);
    const [openModalInformasiSoal, setOpenModalInformasiSoal] = useState(false);
    const [openModalTambahSoal, setOpenModalTambahSoal] = useState(false);

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecords(datas.slice(from, to));
    }, [page, pageSize]);

    useEffect(() => {
        const data = sortBy(datas, sortStatus.columnAccessor);
        setRecords(sortStatus.direction === "desc" ? data.reverse() : data);
    }, [sortStatus]);

    const handleOpenListSoal = (rowData: any) => {
        setSelectedRowData(rowData);
        router.push("/admin/smba/soal/mengisi-soal/list-soal");
    };

    const handleEdit = (rowData: any) => {
        setSelectedRowData(rowData);
    };

    useEffect(() => {
        setEditorLoaded(true);
    }, []);

    return (
        <>
            <div className="flex items-end gap-x-4">
                <Selects label="Mata Pelajaran" data={optionsMapel} withAsterisk />
                <Selects label="Bab" data={optionsBab} withAsterisk />

                <Button className="max-w-max bg-primary ">Lihat Data</Button>
            </div>

            <div>
                <Box sx={{ height: records.length > 10 ? 750 : "auto", width: 700 }} className="mt-4">
                    <DataTable
                        withColumnBorders
                        highlightOnHover
                        shadow="sm"
                        records={records}
                        columns={[
                            { accessor: "namaBab", width: 100, sortable: true },
                            { accessor: "jumlahSoal", width: 100, sortable: true },
                            { accessor: "peluang", width: 100, sortable: true },
                        ]}
                        rowContextMenu={{
                            items: (record) => [
                                {
                                    key: "Lihat Soal",
                                    icon: <BsCardList className="h-3 w-3" />,
                                    onClick: () => handleOpenListSoal(selectedRowData),
                                },
                                {
                                    key: "Print Soal",
                                    icon: <BiPrinter className="h-3 w-3" />,
                                    onClick: () => handleEdit(selectedRowData),
                                },
                            ],
                        }}
                        totalRecords={datas.length}
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
                </Box>
            </div>
            {/* 
            <DialogModal open={openModalListSoal} title="List Soal" size="xl" heightFit={false} handler={() => setOpenModalListSoal(!openModalListSoal)}>
                <Box sx={{ height: records.length > 10 ? 450 : "auto", padding: "10px" }}>
                    <DataTable
                        withColumnBorders
                        highlightOnHover
                        shadow="md"
                        records={datasList}
                        columns={[
                            { accessor: "id", width: 150, sortable: true },
                            { accessor: "tipeSoal", width: 150, sortable: true },
                            { accessor: "sumber", width: 200, sortable: true },
                            { accessor: "kesulitan", width: 150, sortable: true },
                            { accessor: "metode", width: 200, sortable: true },
                            { accessor: "waktuPengerjaan", width: 150, sortable: true },
                            { accessor: "wacana", width: 300, sortable: true },
                            { accessor: "video", width: 300, sortable: true },
                            { accessor: "kognitif", width: 200, sortable: true },
                            { accessor: "totBab", width: 150, sortable: true },
                            { accessor: "nikPembuat", width: 150, sortable: true },
                            { accessor: "namaPembuat", width: 150, sortable: true },
                            { accessor: "tanggalPembuatan", width: 150, sortable: true },
                            { accessor: "isVerif", width: 150, sortable: true },
                            { accessor: "nikVerif", width: 150, sortable: true },
                            { accessor: "namaVerif", width: 150, sortable: true },
                            { accessor: "tanggalVerif", width: 150, sortable: true },
                        ]}
                        totalRecords={datasList.length}
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
                </Box>

                <div className="mt-5 flex items-end justify-end gap-x-4">
                    <Button className="max-w-max bg-primary ">Refresh</Button>
                    <Button
                        type="button"
                        className="max-w-max bg-primary"
                        onClick={() => {
                            setOpenModalListSoal(!openModalListSoal);
                            setOpenModalInformasiSoal(!openModalInformasiSoal);
                        }}
                    >
                        Tambah Soal
                    </Button>
                    <Button className="max-w-max bg-primary" onClick={() => setOpenModalListSoal(!openModalListSoal)}>
                        Tutup
                    </Button>
                </div>
            </DialogModal> */}

            {/* <DialogModal
                open={openModalInformasiSoal}
                title="Tambah Soal Baru"
                size="lg"
                heightFit={false}
                handler={() => {
                    setOpenModalInformasiSoal(!openModalInformasiSoal);
                    setOpenModalListSoal(!openModalListSoal);
                }}
            >
                <div className="flex h-full gap-x-5 ">
                    <div className="flex flex-1 flex-col gap-y-2">
                        <div className="h-[18vh] rounded-md border-2 border-gray-700">
                            <div className="flex items-center justify-between bg-gray-900 py-2 px-2">
                                <p className="text-white">Soal</p>
                                <Button
                                    onClick={() => {
                                        setOpenModalInformasiSoal(!openModalInformasiSoal);
                                        setOpenModalTambahSoal(!openModalTambahSoal);
                                    }}
                                    size="sm"
                                    color="gray"
                                    className="flex items-center gap-1 !rounded-sm !py-1 !px-1"
                                >
                                    <TbEdit size={15} color="black" />
                                    <p className="text-xxs capitalize text-black">Edit Soal</p>
                                </Button>
                            </div>
                        </div>

                        <div className="h-[18vh] rounded-md border-2 border-gray-700">
                            <div className="flex items-center justify-between bg-gray-900 py-2 px-2">
                                <p className="text-white">Solusi</p>
                                <Button size="sm" color="gray" className="flex items-center gap-1 !rounded-sm !py-1 !px-1">
                                    <TbEdit size={15} color="black" />
                                    <p className="text-xxs capitalize text-black">Edit Solusi</p>
                                </Button>
                            </div>
                        </div>

                        <div className="h-[18vh] rounded-md border-2 border-gray-700">
                            <div className="flex items-center justify-between bg-gray-900 py-2 px-2">
                                <p className="text-white">The King</p>
                                <Button size="sm" color="gray" className="flex items-center gap-1 !rounded-sm !py-1 !px-1">
                                    <TbEdit size={15} color="black" />
                                    <p className="text-xxs capitalize text-black">Edit The King</p>
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 ">
                        <h1 className="mb-2">Informasi Umum</h1>

                        <div className="flex flex-col gap-2 pb-10">
                            <Selects data={optionsMapel} withAsterisk label="Tipe Soal" />
                            <Selects data={optionsMapel} withAsterisk label="Level Kognitif" />
                            <Selects data={optionsMapel} withAsterisk label="Tingkat Kesulitan" />
                            <Selects data={optionsMapel} withAsterisk label="Metode Pengambilan" />
                            <Selects data={optionsMapel} withAsterisk label="Saran Penggunaan" />
                            <Selects data={optionsMapel} withAsterisk label="Waktu Pengerjaan" />

                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-4">
                                    <label htmlFor="sumber-soal" className="min-w-[200px]">
                                        Sumber Soal
                                    </label>
                                    <Button size="sm" color="gray">
                                        <FaMagnifyingGlass size={20} />
                                    </Button>
                                </div>
                                <Input placeholder="Sumber Soal" className="w-full" />
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-4">
                                    <label htmlFor="wacana" className="min-w-[200px]">
                                        Wacana
                                    </label>
                                    <Button size="sm" color="gray">
                                        <FaMagnifyingGlass size={20} />
                                    </Button>
                                </div>
                                <Input placeholder="Wacana" className="w-full" />
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-4">
                                    <label htmlFor="video-soal" className="min-w-[200px]">
                                        Video Soal
                                    </label>
                                    <Button size="sm" color="gray">
                                        <FaMagnifyingGlass size={20} />
                                    </Button>
                                </div>
                                <Input placeholder="Video Soal" className="w-full" />
                            </div>
                        </div>
                    </div>
                </div>
            </DialogModal> */}
        </>
    );
};

export default Index;
