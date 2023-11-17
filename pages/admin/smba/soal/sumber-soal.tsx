import DialogModal from "@/components/Modal/Modal";
import { Badge, Box, NumberInput, TextInput } from "@mantine/core";
import { Button, Dialog, DialogHeader, DialogBody } from "@material-tailwind/react";
import { DataTable, DataTableSortStatus } from "mantine-datatable";
import { useEffect, useMemo, useState } from "react";
import { PAGE_SIZES, dataSumberSoal, dataSumberSoalDetail, optionsJenisInstitusi, optionsJenisSumber, optionsPtn, optionsSemester, optionsTahun, optionsTingkatKelas } from "@/data/smba/data";
import { sortBy } from "lodash";
import { BiSolidEditAlt } from "react-icons/bi";
import { FaCheck, FaList, FaQuestion, FaXmark } from "react-icons/fa6";
import Selects from "@/components/Ui/Selects";
import { IoMdClose } from "react-icons/io";
import { optionsAsalSekolah, optionsKota, optionsProvinsi } from "@/components/go-kasir/data";

const SumberSoal = () => {
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [page, setPage] = useState(1);
    const [openTambah, setOpenTambah] = useState(false);
    const [openUbah, setOpenUbah] = useState(false);
    const [openKonfirmasiAktif, setOpenKonfirmasiAktif] = useState(false);
    const [openKonfirmasiNonAktif, setOpenKonfirmasiNonAktif] = useState(false);
    const [openIsiKodeSumber, setOpenIsiKodeSumber] = useState(false);
    const [openUbahKodeSumber, setOpenUbahKodeSumber] = useState(false);
    const [openTambahKodeSumber, setOpenTambahKodeSumber] = useState(false);

    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: "namaSumber",
        direction: "asc",
    });
    const sortedRecords = useMemo(() => sortBy(dataSumberSoal, "namaSumber"), []);
    const [records, setRecords] = useState(sortedRecords.slice(0, pageSize));

    const [sortStatusDetail, setSortStatusDetail] = useState<DataTableSortStatus>({
        columnAccessor: "tingkatKelas",
        direction: "asc",
    });
    const sortedRecordsDetail = useMemo(() => sortBy(dataSumberSoalDetail, "tingkatKelas"), []);
    const [recordsDetail, setRecordsDetail] = useState(sortedRecordsDetail.slice(0, pageSize));

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecords(dataSumberSoal.slice(from, to));
    }, [page, pageSize]);
    useEffect(() => {
        const data = sortBy(dataSumberSoal, sortStatus.columnAccessor);
        setRecords(sortStatus.direction === "desc" ? data.reverse() : data);
    }, [sortStatus]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecordsDetail(dataSumberSoalDetail.slice(from, to));
    }, [page, pageSize]);
    useEffect(() => {
        const data = sortBy(dataSumberSoalDetail, sortStatusDetail.columnAccessor);
        setRecordsDetail(sortStatusDetail.direction === "desc" ? data.reverse() : data);
    }, [sortStatusDetail]);

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

    const handleIsiKodeSumber = () => {
        setOpenIsiKodeSumber(!openIsiKodeSumber);
    };

    const handleUbahKodeSumber = () => {
        setOpenIsiKodeSumber(false);
        setOpenUbahKodeSumber(true);
    };

    const handleTambahKodeSumber = () => {
        setOpenIsiKodeSumber(false);
        setOpenTambahKodeSumber(true);
    };

    return (
        <>
            <div className="flex items-end gap-x-4">
                <TextInput className="w-1/4" label="Kata Kunci" placeholder="Pencarian berdasarkan nama sumber" />
                <Button className="max-w-max bg-info" onClick={() => {}}>
                    Tampilkan Semua
                </Button>
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
                            render: (number) => dataSumberSoal.indexOf(number) + 1,
                        },
                        { accessor: "namaSumber", title: "Nama Sumber", width: "60%", sortable: true },
                        { accessor: "jenis", title: "Jenis", width: "15%", sortable: true },
                        { accessor: "totalDetail", title: "Total Detail", sortable: true },
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
                                title: `Ubah ${record.namaSumber}`,
                                onClick: () => handleUbah(),
                            },
                            {
                                key: "active",
                                icon: <FaCheck className="h-3 w-3" />,
                                title: `Aktifkan ${record.namaSumber}`,
                                onClick: () => handleKonfirmasiAktif(),
                            },
                            {
                                key: "nonactive",
                                icon: <FaXmark className="h-3 w-3" />,
                                title: `Non Aktifkan ${record.namaSumber}`,
                                onClick: () => handleKonfirmasiNonAktif(),
                            },
                            {
                                key: "fill",
                                icon: <FaList className="h-3 w-3" />,
                                title: `Isi Kode Sumber ${record.namaSumber}`,
                                onClick: () => handleIsiKodeSumber(),
                            },
                        ],
                    }}
                    totalRecords={dataSumberSoal.length}
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
            <DialogModal size="xs" open={openTambah} handler={handleTambah} heightFit={true} title="Form Tambah Sumber Soal">
                <form action="#">
                    <Selects label="Jenis Sumber" data={optionsJenisSumber} withAsterisk={false} />
                    <TextInput className="mt-2" label="Nama Sumber" placeholder="Nama Sumber" />

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

            {/* Ubah */}
            <DialogModal size="xs" open={openUbah} handler={handleUbah} heightFit={true} title="Form Ubah Sumber Soal">
                <form action="#">
                    <Selects label="Jenis Sumber" data={optionsJenisSumber} withAsterisk={false} />
                    <TextInput className="mt-2" label="Nama Sumber" placeholder="Nama Sumber" />

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

            {/* Isi Kode Sumber */}
            <DialogModal size="xl" open={openIsiKodeSumber} handler={handleIsiKodeSumber} heightFit={true} title={"Form Sumber Soal Detail"}>
                <Box sx={{ height: recordsDetail.length > 10 ? 750 : "auto" }} className="mt-4">
                    <DataTable
                        withColumnBorders
                        highlightOnHover
                        shadow="sm"
                        records={recordsDetail}
                        columns={[
                            {
                                accessor: "number",
                                title: "No",
                                sortable: true,
                                width: 75,
                                render: (number) => dataSumberSoalDetail.indexOf(number) + 1,
                            },
                            { accessor: "smt", title: "SMT", sortable: true },
                            { accessor: "kodeSoal", title: "Kode Soal", sortable: true },
                            { accessor: "tahun", title: "Tahun", sortable: true },
                            { accessor: "tingkatKelas", title: "Tingkat Kelas", sortable: true },
                            { accessor: "jenisInstitusi", title: "Jenis Institusi", sortable: true },
                            { accessor: "provinsi", title: "Provinsi", sortable: true },
                            { accessor: "kota", title: "Kota", sortable: true },
                            { accessor: "institusi", title: "Institusi", sortable: true },
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
                                    title: `Ubah ${record.tingkatKelas}`,
                                    onClick: () => handleUbahKodeSumber(),
                                },
                                {
                                    key: "active",
                                    icon: <FaCheck className="h-3 w-3" />,
                                    title: `Aktifkan ${record.tingkatKelas}`,
                                    onClick: () => handleKonfirmasiAktif(),
                                },
                                {
                                    key: "nonactive",
                                    icon: <FaXmark className="h-3 w-3" />,
                                    title: `Non Aktifkan ${record.tingkatKelas}`,
                                    onClick: () => handleKonfirmasiNonAktif(),
                                },
                            ],
                        }}
                        totalRecords={dataSumberSoal.length}
                        sortStatus={sortStatusDetail}
                        onSortStatusChange={setSortStatusDetail}
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
                <div className="mt-8 flex justify-center gap-x-4">
                    <Button className="bg-success" onClick={handleTambahKodeSumber}>
                        Tambah
                    </Button>
                    <Button className="bg-white text-black" onClick={() => setOpenIsiKodeSumber(false)}>
                        Tutup
                    </Button>
                </div>
            </DialogModal>

            {/* Ubah Isi Kode Sumber */}
            <Dialog
                open={openUbahKodeSumber}
                size="md"
                handler={handleUbahKodeSumber}
                dismiss={{
                    escapeKey: false,
                    outsidePress: false,
                }}
                className="bg-white text-black dark:bg-black dark:text-white-light"
            >
                <DialogHeader className="flex items-center justify-between dark:text-white-light">
                    <p className="text-md">Form Ubah Sumber Soal Detail</p>
                    <IoMdClose
                        onClick={() => {
                            setOpenUbahKodeSumber(false);
                            setOpenIsiKodeSumber(true);
                        }}
                        className="h-8 w-8 cursor-pointer rounded-full p-1 shadow-md"
                    />
                </DialogHeader>

                <DialogBody divider className="relative border-none">
                    <div className="no-scrollbar !h-fit overflow-y-scroll rounded-xl bg-white p-4 text-sm text-black shadow-md dark:bg-black dark:text-white-light">
                        <form action="#">
                            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                                <Selects label="Tahun" data={optionsTahun} />
                                <Selects label="Jenis Institusi" data={optionsJenisInstitusi} />
                                <NumberInput label="Kode Soal" placeholder="Kode Soal" withAsterisk />
                                <Selects label="Provinsi" data={optionsProvinsi} />
                                <Selects label="Tingkat Kelas" data={optionsTingkatKelas} />
                                <Selects label="Kota/Kabupaten" data={optionsKota} />
                                <Selects label="Semester" data={optionsSemester} />
                                <Selects label="Sekolah" data={optionsAsalSekolah} />
                                <Selects label="PTN" data={optionsPtn} />
                            </div>

                            <div className="mt-8 flex justify-center gap-x-4">
                                <Button
                                    className="bg-success"
                                    onClick={() => {
                                        setOpenUbahKodeSumber(false);
                                        setOpenIsiKodeSumber(true);
                                    }}
                                >
                                    Simpan
                                </Button>
                                <Button
                                    className="bg-white text-black"
                                    onClick={() => {
                                        setOpenUbahKodeSumber(false);
                                        setOpenIsiKodeSumber(true);
                                    }}
                                >
                                    Tutup
                                </Button>
                            </div>
                        </form>
                    </div>
                </DialogBody>
            </Dialog>

            {/* Tambah Isi Kode Sumber */}
            <Dialog
                open={openTambahKodeSumber}
                size="md"
                handler={handleTambahKodeSumber}
                dismiss={{
                    escapeKey: false,
                    outsidePress: false,
                }}
                className="bg-white text-black dark:bg-black dark:text-white-light"
            >
                <DialogHeader className="flex items-center justify-between dark:text-white-light">
                    <p className="text-md">Form Tambah Sumber Soal Detail</p>
                    <IoMdClose
                        onClick={() => {
                            setOpenTambahKodeSumber(false);
                            setOpenIsiKodeSumber(true);
                        }}
                        className="h-8 w-8 cursor-pointer rounded-full p-1 shadow-md"
                    />
                </DialogHeader>

                <DialogBody divider className="relative border-none">
                    <div className="no-scrollbar !h-fit overflow-y-scroll rounded-xl bg-white p-4 text-sm text-black shadow-md dark:bg-black dark:text-white-light">
                        <form action="#">
                            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                                <Selects label="Tahun" data={optionsTahun} />
                                <Selects label="Jenis Institusi" data={optionsJenisInstitusi} />
                                <NumberInput label="Kode Soal" placeholder="Kode Soal" withAsterisk />
                                <Selects label="Provinsi" data={optionsProvinsi} />
                                <Selects label="Tingkat Kelas" data={optionsTingkatKelas} />
                                <Selects label="Kota/Kabupaten" data={optionsKota} />
                                <Selects label="Semester" data={optionsSemester} />
                                <Selects label="Sekolah" data={optionsAsalSekolah} />
                                <Selects label="PTN" data={optionsPtn} />
                            </div>

                            <div className="mt-8 flex justify-center gap-x-4">
                                <Button
                                    className="bg-success"
                                    onClick={() => {
                                        setOpenTambahKodeSumber(false);
                                        setOpenIsiKodeSumber(true);
                                    }}
                                >
                                    Simpan
                                </Button>
                                <Button
                                    className="bg-white text-black"
                                    onClick={() => {
                                        setOpenTambahKodeSumber(false);
                                        setOpenIsiKodeSumber(true);
                                    }}
                                >
                                    Tutup
                                </Button>
                            </div>
                        </form>
                    </div>
                </DialogBody>
            </Dialog>

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

export default SumberSoal;
