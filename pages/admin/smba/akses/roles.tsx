import DialogModal from "@/components/Modal/Modal";
import { Badge, Box, TextInput } from "@mantine/core";
import { Button, Dialog, DialogBody } from "@material-tailwind/react";
import { sortBy } from "lodash";
import { DataTable, DataTableSortStatus, differenceBy, uniqBy } from "mantine-datatable";
import { useEffect, useMemo, useState } from "react";
import { BiSolidEditAlt } from "react-icons/bi";
import { FaCheck, FaQuestion, FaUniversalAccess, FaXmark } from "react-icons/fa6";
import { PAGE_SIZES, dataAksesModal, dataRole } from "@/data/smba/data";

const Roles = () => {
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [page, setPage] = useState(1);

    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: "namaRole",
        direction: "asc",
    });
    const sortedRecords = useMemo(() => sortBy(dataRole, "namaRole"), []);
    const [records, setRecords] = useState(sortedRecords.slice(0, pageSize));

    const [sortStatusAksesMenu, setSortStatusAksesMenu] = useState<DataTableSortStatus>({
        columnAccessor: "group",
        direction: "asc",
    });
    const sortedRecordAksesMenu = useMemo(() => sortBy(dataAksesModal, "group"), []);
    const [recordAksesMenu, setRecordAksesMenu] = useState(sortedRecordAksesMenu.slice(0, pageSize));

    const [allRecordsSelected, setAllRecordsSelected] = useState(false);
    const [selectedRecords, setSelectedRecords] = useState<any[]>([]);
    const [unselectedRecords, setUnselectedRecords] = useState<any[]>([]);

    const [openTambah, setOpenTambah] = useState(false);
    const [openAkses, setOpenAkses] = useState(false);
    const [openUbah, setOpenUbah] = useState(false);
    const [openKonfirmasiAktif, setOpenKonfirmasiAktif] = useState(false);
    const [openKonfirmasiNonAktif, setOpenKonfirmasiNonAktif] = useState(false);

    const handleSelectedRecordsChange = (newSelectedRecords: any[]) => {
        if (allRecordsSelected) {
            const recordsToUnselect = records.filter((record) => !newSelectedRecords.includes(record));
            setUnselectedRecords(
                // 👇 `uniqBy` is a utility function provided by Mantine DataTable
                uniqBy([...unselectedRecords, ...recordsToUnselect], (r) => r.id).filter((r) => !newSelectedRecords.includes(r))
            );
        } else {
            setSelectedRecords(newSelectedRecords);
        }
    };

    const handleAllRecordsSelectionCheckboxChange = () => {
        if (allRecordsSelected) {
            setAllRecordsSelected(false);
            setSelectedRecords([]);
            setUnselectedRecords([]);
        } else {
            setAllRecordsSelected(true);
        }
    };

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

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        const currentRecords = dataAksesModal.slice(from, to);
        setRecordAksesMenu(currentRecords);
        if (allRecordsSelected) {
            setSelectedRecords(
                // 👇 `differenceBy` is a utility function provided by Mantine DataTable
                differenceBy(currentRecords, unselectedRecords, (r) => r.id)
            );
        }
    }, [allRecordsSelected, page, pageSize, unselectedRecords]);

    useEffect(() => {
        const data = sortBy(dataAksesModal, sortStatusAksesMenu.columnAccessor);
        setRecordAksesMenu(sortStatusAksesMenu.direction === "desc" ? data.reverse() : data);
    }, [sortStatusAksesMenu]);

    const handleTambah = () => {
        setOpenTambah(!openTambah);
    };

    const handleAkses = () => {
        setOpenAkses(!openAkses);
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
                            render: (number) => dataRole.indexOf(number) + 1,
                        },
                        { accessor: "namaRole", title: "Nama Role", width: "80%", sortable: true },
                        { accessor: "totalMenu", title: "Total Menu", sortable: true },
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
                                key: "akses",
                                icon: <FaUniversalAccess className="h-3 w-3" />,
                                onClick: () => handleAkses(),
                            },
                            {
                                key: "edit",
                                icon: <BiSolidEditAlt className="h-3 w-3" />,
                                title: `Ubah  ${record.namaRole}`,
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
            <p className="border-2 border-dashed border-info p-2 text-info">
                <b className="font-bold">Keterangan: </b>Klik kanan pada table untuk menampilkan menu.
            </p>
            {/* Tambah */}
            <DialogModal size="xs" open={openTambah} handler={handleTambah} heightFit={true} title="Form Tambah Role">
                <form action="#">
                    <TextInput label="Nama Role" placeholder="Nama Role" withAsterisk />

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

            {/* Akses */}
            <DialogModal size="md" open={openAkses} handler={handleAkses} heightFit={false} title="Form Akses Menu">
                <Box sx={{ height: records.length > 10 ? 750 : "auto" }}>
                    <DataTable
                        withColumnBorders
                        highlightOnHover
                        shadow="sm"
                        selectedRecords={selectedRecords}
                        onSelectedRecordsChange={handleSelectedRecordsChange}
                        allRecordsSelectionCheckboxProps={{
                            indeterminate: allRecordsSelected && !!unselectedRecords.length,
                            checked: allRecordsSelected,
                            onChange: handleAllRecordsSelectionCheckboxChange,
                            title: allRecordsSelected ? "Unselect all records" : `Select ${dataRole.length} records`,
                        }}
                        records={dataAksesModal}
                        columns={[
                            {
                                accessor: "number",
                                title: "No",
                                sortable: true,
                                width: 75,
                                render: (number) => dataAksesModal.indexOf(number) + 1,
                            },
                            { accessor: "group", title: "Group", sortable: true },
                            { accessor: "namaMenu", title: "Nama Menu", sortable: true },
                            {
                                accessor: "status",
                                title: "Status Menu",
                                sortable: true,
                                render: ({ status }) => (
                                    <Badge className={`${status === true ? "bg-success" : "bg-danger"} text-white`} size="md">
                                        {status === true ? "Aktif" : "Tidak Aktif"}
                                    </Badge>
                                ),
                            },
                        ]}
                    />
                </Box>
                <p className="border-2 border-dashed border-info p-2 text-info">
                    <b className="font-bold">Keterangan: </b>Centang checkbox untuk memberikan akses menu.
                </p>
                <div className="mt-8 flex justify-center gap-x-4">
                    <Button className="bg-success" onClick={handleAkses}>
                        Simpan
                    </Button>
                    <Button className="bg-white text-black" onClick={handleAkses}>
                        Tutup
                    </Button>
                </div>
            </DialogModal>

            {/* Ubah */}
            <DialogModal size="xs" open={openUbah} handler={handleUbah} heightFit={true} title="Form Ubah Role">
                <form action="#">
                    <TextInput label="Nama Role" placeholder="Nama Role" withAsterisk />

                    <div className="mt-8 flex justify-center gap-x-4">
                        <Button className="bg-success" onClick={handleUbah}>
                            Simpan
                        </Button>
                        <Button className="bg-white text-black" onClick={handleUbah}>
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

export default Roles;
