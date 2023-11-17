import Selects from "@/components/Ui/Selects";
import DialogModal from "@/components/Modal/Modal";
import { PAGE_SIZES, dataPaketSoalTeaser, optionsKelompokUjian, optionsTingkatKelas } from "@/data/smba/data";
import { Box } from "@mantine/core";
import { Button, Dialog, DialogBody } from "@material-tailwind/react";
import { sortBy } from "lodash";
import { DataTable, DataTableSortStatus } from "mantine-datatable";
import { useEffect, useMemo, useState } from "react";
import { BiSolidEditAlt } from "react-icons/bi";
import { FaQuestion, FaTrash } from "react-icons/fa6";
import InputDate from "@/components/Ui/InputDate";
import ConfirmationModalTable from "@/components/Modal/ModalConfirmation";
import dayjs from "dayjs";
import "dayjs/locale/id";

const PaketSoalTeaser = () => {
    dayjs.locale("id");
    const [openTambah, setOpenTambah] = useState(false);
    const [openUbah, setOpenUbah] = useState(false);
    const [openHapus, setOpenHapus] = useState(false);

    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [page, setPage] = useState(1);
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: "namaBuku",
        direction: "asc",
    });
    const sortedRecords = useMemo(() => sortBy(dataPaketSoalTeaser, "namaBuku"), []);
    const [records, setRecords] = useState(sortedRecords.slice(0, pageSize));

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecords(dataPaketSoalTeaser.slice(from, to));
    }, [page, pageSize]);
    useEffect(() => {
        const data = sortBy(dataPaketSoalTeaser, sortStatus.columnAccessor);
        setRecords(sortStatus.direction === "desc" ? data.reverse() : data);
    }, [sortStatus]);

    const handleTambah = () => {
        setOpenTambah(!openTambah);
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
                <Selects label="Tingkat Kelas" data={optionsTingkatKelas} withAsterisk required />
                <Button className="bg-info">Lihat</Button>
                <Button className="bg-success" onClick={handleTambah}>
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
                            render: (number) => dataPaketSoalTeaser.indexOf(number) + 1,
                        },
                        { accessor: "role", title: "Role", sortable: true },
                        { accessor: "tanggalAwal", title: "Tanggal Awal", sortable: true, render: ({ tanggalAwal }) => dayjs(tanggalAwal).format("DD MMMM YYYY") },
                        { accessor: "tanggalAkhir", title: "Tanggal Akhir", sortable: true, render: ({ tanggalAkhir }) => dayjs(tanggalAkhir).format("DD MMMM YYYY") },
                        { accessor: "namaTob", title: "Nama TOB", sortable: true },
                        { accessor: "jumlahProduk", title: "Jumlah Produk", sortable: true },
                    ]}
                    rowContextMenu={{
                        items: (record) => [
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
                    totalRecords={dataPaketSoalTeaser.length}
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

            {/* Form Tambah */}
            <DialogModal heightFit open={openTambah} handler={handleTambah} size="md" title="Form Tambah Paket Soal Teaser">
                <div className="grid grid-cols-2 gap-4">
                    <Selects label="Tingkat Kelas" data={optionsKelompokUjian} withAsterisk required />
                    <Selects label="Role" data={optionsKelompokUjian} withAsterisk required />
                    <InputDate label="Tanggal Awal" required />
                    <InputDate label="Tanggal Akhir" required />
                </div>
                <h2 className="mt-4 mb-2 text-lg font-bold">Pencarian TOB & Komponent Produk</h2>
                <hr className="mb-4 border border-gray-200" />
                <div className="mb-4 flex gap-x-4">
                    <Selects className="w-full" label="Tahun Ajaran" data={optionsKelompokUjian} withAsterisk required />
                    <Selects className="w-full" label="Nama TOB" data={optionsKelompokUjian} withAsterisk required />
                </div>
                <div className="mt-8 flex justify-center gap-x-4">
                    <Button
                        className="bg-success"
                        onClick={() => {
                            setOpenTambah(false);
                        }}
                    >
                        Simpan
                    </Button>
                    <Button
                        className="bg-white text-black"
                        onClick={() => {
                            setOpenTambah(false);
                        }}
                    >
                        Tutup
                    </Button>
                </div>
            </DialogModal>

            {/* Form Ubah */}
            <DialogModal heightFit open={openUbah} handler={handleUbah} size="md" title="Form Ubah Paket Soal Teaser">
                <div className="grid grid-cols-2 gap-4">
                    <Selects label="Tingkat Kelas" data={optionsKelompokUjian} withAsterisk required />
                    <Selects label="Role" data={optionsKelompokUjian} withAsterisk required />
                    <InputDate label="Tanggal Awal" required />
                    <InputDate label="Tanggal Akhir" required />
                </div>
                <h2 className="mt-4 mb-2 text-lg font-bold">Pencarian TOB & Komponent Produk</h2>
                <hr className="mb-4 border border-gray-200" />
                <div className="mb-4 flex gap-x-4">
                    <Selects className="w-full" label="Tahun Ajaran" data={optionsKelompokUjian} withAsterisk required />
                    <Selects className="w-full" label="Nama TOB" data={optionsKelompokUjian} withAsterisk required />
                </div>
                <div className="mt-8 flex justify-center gap-x-4">
                    <Button
                        className="bg-success"
                        onClick={() => {
                            setOpenUbah(false);
                        }}
                    >
                        Simpan
                    </Button>
                    <Button
                        className="bg-white text-black"
                        onClick={() => {
                            setOpenUbah(false);
                        }}
                    >
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

export default PaketSoalTeaser;
