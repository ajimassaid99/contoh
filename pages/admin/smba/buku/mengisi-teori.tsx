import { useEffect, useMemo, useState } from "react";
import { PAGE_SIZES, useStyles, dataMengisiTeori, dataDaftarTeori, optionsPelajaran, dataSubMengisiTeori, optionsLevel, optionsKelengkapan, dataDaftarVideoTeori } from "@/data/smba/data";
import { Button, Dialog, DialogBody, DialogHeader } from "@material-tailwind/react";
import { Box, FileInput, Group, TextInput, Textarea } from "@mantine/core";
import { DataTable, DataTableSortStatus } from "mantine-datatable";
import { sortBy } from "lodash";
import DialogModal from "@/components/Modal/Modal";
import { BiSolidChevronRight, BiSolidEditAlt } from "react-icons/bi";
import { FaEye, FaQuestion, FaTrash } from "react-icons/fa6";
import Selects from "@/components/Ui/Selects";
import { MdAdd } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import ConfirmationModalTable from "@/components/Modal/ModalConfirmation";
import dynamic from "next/dynamic";

const Editor = dynamic(() => import("@/components/Editor/Editor"), { ssr: false });

const MengisiTeori = () => {
    const [openTambah, setOpenTambah] = useState(false);
    const [openLihatDaftar, setOpenLihatDaftar] = useState(false);

    const [openUbahDaftar, setOpenUbahDaftar] = useState(false);
    const [openHapusDaftar, setOpenHapusDaftar] = useState(false);
    const [openTambahVideoDaftar, setOpenTambahVideoDaftar] = useState(false);

    const [openLihatDaftarVideoDiDaftarTeori, setOpenLihatDaftarVideoDiDaftarTeori] = useState(false);
    const [openLihatDaftarVideoDiDaftarVideo, setOpenLihatDaftarVideoDiDaftarVideo] = useState(false);
    const [openUbahVideoDiDaftarVideo, setOpenUbahVideoDiDaftarVideo] = useState(false);
    const [openHapusVideoDiDaftarVideo, setOpenHapusVideoDiDaftarVideo] = useState(false);

    const [expandedBabIds, setExpandedBabIds] = useState<string[]>([]);
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [page, setPage] = useState(1);
    const { cx, classes } = useStyles();

    const [sortStatusTeori, setSortStatusTeori] = useState<DataTableSortStatus>({
        columnAccessor: "namaBab",
        direction: "asc",
    });
    const sortedRecordTeori = useMemo(() => sortBy(dataMengisiTeori, "namaBab"), []);
    const [recordsTeori, setRecordsTeori] = useState(sortedRecordTeori.slice(0, pageSize));

    const [sortStatusDaftarTeori, setSortStatusDaftarTeori] = useState<DataTableSortStatus>({
        columnAccessor: "uraian",
        direction: "asc",
    });
    const sortedRecordDaftarTeori = useMemo(() => sortBy(dataDaftarTeori, "uraian"), []);
    const [recordDaftarTeori, setRecordDaftarTeori] = useState(sortedRecordDaftarTeori.slice(0, pageSize));

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecordsTeori(dataMengisiTeori.slice(from, to));
    }, [page, pageSize]);
    useEffect(() => {
        const data = sortBy(dataMengisiTeori, sortStatusTeori.columnAccessor);
        setRecordsTeori(sortStatusTeori.direction === "desc" ? data.reverse() : data);
    }, [sortStatusTeori]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecordDaftarTeori(dataDaftarTeori.slice(from, to));
    }, [page, pageSize]);
    useEffect(() => {
        const data = sortBy(dataDaftarTeori, sortStatusDaftarTeori.columnAccessor);
        setRecordDaftarTeori(sortStatusDaftarTeori.direction === "desc" ? data.reverse() : data);
    }, [sortStatusDaftarTeori]);

    const handleTambah = () => {
        setOpenTambah(!openTambah);
    };

    const handleLihat = () => {
        setOpenLihatDaftar(!openLihatDaftar);
    };

    const handleUbahDaftar = () => {
        setOpenLihatDaftar(false);
        setOpenUbahDaftar(true);
    };

    const handleHapusDaftar = () => {
        setOpenLihatDaftar(false);
        setOpenHapusDaftar(true);
    };

    const handleTambahVideoDaftar = () => {
        setOpenLihatDaftar(false);
        setOpenTambahVideoDaftar(true);
    };

    const handleLihatDaftarVideoDaftar = () => {
        setOpenLihatDaftar(false);
        setOpenLihatDaftarVideoDiDaftarTeori(true);
    };

    const handleLihatVideo = () => {
        setOpenLihatDaftarVideoDiDaftarTeori(false);
        setOpenLihatDaftarVideoDiDaftarVideo(true);
    };

    const handleUbahVideo = () => {
        setOpenLihatDaftarVideoDiDaftarTeori(false);
        setOpenUbahVideoDiDaftarVideo(true);
    };

    const handleHapusVideo = () => {
        setOpenLihatDaftarVideoDiDaftarTeori(false);
        setOpenHapusVideoDiDaftarVideo(true);
    };
    return (
        <>
            <div className="flex items-end gap-x-4">
                <Selects label="Mata Pelajaran" data={optionsPelajaran} withAsterisk />
                <TextInput label="Nama BAB" placeholder="Nama BAB" />
                <Button className="bg-info" onClick={() => {}}>
                    Cari
                </Button>
            </div>
            <Box sx={{ height: recordsTeori.length > 10 ? 750 : "auto" }} className="mt-4">
                <DataTable
                    withColumnBorders
                    highlightOnHover
                    shadow="sm"
                    records={recordsTeori}
                    columns={[
                        {
                            accessor: "namaBab",
                            title: "Nama BAB",
                            sortable: true,
                            render: ({ id, namaBab }: any) => {
                                const isRelated = dataSubMengisiTeori && dataSubMengisiTeori.some((subData) => subData.idBab === id);

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
                        {
                            accessor: "jumlahTeori",
                            title: "Jumlah Teori",
                            sortable: true,
                        },
                    ]}
                    rowContextMenu={{
                        items: (record) => [
                            {
                                key: "edit",
                                icon: <MdAdd className="h-3 w-3" />,
                                title: `Tambah ${record.namaBab}`,
                                onClick: () => handleTambah(),
                            },
                            {
                                key: "add",
                                icon: <FaEye className="h-3 w-3" />,
                                title: `Lihat Daftar ${record.namaBab}`,
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
                                    {
                                        accessor: "namaBab",
                                        title: "Nama BAB",
                                        width: "85%",
                                        sortable: true,
                                    },
                                    {
                                        accessor: "jumlahTeori",
                                        title: "Jumlah Teori",
                                        sortable: true,
                                    },
                                ]}
                                rowContextMenu={{
                                    items: (record) => [
                                        {
                                            key: "edit",
                                            icon: <MdAdd className="h-3 w-3" />,
                                            title: `Tambah ${record.namaBab}`,
                                            onClick: () => handleTambah(),
                                        },
                                        {
                                            key: "add",
                                            icon: <FaEye className="h-3 w-3" />,
                                            title: `Lihat Daftar ${record.namaBab}`,
                                            onClick: () => handleLihat(),
                                        },
                                    ],
                                }}
                                records={dataSubMengisiTeori.filter((subDatas) => subDatas.idBab === subBab.record.id)}
                            />
                        ),
                    }}
                    totalRecords={dataMengisiTeori.length}
                    sortStatus={sortStatusTeori}
                    onSortStatusChange={setSortStatusTeori}
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
            <DialogModal heightFit open={openTambah} handler={handleTambah} size="sm" title="Form Tambah Teori">
                <form action="#">
                    <TextInput label="Nama BAB" placeholder="Nama BAB" />
                    <div className="mt-3 mb-2">
                        <label htmlFor="uraian" className="mb-2 text-base text-black">
                            Uraian <sup className="text-danger">*</sup>
                        </label>
                        <Editor isParent={true} />
                    </div>
                    <Selects label="Level" data={optionsLevel} />
                    <Selects className="mt-2" label="Kelengkapan" data={optionsKelengkapan} />
                    <div className="mt-8 flex justify-center gap-x-4">
                        <Button className="bg-success" onClick={() => setOpenTambah(false)}>
                            Simpan
                        </Button>
                        <Button className="bg-white text-black" onClick={() => setOpenTambah(false)}>
                            Tutup
                        </Button>
                    </div>
                </form>
            </DialogModal>

            {/* Lihat Daftar */}
            <DialogModal heightFit open={openLihatDaftar} handler={handleLihat} size="lg" title="Daftar Teori">
                <Box sx={{ height: recordDaftarTeori.length > 10 ? 750 : "auto" }} className="mt-4">
                    <DataTable
                        withColumnBorders
                        highlightOnHover
                        shadow="sm"
                        records={recordDaftarTeori}
                        columns={[
                            {
                                accessor: "number",
                                title: "No",
                                sortable: true,
                                width: 75,
                                render: (number) => dataDaftarTeori.indexOf(number) + 1,
                            },
                            { accessor: "idTeori", title: "ID Teori", sortable: true },
                            { accessor: "uraian", title: "Uraian", width: "60%", sortable: true },
                            { accessor: "level", title: "Level", sortable: true },
                            { accessor: "kelengkapan", title: "Kelengkapan", sortable: true },
                            { accessor: "jumlahVideo", title: "Jumlah Video", sortable: true },
                        ]}
                        rowContextMenu={{
                            items: (record) => [
                                {
                                    key: "edit",
                                    icon: <BiSolidEditAlt className="h-3 w-3" />,
                                    title: `Ubah ${record.idTeori}`,
                                    onClick: () => handleUbahDaftar(),
                                },
                                {
                                    key: "delete",
                                    icon: <FaTrash className="h-3 w-3" />,
                                    title: `Hapus ${record.idTeori}`,
                                    onClick: () => handleHapusDaftar(),
                                },
                                {
                                    key: "add",
                                    icon: <MdAdd className="h-3 w-3" />,
                                    title: `Tambah Video ${record.idTeori}`,
                                    onClick: () => handleTambahVideoDaftar(),
                                },
                                {
                                    key: "see",
                                    icon: <FaEye className="h-3 w-3" />,
                                    title: `Lihat Daftar Video ${record.idTeori}`,
                                    onClick: () => handleLihatDaftarVideoDaftar(),
                                },
                            ],
                        }}
                        totalRecords={dataDaftarTeori.length}
                        sortStatus={sortStatusDaftarTeori}
                        onSortStatusChange={setSortStatusDaftarTeori}
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
            </DialogModal>

            {/* Ubah Daftar */}
            <Dialog
                open={openUbahDaftar}
                handler={() => {
                    setOpenLihatDaftar(false);
                    setOpenUbahDaftar(true);
                }}
                size="sm"
                className="bg-white text-black dark:bg-black dark:text-white-light"
            >
                <DialogHeader className="flex items-center justify-between dark:text-white-light">
                    <h2 className="text-xl">Form Ubah Teori</h2>
                    <IoMdClose
                        onClick={() => {
                            setOpenLihatDaftar(true);
                            setOpenUbahDaftar(false);
                        }}
                        className="h-8 w-8 cursor-pointer rounded-full p-1 shadow-md"
                    />
                </DialogHeader>
                <DialogBody>
                    <form action="#">
                        <TextInput label="Nama BAB" placeholder="Nama BAB" />
                        <div className="mt-3 mb-2">
                            <label htmlFor="uraian" className="mb-2 text-base text-black">
                                Uraian <sup className="text-danger">*</sup>
                            </label>
                            <Editor isParent={true} />
                        </div>
                        <Selects label="Level" data={optionsLevel} />
                        <Selects className="mt-2" label="Kelengkapan" data={optionsKelengkapan} />
                        <div className="mt-8 flex justify-center gap-x-4">
                            <Button
                                className="bg-success"
                                onClick={() => {
                                    setOpenLihatDaftar(true);
                                    setOpenUbahDaftar(false);
                                }}
                            >
                                Simpan
                            </Button>
                            <Button
                                className="bg-white text-black"
                                onClick={() => {
                                    setOpenLihatDaftar(true);
                                    setOpenUbahDaftar(false);
                                }}
                            >
                                Tutup
                            </Button>
                        </div>
                    </form>
                </DialogBody>
            </Dialog>

            {/* Konfirmasi Hapus Daftar */}
            <Dialog
                open={openHapusDaftar}
                handler={handleHapusDaftar}
                size="xs"
                dismiss={{
                    escapeKey: false,
                    outsidePress: false,
                }}
                className="bg-white text-black dark:bg-black dark:text-white-light"
            >
                <DialogBody>
                    <FaQuestion className="mx-auto h-auto w-28 text-info" />
                    <p className="mt-4 mb-8 text-center text-black">Apakah Anda Yakin Akan Menghapus Data Ini?</p>
                    <div className="mt-8 flex justify-center gap-x-4">
                        <Button
                            className="bg-warning"
                            onClick={() => {
                                setOpenHapusDaftar(false);
                                setOpenLihatDaftar(true);
                            }}
                        >
                            Tidak
                        </Button>
                        <Button
                            className="bg-success"
                            onClick={() => {
                                setOpenHapusDaftar(false);
                                setOpenLihatDaftar(true);
                            }}
                        >
                            Ya
                        </Button>
                    </div>
                </DialogBody>
            </Dialog>

            {/* Tambah Video Teori */}
            <Dialog
                open={openTambahVideoDaftar}
                handler={() => {
                    setOpenLihatDaftar(false);
                    setOpenTambahVideoDaftar(true);
                }}
                size="sm"
                className="bg-white text-black dark:bg-black dark:text-white-light"
            >
                <DialogHeader className="flex items-center justify-between dark:text-white-light">
                    <h2 className="text-xl">Form Tambah Video Teori</h2>
                    <IoMdClose
                        onClick={() => {
                            setOpenLihatDaftar(true);
                            setOpenTambahVideoDaftar(false);
                        }}
                        className="h-8 w-8 cursor-pointer rounded-full p-1 shadow-md"
                    />
                </DialogHeader>
                <DialogBody>
                    <form action="#" className="no-scrollbar h-fit overflow-y-scroll rounded-xl bg-white p-4 text-sm text-black shadow-md dark:bg-black dark:text-white-light">
                        <div className="flex items-end gap-x-6">
                            <FileInput className="w-2/3" label="Ambil Video" placeholder="Ambil Video" accept="video/mp4,video/x-m4v,video/*" withAsterisk required />
                            <p className="mb-2">Maksimal 500 MB (.mp4)</p>
                        </div>
                        <TextInput className="my-2" label="Judul Video" placeholder="Judul Video" withAsterisk required />
                        <Textarea label="Deskripsi" placeholder="Deskripsi" withAsterisk required autosize />
                        <div className="mt-8 flex justify-center gap-x-4">
                            <Button
                                className="bg-success"
                                onClick={() => {
                                    setOpenLihatDaftar(true);
                                    setOpenTambahVideoDaftar(false);
                                }}
                            >
                                Simpan
                            </Button>
                            <Button
                                className="bg-white text-black"
                                onClick={() => {
                                    setOpenLihatDaftar(true);
                                    setOpenTambahVideoDaftar(false);
                                }}
                            >
                                Tutup
                            </Button>
                        </div>
                    </form>
                </DialogBody>
            </Dialog>

            {/* Lihat Daftar Video Teori */}
            <Dialog
                open={openLihatDaftarVideoDiDaftarTeori}
                handler={() => {
                    setOpenLihatDaftar(false);
                    setOpenLihatDaftarVideoDiDaftarTeori(true);
                }}
                size="lg"
                className="bg-white text-black dark:bg-black dark:text-white-light"
            >
                <DialogHeader className="flex items-center justify-between dark:text-white-light">
                    <h2 className="text-xl">Lihat Daftar Video Teori</h2>
                    <IoMdClose
                        onClick={() => {
                            setOpenLihatDaftar(true);
                            setOpenLihatDaftarVideoDiDaftarTeori(false);
                        }}
                        className="h-8 w-8 cursor-pointer rounded-full p-1 shadow-md"
                    />
                </DialogHeader>
                <DialogBody>
                    <div className="no-scrollbar h-[60vh] overflow-y-scroll rounded-xl bg-white p-4 text-sm text-black shadow-md dark:bg-black dark:text-white-light">
                        <Box sx={{ height: dataDaftarVideoTeori.length > 10 ? 750 : "auto" }} className="mt-4">
                            <DataTable
                                withColumnBorders
                                highlightOnHover
                                shadow="sm"
                                records={dataDaftarVideoTeori}
                                columns={[
                                    {
                                        accessor: "number",
                                        title: "No",
                                        sortable: true,
                                        width: 70,
                                        render: (number) => dataDaftarVideoTeori.indexOf(number) + 1,
                                    },
                                    { accessor: "judulVideo", title: "Judul Video", sortable: true },
                                    { accessor: "deskripsi", title: "Deskripsi", width: "60%", sortable: true },
                                    { accessor: "linkVideo", title: "Link Video", sortable: true },
                                ]}
                                rowContextMenu={{
                                    items: (record) => [
                                        {
                                            key: "see",
                                            icon: <FaTrash className="h-3 w-3" />,
                                            title: `Lihat Daftar Video ${record.judulVideo}`,
                                            onClick: () => handleLihatVideo(),
                                        },
                                        {
                                            key: "edit",
                                            icon: <BiSolidEditAlt className="h-3 w-3" />,
                                            title: `Ubah ${record.judulVideo}`,
                                            onClick: () => handleUbahVideo(),
                                        },
                                        {
                                            key: "delete",
                                            icon: <FaTrash className="h-3 w-3" />,
                                            title: `Hapus ${record.judulVideo}`,
                                            onClick: () => handleHapusVideo(),
                                        },
                                    ],
                                }}
                            />
                        </Box>
                        <p className="border-2 border-dashed border-info p-2 text-info">
                            <b className="font-bold">Keterangan: </b>Klik kanan pada table untuk menampilkan menu.
                        </p>
                    </div>
                </DialogBody>
            </Dialog>

            {/* Lihat Video Teori */}
            <Dialog
                open={openLihatDaftarVideoDiDaftarVideo}
                handler={() => {
                    setOpenLihatDaftarVideoDiDaftarTeori(false);
                    setOpenLihatDaftarVideoDiDaftarVideo(true);
                }}
                size="md"
                className="bg-white text-black dark:bg-black dark:text-white-light"
            >
                <DialogHeader className="flex items-center justify-between dark:text-white-light">
                    <h2 className="text-xl">Video Teori</h2>
                    <IoMdClose
                        onClick={() => {
                            setOpenLihatDaftarVideoDiDaftarVideo(false);
                            setOpenLihatDaftarVideoDiDaftarTeori(true);
                        }}
                        className="h-8 w-8 cursor-pointer rounded-full p-1 shadow-md"
                    />
                </DialogHeader>
                <DialogBody>
                    <video className="h-auto w-full rounded-lg" controls>
                        <source src="/demo.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </DialogBody>
            </Dialog>

            {/* Ubah Video Teori */}
            <Dialog
                open={openUbahVideoDiDaftarVideo}
                handler={() => {
                    setOpenLihatDaftarVideoDiDaftarTeori(false);
                    setOpenUbahVideoDiDaftarVideo(true);
                }}
                size="md"
                className="bg-white text-black dark:bg-black dark:text-white-light"
            >
                <DialogHeader className="flex items-center justify-between dark:text-white-light">
                    <h2 className="text-xl">Form Ubah Video Teori</h2>
                    <IoMdClose
                        onClick={() => {
                            setOpenUbahVideoDiDaftarVideo(false);
                            setOpenLihatDaftarVideoDiDaftarTeori(true);
                        }}
                        className="h-8 w-8 cursor-pointer rounded-full p-1 shadow-md"
                    />
                </DialogHeader>
                <DialogBody>
                    <form action="#" className="no-scrollbar h-fit overflow-y-scroll rounded-xl bg-white p-4 text-sm text-black shadow-md dark:bg-black dark:text-white-light">
                        <div className="flex items-end gap-x-6">
                            <FileInput className="w-2/3" label="Ambil Video" placeholder="Ambil Video" accept="video/mp4,video/x-m4v,video/*" withAsterisk required />
                            <p className="mb-2">Maksimal 500 MB (.mp4)</p>
                        </div>
                        <TextInput className="my-2" label="Judul Video" placeholder="Judul Video" withAsterisk required />
                        <Textarea label="Deskripsi" placeholder="Deskripsi" withAsterisk required autosize />
                        <div className="mt-8 flex justify-center gap-x-4">
                            <Button
                                className="bg-success"
                                onClick={() => {
                                    setOpenUbahVideoDiDaftarVideo(false);
                                    setOpenLihatDaftarVideoDiDaftarTeori(true);
                                }}
                            >
                                Simpan
                            </Button>
                            <Button
                                className="bg-white text-black"
                                onClick={() => {
                                    setOpenUbahVideoDiDaftarVideo(false);
                                    setOpenLihatDaftarVideoDiDaftarTeori(true);
                                }}
                            >
                                Tutup
                            </Button>
                        </div>
                    </form>
                </DialogBody>
            </Dialog>

            {/* Konfirmasi Hapus Video Teori */}
            <Dialog
                open={openHapusVideoDiDaftarVideo}
                handler={handleHapusVideo}
                size="xs"
                dismiss={{
                    escapeKey: false,
                    outsidePress: false,
                }}
                className="bg-white text-black dark:bg-black dark:text-white-light"
            >
                <DialogBody>
                    <FaQuestion className="mx-auto h-auto w-28 text-info" />
                    <p className="mt-4 mb-8 text-center text-black">Apakah Anda Yakin Akan Menghapus Data Ini?</p>
                    <div className="mt-8 flex justify-center gap-x-4">
                        <Button
                            className="bg-warning"
                            onClick={() => {
                                setOpenHapusVideoDiDaftarVideo(false);
                                setOpenLihatDaftarVideoDiDaftarTeori(true);
                            }}
                        >
                            Tidak
                        </Button>
                        <Button
                            className="bg-success"
                            onClick={() => {
                                setOpenHapusVideoDiDaftarVideo(false);
                                setOpenLihatDaftarVideoDiDaftarTeori(true);
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

export default MengisiTeori;
