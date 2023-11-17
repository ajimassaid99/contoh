import DialogModal from "@/components/Modal/Modal";
import { Badge, Box, Group } from "@mantine/core";
import { Button, Chip, Dialog, DialogBody, DialogFooter, DialogHeader } from "@material-tailwind/react";
import { DataTable, DataTableSortStatus } from "mantine-datatable";
import { useEffect, useMemo, useState } from "react";
import { PAGE_SIZES, useStyles, dataVerifikasiSoal, dataSubVerifikasiSoal, dataMataPelajaran, dataModalVerifikasiSoal, optionsPelajaran, optionsBab } from "@/data/smba/data";
import { sortBy } from "lodash";
import { BiSolidChevronRight } from "react-icons/bi";
import Selects from "@/components/Ui/Selects";
import { FaCheck, FaEye, FaQuestion } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import dayjs from "dayjs";
import "dayjs/locale/id";

const listJawaban = [
    {
        abjad: "A",
        content: "Saat ini, sistim komputer sedang ada gangguan.",
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

const Verifikasi = () => {
    dayjs.locale("id");
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [page, setPage] = useState(1);
    const [openLihat, setOpenLihat] = useState(false);
    const [openAmbilDanVerifikasi, setOpenAmbilDanVerifikasi] = useState(false);
    const [openTambahMapel, setOpenTambahMapel] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openPreview, setOpenPreview] = useState(false);
    const [expandedBabIds, setExpandedBabIds] = useState<string[]>([]);

    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: "namaBab",
        direction: "asc",
    });
    const sortedRecords = useMemo(() => sortBy(dataVerifikasiSoal, "namaBab"), []);
    const [records, setRecords] = useState(sortedRecords.slice(0, pageSize));

    const [sortStatusPelajaran, setSortStatusPelajaran] = useState<DataTableSortStatus>({
        columnAccessor: "tipeSoal",
        direction: "asc",
    });
    const sortedRecordsPelajaran = useMemo(() => sortBy(dataModalVerifikasiSoal, "tipeSoal"), []);
    const [recordsPelajaran, setRecordsPelajaran] = useState(sortedRecordsPelajaran.slice(0, pageSize));

    const { cx, classes } = useStyles();

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecords(dataVerifikasiSoal.slice(from, to));
    }, [page, pageSize]);
    useEffect(() => {
        const data = sortBy(dataVerifikasiSoal, sortStatus.columnAccessor);
        setRecords(sortStatus.direction === "desc" ? data.reverse() : data);
    }, [sortStatus]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecordsPelajaran(dataModalVerifikasiSoal.slice(from, to));
    }, [page, pageSize]);
    useEffect(() => {
        const data = sortBy(dataModalVerifikasiSoal, sortStatusPelajaran.columnAccessor);
        setRecordsPelajaran(sortStatusPelajaran.direction === "desc" ? data.reverse() : data);
    }, [sortStatusPelajaran]);

    const handleLihat = () => {
        setOpenLihat(!openLihat);
    };

    const handleAmbilDanVerifikasiSoal = () => {
        setOpenAmbilDanVerifikasi(true);
        setOpenLihat(false);
    };

    const handlePreviewSoal = () => {
        setOpenPreview(true);
        setOpenLihat(false);
    };

    return (
        <>
            <div className="flex items-end gap-x-4">
                <Selects label="Pelajaran" data={optionsPelajaran} withAsterisk={false} />
                <Selects label="Bab" data={optionsBab} withAsterisk={false} />
                <Button className="bg-info">Cari</Button>
            </div>
            <Box sx={{ height: records.length > 10 ? 750 : "auto" }} className="mt-4">
                <DataTable
                    withColumnBorders
                    highlightOnHover
                    shadow="sm"
                    records={records}
                    columns={[
                        {
                            accessor: "namaBab",
                            title: "Nama BAB",
                            sortable: true,
                            render: ({ id, namaBab }: any) => {
                                const isRelated = dataSubVerifikasiSoal && dataSubVerifikasiSoal.some((subData) => subData.idBab === id);

                                if (isRelated) {
                                    return (
                                        <Group spacing="xs">
                                            <BiSolidChevronRight
                                                className={cx(classes.expandIcon, {
                                                    [classes.expandIconRotated]: expandedBabIds.includes(id),
                                                })}
                                            />
                                            <p>{namaBab}</p>
                                        </Group>
                                    );
                                } else {
                                    return <p className="ml-[1.6rem] cursor-text">{namaBab}</p>;
                                }
                            },
                        },
                        { accessor: "peluang", title: "Peluang", sortable: true },
                        { accessor: "jumlahSoal", title: "Jumlah Soal", sortable: true },
                    ]}
                    rowContextMenu={{
                        items: (record) => [
                            {
                                key: "see",
                                icon: <FaEye className="h-3 w-3" />,
                                title: `Lihat Soal ${record.namaBab}`,
                                onClick: () => handleLihat(),
                            },
                        ],
                    }}
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
                                    { accessor: "namaBab", title: "Nama Bab", sortable: true },
                                    { accessor: "peluang", title: "Peluang", width: "29.3%", sortable: true },
                                    { accessor: "jumlahSoal", title: "Jumlah Soal", width: "35.3%", sortable: true },
                                ]}
                                rowContextMenu={{
                                    items: (record) => [
                                        {
                                            key: "see",
                                            icon: <FaEye className="h-3 w-3" />,
                                            title: `Lihat Soal ${record.namaBab}`,
                                            onClick: () => handleLihat(),
                                        },
                                    ],
                                }}
                                records={dataSubVerifikasiSoal.filter((subDatas: any) => subDatas.idBab === subBab.record.id)}
                            />
                        ),
                    }}
                    totalRecords={dataVerifikasiSoal.length}
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

            {/* Konfirmasi Hapus */}
            <Dialog
                open={openAmbilDanVerifikasi}
                handler={handleAmbilDanVerifikasiSoal}
                size="xs"
                dismiss={{
                    escapeKey: false,
                    outsidePress: false,
                }}
                className="bg-white text-black dark:bg-black dark:text-white-light"
            >
                <DialogBody>
                    <FaQuestion className="mx-auto h-auto w-28 text-info" />
                    <p className="mt-4 mb-8 text-center text-black">Apakah anda yakin mengambil pekerjaan verifikasi soal ini. jika sudah benar maka soal tidak bisa di verifikasi orang lain.?</p>
                    <div className="mt-8 flex justify-center gap-x-4">
                        <Button
                            className="bg-warning"
                            onClick={() => {
                                setOpenLihat(true);
                                setOpenAmbilDanVerifikasi(false);
                            }}
                        >
                            Tidak
                        </Button>
                        <Button
                            className="bg-success"
                            onClick={() => {
                                setOpenLihat(true);
                                setOpenAmbilDanVerifikasi(false);
                            }}
                        >
                            Ya
                        </Button>
                    </div>
                </DialogBody>
            </Dialog>

            <DialogModal size="lg" open={openLihat} handler={handleLihat} heightFit={true} title={"Form List Soal"}>
                <Box sx={{ height: recordsPelajaran.length > 10 ? 750 : "auto" }} className="mt-4">
                    <DataTable
                        withColumnBorders
                        highlightOnHover
                        shadow="sm"
                        records={recordsPelajaran}
                        columns={[
                            {
                                accessor: "number",
                                title: "No",
                                sortable: true,
                                width: 75,
                                render: (number) => dataModalVerifikasiSoal.indexOf(number) + 1,
                            },
                            { accessor: "tipeSoal", title: "Tipe Soal", sortable: true },
                            { accessor: "sumber", title: "Sumber", sortable: true },
                            { accessor: "kesulitan", title: "Kesulitan", sortable: true },
                            { accessor: "metode", title: "Metode", sortable: true },
                            { accessor: "waktuPengerjaan", title: "Waktu Pengerjaan", sortable: true },
                            { accessor: "wacana", title: "Wacana", sortable: true },
                            { accessor: "video", title: "Video", sortable: true },
                            { accessor: "kognitif", title: "Kognitif", sortable: true },
                            { accessor: "totalBab", title: "Total Bab", sortable: true },
                            { accessor: "nikPembuat", title: "NIK Pembuat", sortable: true },
                            { accessor: "namaPembuat", title: "Nama Pembuat", sortable: true },
                            { accessor: "tanggalPembuatan", title: "Tanggal Pembuatan", sortable: true, render: ({ tanggalPembuatan }: any) => dayjs(tanggalPembuatan).format("DD MMMM YYYY") },
                            {
                                accessor: "isVerifikasi",
                                title: "Is Verifikasi",
                                sortable: true,
                                render: ({ isVerifikasi }) => (
                                    <Badge className={`${isVerifikasi === true ? "bg-success" : "bg-danger"} text-white`} size="md">
                                        {isVerifikasi === true ? "Aktif" : "Tidak Aktif"}
                                    </Badge>
                                ),
                            },
                            { accessor: "nikVerifikasi", title: "NIK Verifikasi", sortable: true },
                            { accessor: "namaVerifikasi", title: "Nama Verifikasi", sortable: true },
                            { accessor: "tanggalVerifikasi", title: "Tanggal Verifikasi", sortable: true, render: ({ tanggalVerifikasi }) => dayjs(tanggalVerifikasi).format("DD MMMM YYYY") },
                        ]}
                        rowContextMenu={{
                            items: (record) => [
                                {
                                    key: "take",
                                    icon: <FaCheck className="h-3 w-3" />,
                                    title: `Ambil & Verifikasi Soal ${record.sumber}`,
                                    onClick: () => handleAmbilDanVerifikasiSoal(),
                                },
                                {
                                    key: "see",
                                    icon: <FaEye className="h-3 w-3" />,
                                    title: `Preview Soal ${record.sumber}`,
                                    onClick: () => handlePreviewSoal(),
                                },
                            ],
                        }}
                        totalRecords={dataMataPelajaran.length}
                        sortStatus={sortStatusPelajaran}
                        onSortStatusChange={setSortStatusPelajaran}
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
                    <b className="font-bold">Keterangan: </b>Klik kanan pada table untuk menampilkan menu. soal yang terlah di verifikasi tidak bisa di ubah.
                </p>
                <div className="mt-8 flex justify-center gap-x-4">
                    <Button className="bg-info" onClick={() => setOpenLihat(false)}>
                        Refresh
                    </Button>
                    <Button className="bg-white text-black" onClick={() => setOpenLihat(false)}>
                        Tutup
                    </Button>
                </div>
            </DialogModal>

            <Dialog
                open={openPreview}
                size="lg"
                handler={handlePreviewSoal}
                dismiss={{
                    escapeKey: false,
                    outsidePress: false,
                }}
                className="bg-white text-black dark:bg-black dark:text-white-light"
            >
                <DialogHeader className="flex items-center justify-between dark:text-white-light">
                    <h2 className="text-md">Preview Soal</h2>
                    <IoMdClose
                        onClick={() => {
                            setOpenPreview(false);
                            setOpenLihat(true);
                        }}
                        className="h-8 w-8 cursor-pointer rounded-full p-1 shadow-md"
                    />
                </DialogHeader>

                <DialogBody divider className="relative border-none">
                    <ul className="flex flex-wrap gap-x-4 text-black">
                        <li>
                            <b className="font-bold">Tipe Soal: </b>
                            PGB
                        </li>
                        <div>|</div>
                        <li>
                            <b className="font-bold">Sumber: </b>
                            Teks Book
                        </li>
                        <div>|</div>
                        <li>
                            <b className="font-bold">Kognitif: </b>
                            Pengetahuan
                        </li>
                        <div>|</div>
                        <li>
                            <b className="font-bold">Kesulitan: </b>3
                        </li>
                        <div>|</div>
                        <li>
                            <b className="font-bold">Metode: </b>
                            Modifikasi
                        </li>
                        <div>|</div>
                        <li>
                            <b className="font-bold">Waktu Pengerjaan: </b>
                            {"< 1,5 menit"}
                        </li>
                    </ul>
                    <div
                        className="no-scrollbar
                    h-[60vh] overflow-y-scroll rounded-xl bg-white p-4 text-sm text-black shadow-md dark:bg-black dark:text-white-light"
                    >
                        <div>
                            <h3 className="mb-2 bg-white-dark px-2 py-1 font-semibold text-white">Soal</h3>
                            <p>Kalimat yang menggunakan kata baku adalah</p>
                            <br />
                            <div>
                                <h4 className=" mb-2 font-semibold">Jawaban:</h4>
                                <ul className="ml-4">
                                    {listJawaban.map((item: any, index: number) => (
                                        <li key={index} className="my-2 flex items-center justify-between">
                                            <div className="flex items-center gap-x-6">
                                                <b className="text-xl font-bold">{item.abjad}</b>
                                                <p>{item.content}</p>
                                            </div>
                                            {item.value === 100 ? (
                                                <Chip className="w-14 bg-success text-center" value={`${item.value}%`} />
                                            ) : (
                                                <Chip className="w-14 bg-gray-500 text-center" value={`${item.value}%`} />
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="my-6">
                            <h3 className="mb-2 bg-white-dark px-2 py-1 font-semibold text-white">Solusi</h3>
                            <p>Kalimat yang menggunakan kata baku adalah C. Penulisan yang benar adalah A. Sistem, b. Komplikasi, d. Menganalisis.</p>
                        </div>

                        <div>
                            <h3 className="mb-2 bg-white-dark px-2 py-1 font-semibold text-white">The King</h3>
                            <p>-</p>
                        </div>

                        <div className="mt-6">
                            <h3 className="mb-2 bg-white-dark px-2 py-1 font-semibold text-white">Wacana</h3>
                            <p>-</p>
                        </div>
                    </div>
                </DialogBody>
                <DialogFooter>
                    <div className="flex gap-x-2">
                        <Chip className="rounded-md bg-success p-2" value="Full Credit: 1" />
                        <Chip className="rounded-md bg-warning p-2" value="half Credit: -1" />
                        <Chip className="rounded-md bg-danger p-2" value="Zero Credit: 0" />
                    </div>
                </DialogFooter>
            </Dialog>
        </>
    );
};

export default Verifikasi;
