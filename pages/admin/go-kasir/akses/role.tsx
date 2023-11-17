import DialogModal from "@/components/Modal/Modal";
import { Badge, Box, TextInput } from "@mantine/core";
import { sortBy } from "lodash";
import { DataTable, DataTableSortStatus } from "mantine-datatable";
import { useEffect, useMemo, useState } from "react";
import { BiSolidEditAlt } from "react-icons/bi";
import { FaCheck, FaXmark } from "react-icons/fa6";
import { PAGE_SIZES, dataRole } from "@/components/go-kasir/data";
import Button from "@/components/Ui/Button";
import DialogModalConfirmation from "@/components/Modal/ModalConfirmation";

const Role = () => {
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [page, setPage] = useState(1);
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: "namaRole",
        direction: "asc",
    });
    const sortedRecords = useMemo(() => sortBy(dataRole, "namaRole"), []);
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
        setRecords(dataRole.slice(from, to));
    }, [page, pageSize]);

    useEffect(() => {
        const data = sortBy(dataRole, sortStatus.columnAccessor);
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
            <Button className="bg-success" onClick={handleTambah}>
                Tambah
            </Button>
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
                            width: 75,
                            render: (number) => dataRole.indexOf(number) + 1,
                        },
                        { accessor: "namaRole", title: "Nama Role", width: "85%", sortable: true },
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
                                title: `Ubah ${record.namaRole}`,
                                onClick: () => handleUbah(),
                            },
                            {
                                key: "active",
                                icon: <FaCheck className="h-3 w-3" />,
                                title: `Aktifkan ${record.namaRole}`,
                                onClick: () => handleKonfirmasiAktif(),
                            },
                            {
                                key: "nonactive",
                                icon: <FaXmark className="h-3 w-3" />,
                                title: `Non Aktifkan ${record.namaRole}`,
                                onClick: () => handleKonfirmasiNonAktif(),
                            },
                        ],
                    }}
                    totalRecords={dataRole.length}
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
            <DialogModal size="xs" open={openTambah} handler={() => setOpenTambah(!openTambah)} heightFit={true} title="Form Tambah Role">
                <form action="#">
                    <TextInput label="Nama Role" placeholder="Nama Role" withAsterisk required />

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
            <DialogModal size="xs" open={openUbah} handler={() => setOpenUbah(!openUbah)} heightFit={true} title={"Form Edit Role"}>
                <form action="#">
                    <TextInput label="Nama Role" placeholder="Nama Role" withAsterisk required />

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

export default Role;
