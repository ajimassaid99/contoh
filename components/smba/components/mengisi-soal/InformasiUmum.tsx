import Selects from "@/components/Ui/Selects";
import { Box, Input, Modal } from "@mantine/core";
import { Card, CardBody, Button } from "@material-tailwind/react";
import { sortBy } from "lodash";
import { DataTable, DataTableSortStatus } from "mantine-datatable";
import dynamic from "next/dynamic";
import React, { useEffect, useMemo, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { optionKognitif, optionMetodePengambilan, optionSaranPenggunaan, optionTingkatKesulitan, optionTipeSoal, optionWaktuPengerjaan } from "../../data";

const Editor = dynamic(() => import("@/components/Editor/Editor"), { ssr: false });

interface DatasProps {
    namaSumber: string;
    jenisInstitusi: number;
    provinsi: any;
    tingkatKelas: any;
    kota: any;
    namaInstitusi: any;
    status: any;
}

const initialData: DatasProps = {
    namaSumber: "Paragraf ",
    jenisInstitusi: 34,
    provinsi: "Normal",
    tingkatKelas: "Normal",
    kota: "Normal",
    namaInstitusi: "Normal",
    status: "Normal",
};

const datas: DatasProps[] = Array.from({ length: 40 }, (_, index) => ({
    ...initialData,
}));

const PAGE_SIZES = [10, 20, 30];

const InformasiUmum = ({ data, setData }: any) => {
    const [openModalSumber, setOpenModalSumber] = useState(false);
    const [openModalWacana, setOpenModalWacana] = useState(false);
    const [openModalVideo, setOpenModalVideo] = useState(false);

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const sortedRecords = useMemo(() => sortBy(datas, "namaSumber"), []);
    const [records, setRecords] = useState(sortedRecords.slice(0, pageSize));

    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: "namaBab",
        direction: "asc",
    });

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

    return (
        <>
            <div className="flex flex-row-reverse gap-5">
                <Card className="h-fit md:w-3/4">
                    <CardBody>
                        <div className="mb-3 flex items-center justify-between">
                            <h1 className="text-lg font-bold text-black">Informasi Umum</h1>

                            <div>
                                <Button color="green">Simpan Soal</Button>
                            </div>
                        </div>

                        <div className="mb-5 flex flex-col gap-3">
                            <Selects data={optionTipeSoal} withAsterisk label="Tipe Soal" onChange={(e) => setData({ ...data, tipeSoal: e })} />
                            <Selects data={optionKognitif} withAsterisk label="Level Kognitif" onChange={(e) => setData({ ...data, levelKognitif: e })} />
                            <Selects data={optionTingkatKesulitan} withAsterisk label="Tingkat Kesulitan" onChange={(e) => setData({ ...data, tingkatKesulitan: e })} />
                            <Selects data={optionMetodePengambilan} withAsterisk label="Metode Pengambilan" onChange={(e) => setData({ ...data, metodePengambilan: e })} />
                            <Selects data={optionSaranPenggunaan} withAsterisk label="Saran Penggunaan" onChange={(e) => setData({ ...data, saranPenggunaan: e })} />
                            <Selects data={optionWaktuPengerjaan} withAsterisk label="Waktu Pengerjaan" onChange={(e) => setData({ ...data, waktuPengerjaan: e })} />

                            <div className="w-full gap-4 ">
                                <label htmlFor="sumber-soal" className="min-w-[200px]">
                                    Sumber Soal
                                </label>

                                <div className="flex w-full items-center gap-2">
                                    <Button
                                        size="sm"
                                        color="blue-gray"
                                        onClick={() => {
                                            setOpenModalSumber(!openModalSumber);
                                        }}
                                    >
                                        <FaMagnifyingGlass size={14} />
                                    </Button>
                                    <Input placeholder="Sumber Soal" className="w-full" />
                                </div>
                            </div>

                            <div className="w-full gap-4">
                                <label htmlFor="wacana" className="min-w-[200px]">
                                    Wacana
                                </label>

                                <div className="flex w-full items-center gap-2">
                                    <Button
                                        size="sm"
                                        color="blue-gray"
                                        onClick={() => {
                                            setOpenModalWacana(!openModalWacana);
                                        }}
                                    >
                                        <FaMagnifyingGlass size={14} />
                                    </Button>

                                    <Input placeholder="Wacana" className="w-full" />
                                </div>
                            </div>

                            <div className="w-full gap-4">
                                <label htmlFor="video-soal" className="min-w-[200px]">
                                    Video Soal
                                </label>

                                <div className="flex w-full items-center gap-2">
                                    <Button
                                        size="sm"
                                        color="blue-gray"
                                        onClick={() => {
                                            setOpenModalVideo(!openModalVideo);
                                        }}
                                    >
                                        <FaMagnifyingGlass size={14} />
                                    </Button>
                                    <Input placeholder="Video Soal" className="w-full" />
                                </div>
                            </div>
                        </div>
                    </CardBody>
                </Card>

                <Card className="md:w-3/4">
                    <CardBody>
                        <div className="flex flex-1 flex-col gap-y-5">
                            <h1 className="text-lg font-bold text-black">Preview</h1>

                            <div className="rounded-md border-2 border-gray-700">
                                <div className="flex items-center justify-between bg-gray-900 py-2 px-2">
                                    <p className="text-white">Soal</p>
                                </div>

                                <Editor isParent={true} id={"soal"} height={400} />
                                <div className="my-3 mx-3 flex items-center justify-end">
                                    <Button color="green">Simpan Soal</Button>
                                </div>
                            </div>

                            <div className=" rounded-md border-2 border-gray-700">
                                <div className="flex items-center justify-between bg-gray-900 py-2 px-2">
                                    <p className="text-white">Solusi</p>
                                </div>
                                <Editor isParent={true} id={"solusi"} height={400} />

                                <div className="my-3 mx-3 flex items-center justify-end">
                                    <Button color="green">Simpan Solusi</Button>
                                </div>
                            </div>

                            <div className=" rounded-md border-2 border-gray-700">
                                <div className="flex items-center justify-between bg-gray-900 py-2 px-2">
                                    <p className="text-white">The King</p>
                                </div>
                                <Editor isParent={true} id={"the-king"} height={400} />
                                <div className="my-3 mx-3 flex items-center justify-end">
                                    <Button color="green">Simpan The King</Button>
                                </div>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>

            {/* MODAL SUMBER SOAL */}
            <Modal size={"80%"} opened={openModalSumber} onClose={() => setOpenModalSumber(!openModalSumber)} title="Sumber Soal" centered>
                <div className="flex items-center gap-4">
                    <Selects data={optionTipeSoal} withAsterisk label="Tipe Soal" onChange={(e) => setData({ ...data, tipeSoal: e })} />
                    <Selects data={optionTipeSoal} withAsterisk label="Tipe Soal" onChange={(e) => setData({ ...data, tipeSoal: e })} />
                </div>

                <Box sx={{ height: records.length > 10 ? 450 : "auto", padding: "10px" }}>
                    <DataTable
                        withColumnBorders
                        highlightOnHover
                        shadow="md"
                        records={datas}
                        columns={[
                            { accessor: "namaSumber", width: 150, sortable: true },
                            { accessor: "jenisInstitusi", width: 150, sortable: true },
                            { accessor: "provinsi", width: 200, sortable: true },
                            { accessor: "tingkatKelas", width: 150, sortable: true },
                            { accessor: "kota", width: 200, sortable: true },
                            { accessor: "namaInstitusi", width: 150, sortable: true },
                            { accessor: "status", width: 100, sortable: true },
                        ]}
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
            </Modal>

            {/* MODAL SUMBER WACANA */}
            <Modal size={"80%"} opened={openModalWacana} onClose={() => setOpenModalWacana(!openModalWacana)} title="Sumber Wacana" centered>
                <div className="flex items-center gap-4">
                    <Selects data={optionTipeSoal} withAsterisk label="Tipe Soal" onChange={(e) => setData({ ...data, tipeSoal: e })} />
                    <Selects data={optionTipeSoal} withAsterisk label="Tipe Soal" onChange={(e) => setData({ ...data, tipeSoal: e })} />
                </div>

                <Box sx={{ height: records.length > 10 ? 450 : "auto", padding: "10px" }}>
                    <DataTable
                        withColumnBorders
                        highlightOnHover
                        shadow="md"
                        records={datas}
                        columns={[
                            { accessor: "namaSumber", width: 150, sortable: true },
                            { accessor: "jenisInstitusi", width: 150, sortable: true },
                            { accessor: "provinsi", width: 200, sortable: true },
                            { accessor: "tingkatKelas", width: 150, sortable: true },
                            { accessor: "kota", width: 200, sortable: true },
                            { accessor: "namaInstitusi", width: 150, sortable: true },
                            { accessor: "status", width: 100, sortable: true },
                        ]}
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
            </Modal>

            {/* MODAL SUMBER VIDEO */}
            <Modal size={"80%"} opened={openModalVideo} onClose={() => setOpenModalVideo(!openModalVideo)} title="Sumber Video" centered>
                <div className="flex items-center gap-4">
                    <Selects data={optionTipeSoal} withAsterisk label="Tipe Soal" onChange={(e) => setData({ ...data, tipeSoal: e })} />
                    <Selects data={optionTipeSoal} withAsterisk label="Tipe Soal" onChange={(e) => setData({ ...data, tipeSoal: e })} />
                </div>

                <Box sx={{ height: records.length > 10 ? 450 : "auto", padding: "10px" }}>
                    <DataTable
                        withColumnBorders
                        highlightOnHover
                        shadow="md"
                        records={datas}
                        columns={[
                            { accessor: "namaSumber", width: 150, sortable: true },
                            { accessor: "jenisInstitusi", width: 150, sortable: true },
                            { accessor: "provinsi", width: 200, sortable: true },
                            { accessor: "tingkatKelas", width: 150, sortable: true },
                            { accessor: "kota", width: 200, sortable: true },
                            { accessor: "namaInstitusi", width: 150, sortable: true },
                            { accessor: "status", width: 100, sortable: true },
                        ]}
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
            </Modal>
        </>
    );
};

export default InformasiUmum;
