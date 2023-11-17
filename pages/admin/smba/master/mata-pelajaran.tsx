import DialogModal from "@/components/Modal/Modal";
import { Badge, Box, TextInput } from "@mantine/core";
import { Button, Chip, Dialog, DialogBody } from "@material-tailwind/react";
import { DataTable, DataTableSortStatus } from "mantine-datatable";
import { useEffect, useState } from "react";
import { PAGE_SIZES, optionsAdaDiUtbk } from "@/data/smba/data";
import { BiSolidEditAlt } from "react-icons/bi";
import { FaCheck, FaQuestion, FaTrash, FaXmark } from "react-icons/fa6";
import Switch from "@/components/Ui/Switch";
import { BiAddToQueue } from "react-icons/bi";

import Swal from "sweetalert2";
import api from "@/service/api";

const MataPelajaran = () => {
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [page, setPage] = useState(1);
    const [openTambahModal, setOpenTambahModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [dataMataPelajaran, setDataMataPelajaran] = useState([]);
    const [totalRecords, setTotalRecords] = useState(0);
    const [mataPelajaran, setMataPelajaran] = useState("");
    const [singkatan, setSingkatan] = useState("");

    const [status, setStatus] = useState<"Aktif" | "TidakAktif">("Aktif");
    const [id, setId] = useState(0);
    const [isRefresh, setIsRefresh] = useState(false);
    const [openKonfirmasiAktif, setOpenKonfirmasiAktif] = useState(false);
    const [openKonfirmasiNonAktif, setOpenKonfirmasiNonAktif] = useState(false);
    const [openKonfirmasidelete, setOpenKonfirmasiDelete] = useState(false);

    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: "created_at",
        direction: "desc",
    });

    const [selectedIsUtbk, setSelectedIsUtbk] = useState(optionsAdaDiUtbk[0].value);

    const [selectedRowData, setSelectedRowData] = useState<any>(null);

    const fetchData = async () => {
        console.log(sortStatus.direction);
        try {
            const response = await api.get(
                `/${process.env.NEXT_PUBLIC_API_VERSION}/${process.env.NEXT_PUBLIC_API_SERVICE_SMBA}/master/mata-pelajaran?sort=${sortStatus.direction}&order_by=${sortStatus.columnAccessor}&page=${page}&per_page=${pageSize}`
            );
            console.log(response.data.data);
            setDataMataPelajaran(response.data?.data);
            setTotalRecords(response.data?.metadata.total_count ?? 0);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [pageSize, sortStatus, page, isRefresh]);

    const handleTambahData = () => {
        setOpenTambahModal(!openTambahModal);
    };

    const handleSubmitTambahData = async () => {
        try {
            await api.post(`/${process.env.NEXT_PUBLIC_API_VERSION}/${process.env.NEXT_PUBLIC_API_SERVICE_SMBA}/master/mata-pelajaran`, {
                mata_pelajaran: mataPelajaran,
                singkatan: singkatan,
                status: 1,
                updated_by: "SUPER ADMIN", //Menunggu Login
                icon: "",
                is_utbk: selectedIsUtbk,
            });
            notifSucces("Mata Pelajaran Berhasil Di simpan");
            setOpenTambahModal(!openTambahModal);
            setIsRefresh(!isRefresh);
        } catch (error) {
            console.error("Error adding data:", error);
            setOpenTambahModal(!openTambahModal);
            notifError(`GAGAL Menyimpan data`);
        }
    };

    const handleEdit = (rowData: any) => {
        setMataPelajaran(rowData["mata_pelajaran"]);
        setSingkatan(rowData["singkatan"]);
        setSelectedIsUtbk(rowData["is_utbk"] ? optionsAdaDiUtbk[0].value : optionsAdaDiUtbk[1].value);
        setStatus(rowData["status"]);
        setId(rowData["id"]);
        setOpenEditModal(true);
    };

    const handleEditSubmit = async () => {
        try {
            await api.patch(`/${process.env.NEXT_PUBLIC_API_VERSION}/${process.env.NEXT_PUBLIC_API_SERVICE_SMBA}/master/mata-pelajaran/${id}`, {
                mata_pelajaran: mataPelajaran,
                singkatan: singkatan,
                status: status === "Aktif" ? 1 : 0,
                updated_by: "SUPER ADMIN", //Menunggu Login
                icon: "",
                is_utbk: selectedIsUtbk,
            });
            notifSucces("Mata Pelajaran Berhasil Di Ubah");
            setOpenEditModal(false);
            setIsRefresh(!isRefresh);
        } catch (error) {
            console.error("Error adding data:", error);

            setOpenEditModal(false);
            notifError("gagal merubah Mata pelajaran");
        }
    };

    const submitActive = async () => {
        try {
            const updatedRowData = {
                mata_pelajaran: selectedRowData["mata_pelajaran"],
                singkatan: selectedRowData["singkatan"],
                status: 1,
                updated_by: "SUPER ADMIN",
                icon: "",
                is_utbk: selectedRowData["is_utbk"] ? 1 : 0,
            };

            await api.patch(`/${process.env.NEXT_PUBLIC_API_VERSION}/${process.env.NEXT_PUBLIC_API_SERVICE_SMBA}/master/mata-pelajaran/${selectedRowData["id"]}`, updatedRowData);
            setIsRefresh(!isRefresh);
            setSelectedRowData(null);
            notifSucces("Mata Pelajaran Berhasil Di Aktifkan");
            setOpenKonfirmasiAktif(false);
        } catch (e) {
            setSelectedRowData(null);
            notifError("gagal mengaktifkan Mata pelajaran");
            setOpenKonfirmasiAktif(false);
        }
    };
    const submitnonActive = async () => {
        try {
            const updatedRowData = {
                mata_pelajaran: selectedRowData["mata_pelajaran"],
                singkatan: selectedRowData["singkatan"],
                status: 0,
                updated_by: "SUPER ADMIN",
                icon: "",
                is_utbk: selectedRowData["is_utbk"] ? 1 : 0,
            };

            await api.patch(`/${process.env.NEXT_PUBLIC_API_VERSION}/${process.env.NEXT_PUBLIC_API_SERVICE_SMBA}/master/mata-pelajaran/${selectedRowData["id"]}`, updatedRowData);
            setIsRefresh(!isRefresh);
            setSelectedRowData(null);
            notifSucces("Mata Pelajaran Berhasil Di Aktifkan");
            setOpenKonfirmasiNonAktif(false);
        } catch (e) {
            setSelectedRowData(null);
            notifError("gagal mengaktifkan Mata pelajaran");
            setOpenKonfirmasiAktif(false);
        }
    };

    const submitDelete = async () => {
        try {
            await api.delete(`${process.env.NEXT_PUBLIC_API_VERSION}/${process.env.NEXT_PUBLIC_API_SERVICE_SMBA}/master/mata-pelajaran/${selectedRowData["id"]}`);

            notifSucces("Mata Pelajaran Berhasil Di Hapus");
            setIsRefresh(!isRefresh);
            setOpenKonfirmasiDelete(false);
        } catch (e) {
            notifError("gagal menghapus Mata pelajaran");
            setOpenKonfirmasiDelete(false);
        }
    };

    const notifError = (msg: string) => {
        const toast = Swal.mixin({
            toast: true,
            position: "top",
            showConfirmButton: false,
            timer: 3000,
            showCloseButton: true,
            color: "#ffffff",
            background: "#EA4654",
            icon: "error",
            cancelButtonColor: "#ffffff",
        });
        toast.fire({
            title: msg,
        });
    };
    const notifSucces = (msg: string) => {
        const toast = Swal.mixin({
            toast: true,
            position: "top",
            showConfirmButton: false,
            timer: 3000,
            showCloseButton: true,
            color: "#ffffff",
            background: "#28a745",
            icon: "success",
            cancelButtonColor: "#ffffff",
        });
        toast.fire({
            title: msg,
        });
    };

    const handleKonfirmasiAktif = (rowData: any) => {
        setSelectedRowData(rowData);
        setOpenKonfirmasiAktif(!openKonfirmasiAktif);
    };
    const handleKonfirmasiDelete = (rowData: any) => {
        setSelectedRowData(rowData);
        setOpenKonfirmasiDelete(!openKonfirmasidelete);
    };

    const handleKonfirmasiNonAktif = (rowData: any) => {
        setSelectedRowData(rowData);
        setOpenKonfirmasiNonAktif(!openKonfirmasiNonAktif);
    };
    return (
        <>
            <div className="flex gap-x-4">
                <Button className="flex max-w-max items-center gap-2 bg-success" onClick={handleTambahData}>
                    <BiAddToQueue className="h-6 w-6" />
                    Tambah
                </Button>
            </div>
            <Box sx={{ height: dataMataPelajaran.length > 10 ? 750 : "auto" }} className="datatables mt-4">
                <DataTable
                    withColumnBorders
                    highlightOnHover
                    shadow="sm"
                    records={dataMataPelajaran}
                    columns={[
                        {
                            accessor: "index",
                            title: "No",
                            sortable: true,
                            width: 70,
                            render: (number) => dataMataPelajaran.indexOf(number) + 1,
                        },
                        { accessor: "mata_pelajaran", title: "Mata Pelajaran", sortable: true },
                        { accessor: "singkatan", title: "Singkatan", sortable: true },
                        {
                            accessor: "is_utbk",
                            title: "Ada di UTBK",
                            sortable: true,
                            render: ({ is_utbk }) => (
                                <div className="!w-fit">
                                    <Chip
                                        variant="ghost"
                                        color={is_utbk === true ? "green" : "red"}
                                        size="sm"
                                        value={is_utbk === true ? "Ya" : "Tidak"}
                                        icon={<div className={`mx-auto mt-1 block h-2 w-2 rounded-full content-[''] ${is_utbk === true ? "bg-green-900" : "bg-red-900"}`} />}
                                    />
                                </div>
                            ),
                        },
                        {
                            accessor: "status",
                            title: "Status",
                            sortable: true,
                            render: ({ status }) => (
                                <div className="!w-fit">
                                    <Chip
                                        variant="ghost"
                                        color={status === "Aktif" ? "green" : "red"}
                                        size="sm"
                                        value={status}
                                        icon={<div className={`mx-auto mt-1 block h-2 w-2 rounded-full content-[''] ${status === "Aktif" ? "bg-green-900" : "bg-red-900"}`} />}
                                    />
                                </div>
                            ),
                        },
                    ]}
                    rowContextMenu={{
                        items: (dataMataPelajaran) => {
                            const isAktif = dataMataPelajaran["status"] === "Aktif";

                            return [
                                {
                                    key: "edit",
                                    icon: <BiSolidEditAlt className="h-3 w-3" />,
                                    title: `Ubah ${dataMataPelajaran["mata_pelajaran"]}`,
                                    onClick: () => handleEdit(dataMataPelajaran),
                                },
                                {
                                    key: "active",
                                    icon: isAktif ? <FaXmark className="h-3 w-3" /> : <FaCheck className="h-3 w-3" />,
                                    title: isAktif ? `Non Aktifkan ${dataMataPelajaran["mata_pelajaran"]}` : `Aktifkan ${dataMataPelajaran["mata_pelajaran"]}`,
                                    onClick: isAktif ? () => handleKonfirmasiNonAktif(dataMataPelajaran) : () => handleKonfirmasiAktif(dataMataPelajaran),
                                },
                                {
                                    key: "delete",
                                    icon: <FaTrash className="h-3 w-3" />,
                                    title: `Delete ${dataMataPelajaran["mata_pelajaran"]}`,
                                    onClick: () => handleKonfirmasiDelete(dataMataPelajaran),
                                },
                            ];
                        },
                    }}
                    totalRecords={totalRecords}
                    sortStatus={sortStatus}
                    onSortStatusChange={setSortStatus}
                    recordsPerPage={pageSize}
                    page={page}
                    paginationSize="sm"
                    minHeight={200}
                    onPageChange={(p) => setPage(p)}
                    recordsPerPageOptions={PAGE_SIZES}
                    onRecordsPerPageChange={setPageSize}
                    paginationText={({ from, to, totalRecords }) => `Records ${from} - ${to} of ${totalRecords}`}
                />
            </Box>
            <p className="my-6 border-2 border-dashed border-info p-2 text-info">
                <b className="font-bold">Keterangan: </b>Klik kanan pada table untuk menampilkan menu.
            </p>

            {/* Tambah */}
            <DialogModal size="sm" open={openTambahModal} handler={() => setOpenTambahModal(!openTambahModal)} heightFit={true} title={"Form Tambah Mata Pelajara"}>
                <form action="#">
                    <TextInput label="Mata Pelajaran" placeholder="Mata Pelajaran" withAsterisk onChange={(event) => setMataPelajaran(event.target.value)} />
                    <TextInput className="my-2" label="Singkatan" placeholder="Singkatan" withAsterisk onChange={(event) => setSingkatan(event.target.value)} />
                    <Switch label="Ada Di UTBK" options={optionsAdaDiUtbk} selectedOption={selectedIsUtbk} setSelectedOption={setSelectedIsUtbk} required />

                    <div className="mt-8 flex justify-center gap-x-4">
                        <Button className="bg-success" onClick={() => handleSubmitTambahData()}>
                            Simpan
                        </Button>
                        <Button className="bg-white text-black" onClick={() => setOpenTambahModal(false)}>
                            Tutup
                        </Button>
                    </div>
                </form>
            </DialogModal>

            {/* Ubah */}
            <DialogModal size="sm" open={openEditModal} handler={() => setOpenEditModal(!openEditModal)} heightFit={true} title={"Form Edit Mata Pelajara"}>
                <form action="#">
                    <TextInput label="Mata Pelajaran" placeholder="Mata Pelajaran" value={mataPelajaran} withAsterisk onChange={(event) => setMataPelajaran(event.target.value)} />
                    <TextInput className="my-2" label="Singkatan" placeholder="Singkatan" value={singkatan} withAsterisk onChange={(event) => setSingkatan(event.target.value)} />
                    <Switch label="Ada Di UTBK" options={optionsAdaDiUtbk} selectedOption={selectedIsUtbk} setSelectedOption={setSelectedIsUtbk} required />

                    <div className="mt-8 flex justify-center gap-x-4">
                        <Button className="bg-success" onClick={() => handleEditSubmit()}>
                            Simpan
                        </Button>
                        <Button className="bg-white text-black" onClick={() => setOpenEditModal(false)}>
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
                        <Button className="bg-success" onClick={submitActive}>
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
                        <Button className="bg-success" onClick={submitnonActive}>
                            Ya
                        </Button>
                    </div>
                </DialogBody>
            </Dialog>

            {/* Konfirmasi Hapus */}
            <Dialog
                open={openKonfirmasidelete}
                handler={handleKonfirmasiDelete}
                size="xs"
                dismiss={{
                    escapeKey: false,
                    outsidePress: false,
                }}
                className="bg-white text-black dark:bg-black dark:text-white-light"
            >
                <DialogBody>
                    <FaQuestion className="mx-auto h-auto w-28 text-info" />
                    <p className="mt-4 mb-8 text-center text-black">Apakah Anda yakin untuk menghapus data ini?</p>
                    <div className="mt-8 flex justify-center gap-x-4">
                        <Button className="bg-warning" onClick={handleKonfirmasiDelete}>
                            Tidak
                        </Button>
                        <Button className="bg-success" onClick={submitDelete}>
                            Ya
                        </Button>
                    </div>
                </DialogBody>
            </Dialog>
        </>
    );
};

export default MataPelajaran;
