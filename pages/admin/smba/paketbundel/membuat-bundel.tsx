import DialogModal from "@/components/Modal/Modal";
import { Badge, Box, NumberInput, TextInput, Textarea } from "@mantine/core";
import { Button, Dialog, DialogHeader, DialogBody, Chip, DialogFooter } from "@material-tailwind/react";
import { DataTable, DataTableSortStatus } from "mantine-datatable";
import { useEffect, useMemo, useState } from "react";
import {
    PAGE_SIZES,
    dataBundelSoal,
    dataBundelSoalSubBab,
    dataBundelSoalSubBabDetail,
    optionsTingkatKelas,
    optionsTahunAjaran,
    optionsBab,
    dataDetailBundelSoal,
    optionsKelompokUjian,
    optionsOpsi,
    optionsUrutBerdasarkan,
} from "@/data/smba/data";
import { sortBy } from "lodash";
import { BiSolidEditAlt } from "react-icons/bi";
import { FaCheck, FaCopy, FaEye, FaPlus, FaQuestion, FaTrash } from "react-icons/fa6";
import Selects from "@/components/Ui/Selects";
import Switch from "@/components/Ui/Switch";
import Link from "next/link";
import { IoMdClose } from "react-icons/io";

const listJawaban = [
    {
        abjad: "A",
        content: "Saat ini, sistim komputer sedang ada gangguan sdbjkbadksbkasdk sd shadbsd asd sbdasdkbaskd asd sdk dsjabdas dbad asd asn.",
        value: 0,
    },
    {
        abjad: "B",
        content: "Masalahnya sudah sangat komplik.",
        value: 0,
    },
    {
        abjad: "C",
        content: "Ia membeli aksesori anting.",
        value: 100,
    },
    {
        abjad: "D",
        content: "Peneliti sudah menganalisa fenomena tersebut.",
        value: 0,
    },
];

const MembuatBundel = () => {
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [page, setPage] = useState(1);

    const [openTambah, setOpenTambah] = useState(false);

    const [openUbah, setOpenUbah] = useState(false);
    const [openHapus, setOpenHapus] = useState(false);

    const [openTambahSoal, setOpenTambahSoal] = useState(false);
    const [openLihatSoalDiTambahSoal, setOpenLihatSoalDiTambahSoal] = useState(false);
    const [openLihatDetailSoalDiTambahSoal, setOpenLihatDetailSoalDiTambahSoal] = useState(false);
    const [openLihatGunakanSoalDiTambahSoal, setOpenLihatGunakanSoalDiTambahSoal] = useState(false);

    const [openSalin, setOpenSalin] = useState(false);

    const [openEntri, setOpenEntri] = useState(false);
    // modal klik kanan > entri
    const [openDetailSoalDiEntri, setOpenDetailSoalDiEntri] = useState(false);
    const [openHapusSoalDiEntri, setOpenHapusSoalDiEntri] = useState(false);

    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: "mataUji",
        direction: "asc",
    });
    const sortedRecords = useMemo(() => sortBy(dataBundelSoal, "mataUji"), []);
    const [records, setRecords] = useState(sortedRecords.slice(0, pageSize));

    const [sortStatusSubBab, setSortStatusSubBab] = useState<DataTableSortStatus>({
        columnAccessor: "subBab",
        direction: "asc",
    });
    const sortedRecordsSubBab = useMemo(() => sortBy(dataBundelSoalSubBab, "subBab"), []);
    const [recordsSubBab, setRecordsSubBab] = useState(sortedRecordsSubBab.slice(0, pageSize));

    const [sortStatusSubBabDetail, setSortStatusSubBabDetail] = useState<DataTableSortStatus>({
        columnAccessor: "tipeSoal",
        direction: "asc",
    });
    const sortedRecordsSubBabDetail = useMemo(() => sortBy(dataBundelSoalSubBabDetail, "tipeSoal"), []);
    const [recordsSubBabDetail, setRecordsSubBabDetail] = useState(sortedRecordsSubBabDetail.slice(0, pageSize));

    const [sortStatusDetailBundelSoal, setSortStatusDetailBundelSoal] = useState<DataTableSortStatus>({
        columnAccessor: "nomorSoal",
        direction: "asc",
    });
    const sortedRecordsDetailBundelSoal = useMemo(() => sortBy(dataDetailBundelSoal, "nomorSoal"), []);
    const [recordsDetailBundelSoal, setRecordsDetailBundelSoal] = useState(sortedRecordsDetailBundelSoal.slice(0, pageSize));

    const [selectedStatus, setSelectedStatus] = useState(optionsOpsi[0].value);

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecords(dataBundelSoal.slice(from, to));
    }, [page, pageSize]);
    useEffect(() => {
        const data = sortBy(dataBundelSoal, sortStatus.columnAccessor);
        setRecords(sortStatus.direction === "desc" ? data.reverse() : data);
    }, [sortStatus]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecordsSubBab(dataBundelSoalSubBab.slice(from, to));
    }, [page, pageSize]);
    useEffect(() => {
        const data = sortBy(dataBundelSoalSubBab, sortStatusSubBab.columnAccessor);
        setRecordsSubBab(sortStatusSubBab.direction === "desc" ? data.reverse() : data);
    }, [sortStatusSubBab]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecordsSubBabDetail(dataBundelSoalSubBabDetail.slice(from, to));
    }, [page, pageSize]);
    useEffect(() => {
        const data = sortBy(dataBundelSoalSubBabDetail, sortStatusSubBabDetail.columnAccessor);
        setRecordsSubBabDetail(sortStatusSubBabDetail.direction === "desc" ? data.reverse() : data);
    }, [sortStatusSubBabDetail]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecordsDetailBundelSoal(dataDetailBundelSoal.slice(from, to));
    }, [page, pageSize]);
    useEffect(() => {
        const data = sortBy(dataDetailBundelSoal, sortStatusDetailBundelSoal.columnAccessor);
        setRecordsDetailBundelSoal(sortStatusDetailBundelSoal.direction === "desc" ? data.reverse() : data);
    }, [sortStatusDetailBundelSoal]);

    const handleTambah = () => {
        setOpenTambah(!openTambah);
    };

    const handleUbah = () => {
        setOpenUbah(!openUbah);
    };

    const handleHapus = () => {
        setOpenHapus(!openHapus);
    };

    const handleTambahSoal = () => {
        setOpenTambahSoal(!openTambahSoal);
    };
    // kilk kanan > tambah soal > form cari soal > klik kanan > lihat soal
    const handleLihatSoalDiTambahSoal = () => {
        setOpenTambahSoal(false);
        setOpenLihatSoalDiTambahSoal(true);
    };
    // kilk kanan > tambah soal > form cari soal > klik kanan > lihat soal > tabel cari soal > detail soal
    const handleDetailSoalDiTambahSoal = () => {
        setOpenLihatSoalDiTambahSoal(false);
        setOpenLihatDetailSoalDiTambahSoal(true);
    };
    // kilk kanan > tambah soal > form cari soal > klik kanan > lihat soal > tabel cari soal > gunakan soal
    const handleGunakanSoalDiTambahSoal = () => {
        setOpenLihatSoalDiTambahSoal(false);
        setOpenLihatGunakanSoalDiTambahSoal(true);
    };

    const handleSalinSoal = () => {
        setOpenSalin(!openSalin);
    };

    const handleEntri = () => {
        setOpenEntri(!openEntri);
    };
    // klik kanan > entri soal > tabel detail bundel soal > klik kanan > detail soal
    const handleDetailSoalDiEntri = () => {
        setOpenEntri(false);
        setOpenDetailSoalDiEntri(true);
    };
    // klik kanan > entri soal > tabel detail bundel soal > klik kanan > hapus soal
    const handleHapusSoalDiEntri = () => {
        setOpenEntri(false);
        setOpenHapusSoalDiEntri(true);
    };
    return (
        <>
            <div className="flex flex-wrap items-end gap-x-4">
                <Selects label="Tahun Ajaran" required data={optionsTahunAjaran} withAsterisk />
                <Selects label="Peruntukan" required data={optionsTingkatKelas} withAsterisk />
                <Selects label="Tingkat Kelas" required data={optionsTingkatKelas} withAsterisk />
                <Selects label="Kelompok Ujian" required data={optionsKelompokUjian} withAsterisk />
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
                            render: (number) => dataBundelSoal.indexOf(number) + 1,
                        },
                        { accessor: "kodeBundel", title: "Kode Bundel", sortable: true },
                        { accessor: "deskripsi", title: "Deskripsi", width: 700, sortable: true },
                        { accessor: "tingkatKelas", title: "Tingkat Kelas", width: 200, sortable: true },
                        { accessor: "jumlahSoal", title: "Jumlah Soal", sortable: true },
                        { accessor: "jumlahEntriSoal", title: "Jumlah Entri Soal", sortable: true },
                        {
                            accessor: "status",
                            title: "Status",
                            sortable: true,
                            render: ({ status }) => (
                                <Badge className={`${status === "Created" ? "bg-info" : "bg-success"} text-white`} size="md">
                                    {status === "Created" ? "Created" : "Sent"}
                                </Badge>
                            ),
                        },
                        { accessor: "urutBerdasarkan", title: "Urut Berdasarkan", sortable: true },
                    ]}
                    rowContextMenu={{
                        items: (record) => [
                            {
                                key: "edit",
                                icon: <BiSolidEditAlt className="h-3 w-3" />,
                                title: `Ubah ${record.kodeBundel}`,
                                onClick: () => handleUbah(),
                            },
                            {
                                key: "delete",
                                icon: <FaTrash className="h-3 w-3" />,
                                title: `Hapus ${record.kodeBundel}`,
                                onClick: () => handleHapus(),
                            },
                            {
                                key: "add",
                                icon: <FaPlus className="h-3 w-3" />,
                                title: `Tambah Soal ${record.kodeBundel}`,
                                onClick: () => handleTambahSoal(),
                            },
                            {
                                key: "copy",
                                icon: <FaCopy className="h-3 w-3" />,
                                title: "Salin Soal Dari Bundel Lain",
                                onClick: () => handleSalinSoal(),
                            },
                            {
                                key: "copy",
                                icon: <FaCheck className="h-3 w-3" />,
                                title: "Entri Nomor Soal & Selesai",
                                onClick: () => handleEntri(),
                            },
                        ],
                    }}
                    totalRecords={dataBundelSoal.length}
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
            <DialogModal size="xs" open={openTambah} handler={handleTambah} heightFit={false} title="Form Tambah Bundel Soal">
                <form action="#">
                    <TextInput label="Tahun Ajaran" placeholder="Tahun Ajaran" required withAsterisk />
                    <Selects className="my-2" label="Tingkat Kelas" data={optionsTingkatKelas} required withAsterisk />
                    <TextInput label="Kelompok Ujian" placeholder="Kelompok Ujian" required withAsterisk />
                    <TextInput className="my-2" label="Peruntukan" placeholder="Peruntukan" required withAsterisk />
                    <TextInput label="Kode" placeholder="Kode" required withAsterisk />
                    <Textarea className="my-2" label="Deskripsi" placeholder="Deskripsi" autosize required withAsterisk />
                    <NumberInput label="Waktu Pengerjaan (Menit)" min={0} required withAsterisk />
                    <NumberInput className="mt-2" label="Jumlah Soal" min={0} required withAsterisk />
                    <div className="mt-8 flex justify-center gap-x-4">
                        <Button className="bg-success" onClick={() => setOpenTambah(false)}>
                            Simpan
                        </Button>
                        <Button type="reset" className="bg-warning">
                            Reset
                        </Button>
                    </div>
                </form>
            </DialogModal>

            {/* Ubah */}
            <DialogModal size="xs" open={openUbah} handler={handleUbah} heightFit={false} title="Form Ubah Bundel Soal">
                <form action="#">
                    <TextInput label="Tahun Ajaran" placeholder="Tahun Ajaran" required withAsterisk />
                    <Selects className="my-2" label="Tingkat Kelas" data={optionsTingkatKelas} required withAsterisk />
                    <TextInput label="Kelompok Ujian" placeholder="Kelompok Ujian" required withAsterisk />
                    <TextInput className="my-2" label="Peruntukan" placeholder="Peruntukan" required withAsterisk />
                    <TextInput label="Kode" placeholder="Kode" required withAsterisk />
                    <Textarea className="my-2" label="Deskripsi" placeholder="Deskripsi" autosize required withAsterisk />
                    <NumberInput label="Waktu Pengerjaan (Menit)" min={0} required withAsterisk />
                    <NumberInput className="mt-2" label="Jumlah Soal" min={0} required withAsterisk />
                    <div className="mt-8 flex justify-center gap-x-4">
                        <Button className="bg-success" onClick={handleUbah}>
                            Simpan
                        </Button>
                        <Button type="reset" className="bg-warning">
                            Reset
                        </Button>
                    </div>
                </form>
            </DialogModal>

            {/* Hapus */}
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
                    <p className="mt-4 mb-8 text-center text-black">Apakah Anda yakin untuk menghapus data ini?</p>
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

            {/* Tambah Soal */}
            <Dialog size="md" open={openTambahSoal} handler={handleTambahSoal}>
                <DialogHeader className="flex items-center justify-between dark:text-white-light">
                    <h2 className="text-xl">Form Cari Soal</h2>
                    <IoMdClose onClick={handleTambahSoal} className="h-8 w-8 cursor-pointer rounded-full p-1 shadow-md" />
                </DialogHeader>
                <DialogBody>
                    <div
                        className="no-scrollbar
                    h-[60vh] overflow-y-scroll rounded-xl bg-white p-4 text-sm text-black shadow-md dark:bg-black dark:text-white-light"
                    >
                        <div className="flex items-end gap-x-4">
                            <TextInput label="Kode" placeholder="Kode" />
                            <TextInput label="Tingkat Kelas" placeholder="Tingkat Kelas" />
                            <Selects label="Bab" data={optionsBab} required withAsterisk />
                            <Button className="bg-info" onClick={() => {}}>
                                Cari
                            </Button>
                        </div>
                        <hr className="my-4" />
                        <p className="mb-2">
                            Jumlah soal dimasukkan: 0 dari yang seharusnya null.{" "}
                            <Link href="#" className="text-info">
                                Lihat daftar soal.
                            </Link>
                        </p>
                        <Box sx={{ height: recordsSubBab.length > 10 ? 750 : "auto" }} className="mt-4">
                            <DataTable
                                withColumnBorders
                                highlightOnHover
                                shadow="sm"
                                records={recordsSubBab}
                                columns={[
                                    {
                                        accessor: "number",
                                        title: "No",
                                        sortable: true,
                                        width: 75,
                                        render: (number) => dataBundelSoalSubBab.indexOf(number) + 1,
                                    },
                                    { accessor: "subBab", title: "Sub Bab", sortable: true },
                                    { accessor: "jumlahSoal", title: "Jumlah Soal", width: 140, sortable: true },
                                ]}
                                rowContextMenu={{
                                    items: (record) => [
                                        {
                                            key: "see",
                                            icon: <FaEye className="h-3 w-3" />,
                                            title: `Lihat Soal ${record.subBab}`,
                                            onClick: () => handleLihatSoalDiTambahSoal(),
                                        },
                                    ],
                                }}
                                totalRecords={dataBundelSoalSubBab.length}
                                sortStatus={sortStatusSubBab}
                                onSortStatusChange={setSortStatusSubBab}
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

            {/* Tambah Soal > klik kanan > lihat soal */}
            <Dialog size="xl" open={openLihatSoalDiTambahSoal} handler={() => setOpenLihatSoalDiTambahSoal(true)}>
                <DialogHeader className="flex items-center justify-between dark:text-white-light">
                    <h2 className="text-xl">Form Cari Soal</h2>
                    <IoMdClose
                        onClick={() => {
                            setOpenLihatSoalDiTambahSoal(false);
                            setOpenTambahSoal(true);
                        }}
                        className="h-8 w-8 cursor-pointer rounded-full p-1 shadow-md"
                    />
                </DialogHeader>
                <DialogBody>
                    <div
                        className="no-scrollbar
                    h-[60vh] overflow-y-scroll rounded-xl bg-white p-4 text-sm text-black shadow-md dark:bg-black dark:text-white-light"
                    >
                        <p className="mb-2">
                            Jumlah soal dimasukkan: 0 dari yang seharusnya null.{" "}
                            <Link href="#" className="text-info">
                                Lihat daftar soal.
                            </Link>
                        </p>
                        <Box sx={{ height: recordsSubBabDetail.length > 10 ? 750 : "auto" }} className="mt-4">
                            <DataTable
                                withColumnBorders
                                highlightOnHover
                                shadow="sm"
                                records={recordsSubBabDetail}
                                columns={[
                                    {
                                        accessor: "number",
                                        title: "No",
                                        sortable: true,
                                        width: 70,
                                        render: (number) => dataBundelSoalSubBabDetail.indexOf(number) + 1,
                                    },
                                    { accessor: "idSoal", title: "ID Soal", sortable: true },
                                    { accessor: "cuplikanSoal", title: "Cuplikan Soal", width: 400, sortable: true },
                                    { accessor: "tipeSoal", title: "Tipe Soal", sortable: true },
                                    { accessor: "kognitif", title: "Kognitif", sortable: true },
                                    { accessor: "metodePengambilan", title: "Metode Pengambilan", sortable: true },
                                    { accessor: "sumber", title: "Sumber", sortable: true },
                                    { accessor: "tingkatKelas", title: "Tingkat Kelas", sortable: true },
                                ]}
                                rowContextMenu={{
                                    items: (record) => [
                                        {
                                            key: "detail",
                                            icon: <FaEye className="h-3 w-3" />,
                                            title: `Detail Soal ${record.tipeSoal}`,
                                            onClick: () => handleDetailSoalDiTambahSoal(),
                                        },
                                        {
                                            key: "use",
                                            icon: <FaEye className="h-3 w-3" />,
                                            title: `Gunakan Soal ${record.idSoal}`,
                                            onClick: () => handleGunakanSoalDiTambahSoal(),
                                        },
                                    ],
                                }}
                                totalRecords={dataBundelSoalSubBabDetail.length}
                                sortStatus={sortStatusSubBabDetail}
                                onSortStatusChange={setSortStatusSubBabDetail}
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

            {/* Tambah Soal > klik kanan > tabel lihat soal > klik kanan > lihat soal > table cari soal > klik kanan > detail soal > modal  */}
            <Dialog
                size="xl"
                open={openLihatDetailSoalDiTambahSoal}
                handler={() => {
                    setOpenLihatDetailSoalDiTambahSoal(true);
                }}
            >
                <DialogHeader className="flex items-center justify-between dark:text-white-light">
                    <h2 className="text-xl">Informasi Soal</h2>
                    <IoMdClose
                        onClick={() => {
                            setOpenLihatDetailSoalDiTambahSoal(false);
                            setOpenLihatSoalDiTambahSoal(true);
                        }}
                        className="h-8 w-8 cursor-pointer rounded-full p-1 shadow-md"
                    />
                </DialogHeader>
                <DialogBody>
                    <div
                        className="no-scrollbar
                    h-[60vh] overflow-y-scroll rounded-xl bg-white p-4 text-sm text-black shadow-md dark:bg-black dark:text-white-light"
                    >
                        <ul className="grid grid-cols-3 gap-4 text-sm text-black">
                            <li>
                                <b className="font-bold">Tingkat Kesulitan: </b>3
                            </li>
                            <li>
                                <b className="font-bold">Sumber: </b>
                                Teks Book
                            </li>
                            <li>
                                <b className="font-bold">Jenis Sumber: </b>
                                Referensi Sekolah
                            </li>
                            <li>
                                <b className="font-bold">Tipe Soal: </b>
                                PGB
                            </li>
                            <li>
                                <b className="font-bold">Level Kognitif: </b>
                                Pengetahuan
                            </li>
                            <li>
                                <b className="font-bold">Tahun: </b>
                                2012
                            </li>
                        </ul>
                        <hr className="my-2" />
                        <div className="flex justify-evenly gap-x-6">
                            <div className="w-full">
                                <h3 className="mb-2 text-left font-bold">Wacana :</h3>
                                <div className="h-[20rem] overflow-y-scroll border border-black p-2">
                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error quo quia quis eum omnis qui nam cum dolores est vel nobis, architecto quas. Libero soluta recusandae
                                    quia, consectetur ad perferendis excepturi eos perspiciatis suscipit quas esse labore maiores provident iusto tenetur illum fugit quisquam dolore. Ullam, vero
                                    voluptate quod quis officia eum aliquam ratione, magni recusandae praesentium omnis harum atque fugit nam provident, in dolorum ipsa quaerat asperiores officiis ad
                                    ducimus aspernatur nihil? Maxime itaque dolores, facilis ipsa, cumque, sequi perferendis doloremque debitis distinctio nobis in atque dignissimos tenetur corporis
                                    quis! Culpa distinctio libero illum fugit molestiae explicabo adipisci repudiandae?
                                </div>
                            </div>
                            <div className="w-full">
                                <h3 className="mb-2 font-bold">Soal :</h3>
                                <div className="h-[20rem] overflow-y-scroll border border-black p-2">
                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima esse laborum ratione tempore aliquam autem aliquid sint inventore totam? Qui id nostrum nemo
                                    perspiciatis fugiat laudantium, voluptas veritatis ipsum aspernatur eaque accusantium dicta alias odit provident a repudiandae molestiae nihil! Quidem in eum quas
                                    fugit ipsa dolorum, pariatur optio sint officiis doloribus iusto exercitationem quae, saepe, quia consequatur tenetur velit repudiandae sapiente accusamus quis.
                                    Numquam culpa saepe reprehenderit cumque, nemo possimus quia. Sunt mollitia non expedita autem quibusdam, natus cum nostrum praesentium alias accusantium in
                                    blanditiis rerum officia ex voluptatibus! Sint nesciunt dolor nam doloremque iusto sunt quibusdam at optio.
                                </div>
                            </div>
                            <div className="w-full">
                                <h3 className="mb-2 font-bold">Opsi :</h3>
                                <div className="h-[20rem] overflow-y-scroll border border-black p-2">
                                    {listJawaban.map((item: any, index: number) => (
                                        <div key={index} className="my-2 flex items-center justify-between">
                                            <div className="flex w-4/5 items-center gap-x-2">
                                                <b className="text-xl font-bold">{item.abjad}</b>
                                                <p>{item.content}</p>
                                            </div>
                                            {item.value === 100 ? (
                                                <Chip className="w-14 bg-success text-center" value={`${item.value}%`} />
                                            ) : (
                                                <Chip className="w-14 bg-gray-500 text-center" value={`${item.value}%`} />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </DialogBody>
            </Dialog>

            {/* Tambah Soal > klik kanan > tabel lihat soal > klik kanan > lihat soal > table cari soal > klik kanan > gunakan soal > modal  */}
            <Dialog
                open={openLihatGunakanSoalDiTambahSoal}
                handler={handleGunakanSoalDiTambahSoal}
                size="xs"
                dismiss={{
                    escapeKey: false,
                    outsidePress: false,
                }}
                className="bg-white text-black dark:bg-black dark:text-white-light"
            >
                <DialogBody>
                    <FaQuestion className="mx-auto h-auto w-28 text-info" />
                    <p className="mt-4 mb-8 text-center text-black">Apakah Anda yakin untuk menggunakan soal ini?</p>
                    <div className="mt-8 flex justify-center gap-x-4">
                        <Button
                            className="bg-warning"
                            onClick={() => {
                                setOpenLihatGunakanSoalDiTambahSoal(false);
                                setOpenLihatSoalDiTambahSoal(true);
                            }}
                        >
                            Tidak
                        </Button>
                        <Button
                            className="bg-success"
                            onClick={() => {
                                setOpenLihatGunakanSoalDiTambahSoal(false);
                                setOpenLihatSoalDiTambahSoal(true);
                            }}
                        >
                            Ya
                        </Button>
                    </div>
                </DialogBody>
            </Dialog>

            {/* Salin */}
            <DialogModal open={openSalin} size="xs" handler={handleSalinSoal} title="Form Salin Isi Soal Bundel">
                <TextInput className="mb-2" label="Kode Bundel" placeholder="Kode Bundel" required withAsterisk />
                <Switch label="Opsi" options={optionsOpsi} selectedOption={selectedStatus} setSelectedOption={setSelectedStatus} required />
                <Selects className="my-2" label="Tahun Ajaran" data={optionsTahunAjaran} required withAsterisk />
                <Selects label="Cari Kode Bundel" data={optionsTahunAjaran} required withAsterisk />
                <div className="mt-8 flex justify-center gap-x-4">
                    <Button className="bg-info" onClick={() => setOpenSalin(false)}>
                        Salin Isi Bundel
                    </Button>
                    <Button className="bg-white text-black" onClick={() => setOpenSalin(false)}>
                        Tutup
                    </Button>
                </div>
            </DialogModal>

            {/* Entri */}
            <Dialog size="xl" open={openEntri} handler={handleEntri}>
                <DialogHeader className="flex items-center justify-between dark:text-white-light">
                    <h2 className="text-xl">Detail Bundel Soal</h2>
                    <IoMdClose onClick={handleEntri} className="h-8 w-8 cursor-pointer rounded-full p-1 shadow-md" />
                </DialogHeader>
                <DialogBody>
                    <div className="no-scrollbar h-[60vh] overflow-y-scroll rounded-xl bg-white p-4 text-sm text-black shadow-md dark:bg-black dark:text-white-light">
                        <div className="flex w-3/4 items-end gap-x-4">
                            <TextInput label="Kode" placeholder="Kode" />
                            <Switch label="Urut Berdasarkan" options={optionsUrutBerdasarkan} selectedOption={selectedStatus} setSelectedOption={setSelectedStatus} required />
                        </div>
                        <Box sx={{ height: dataDetailBundelSoal.length > 10 ? 750 : "auto" }} className="mt-4">
                            <DataTable
                                withColumnBorders
                                highlightOnHover
                                shadow="sm"
                                records={dataDetailBundelSoal}
                                columns={[
                                    {
                                        accessor: "number",
                                        title: "No",
                                        sortable: true,
                                        width: 75,
                                        render: (number) => dataDetailBundelSoal.indexOf(number) + 1,
                                    },
                                    { accessor: "idSoal", title: "ID Soal", sortable: true },
                                    { accessor: "nomorSoal", title: "Nomor Soal", sortable: true },
                                    { accessor: "cuplikanSoal", title: "Cuplikan Soal", width: "80%", sortable: true },
                                    { accessor: "babTerkait", title: "BAB Terkait", sortable: true },
                                ]}
                                rowContextMenu={{
                                    items: (record) => [
                                        {
                                            key: "detail",
                                            icon: <FaEye className="h-3 w-3" />,
                                            title: `Detail Soal ${record.idSoal}`,
                                            onClick: () => handleDetailSoalDiEntri(),
                                        },
                                        {
                                            key: "use",
                                            icon: <FaEye className="h-3 w-3" />,
                                            title: `Hapus ${record.idSoal}`,
                                            onClick: () => handleHapusSoalDiEntri(),
                                        },
                                    ],
                                }}
                                totalRecords={dataDetailBundelSoal.length}
                                sortStatus={sortStatusDetailBundelSoal}
                                onSortStatusChange={setSortStatusDetailBundelSoal}
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
                <DialogFooter className="flex justify-center gap-x-4">
                    <Button className="bg-primary">Export PDF</Button>
                    <Button className="bg-success">Simpan Nomor Soal</Button>
                    <Button className="bg-info">Selesai</Button>
                </DialogFooter>
            </Dialog>

            {/* Entri > tabel detail bundel soal > klik kanan > detail soal */}
            <Dialog size="xl" open={openDetailSoalDiEntri} handler={handleDetailSoalDiEntri}>
                <DialogHeader className="flex items-center justify-between dark:text-white-light">
                    <h2 className="text-xl">Informasi Soal</h2>
                    <IoMdClose
                        onClick={() => {
                            setOpenDetailSoalDiEntri(false);
                            setOpenEntri(true);
                        }}
                        className="h-8 w-8 cursor-pointer rounded-full p-1 shadow-md"
                    />
                </DialogHeader>
                <DialogBody>
                    <div
                        className="no-scrollbar
                    h-[60vh] overflow-y-scroll rounded-xl bg-white p-4 text-sm text-black shadow-md dark:bg-black dark:text-white-light"
                    >
                        <ul className="grid grid-cols-3 gap-4 text-sm text-black">
                            <li>
                                <b className="font-bold">Tingkat Kesulitan: </b>3
                            </li>
                            <li>
                                <b className="font-bold">Sumber: </b>
                                Teks Book
                            </li>
                            <li>
                                <b className="font-bold">Jenis Sumber: </b>
                                Referensi Sekolah
                            </li>
                            <li>
                                <b className="font-bold">Tipe Soal: </b>
                                PGB
                            </li>
                            <li>
                                <b className="font-bold">Level Kognitif: </b>
                                Pengetahuan
                            </li>
                            <li>
                                <b className="font-bold">Tahun: </b>
                                2012
                            </li>
                        </ul>
                        <hr className="my-2" />
                        <div className="flex justify-evenly gap-x-6">
                            <div className="w-full">
                                <h3 className="mb-2 text-left font-bold">Wacana :</h3>
                                <div className="h-[20rem] overflow-y-scroll border border-black p-2">
                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error quo quia quis eum omnis qui nam cum dolores est vel nobis, architecto quas. Libero soluta recusandae
                                    quia, consectetur ad perferendis excepturi eos perspiciatis suscipit quas esse labore maiores provident iusto tenetur illum fugit quisquam dolore. Ullam, vero
                                    voluptate quod quis officia eum aliquam ratione, magni recusandae praesentium omnis harum atque fugit nam provident, in dolorum ipsa quaerat asperiores officiis ad
                                    ducimus aspernatur nihil? Maxime itaque dolores, facilis ipsa, cumque, sequi perferendis doloremque debitis distinctio nobis in atque dignissimos tenetur corporis
                                    quis! Culpa distinctio libero illum fugit molestiae explicabo adipisci repudiandae?
                                </div>
                            </div>
                            <div className="w-full">
                                <h3 className="mb-2 font-bold">Soal :</h3>
                                <div className="h-[20rem] overflow-y-scroll border border-black p-2">
                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima esse laborum ratione tempore aliquam autem aliquid sint inventore totam? Qui id nostrum nemo
                                    perspiciatis fugiat laudantium, voluptas veritatis ipsum aspernatur eaque accusantium dicta alias odit provident a repudiandae molestiae nihil! Quidem in eum quas
                                    fugit ipsa dolorum, pariatur optio sint officiis doloribus iusto exercitationem quae, saepe, quia consequatur tenetur velit repudiandae sapiente accusamus quis.
                                    Numquam culpa saepe reprehenderit cumque, nemo possimus quia. Sunt mollitia non expedita autem quibusdam, natus cum nostrum praesentium alias accusantium in
                                    blanditiis rerum officia ex voluptatibus! Sint nesciunt dolor nam doloremque iusto sunt quibusdam at optio.
                                </div>
                            </div>
                            <div className="w-full">
                                <h3 className="mb-2 font-bold">Opsi :</h3>
                                <div className="h-[20rem] overflow-y-scroll border border-black p-2">
                                    {listJawaban.map((item: any, index: number) => (
                                        <div key={index} className="my-2 flex items-center justify-between">
                                            <div className="flex w-4/5 items-center gap-x-2">
                                                <b className="text-xl font-bold">{item.abjad}</b>
                                                <p>{item.content}</p>
                                            </div>
                                            {item.value === 100 ? (
                                                <Chip className="w-14 bg-success text-center" value={`${item.value}%`} />
                                            ) : (
                                                <Chip className="w-14 bg-gray-500 text-center" value={`${item.value}%`} />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </DialogBody>
            </Dialog>

            {/* Entri > tabel detail bundel soal > klik kanan > Hapus */}
            <Dialog
                open={openHapusSoalDiEntri}
                handler={handleHapusSoalDiEntri}
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
                        <Button
                            className="bg-warning"
                            onClick={() => {
                                setOpenHapusSoalDiEntri(false);
                                setOpenEntri(true);
                            }}
                        >
                            Tidak
                        </Button>
                        <Button
                            className="bg-success"
                            onClick={() => {
                                setOpenHapusSoalDiEntri(false);
                                setOpenEntri(true);
                            }}
                        >
                            Ya
                        </Button>
                    </div>
                </DialogBody>
            </Dialog>
        </>
    );
};

export default MembuatBundel;
