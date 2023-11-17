import Selects from "@/components/Ui/Selects";
import DialogModal from "@/components/Modal/Modal";
import { PAGE_SIZES } from "@/components/go-kasir/data";
import { dataVideoTeaser, optionsTingkatKelas } from "@/data/smba/data";
import { Box, FileInput, TextInput } from "@mantine/core";
import { Button, Dialog, DialogBody } from "@material-tailwind/react";
import { sortBy } from "lodash";
import { DataTable, DataTableSortStatus } from "mantine-datatable";
import { useEffect, useMemo, useState } from "react";
import { BiSolidEditAlt } from "react-icons/bi";
import { FaEye, FaQuestion, FaTrash } from "react-icons/fa6";
import dayjs from "dayjs";
import "dayjs/locale/id";
import InputDate from "@/components/Ui/InputDate";

const Index = () => {
    dayjs.locale("id");
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
    const sortedRecords = useMemo(() => sortBy(dataVideoTeaser, "role"), []);
    const [records, setRecords] = useState(sortedRecords.slice(0, pageSize));

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecords(dataVideoTeaser.slice(from, to));
    }, [page, pageSize]);

    useEffect(() => {
        const data = sortBy(dataVideoTeaser, sortStatus.columnAccessor);
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
            <div className="flex flex-wrap items-end gap-x-4">
                <Selects label="Tingkat Kelas" data={optionsTingkatKelas} />
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
                                width: 75,
                                render: (number) => dataVideoTeaser.indexOf(number) + 1,
                            },
                            { accessor: "role", title: "Role", sortable: true },
                            { accessor: "tanggalAwal", title: "Tanggal Awal", sortable: true, render: ({ tanggalAwal }) => dayjs(tanggalAwal).format("DD MMMM YYYY") },
                            { accessor: "tanggalAkhir", title: "Tanggal Akhir", sortable: true, render: ({ tanggalAkhir }) => dayjs(tanggalAkhir).format("DD MMMM YYYY") },
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
                        totalRecords={dataVideoTeaser.length}
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
            <DialogModal open={openTambah} handler={handleTambah} size="xs" title="Tambah Video Teaser" heightFit={true}>
                <TextInput label="Tingkat Kelas" placeholder="Tingkat Kelas" />
                <TextInput className="my-2" label="Role" placeholder="Role" withAsterisk required />
                <InputDate label="Tanggal Awal" />
                <InputDate className="my-2" label="Tanggal Akhir" />
                <div className="flex items-end gap-x-6">
                    <FileInput className="w-1/2" label="Link Video" placeholder="Link Video" accept="video/mp4,video/x-m4v,video/*" withAsterisk required />
                    <p className="mb-2">Maksimal 500 MB (.mp4)</p>
                </div>
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

            {/*  Ubah */}
            <DialogModal open={openUbah} handler={handleUbah} size="xs" title="Ubah Video Teaser" heightFit={true}>
                <TextInput label="Tingkat Kelas" placeholder="Tingkat Kelas" />
                <TextInput className="my-2" label="Role" placeholder="Role" withAsterisk required />
                <InputDate label="Tanggal Awal" />
                <InputDate className="my-2" label="Tanggal Akhir" />
                <div className="flex items-end gap-x-6">
                    <FileInput className="w-1/2" label="Link Video" placeholder="Link Video" accept="video/mp4,video/x-m4v,video/*" withAsterisk required />
                    <p className="mb-2">Maksimal 500 MB (.mp4)</p>
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
