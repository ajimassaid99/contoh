import DialogModal from "@/components/Modal/Modal";
import { Badge, Box, TextInput } from "@mantine/core";
import { sortBy } from "lodash";
import { DataTable, DataTableSortStatus } from "mantine-datatable";
import { useEffect, useMemo, useState } from "react";
import { BiSolidEditAlt } from "react-icons/bi";
import { FaCheck, FaXmark } from "react-icons/fa6";
import { PAGE_SIZES, dataPetugas, optionsGedung, optionsKota } from "@/components/go-kasir/data";
import Selects from "@/components/Ui/Selects";
import Search from "@/components/Ui/Search";
import Button from "@/components/Ui/Button";
import DialogModalConfirmation from "@/components/Modal/ModalConfirmation";

const Petugas = () => {
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [page, setPage] = useState(1);
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: "namaKaryawan",
        direction: "asc",
    });
    const sortedRecords = useMemo(() => sortBy(dataPetugas, "namaKaryawan"), []);
    const [records, setRecords] = useState(sortedRecords.slice(0, pageSize));

    const [openTambah, setOpenTambah] = useState(false);
    const [openUbah, setOpenUbah] = useState(false);
    const [openKonfirmasiAktif, setOpenKonfirmasiAktif] = useState(false);
    const [openKonfirmasiNonAktif, setOpenKonfirmasiNonAktif] = useState(false);

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecords(dataPetugas.slice(from, to));
    }, [page, pageSize]);

    useEffect(() => {
        const data = sortBy(dataPetugas, sortStatus.columnAccessor);
        setRecords(sortStatus.direction === "desc" ? data.reverse() : data);
    }, [sortStatus]);

    const handleTambah = () => {
        setOpenTambah(!openTambah);
    };

    const handleUbah = () => {
        setOpenUbah(!openUbah);
    };

    const handleKonfirmasiAktif = () => {
        setOpenKonfirmasiAktif(!openKonfirmasiAktif);
    };

    const handleKonfirmasiNonAktif = () => {
        setOpenKonfirmasiNonAktif(!openKonfirmasiNonAktif);
    };

    return (
        <>
            <div className="flex items-end gap-x-4">
                <Selects label="Kota" data={optionsKota} withAsterisk />
                <Selects label="Gedung" data={optionsGedung} withAsterisk />
                <Search label="Cari Nama Karyawan" onSearch={() => {}} />
                <Button className="bg-info" onClick={handleTambah}>
                    Lihat
                </Button>
            </div>
            <Box sx={{ height: records.length > 10 ? 750 : "auto" }} className="z-50 mt-4">
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
                            width: 75,
                            render: (number) => dataPetugas.indexOf(number) + 1,
                        },
                        { accessor: "nik", title: "NIK", sortable: true },
                        { accessor: "namaKaryawan", title: "Nama Karyawan", sortable: true },
                        { accessor: "gedung", title: "Gedung", sortable: true },
                        { accessor: "jabatan", title: "Jabatan", sortable: true },
                        { accessor: "username", title: "Username", sortable: true },
                        { accessor: "role", title: "Role", sortable: true },
                        {
                            accessor: "status",
                            title: "Status",
                            sortable: true,
                            render: ({ status }) => (
                                <Badge className={`${status === true ? "bg-success" : "bg-danger"} text-white`} size="md">
                                    {status === true ? "Aktif" : "Tidak Aktif"}
                                </Badge>
                            ),
                        },
                    ]}
                    rowContextMenu={{
                        items: (record) => [
                            {
                                key: "edit",
                                icon: <BiSolidEditAlt className="h-3 w-3" />,
                                title: `Ubah ${record.namaKaryawan}`,
                                onClick: () => handleUbah(),
                            },
                            {
                                key: "active",
                                icon: <FaCheck className="h-3 w-3" />,
                                title: `Aktifkan ${record.namaKaryawan}`,
                                onClick: () => handleKonfirmasiAktif(),
                            },
                            {
                                key: "nonactive",
                                icon: <FaXmark className="h-3 w-3" />,
                                title: `Non Aktifkan ${record.namaKaryawan}`,
                                onClick: () => handleKonfirmasiNonAktif(),
                            },
                        ],
                    }}
                    totalRecords={dataPetugas.length}
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

            {/* Tambah */}
            <DialogModal size="xs" open={openTambah} handler={() => setOpenTambah(!openTambah)} heightFit={true} title="Form Tambah Petugas">
                <form action="#">
                    <TextInput label="Nama Petugas" placeholder="Nama Petugas" withAsterisk required />

                    <div className="mt-6 flex items-center justify-end gap-4">
                        <Button className="bg-success" onClick={() => setOpenTambah(false)}>
                            Simpan
                        </Button>

                        <Button className="bg-white" onClick={() => setOpenTambah(false)}>
                            Tutup
                        </Button>
                    </div>
                </form>
            </DialogModal>

            {/* Ubah */}
            <DialogModal size="xs" open={openUbah} handler={() => setOpenUbah(!openUbah)} heightFit={true} title="Form Ubah Petugas">
                <form action="#">
                    <TextInput label="Nama Petugas" placeholder="Nama Petugas" withAsterisk required />

                    <div className="mt-6 flex items-center justify-end gap-4">
                        <Button className="bg-success" onClick={() => setOpenUbah(false)}>
                            Simpan
                        </Button>

                        <Button className="bg-white" onClick={() => setOpenUbah(false)}>
                            Tutup
                        </Button>
                    </div>
                </form>
            </DialogModal>

            {/* Konfirmasi Aktif */}
            <DialogModalConfirmation
                title="Apakah Anda yakin untuk mengaktifkan data ini?"
                open={openKonfirmasiAktif}
                handler={handleKonfirmasiAktif}
                onClickYa={handleKonfirmasiAktif}
                onClickTidak={handleKonfirmasiAktif}
            />

            {/* Konfirmasi Non Aktif */}
            <DialogModalConfirmation
                title="Apakah Anda yakin untuk meng non-aktifkan data ini?"
                open={openKonfirmasiNonAktif}
                handler={handleKonfirmasiNonAktif}
                onClickYa={handleKonfirmasiNonAktif}
                onClickTidak={handleKonfirmasiNonAktif}
            />
        </>
    );
};

export default Petugas;
