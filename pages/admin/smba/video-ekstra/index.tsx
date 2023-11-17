import Selects from "@/components/Ui/Selects";
import DialogModal from "@/components/Modal/Modal";
import { PAGE_SIZES } from "@/components/go-kasir/data";
import { dataVideoEkstra, optionsJenisProduk, optionsJenisSumber, optionsRole, optionsTingkatKelas } from "@/data/smba/data";
import { Box, Divider, FileInput, Input, Modal, TextInput } from "@mantine/core";
import { Button, Dialog, DialogBody } from "@material-tailwind/react";
import { sortBy } from "lodash";
import { DataTable, DataTableSortStatus } from "mantine-datatable";
import React, { useEffect, useMemo, useState } from "react";
import { BiSolidEditAlt, BiTrashAlt, BiVideo } from "react-icons/bi";
import { FaEye, FaQuestion, FaTrash } from "react-icons/fa6";
import { TbEdit } from "react-icons/tb";
import InputDate from "@/components/Ui/InputDate";

const Index = () => {
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [page, setPage] = useState(1);
    const [openTambah, setOpenTambah] = useState(false);
    const [openLihat, setOpenLihat] = useState(false);
    const [openUbah, setOpenUbah] = useState(false);
    const [openHapus, setOpenHapus] = useState(false);

    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: "role",
        direction: "asc",
    });
    const sortedRecords = useMemo(() => sortBy(dataVideoEkstra, "role"), []);
    const [records, setRecords] = useState(sortedRecords.slice(0, pageSize));
    const [selectedRowData, setSelectedRowData] = useState<any>(null);

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecords(dataVideoEkstra.slice(from, to));
    }, [page, pageSize]);

    useEffect(() => {
        const data = sortBy(dataVideoEkstra, sortStatus.columnAccessor);
        setRecords(sortStatus.direction === "desc" ? data.reverse() : data);
    }, [sortStatus]);

    const handleTambah = () => {
        setOpenTambah(!openTambah);
    };

    const handleLihat = () => {
        setOpenLihat(!openLihat);
    };

    const handleUbah = () => {
        setOpenUbah(!openUbah);
    };

    const handleHapus = () => {
        setOpenHapus(!openHapus);
    };

    return (
        <>
            <div className="flex items-end gap-4">
                <Selects label="Tingkat Kelas" data={optionsTingkatKelas} />
                <Selects label="Jenis Layanan" data={optionsTingkatKelas} />
                <Selects label="Tahun Ajaran" data={optionsTingkatKelas} />
                <Button className="bg-info">Lihat</Button>
                <Button className="bg-success" onClick={() => setOpenTambah(!openTambah)}>
                    Tambah
                </Button>
            </div>

            <div>
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
                                width: 80,
                                render: (number) => dataVideoEkstra.indexOf(number) + 1,
                            },
                            { accessor: "namaVideo", title: "Nama Video", sortable: true },
                            { accessor: "role", title: "Role", sortable: true },
                            { accessor: "jenisVideo", title: "Jenis Video", sortable: true },
                            { accessor: "idProduk", title: "Id Produk", sortable: true },
                            { accessor: "tanggalAwal", title: "Tanggal Awal", sortable: true },
                            { accessor: "tanggalAkhir", title: "Tanggal Akhir", sortable: true },
                            { accessor: "linkVideo", title: "Link Video", sortable: true },
                        ]}
                        rowContextMenu={{
                            items: (record) => [
                                {
                                    key: "see",
                                    icon: <FaEye className="h-3 w-3" />,
                                    title: `Lihat Video ${record.role}`,
                                    onClick: () => handleLihat(),
                                },
                                {
                                    key: "edit",
                                    icon: <BiSolidEditAlt className="h-3 w-3" />,
                                    title: `Ubah ${record.role}`,
                                    onClick: () => handleUbah(),
                                },
                                {
                                    key: "delete",
                                    icon: <FaTrash className="h-3 w-3" />,
                                    title: `Hapus ${record.role}`,
                                    onClick: () => handleHapus(),
                                },
                            ],
                        }}
                        totalRecords={dataVideoEkstra.length}
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

            {/*  Tambah */}
            <DialogModal open={openTambah} handler={handleTambah} size="sm" title="Tambah Video Teaser" heightFit={true}>
                <div className="grid grid-cols-2 gap-4">
                    <TextInput label="Tingkat Kelas" placeholder="Tingkat Kelas" />
                    <TextInput label="Tahun Ajaran" placeholder="Tahun Ajaran" />
                    <TextInput label="Jenis Layanan" placeholder="Jenis Layanan" />
                </div>
                <hr className="my-4 border border-gray-200" />
                <div className="grid grid-cols-2 gap-4">
                    <TextInput label="Nama Video" placeholder="Nama Video" withAsterisk required />
                    <TextInput label="Role" placeholder="Role" withAsterisk required />
                    <TextInput label="Jenis Video" placeholder="Jenis Video" withAsterisk required />
                    <TextInput label="Komponen Produk" placeholder="Komponen Produk" withAsterisk required />
                    <InputDate label="Tanggal Awal" required />
                    <InputDate label="Tanggal Akhir" required />
                </div>
                <div className="mt-4 flex items-end gap-x-6">
                    <FileInput className="w-1/2" label="Link Video" placeholder="Link Video" accept="video/mp4,video/x-m4v,video/*" withAsterisk required />
                    <p className="mb-2">Maksimal 500 MB (.mp4)</p>
                </div>
                <Button className="mx-auto mt-4 flex justify-center bg-primary" onClick={() => {}}>
                    Ambil Video Server
                </Button>
                <div className="mt-8 flex justify-center gap-x-4">
                    <Button className="bg-success" onClick={handleTambah}>
                        Simpan
                    </Button>
                    <Button className="bg-white text-black" onClick={handleTambah}>
                        Tutup
                    </Button>
                </div>
            </DialogModal>

            {/*  Lihat */}
            <DialogModal open={openLihat} handler={handleLihat} size="md" title="Lihat Video Teaser" heightFit={true}>
                <div>
                    <video className="h-auto w-full rounded-lg" controls>
                        <source src="/demo.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            </DialogModal>

            {/*  Tambah */}
            <DialogModal open={openUbah} handler={handleUbah} size="sm" title="Ubah Video Ekstra" heightFit={true}>
                <div className="grid grid-cols-2 gap-4">
                    <TextInput label="Tingkat Kelas" placeholder="Tingkat Kelas" />
                    <TextInput label="Tahun Ajaran" placeholder="Tahun Ajaran" />
                    <TextInput label="Jenis Layanan" placeholder="Jenis Layanan" />
                </div>
                <hr className="my-4 border border-gray-200" />
                <div className="grid grid-cols-2 gap-4">
                    <TextInput label="Nama Video" placeholder="Nama Video" withAsterisk required />
                    <TextInput label="Role" placeholder="Role" withAsterisk required />
                    <TextInput label="Jenis Video" placeholder="Jenis Video" withAsterisk required />
                    <TextInput label="Komponen Produk" placeholder="Komponen Produk" withAsterisk required />
                    <InputDate label="Tanggal Awal" required />
                    <InputDate label="Tanggal Akhir" required />
                </div>
                <div className="mt-4 flex items-end gap-x-6">
                    <FileInput className="w-1/2" label="Link Video" placeholder="Link Video" accept="video/mp4,video/x-m4v,video/*" withAsterisk required />
                    <p className="mb-2">Maksimal 500 MB (.mp4)</p>
                </div>
                <Button className="mx-auto mt-4 flex justify-center bg-primary" onClick={() => {}}>
                    Ambil Video Server
                </Button>
                <hr className="my-4 border border-gray-200" />
                <div className="flex justify-between gap-x-4">
                    <TextInput className="w-full" label="Mata Pelajaran" placeholder="Mata Pelajaran" withAsterisk required />
                    <TextInput className="w-full" label="BAB" placeholder="BAB" withAsterisk required />
                </div>
                <div className="mt-8 flex justify-center gap-x-4">
                    <Button className="bg-success" onClick={handleUbah}>
                        Simpan
                    </Button>
                    <Button className="bg-white text-black" onClick={handleUbah}>
                        Tutup
                    </Button>
                </div>
            </DialogModal>

            {/* Konfirmasi Hapus */}
            <Dialog
                open={openHapus}
                handler={handleHapus}
                size="xs"
                dismiss={{
                    escapeKey: false,
                    outsidePress: false,
                }}
                className="bg-white text-black dark:bg-black dark:text-white-light"
            >
                <DialogBody>
                    <FaQuestion className="mx-auto h-auto w-28 text-info" />
                    <p className="mt-4 mb-8 text-center text-black">Apakah Anda Yakin Akan Menghapus Data Ini?</p>
                    <div className="mt-8 flex justify-center gap-x-4">
                        <Button className="bg-warning" onClick={handleHapus}>
                            Tidak
                        </Button>
                        <Button className="bg-success" onClick={handleHapus}>
                            Ya
                        </Button>
                    </div>
                </DialogBody>
            </Dialog>
        </>
    );
};

export default Index;
