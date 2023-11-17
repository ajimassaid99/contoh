import Selects from "@/components/Ui/Selects";
import { optionsTahunAjaran } from "@/components/go-kasir/data";
import { PAGE_SIZES, dataBah, optionsKelompokUjian, optionsKurikulum, optionsLayanan, optionsTingkatKelas } from "@/data/smba/data";
import { Box, Input, Modal } from "@mantine/core";
import { Button } from "@material-tailwind/react";
import { sortBy } from "lodash";
import { DataTable, DataTableSortStatus } from "mantine-datatable";
import React, { useMemo, useState } from "react";

const dataBab = [
    {
        number: 1,
        name: "Paragraf",
        value: "Paragraf",
    },
    {
        number: 2,
        name: "Pidato",
        value: "Pidato",
    },
];

const MembuatBah = () => {
    const [openModalTambah, setOpenModalTambah] = useState(false);
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [page, setPage] = useState(1);

    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: "namaKurikulum",
        direction: "asc",
    });
    const [sortStatusBab, setSortStatusBab] = useState<DataTableSortStatus>({
        columnAccessor: "name",
        direction: "asc",
    });
    const sortedRecords = useMemo(() => sortBy(dataBah, "namaKurikulum"), []);
    const [records, setRecords] = useState(sortedRecords.slice(0, pageSize));
    const sortedRecordBab = useMemo(() => sortBy(dataBab, "name"), []);
    const [recordBab, setRecordBab] = useState(sortedRecordBab.slice(0, pageSize));
    const [selectedRowData, setSelectedRowData] = useState<any>(null);

    const [payload, setPayload] = useState({
        jumlahPertemuan: 0,
        detailPertemuan: [],
    });

    const handleInsert = (groupIndex: any) => {
        const newItem = { id: Date.now(), text: `New Item ${Date.now()}` };
        const updatedData: any = [...payload?.detailPertemuan];
        updatedData[groupIndex] = [...updatedData[groupIndex], newItem];
        setPayload({ ...payload, detailPertemuan: updatedData });
    };

    const handleDelete = (groupIndex: any, itemIndex: any) => {
        const updatedData: any = [...payload?.detailPertemuan];
        updatedData[groupIndex] = updatedData[groupIndex]?.filter((item: any, index: any) => index !== itemIndex);
        setPayload({ ...payload, detailPertemuan: updatedData });
    };

    const boxData: any = Array.from({ length: payload?.jumlahPertemuan }, (_, index) => index + 1);
    const renderPertemuan = () => {
        return (
            <>
                <div className="flex flex-col gap-2 rounded-md ">
                    {boxData?.length === 0 ? (
                        <div className="flex items-center justify-center p-3">
                            <p>Masukan jumlah pertemuan terlebih dahulu</p>
                        </div>
                    ) : (
                        <>
                            <div className=" p-2">
                                <p className="mb-2 text-sm font-bold">Pertemuan 0</p>
                                <div className="rounded-md border border-black p-2">test</div>
                            </div>

                            {boxData?.map((item: any, index: any) => (
                                <div key={index} className=" p-2">
                                    <p className="mb-2 text-sm font-bold">Pertemuan {index + 1}</p>
                                    <div className="rounded-md border border-black p-2">test</div>
                                </div>
                            ))}
                        </>
                    )}
                </div>
            </>
        );
    };

    console.log({ payload });

    return (
        <>
            <div className="flex flex-col gap-5">
                <div className="mb-4 grid w-2/3 grid-cols-2 gap-x-6 gap-y-2">
                    <Selects label="Tahun Ajaran" data={optionsTahunAjaran} withAsterisk required />
                    <Selects label="Layanan" data={optionsLayanan} withAsterisk required />
                    <Selects label="Kurikulum" data={optionsKurikulum} withAsterisk required />
                    <Selects label="Kelompok Ujian" data={optionsKelompokUjian} withAsterisk required />
                    <Selects label="Tingkat Kelas" data={optionsTingkatKelas} withAsterisk required />
                </div>

                <div>
                    <Button color="green" onClick={() => setOpenModalTambah(!openModalTambah)}>
                        Tambah
                    </Button>
                </div>

                <Box sx={{ height: records.length > 10 ? 750 : "auto" }} className="mt-4">
                    <DataTable
                        withColumnBorders
                        highlightOnHover
                        shadow="sm"
                        records={records}
                        columns={[
                            {
                                accessor: "number",
                                title: "No",
                                sortable: true,
                                width: 70,
                                render: (number) => dataBah.indexOf(number) + 1,
                            },
                            { accessor: "kodeBah", title: "Kode BAH", sortable: true },
                            { accessor: "kurikulum", title: "Kurikulum", sortable: true },
                            { accessor: "tingkatKelas", title: "Tingkat Kelas", sortable: true },
                            { accessor: "jenisLayanan", title: "Jenis Layanan", sortable: true },
                            { accessor: "kelompokUjian", title: "Kelompok Ujian", sortable: true },
                            { accessor: "jumlahPertemuan", title: "Jumlah Pertemuan", sortable: true },
                            { accessor: "salinanSilabus", title: "Salinan Silabus", sortable: true },
                            {
                                accessor: "status",
                                title: "Status",
                                sortable: true,
                                cellsStyle: ({ status }) =>
                                    status === "Sent"
                                        ? {
                                              backgroundColor: "lightgreen",
                                              color: "green",
                                          }
                                        : { backgroundColor: "lightblue", color: "blue" },
                            },
                        ]}
                        // rowContextMenu={{
                        //     items: (record) => [
                        //         {
                        //             key: "see",
                        //             icon: <FaEye className="h-3 w-3" />,
                        //             title: `Lihat  ${record.namaSilabus}`,
                        //             onClick: () => handleSee(record.namaSilabus),
                        //         },
                        //         {
                        //             key: "sent",
                        //             icon: <BsFillSendFill className="h-3 w-3" />,
                        //             title: `Kirim ${record.namaSilabus}`,
                        //             onClick: () => handleSent(record.namaSilabus),
                        //         },
                        //         {
                        //             key: "delete",
                        //             icon: <FaXmark className="h-3 w-3" />,
                        //             title: `Hapus ${record.namaSilabus}`,
                        //             onClick: () => handleDelete(record.namaSilabus),
                        //         },
                        //     ],
                        // }}
                        totalRecords={dataBah.length}
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
                <p className="border-2 border-dashed border-info p-2 text-info">
                    <b className="font-bold">Keterangan: </b>Klik kanan pada table untuk menampilkan menu.
                </p>
            </div>

            {/* MODAL TAMBAH */}
            <Modal className="!no-scrollbar overflow-y-scroll" size={"80%"} opened={openModalTambah} onClose={() => setOpenModalTambah(!openModalTambah)} title="Tambah BAH" centered>
                <div className="grid grid-cols-2 gap-4">
                    <Input.Wrapper label="Kode BAH">
                        <Input type="text" />
                    </Input.Wrapper>

                    <Input.Wrapper label="Layanan">
                        <Input type="text" />
                    </Input.Wrapper>

                    <Input.Wrapper label="Tahun Ajaran">
                        <Input type="text" />
                    </Input.Wrapper>

                    <Input.Wrapper label="Kelompok Ujian">
                        <Input type="text" />
                    </Input.Wrapper>

                    <Input.Wrapper label="Kurikulum">
                        <Input type="text" />
                    </Input.Wrapper>

                    <div className="flex items-center gap-4">
                        <Input.Wrapper label="Jumlah Pertemuan">
                            <Input type="number" onChange={(e) => setPayload({ ...payload, jumlahPertemuan: Number(e.target.value) })} />
                        </Input.Wrapper>

                        <Input.Wrapper label="Semester">
                            <Input type="text" />
                        </Input.Wrapper>
                    </div>

                    <Input.Wrapper label="Tingkat Kelas">
                        <Input type="text" />
                    </Input.Wrapper>

                    <Input.Wrapper label="Mata Pelajaran">
                        <Input type="text" />
                    </Input.Wrapper>
                </div>

                <div className="my-5 flex  gap-5 ">
                    <div className="flex-1 rounded-md border ">
                        <div className="rounded-t-md bg-black p-3">
                            <h1 className="text-white">List Data</h1>
                        </div>

                        <Box>
                            <DataTable
                                withColumnBorders
                                highlightOnHover
                                shadow="sm"
                                records={recordBab}
                                columns={[{ accessor: "name", title: "Nama BAB", sortable: true }]}
                                rowContextMenu={{
                                    items: (record) => [],
                                }}
                                totalRecords={dataBab.length}
                                sortStatus={sortStatusBab}
                                onSortStatusChange={setSortStatusBab}
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

                    <div className="flex-1 rounded-md border">
                        <div className="rounded-t-md bg-black p-3">
                            <h1 className="text-white">Detail Pertemuan</h1>
                        </div>
                        <div className="no-scrollbar overflow-y-scroll p-2 md:max-h-[200px]">{renderPertemuan()}</div>
                    </div>
                </div>

                <div className="mb-10 flex items-center justify-center">
                    <Button color="green">Simpan</Button>
                </div>
            </Modal>
        </>
    );
};

export default MembuatBah;
