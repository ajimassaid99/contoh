import DialogModal from "@/components/Modal/Modal";
import { Badge, Box, Group, NumberInput, TextInput } from "@mantine/core";
import { Button, Dialog, DialogBody, DialogHeader } from "@material-tailwind/react";
import { DataTable, DataTableSortStatus } from "mantine-datatable";
import { useEffect, useMemo, useState } from "react";
import { PAGE_SIZES, useStyles, dataPertemuanBab, dataSubPertemuanBab, optionsKurikulum, optionsLayanan, subBabDatas, dataSilabus, optionsPelajaran, dataTambahSilabus } from "@/data/smba/data";
import { sortBy } from "lodash";
import ConfirmationModalTable from "@/components/Modal/ModalConfirmation";
import { BiSolidChevronRight } from "react-icons/bi";
import { FaEye, FaQuestion, FaXmark } from "react-icons/fa6";
import Selects from "@/components/Ui/Selects";
import { BsFillSendFill } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import api from "@/service/api";

const Silabus = () => {
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [page, setPage] = useState(1);
    const [openTambah, setOpenTambah] = useState(false);
    const [openLihat, setOpenLihat] = useState(false);
    const [openUbah, setOpenUbah] = useState(false);
    const [openKirim, setOpenKirim] = useState(false);
    const [openHapus, setOpenHapus] = useState(false);
    const [expandedBabIds, setExpandedBabIds] = useState<string[]>([]);
    const [optionTahunAjaran, setOptionTahunAjaran] = useState<any[]>([]);
    const [optionKelompokUjian, setOptionKelompokUjian] = useState<any[]>([]);
    const [optionTingkatKelas, setOptionTingkatKelas] = useState<any[]>([]);
    const [optionJenisLayanan, setOptionJenisLayanan] = useState<any[]>([]);

    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: "namaKurikulum",
        direction: "asc",
    });
    const sortedRecords = useMemo(() => sortBy(dataSilabus, "namaKurikulum"), []);
    const [records, setRecords] = useState(sortedRecords.slice(0, pageSize));

    const [sortStatusTambahSilabus, setSortStatusTambahSilabus] = useState<DataTableSortStatus>({
        columnAccessor: "namaBab",
        direction: "asc",
    });
    const sortedRecordsTambahSilabus = useMemo(() => sortBy(dataTambahSilabus, "namaBab"), []);
    const [recordsTambahSilabus, setRecordsTambahSilabus] = useState(sortedRecordsTambahSilabus.slice(0, pageSize));

    const [selectedRowData, setSelectedRowData] = useState<any>(null);
    const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
    const [confirmationTitle, setConfirmationTitle] = useState("");
    const [confirmationAction, setConfirmationAction] = useState<"sent" | "delete" | "">("");
    const { cx, classes } = useStyles();

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecords(dataSilabus.slice(from, to));
    }, [page, pageSize]);
    useEffect(() => {
        const data = sortBy(dataSilabus, sortStatus.columnAccessor);
        setRecords(sortStatus.direction === "desc" ? data.reverse() : data);
    }, [sortStatus]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecordsTambahSilabus(dataTambahSilabus.slice(from, to));
    }, [page, pageSize]);
    useEffect(() => {
        const data = sortBy(dataTambahSilabus, sortStatusTambahSilabus.columnAccessor);
        setRecordsTambahSilabus(sortStatusTambahSilabus.direction === "desc" ? data.reverse() : data);
    }, [sortStatusTambahSilabus]);

    const handleTambah = () => {
        setOpenTambah(!openTambah);
    };

    const handleLihat = () => {
        setOpenLihat(!openLihat);
    };

    const handleUbah = () => {
        setOpenUbah(!openUbah);
    };

    const handleKirim = () => {
        setOpenKirim(!openKirim);
    };

    const handleHapus = () => {
        setOpenHapus(!openHapus);
    };

    const getOptionTahunAjaran = async () => {
        try {
            const value = await api.get(`/${process.env.NEXT_PUBLIC_API_VERSION}/${process.env.NEXT_PUBLIC_API_SERVICE_SMBA}/master/tahun-ajaran`);

            let res = value.data.data.map((data: any) => {
                return {
                    label: data.tahun_ajaran,
                    value: data.id,
                };
            });
            setOptionTahunAjaran(res.sort((a: any, b: any) => a?.label?.localeCompare(b.label)));
        } catch (error) {
            console.log(error);
        }
    };

    const getOptionTingkatKelas = async () => {
        try {
            const value = await api.get(`/${process.env.NEXT_PUBLIC_API_VERSION}/${process.env.NEXT_PUBLIC_API_SERVICE_SMBA}/master/tingkat-kelas`);

            let res = value.data.data.map((data: any) => {
                return {
                    label: data.tingkat_kelas,
                    value: data.id,
                };
            });
            setOptionTingkatKelas(res.sort((a: any, b: any) => a?.label?.localeCompare(b.label)));
        } catch (error) {
            console.log(error);
        }
    };

    const getOptionKelompokUjian = async () => {
        try {
            const value = await api.get(`/${process.env.NEXT_PUBLIC_API_VERSION}/${process.env.NEXT_PUBLIC_API_SERVICE_SMBA}/master/tingkat-kelas/kelompok-ujian`);

            let res = value.data.data.map((data: any) => {
                return {
                    label: data.nama_kelompok_ujian,
                    value: data.id,
                };
            });
            setOptionKelompokUjian(res.sort((a: any, b: any) => a?.label?.localeCompare(b.label)));
        } catch (error) {
            console.log(error);
        }
    };

    const getOptionJenisLayanan = async () => {
        try {
            const value = await api.get(`/${process.env.NEXT_PUBLIC_API_VERSION}/${process.env.NEXT_PUBLIC_API_SERVICE_SMBA}/master/jenis-layanan`);

            let res = value.data.data.map((data: any) => {
                return {
                    label: data.jenis_kelas,
                    value: data.id,
                };
            });
            setOptionJenisLayanan(res.sort((a: any, b: any) => a?.label?.localeCompare(b.label)));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getOptionTahunAjaran();
        getOptionKelompokUjian();
        getOptionTingkatKelas();
        getOptionJenisLayanan();
    }, []);

    return (
        <>
            <div className="flex flex-wrap items-end gap-x-4">
                <Selects label="Tahun Ajaran" data={optionTahunAjaran} withAsterisk required />
                <Selects label="Layanan" data={optionJenisLayanan} withAsterisk required />
                <Selects label="Kurikulum" data={optionsKurikulum} withAsterisk required />
                <Selects label="Kelompok Ujian" data={optionKelompokUjian} withAsterisk required />
                <Selects label="Tingkat Kelas" data={optionTingkatKelas} withAsterisk required />
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
                            render: (number) => dataSilabus.indexOf(number) + 1,
                        },
                        { accessor: "namaSilabus", title: "Nama Silabus", width: "20%", sortable: true },
                        { accessor: "kurikulum", title: "Kurikulum", sortable: true },
                        { accessor: "tingkatKelas", title: "Tingkat Kelas", sortable: true },
                        { accessor: "jenisLayanan", title: "Jenis Layanan", sortable: true },
                        { accessor: "kelompokUjian", title: "Kelompok Ujian", sortable: true },
                        { accessor: "jumlahPertemuan", title: "Jumlah Pertemuan", sortable: true },
                        { accessor: "jumlahEntri", title: "Jumlah Entri", sortable: true },
                        {
                            accessor: "status",
                            title: "Status Menu",
                            sortable: true,
                            render: ({ status }) => (
                                <Badge className={`${status === "Sent" ? "bg-success" : "bg-info"} text-white`} size="md">
                                    {status === "Sent" ? "Sent" : "Create"}
                                </Badge>
                            ),
                        },
                    ]}
                    rowContextMenu={{
                        items: (record) => [
                            {
                                key: "see",
                                icon: <FaEye className="h-3 w-3" />,
                                title: `Lihat  ${record.namaSilabus}`,
                                onClick: () => handleLihat(),
                            },
                            {
                                key: "sent",
                                icon: <BsFillSendFill className="h-3 w-3" />,
                                title: `Kirim ${record.namaSilabus}`,
                                onClick: () => handleKirim(),
                            },
                            {
                                key: "delete",
                                icon: <FaXmark className="h-3 w-3" />,
                                title: `Hapus ${record.namaSilabus}`,
                                onClick: () => handleHapus(),
                            },
                        ],
                    }}
                    totalRecords={dataSilabus.length}
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
            <DialogModal size="lg" open={openTambah} handler={handleTambah} heightFit={false} title="Form Tambah Silabus">
                <form action="#">
                    <div className="grid grid-cols-2 grid-rows-4 gap-4">
                        <TextInput label="Nama Silabus" placeholder="Nama Silabus" withAsterisk required />
                        <Selects label="Layanan" data={optionsLayanan} required />
                        <TextInput label="Tahun Ajaran" placeholder="Tahun Ajaran" />
                        <TextInput label="Kelompok Ujian" placeholder="Kelompok Ujian" />
                        <TextInput label="Kurikulum" placeholder="Kurikulum" />
                        <div className="flex items-center gap-x-4">
                            <NumberInput label="Jumlah Pertemuan" value={1} min={0} withAsterisk required />
                            <NumberInput label="Semester" min={0} value={1} withAsterisk required />
                        </div>
                        <TextInput label="Tingkat Kelas" placeholder="Tingkat Kelas" />
                        <Selects label="Mata Pelajaran" data={optionsPelajaran} required />
                    </div>

                    <hr className="my-4 border border-gray-200" />

                    <div className="flex items-center justify-between">
                        <p className="border-2 border-dashed border-info p-2 text-info">
                            <b className="font-bold">Keterangan: </b>Cara Mengentri {"->"} Tekan, Geser & Lepas salah satu Bab ke area salah satu Pertemuan.
                        </p>
                        <div className="flex justify-center gap-x-4">
                            <Button className="bg-success" onClick={handleTambah}>
                                Simpan
                            </Button>
                            <Button className="bg-white text-black" onClick={handleTambah}>
                                Tutup
                            </Button>
                        </div>
                    </div>
                </form>

                <div className="mt-8 flex gap-x-4">
                    <div className="w-1/2">
                        <Box sx={{ height: recordsTambahSilabus.length > 10 ? 750 : "auto" }}>
                            <DataTable
                                withColumnBorders
                                highlightOnHover
                                shadow="sm"
                                records={recordsTambahSilabus}
                                columns={[
                                    {
                                        accessor: "number",
                                        title: "No",
                                        sortable: true,
                                        width: 75,
                                        render: (number) => dataTambahSilabus.indexOf(number) + 1,
                                    },
                                    { accessor: "namaBab", title: "Nama Bab", sortable: true },
                                ]}
                                totalRecords={dataTambahSilabus.length}
                                sortStatus={sortStatusTambahSilabus}
                                onSortStatusChange={setSortStatusTambahSilabus}
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
                    <div className="w-1/2 border border-black p-2">
                        <label htmlFor="pertemuan" className="mb-2 ">
                            Pertemuan 0 <sup className="text-danger">*</sup>
                        </label>
                        <div className="h-20 w-full border border-black"></div>
                    </div>
                </div>
            </DialogModal>

            {/* Lihat */}
            <Dialog size="md" open={openLihat} handler={handleLihat} className="bg-white text-black dark:bg-black dark:text-white-light">
                <DialogHeader className="flex items-center justify-between dark:text-white-light">
                    <h2 className="text-xl">Preview Silabus</h2>
                    <IoMdClose onClick={handleLihat} className="h-8 w-8 cursor-pointer rounded-full p-1 shadow-md" />
                </DialogHeader>
                <DialogBody>
                    <div className="no-scrollbar h-[60vh] overflow-y-scroll rounded-xl bg-white p-4 text-sm text-black shadow-md dark:bg-black dark:text-white-light">
                        <form action="#">
                            <div className="mb-4 grid grid-cols-2 gap-x-6 gap-y-2">
                                <TextInput label="Kurikulum" placeholder="Kurikulum" />
                                <TextInput label="Layanan" placeholder="Layanan" />
                                <TextInput label="Tingkat Kelas" placeholder="Tingkat Kelas" />
                                <TextInput label="Kelompok Ujian" placeholder="Kelompok Ujian" />
                                <TextInput label="Jumlah Pertemuan" placeholder="Jumlah Pertemuan" />
                                <TextInput label="Jumlah Entri" placeholder="Jumlah Entri" />
                            </div>
                            <div className="mt-2 flex gap-x-2">
                                <Button className="bg-info" onClick={() => {}}>
                                    Cetak
                                </Button>
                                <Button
                                    className="bg-warning"
                                    onClick={() => {
                                        setOpenLihat(false);
                                        setOpenUbah(true);
                                    }}
                                >
                                    Ubah
                                </Button>
                            </div>
                        </form>
                        <Box sx={{ height: dataPertemuanBab.length > 10 ? 700 : "auto" }} className="mt-4">
                            <DataTable
                                withBorder
                                withColumnBorders
                                columns={[
                                    {
                                        accessor: "pertemuan",
                                        title: "Pertemuan",
                                        render: ({ id, pertemuan }: any) => {
                                            const isRelated = dataSubPertemuanBab && dataSubPertemuanBab.some((subData: any) => subData.babId === id);

                                            if (isRelated) {
                                                return (
                                                    <Group spacing="xs">
                                                        <BiSolidChevronRight
                                                            className={cx(classes.expandIcon, {
                                                                [classes.expandIconRotated]: expandedBabIds.includes(id),
                                                            })}
                                                        />
                                                        <p>{pertemuan}</p>
                                                    </Group>
                                                );
                                            } else {
                                                return <p className="ml-[1.65rem] cursor-text">{pertemuan}</p>;
                                            }
                                        },
                                    },
                                ]}
                                records={dataPertemuanBab}
                                rowExpansion={{
                                    allowMultiple: true,
                                    expanded: {
                                        recordIds: expandedBabIds,
                                        onRecordIdsChange: setExpandedBabIds,
                                    },
                                    content: (subBab) => (
                                        <DataTable
                                            noHeader
                                            withBorder
                                            columns={[
                                                {
                                                    accessor: "namaBab",
                                                    title: "Nama Bab",
                                                },
                                            ]}
                                            records={dataSubPertemuanBab.filter((subDatas: any) => subDatas.babId === subBab.record.id)}
                                        />
                                    ),
                                }}
                                sortStatus={sortStatus}
                                onSortStatusChange={setSortStatus}
                                totalRecords={subBabDatas.length}
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
                </DialogBody>
            </Dialog>

            {/* Ubah */}
            <Dialog
                size="lg"
                open={openUbah}
                handler={() => {
                    setOpenLihat(false);
                    setOpenUbah(true);
                }}
                className="bg-white text-black dark:bg-black dark:text-white-light"
            >
                <DialogHeader className="flex items-center justify-between dark:text-white-light">
                    <h2 className="text-xl">Form Ubah Silabus</h2>
                    <IoMdClose
                        onClick={() => {
                            setOpenUbah(false);
                            setOpenLihat(true);
                        }}
                        className="h-8 w-8 cursor-pointer rounded-full p-1 shadow-md"
                    />
                </DialogHeader>
                <DialogBody>
                    <div className="no-scrollbar h-[60vh] overflow-y-scroll rounded-xl bg-white p-4 text-sm text-black shadow-md dark:bg-black dark:text-white-light">
                        <form action="#">
                            <div className="grid grid-cols-2 grid-rows-4 gap-4">
                                <TextInput label="Nama Silabus" placeholder="Nama Silabus" withAsterisk required />
                                <Selects label="Layanan" data={optionsLayanan} required />
                                <TextInput label="Tahun Ajaran" placeholder="Tahun Ajaran" />
                                <TextInput label="Kelompok Ujian" placeholder="Kelompok Ujian" />
                                <TextInput label="Kurikulum" placeholder="Kurikulum" />
                                <div className="flex items-center gap-x-4">
                                    <NumberInput label="Jumlah Pertemuan" value={1} min={0} withAsterisk required />
                                    <NumberInput label="Semester" min={0} value={1} withAsterisk required />
                                </div>
                                <TextInput label="Tingkat Kelas" placeholder="Tingkat Kelas" />
                                <Selects label="Mata Pelajaran" data={optionsPelajaran} required />
                            </div>

                            <hr className="my-4 border border-gray-200" />

                            <div className="flex items-center justify-between">
                                <p className="border-2 border-dashed border-info p-2 text-info">
                                    <b className="font-bold">Keterangan: </b>Cara Mengentri {"->"} Tekan, Geser & Lepas salah satu Bab ke area salah satu Pertemuan.
                                </p>
                                <div className="flex justify-center gap-x-4">
                                    <Button className="bg-success" onClick={() => setOpenUbah(false)}>
                                        Simpan
                                    </Button>
                                    <Button className="bg-white text-black" onClick={() => setOpenUbah(false)}>
                                        Tutup
                                    </Button>
                                </div>
                            </div>
                        </form>

                        <div className="mt-8 flex gap-x-4">
                            <div className="w-1/2">
                                <Box sx={{ height: recordsTambahSilabus.length > 10 ? 750 : "auto" }}>
                                    <DataTable
                                        withColumnBorders
                                        highlightOnHover
                                        shadow="sm"
                                        records={recordsTambahSilabus}
                                        columns={[
                                            {
                                                accessor: "number",
                                                title: "No",
                                                sortable: true,
                                                width: 75,
                                                render: (number) => dataTambahSilabus.indexOf(number) + 1,
                                            },
                                            { accessor: "namaBab", title: "Nama Bab", sortable: true },
                                        ]}
                                        totalRecords={dataTambahSilabus.length}
                                        sortStatus={sortStatusTambahSilabus}
                                        onSortStatusChange={setSortStatusTambahSilabus}
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
                            <div className="w-1/2 border border-black p-2">
                                <label htmlFor="pertemuan" className="mb-2 ">
                                    Pertemuan 0 <sup className="text-danger">*</sup>
                                </label>
                                <div className="h-20 w-full border border-black"></div>
                            </div>
                        </div>
                    </div>
                </DialogBody>
            </Dialog>

            {/* Konfirmasi Kirim */}
            <Dialog
                open={openKirim}
                handler={handleKirim}
                size="xs"
                dismiss={{
                    escapeKey: false,
                    outsidePress: false,
                }}
                className="bg-white text-black dark:bg-black dark:text-white-light"
            >
                <DialogBody>
                    <FaQuestion className="mx-auto h-auto w-28 text-info" />
                    <p className="mt-4 mb-8 text-center text-black">
                        Setelah anda mengirim Silabus ini, maka Silabus tidak akan bisa di edit lagi dan silabus siap di pakai sebagai Acuan BAH kelas-kelas yang sudah Running. Apakah anda yakin?
                    </p>
                    <div className="mt-8 flex justify-center gap-x-4">
                        <Button className="bg-warning" onClick={handleKirim}>
                            Tidak
                        </Button>
                        <Button className="bg-success" onClick={handleKirim}>
                            Ya
                        </Button>
                    </div>
                </DialogBody>
            </Dialog>

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
                    <p className="mt-4 mb-8 text-center text-black">Apakah Anda Yakin Akan Menghapus Silabus Ini?</p>
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

export default Silabus;
