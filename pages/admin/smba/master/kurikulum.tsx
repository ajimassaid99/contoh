import DialogModal from "@/components/Modal/Modal";
import { Badge, Box, TextInput } from "@mantine/core";
import { Button, Dialog, DialogBody } from "@material-tailwind/react";
import { DataTable, DataTableSortStatus } from "mantine-datatable";
import { useEffect, useState } from "react";
import { PAGE_SIZES } from "@/data/smba/data";
import { BiSolidEditAlt } from "react-icons/bi";
import { FaCheck, FaQuestion, FaTrash, FaXmark } from "react-icons/fa6";
import Switch from "@/components/Ui/Switch";
import { BiAddToQueue } from "react-icons/bi";

import Swal from "sweetalert2";
import api from "@/service/api";
import InputDate from "@/components/Ui/InputDate";

const Kurikulum = () => {
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [page, setPage] = useState(1);
    const [openTambahModal, setOpenTambahModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [dataMataPelajaran, setDataMataPelajaran] = useState([]);
    const [totalRecords, setTotalRecords] = useState(0);
    const [isRefresh, setIsRefresh] = useState(false);
    const [openKonfirmasiAktif, setOpenKonfirmasiAktif] = useState(false);
    const [openKonfirmasiNonAktif, setOpenKonfirmasiNonAktif] = useState(false);
    const [openKonfirmasidelete, setOpenKonfirmasiDelete] = useState(false);
    const [payloadTambah, setPayloadTambah] = useState<any>();
    const [payloadEdit, setPayloadEdit] = useState<any>();

    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: "created_at",
        direction: "desc",
    });

    const [selectedRowData, setSelectedRowData] = useState<any>(null);

    const fetchData = async () => {
        console.log(sortStatus.direction);
        try {
            const response = await api.get(
                `/${process.env.NEXT_PUBLIC_API_VERSION}/${process.env.NEXT_PUBLIC_API_SERVICE_SMBA}/master/kurikulum?sort=${sortStatus.direction}&order_by=${sortStatus.columnAccessor}&page=${page}&per_page=${pageSize}`
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
        console.log(payloadTambah, "asd");
        try {
            await api.post(`/${process.env.NEXT_PUBLIC_API_VERSION}/${process.env.NEXT_PUBLIC_API_SERVICE_SMBA}/master/kurikulum`, payloadTambah);
            notifSucces("Kurikulum Berhasil Di simpan");
            setOpenTambahModal(!openTambahModal);
            setIsRefresh(!isRefresh);
        } catch (error) {
            console.error("Error adding data:", error);
            setOpenTambahModal(!openTambahModal);
            notifError(`GAGAL Menyimpan data`);
        }
    };

    const handleEdit = (rowData: any) => {
        setPayloadEdit(rowData);
        setOpenEditModal(true);
    };

    const handleEditSubmit = async () => {
        try {
            await api.patch(`/${process.env.NEXT_PUBLIC_API_VERSION}/${process.env.NEXT_PUBLIC_API_SERVICE_SMBA}/master/kurikulum/${payloadEdit.id}`, payloadEdit);
            notifSucces("Kurikulum Berhasil Di Ubah");
            setOpenEditModal(false);
            setIsRefresh(!isRefresh);
        } catch (error) {
            console.error("Error adding data:", error);

            setOpenEditModal(false);
            notifError("gagal merubah Kurikulum");
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

            await api.patch(`/${process.env.NEXT_PUBLIC_API_VERSION}/${process.env.NEXT_PUBLIC_API_SERVICE_SMBA}/master/kurikulum/${selectedRowData["id"]}`, updatedRowData);
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

            await api.patch(`/${process.env.NEXT_PUBLIC_API_VERSION}/${process.env.NEXT_PUBLIC_API_SERVICE_SMBA}/master/kurikulum/${selectedRowData["id"]}`, updatedRowData);
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
            await api.delete(`${process.env.NEXT_PUBLIC_API_VERSION}/${process.env.NEXT_PUBLIC_API_SERVICE_SMBA}/master/kurikulum/${selectedRowData["id"]}`);

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

    const getValueInputDateTglAwal = (date) => {
        setPayloadTambah({ ...payloadTambah, tanggal_awal: date });
    };

    const getValueInputDateTglAkhir = (date) => {
        setPayloadTambah({ ...payloadTambah, tanggal_akhir: date });
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
                        { accessor: "nama_kurikulum", title: "Nama Kurikulum", sortable: true },
                        { accessor: "singkatan", title: "Singkatan", sortable: true },
                        { accessor: "tahun_terbit", title: "Tahun Terbit", sortable: true },
                        { accessor: "tanggal_awal", title: "Tahun Awal", sortable: true },
                        { accessor: "tanggal_akhir", title: "Tahun Akhir", sortable: true },
                        {
                            accessor: "status",
                            title: "Status",
                            sortable: true,
                            render: ({ status }) => (
                                <Badge className={`${status === "Aktif" ? "bg-success" : "bg-danger"} text-white `} size="md">
                                    {status}
                                </Badge>
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
                                    title: `Ubah ${dataMataPelajaran["nama_kurikulum"]}`,
                                    onClick: () => handleEdit(dataMataPelajaran),
                                },
                                {
                                    key: "active",
                                    icon: isAktif ? <FaXmark className="h-3 w-3" /> : <FaCheck className="h-3 w-3" />,
                                    title: isAktif ? `Non Aktifkan ${dataMataPelajaran["nama_kurikulum"]}` : `Aktifkan ${dataMataPelajaran["nama_kurikulum"]}`,
                                    onClick: isAktif ? () => handleKonfirmasiNonAktif(dataMataPelajaran) : () => handleKonfirmasiAktif(dataMataPelajaran),
                                },
                                {
                                    key: "delete",
                                    icon: <FaTrash className="h-3 w-3" />,
                                    title: `Delete ${dataMataPelajaran["nama_kurikulum"]}`,
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
                    onPageChange={(p) => setPage(p)}
                    minHeight={200}
                    recordsPerPageOptions={PAGE_SIZES}
                    onRecordsPerPageChange={setPageSize}
                    paginationText={({ from, to, totalRecords }) => `Records ${from} - ${to} of ${totalRecords}`}
                />
            </Box>
            <p className="my-6 border-2 border-dashed border-info p-2 text-info">
                <b className="font-bold">Keterangan: </b>Klik kanan pada table untuk menampilkan menu.
            </p>

            {/* Tambah */}
            <DialogModal size="sm" open={openTambahModal} handler={() => setOpenTambahModal(!openTambahModal)} heightFit={true} title={"Form Tambah Role"}>
                <form action="#">
                    <TextInput
                        label="Nama Kurikulum"
                        placeholder="Nama Kurikulum"
                        onChange={({ target }) => setPayloadTambah({ ...payloadTambah, nama_kurikulum: target.value })}
                        withAsterisk
                        required
                    />
                    <TextInput
                        className="my-2"
                        label="Singkatan"
                        placeholder="Singkatan"
                        onChange={({ target }) => setPayloadTambah({ ...payloadTambah, singkatan: target.value })}
                        withAsterisk
                        required
                    />
                    <TextInput label="Tahun Terbit" placeholder="Tahun Terbit" onChange={({ target }) => setPayloadTambah({ ...payloadTambah, tahun_terbit: target.value })} withAsterisk required />
                    <InputDate className="my-2" label="Tanggal Awal" onValueDate={getValueInputDateTglAwal} required />
                    <InputDate label="Tanggal Akhir" onValueDate={getValueInputDateTglAkhir} required />

                    {/* <TextInput label="Mata Pelajaran" placeholder="Mata Pelajaran" withAsterisk onChange={(event) => setMataPelajaran(event.target.value)} />
                    <TextInput className="my-2" label="Singkatan" placeholder="Singkatan" withAsterisk onChange={(event) => setSingkatan(event.target.value)} />
                    <Switch label="Ada Di UTBK" options={optionsAdaDiUtbk} selectedOption={selectedIsUtbk} setSelectedOption={setSelectedIsUtbk} required /> */}

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
            <DialogModal size="sm" open={openEditModal} handler={() => setOpenEditModal(!openEditModal)} heightFit={true} title={"Form Edit Role"}>
                <form action="#">
                    <TextInput
                        label="Nama Kurikulum"
                        placeholder="Nama Kurikulum"
                        value={payloadEdit?.nama_kurikulum}
                        onChange={({ target }) => setPayloadEdit({ ...payloadEdit, nama_kurikulum: target.value })}
                        withAsterisk
                        required
                    />
                    <TextInput
                        className="my-2"
                        label="Singkatan"
                        placeholder="Singkatan"
                        value={payloadEdit?.singkatan}
                        onChange={({ target }) => setPayloadEdit({ ...payloadEdit, singkatan: target.value })}
                        withAsterisk
                        required
                    />
                    <TextInput
                        label="Tahun Terbit"
                        placeholder="Tahun Terbit"
                        value={payloadEdit?.tahun_terbit}
                        onChange={({ target }) => setPayloadEdit({ ...payloadEdit, tahun_terbit: target.value })}
                        withAsterisk
                        required
                    />
                    <InputDate className="my-2" label="Tanggal Awal" valueDate={payloadEdit?.tanggal_awal} required />
                    <InputDate label="Tanggal Akhir" valueDate={payloadEdit?.tanggal_akhir} required />

                    {/* <TextInput label="Mata Pelajaran" placeholder="Mata Pelajaran" value={mataPelajaran} withAsterisk onChange={(event) => setMataPelajaran(event.target.value)} />
                    <TextInput className="my-2" label="Singkatan" placeholder="Singkatan" value={singkatan} withAsterisk onChange={(event) => setSingkatan(event.target.value)} />
                    <Switch label="Ada Di UTBK" options={optionsAdaDiUtbk} selectedOption={selectedIsUtbk} setSelectedOption={setSelectedIsUtbk} required /> */}

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

export default Kurikulum;
