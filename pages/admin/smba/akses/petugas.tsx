import DialogModal from "@/components/Modal/Modal";
import ConfirmationModalTable from "@/components/Modal/ModalConfirmation";
import { Badge, Box, TextInput } from "@mantine/core";
import { Button, Dialog, DialogBody } from "@material-tailwind/react";
import { sortBy } from "lodash";
import { DataTable, DataTableSortStatus } from "mantine-datatable";
import { useEffect, useMemo, useState } from "react";
import { BiSolidEditAlt } from "react-icons/bi";
import { FaCheck, FaQuestion, FaXmark } from "react-icons/fa6";
import { PAGE_SIZES, dataPetugas, optionsRole } from "@/data/smba/data";
import Selects from "@/components/Ui/Selects";

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
            <div className="flex gap-x-4">
                <Button className="max-w-max bg-info">Lihat</Button>
                <Button className="max-w-max bg-success" onClick={handleTambah}>
                    Tambah
                </Button>
            </div>
            <Box sx={{ height: records.length > 10 ? 750 : "auto" }} className="mt-4">
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
                            sortable: true,
                            width: 75,
                            render: (number) => dataPetugas.indexOf(number) + 1,
                        },
                        { accessor: "nik", title: "NIK", sortable: true },
                        { accessor: "namaPetugas", title: "Nama Petugas", width: "25%", sortable: true },
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
                        {
                            accessor: "akunDefault",
                            title: "Akun Default",
                            sortable: true,
                            render: ({ akunDefault }) => (
                                <Badge className={`${akunDefault === true ? "bg-success" : "bg-danger"} text-white`} size="md">
                                    {akunDefault === true ? "Y" : "N"}
                                </Badge>
                            ),
                        },
                    ]}
                    rowContextMenu={{
                        items: (record) => [
                            {
                                key: "edit",
                                icon: <BiSolidEditAlt className="h-3 w-3" />,
                                title: `Ubah ${record.namaPetugas}`,
                                onClick: () => handleUbah(),
                            },
                            {
                                key: "active",
                                icon: <FaCheck className="h-3 w-3" />,
                                title: `Aktifkan ${record.namaPetugas}`,
                                onClick: () => handleKonfirmasiAktif(),
                            },
                            {
                                key: "nonactive",
                                icon: <FaXmark className="h-3 w-3" />,
                                title: `Non Aktifkan ${record.namaPetugas}`,
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
            <p className="border-2 border-dashed border-info p-2 text-info">
                <b className="font-bold">Keterangan: </b>Klik kanan pada table untuk menampilkan menu.
            </p>

            {/* Tambah */}
            <DialogModal size="xs" open={openTambah} handler={handleTambah} heightFit={true} title="Form Tambah Petugas">
                <form action="#">
                    <TextInput label="NIK" placeholder="NIK" />
                    <TextInput className="my-2" label="Nama Petugas" placeholder="Nama Petugas" />
                    <Selects label="Role" data={optionsRole} withAsterisk={false} />

                    <div className="mt-8 flex justify-center gap-x-4">
                        <Button className="bg-success" onClick={handleTambah}>
                            Simpan
                        </Button>
                        <Button className="bg-white text-black" onClick={handleTambah}>
                            Tutup
                        </Button>
                    </div>
                </form>
            </DialogModal>

            {/* Ubah */}
            <DialogModal size="xs" open={openUbah} handler={handleUbah} heightFit={true} title="Form Ubah Petugas">
                <form action="#">
                    <TextInput label="NIK" placeholder="NIK" disabled />
                    <TextInput className="my-2" label="Nama Petugas" placeholder="Nama Petugas" />
                    <Selects label="Role" data={optionsRole} withAsterisk={false} />

                    <div className="mt-8 flex justify-center gap-x-4">
                        <Button className="bg-success" onClick={() => setOpenUbah(false)}>
                            Simpan
                        </Button>
                        <Button className="bg-white text-black" onClick={() => setOpenUbah(false)}>
                            Tutup
                        </Button>
                    </div>
                </form>
            </DialogModal>

            {/* Konfirmasi Aktif */}
            <Dialog
                open={openKonfirmasiAktif}
                handler={handleKonfirmasiAktif}
                size="xs"
                dismiss={{
                    escapeKey: false,
                    outsidePress: false,
                }}
                className="bg-white text-black dark:bg-black dark:text-white-light"
            >
                <DialogBody>
                    <FaQuestion className="mx-auto h-auto w-28 text-info" />
                    <p className="mt-4 mb-8 text-center text-black">Apakah Anda yakin untuk mengaktifkan data ini?</p>
                    <div className="mt-8 flex justify-center gap-x-4">
                        <Button className="bg-warning" onClick={handleKonfirmasiAktif}>
                            Tidak
                        </Button>
                        <Button className="bg-success" onClick={handleKonfirmasiAktif}>
                            Ya
                        </Button>
                    </div>
                </DialogBody>
            </Dialog>

            {/* Konfirmasi Non Aktif */}
            <Dialog
                open={openKonfirmasiNonAktif}
                handler={handleKonfirmasiNonAktif}
                size="xs"
                dismiss={{
                    escapeKey: false,
                    outsidePress: false,
                }}
                className="bg-white text-black dark:bg-black dark:text-white-light"
            >
                <DialogBody>
                    <FaQuestion className="mx-auto h-auto w-28 text-info" />
                    <p className="mt-4 mb-8 text-center text-black">Apakah Anda yakin untuk meng non-aktifkan data ini?</p>
                    <div className="mt-8 flex justify-center gap-x-4">
                        <Button className="bg-warning" onClick={handleKonfirmasiNonAktif}>
                            Tidak
                        </Button>
                        <Button className="bg-success" onClick={handleKonfirmasiNonAktif}>
                            Ya
                        </Button>
                    </div>
                </DialogBody>
            </Dialog>
        </>
    );
};

export default Petugas;
