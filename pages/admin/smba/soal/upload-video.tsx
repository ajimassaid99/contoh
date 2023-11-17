import { useEffect, useMemo, useState } from "react";
import { PAGE_SIZES, dataPetikanSoal, dataUploadVideo, optionsKurikulum, optionsLevelKognitif, optionsMetodePengambilan } from "@/data/smba/data";
import { Button, Dialog, DialogBody, DialogHeader } from "@material-tailwind/react";
import { Box, FileInput, TextInput, Textarea } from "@mantine/core";
import { DataTable, DataTableSortStatus } from "mantine-datatable";
import { sortBy } from "lodash";
import DialogModal from "@/components/Modal/Modal";
import { BiSolidEditAlt } from "react-icons/bi";
import { FaQuestion, FaTrash, FaVideo } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import Selects from "@/components/Ui/Selects";
import { MdAdd } from "react-icons/md";

const UploadVideo = () => {
    const [openTambah, setOpenTambah] = useState(false);
    const [openCariSoal, setOpenCariSoal] = useState(false);
    const [openUbah, setOpenUbah] = useState(false);
    const [openTambahPetikanSoal, setOpenTambahPetikanSoal] = useState(false);
    const [openHapus, setOpenHapus] = useState(false);
    const [openVideo, setOpenVideo] = useState(false);
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [page, setPage] = useState(1);

    const [sortStatusVideo, setSortStatusVideo] = useState<DataTableSortStatus>({
        columnAccessor: "judulVideo",
        direction: "asc",
    });
    const sortedRecordVideo = useMemo(() => sortBy(dataUploadVideo, "judulVideo"), []);
    const [recordVideo, setRecordVideo] = useState(sortedRecordVideo.slice(0, pageSize));

    const [sortStatusPetikanSoal, setSortStatusPetikanSoal] = useState<DataTableSortStatus>({
        columnAccessor: "idSoal",
        direction: "asc",
    });
    const sortedRecordPetikanSoal = useMemo(() => sortBy(dataPetikanSoal, "idSoal"), []);
    const [recordPetikanSoal, setRecordPetikanSoal] = useState(sortedRecordPetikanSoal.slice(0, pageSize));

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecordVideo(dataUploadVideo.slice(from, to));
    }, [page, pageSize]);
    useEffect(() => {
        const data = sortBy(dataUploadVideo, sortStatusVideo.columnAccessor);
        setRecordVideo(sortStatusVideo.direction === "desc" ? data.reverse() : data);
    }, [sortStatusVideo]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecordPetikanSoal(dataPetikanSoal.slice(from, to));
    }, [page, pageSize]);
    useEffect(() => {
        const data = sortBy(dataPetikanSoal, sortStatusPetikanSoal.columnAccessor);
        setRecordPetikanSoal(sortStatusPetikanSoal.direction === "desc" ? data.reverse() : data);
    }, [sortStatusPetikanSoal]);

    const handleTambah = () => {
        setOpenTambah(!openTambah);
    };

    const handleCariSoal = () => {
        setOpenCariSoal(!openCariSoal);
    };

    const handleUbah = () => {
        setOpenUbah(!openUbah);
    };

    const handleTambahPetikanSoal = () => {
        setOpenTambahPetikanSoal(true);
        setOpenCariSoal(false);
    };

    const handleLihatVideo = () => {
        setOpenVideo(!openVideo);
    };

    const handleHapus = () => {
        setOpenHapus(!openHapus);
    };
    return (
        <>
            <div className="flex items-end justify-between">
                <div className="flex items-end gap-x-4">
                    <TextInput placeholder="ID Soal" label="ID Soal" />
                    <Button className="max-w-max bg-info">Cari</Button>
                </div>
                <div className="flex items-end gap-x-4">
                    <Button className="max-w-max bg-success" onClick={handleTambah}>
                        Tambah Video
                    </Button>
                    <Button className="max-w-max bg-info" onClick={handleCariSoal}>
                        Cari Soal Belum Ada Video
                    </Button>
                </div>
            </div>
            <Box sx={{ height: recordVideo.length > 10 ? 750 : "auto" }} className="mt-4">
                <DataTable
                    className="z-0"
                    withColumnBorders
                    highlightOnHover
                    shadow="sm"
                    records={recordVideo}
                    columns={[
                        {
                            accessor: "number",
                            title: "NO",
                            render: (number) => dataUploadVideo.indexOf(number) + 1,
                        },
                        {
                            accessor: "cuplikanSoal",
                            title: "Cuplikan Soal",
                            sortable: true,
                        },
                        {
                            accessor: "judulVideo",
                            title: "Judul Video",
                            sortable: true,
                        },
                        {
                            accessor: "deskripsi",
                            title: "Deskripsi",
                            sortable: true,
                        },
                        {
                            accessor: "linkVideo",
                            title: "Link Video",
                            sortable: true,
                        },
                    ]}
                    rowContextMenu={{
                        items: () => [
                            {
                                key: "see",
                                icon: <FaVideo className="h-3 w-3" />,
                                title: "Lihat Video",
                                onClick: () => handleLihatVideo(),
                            },
                            {
                                key: "edit",
                                icon: <BiSolidEditAlt className="h-3 w-3" />,
                                title: "Ubah",
                                onClick: () => handleUbah(),
                            },
                            {
                                key: "delete",
                                icon: <FaTrash className="h-3 w-3" />,
                                title: "Hapus",
                                onClick: () => handleHapus(),
                            },
                        ],
                    }}
                    totalRecords={dataUploadVideo.length}
                    sortStatus={sortStatusVideo}
                    onSortStatusChange={setSortStatusVideo}
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
            <Dialog
                open={openTambah}
                size="xl"
                handler={handleTambah}
                dismiss={{
                    escapeKey: false,
                    outsidePress: false,
                }}
                className="bg-white text-black dark:bg-black dark:text-white-light"
            >
                <DialogHeader className="flex items-center justify-between dark:text-white-light">
                    <h2 className="text-md">Form Tambah Video Soal</h2>
                    <IoMdClose
                        onClick={() => {
                            setOpenTambah(false);
                        }}
                        className="h-8 w-8 cursor-pointer rounded-full p-1 shadow-md"
                    />
                </DialogHeader>
                <DialogBody className="no-scrollbar h-[60vh] overflow-y-scroll rounded-xl border-none bg-white p-5 text-sm text-black dark:bg-black dark:text-white-light md:h-[60vh]">
                    <div className="relative flex flex-col gap-x-2 md:flex-row">
                        <div className="mr-2 w-1/3 border-r-2 border-r-black">
                            <div className="fixed w-[23%]">
                                <div className="flex items-end gap-x-6">
                                    <FileInput className="w-1/2" label="Ambil Video" placeholder="Ambil Video" accept="video/mp4,video/x-m4v,video/*" withAsterisk required />
                                    <p className="mb-2">Maksimal 500 MB (.mp4)</p>
                                </div>
                                <TextInput className="my-2" label="Judul Video" placeholder="Judul Video" withAsterisk />
                                <Textarea label="Deskripsi" placeholder="Deskripsi" withAsterisk />
                                <Textarea className="my-2" label="Keyword" placeholder="Keyword" withAsterisk />
                                <div className="flex items-end gap-x-4">
                                    <TextInput className="w-2/3" label="ID Soal" placeholder="ID Soal" withAsterisk />
                                    <Button className="w-1/3 bg-info">Lihat Soal</Button>
                                </div>
                                <div className="mt-8 flex justify-center gap-x-4">
                                    <Button className="bg-success" onClick={handleTambah}>
                                        Simpan
                                    </Button>
                                    <Button className="bg-white text-black" onClick={handleTambah}>
                                        Tutup
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="w-2/3 overflow-y-scroll">
                            <h2 className="text-center text-xl font-bold">Soal 1</h2>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, similique nam quidem reiciendis dolorem earum autem aspernatur accusamus numquam eaque aliquid ducimus
                                iusto quod debitis non expedita minus error itaque odio ea, at rerum corporis. Commodi nostrum eum, itaque totam repellat quae nisi non dignissimos quaerat autem,
                                fugiat reiciendis, deleniti perspiciatis sunt optio blanditiis omnis harum. Veniam unde ut magni soluta dignissimos adipisci magnam ex quam odit. Quas, ducimus nemo
                                officiis deleniti corrupti incidunt, numquam, aliquid aperiam necessitatibus ab commodi molestiae excepturi eaque impedit iste quis tenetur dolorum quae. Quae hic,
                                laborum amet fuga velit magni culpa nostrum error omnis aspernatur? Non maxime iure illum cum. Alias animi, suscipit numquam ipsa delectus, tenetur ut facilis totam aut
                                itaque dignissimos! Consequatur et sint corporis nulla tenetur eligendi molestias totam iusto repudiandae quidem doloremque obcaecati illo, saepe quod neque aperiam
                                laborum veniam in? Nulla alias quas possimus dolores ex sit! Eveniet, atque nesciunt a temporibus odio, architecto laboriosam tempora culpa quasi at sed maxime, velit
                                cupiditate quaerat veniam minima sit eligendi perferendis aliquam. Ad quasi eius, unde corporis excepturi harum similique vel officiis, exercitationem aliquid alias
                                quos consectetur laborum saepe quibusdam aliquam consequuntur quia itaque repellendus. Tenetur voluptate rerum in suscipit animi, sed ex hic unde. Illo suscipit veniam
                                veritatis, libero cum assumenda expedita fuga, officia nemo soluta corrupti tempora asperiores dignissimos sunt perspiciatis. Ullam quasi labore enim laboriosam laborum
                                libero placeat sed! Deleniti obcaecati quam ullam iure eaque voluptatem libero ducimus quae doloribus inventore ea vero impedit minus commodi enim veniam nostrum,
                                tempore ex quibusdam. Totam explicabo dicta sapiente officia temporibus error nihil, molestias provident id pariatur inventore doloremque? Sapiente neque officia modi
                                aut consequuntur error dolore eligendi nostrum id laborum! Quae, fugit quidem eveniet magni eaque optio debitis aperiam assumenda recusandae veniam inventore itaque
                                minima natus maiores quia quo repellendus, repudiandae aliquam eligendi, quod veritatis distinctio iste? Unde vitae fuga molestias assumenda amet et, voluptas sapiente
                                magni voluptatum ipsam accusantium illum repellendus deserunt minima, error iusto voluptatibus sequi ipsa laudantium nihil magnam? Vel, impedit doloribus! Provident
                                labore rerum ea placeat similique nisi omnis repudiandae vitae soluta minus, excepturi dolores quas expedita delectus, est ullam? Ipsum neque ab sapiente, culpa numquam
                                consequuntur asperiores possimus corrupti autem eligendi amet enim, dolore consectetur quisquam facere omnis ipsa ratione nemo incidunt vitae. Magni assumenda quam nisi
                                doloribus, iusto amet odit nam voluptas adipisci fugit, ducimus quis molestias culpa, consequuntur maiores ab nesciunt? Laudantium fugit natus mollitia! Rem soluta enim
                                ea rerum modi vitae animi, quidem illo maiores, autem incidunt in ipsam, repudiandae ullam. Nostrum dolorum reiciendis libero quas deserunt, repellat sint doloremque
                                deleniti aspernatur quod tempore odio neque aperiam voluptatum doloribus. Quod id aliquid mollitia nostrum provident atque amet sed blanditiis minima assumenda,
                                voluptatibus cum, molestiae quas velit perspiciatis pariatur doloribus, culpa fugiat ab.
                            </p>
                        </div>
                    </div>
                </DialogBody>
            </Dialog>

            {/* Cari Soal */}
            <DialogModal open={openCariSoal} handler={handleCariSoal} size="lg" heightFit={false} title="Cari soal yang belum ada">
                <div className="flex flex-wrap items-end gap-x-4">
                    <Selects label="Tipe Soal" data={optionsKurikulum} withAsterisk required />
                    <Selects label="Metode Pengambilan" data={optionsMetodePengambilan} withAsterisk required />
                    <Selects label="Level Kognitif" data={optionsLevelKognitif} withAsterisk required />
                    <Button className="bg-info">Cari</Button>
                </div>
                <Box sx={{ height: recordPetikanSoal.length > 10 ? 750 : "auto" }} className="mt-4">
                    <DataTable
                        className="z-0"
                        withColumnBorders
                        highlightOnHover
                        shadow="sm"
                        records={recordPetikanSoal}
                        columns={[
                            {
                                accessor: "number",
                                title: "NO",
                                width: 75,
                                render: (number) => dataPetikanSoal.indexOf(number) + 1,
                            },
                            {
                                accessor: "idSoal",
                                title: "ID Soal",
                                sortable: true,
                            },
                            {
                                accessor: "petikanSoal",
                                title: "Petikan Soal",
                                width: "90%",
                                sortable: true,
                            },
                        ]}
                        rowContextMenu={{
                            items: (record) => [
                                {
                                    key: "add",
                                    icon: <MdAdd className="h-3 w-3" />,
                                    title: `Tambahkan Video ${record.idSoal}`,
                                    onClick: () => handleTambahPetikanSoal(),
                                },
                            ],
                        }}
                        totalRecords={dataPetikanSoal.length}
                        sortStatus={sortStatusPetikanSoal}
                        onSortStatusChange={setSortStatusPetikanSoal}
                        recordsPerPage={pageSize}
                        page={page}
                        paginationSize="sm"
                        onPageChange={(p) => setPage(p)}
                        recordsPerPageOptions={PAGE_SIZES}
                        onRecordsPerPageChange={setPageSize}
                        paginationText={({ from, to, totalRecords }) => `Records ${from} - ${to} of ${totalRecords}`}
                    />
                </Box>
            </DialogModal>

            {/* Tambah Petikan Soal */}
            <Dialog
                open={openTambahPetikanSoal}
                size="xl"
                handler={() => {
                    setOpenCariSoal(false);
                    setOpenTambahPetikanSoal(true);
                }}
                dismiss={{
                    escapeKey: false,
                    outsidePress: false,
                }}
                className="bg-white text-black dark:bg-black dark:text-white-light"
            >
                <DialogHeader className="flex items-center justify-between dark:text-white-light">
                    <h2 className="text-md">Form Tambah Video Soal</h2>
                    <IoMdClose
                        onClick={() => {
                            setOpenTambahPetikanSoal(false);
                            setOpenCariSoal(true);
                        }}
                        className="h-8 w-8 cursor-pointer rounded-full p-1 shadow-md"
                    />
                </DialogHeader>
                <DialogBody className="no-scrollbar h-[60vh] overflow-y-scroll rounded-xl border-none bg-white p-5 text-sm text-black dark:bg-black dark:text-white-light md:h-[60vh]">
                    <div className="relative flex flex-col gap-x-2 md:flex-row">
                        <div className="mr-2 w-1/3 border-r-2 border-r-black">
                            <div className="fixed w-[23%]">
                                <div className="flex items-end gap-x-6">
                                    <FileInput className="w-1/2" label="Ambil Video" placeholder="Ambil Video" accept="video/mp4,video/x-m4v,video/*" withAsterisk required />
                                    <p className="mb-2">Maksimal 500 MB (.mp4)</p>
                                </div>
                                <TextInput className="my-2" label="Judul Video" placeholder="Judul Video" withAsterisk />
                                <Textarea label="Deskripsi" placeholder="Deskripsi" withAsterisk />
                                <Textarea className="my-2" label="Keyword" placeholder="Keyword" withAsterisk />
                                <div className="flex items-end gap-x-4">
                                    <TextInput className="w-2/3" label="ID Soal" placeholder="ID Soal" withAsterisk />
                                    <Button className="w-1/3 bg-info">Lihat Soal</Button>
                                </div>
                                <div className="mt-8 flex justify-center gap-x-4">
                                    <Button
                                        className="bg-success"
                                        onClick={() => {
                                            setOpenTambahPetikanSoal(false);
                                            setOpenCariSoal(true);
                                        }}
                                    >
                                        Simpan
                                    </Button>
                                    <Button
                                        className="bg-white text-black"
                                        onClick={() => {
                                            setOpenTambahPetikanSoal(false);
                                            setOpenCariSoal(true);
                                        }}
                                    >
                                        Tutup
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="w-2/3 overflow-y-scroll">
                            <h2 className="text-center text-xl font-bold">Soal 1</h2>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, similique nam quidem reiciendis dolorem earum autem aspernatur accusamus numquam eaque aliquid ducimus
                                iusto quod debitis non expedita minus error itaque odio ea, at rerum corporis. Commodi nostrum eum, itaque totam repellat quae nisi non dignissimos quaerat autem,
                                fugiat reiciendis, deleniti perspiciatis sunt optio blanditiis omnis harum. Veniam unde ut magni soluta dignissimos adipisci magnam ex quam odit. Quas, ducimus nemo
                                officiis deleniti corrupti incidunt, numquam, aliquid aperiam necessitatibus ab commodi molestiae excepturi eaque impedit iste quis tenetur dolorum quae. Quae hic,
                                laborum amet fuga velit magni culpa nostrum error omnis aspernatur? Non maxime iure illum cum. Alias animi, suscipit numquam ipsa delectus, tenetur ut facilis totam aut
                                itaque dignissimos! Consequatur et sint corporis nulla tenetur eligendi molestias totam iusto repudiandae quidem doloremque obcaecati illo, saepe quod neque aperiam
                                laborum veniam in? Nulla alias quas possimus dolores ex sit! Eveniet, atque nesciunt a temporibus odio, architecto laboriosam tempora culpa quasi at sed maxime, velit
                                cupiditate quaerat veniam minima sit eligendi perferendis aliquam. Ad quasi eius, unde corporis excepturi harum similique vel officiis, exercitationem aliquid alias
                                quos consectetur laborum saepe quibusdam aliquam consequuntur quia itaque repellendus. Tenetur voluptate rerum in suscipit animi, sed ex hic unde. Illo suscipit veniam
                                veritatis, libero cum assumenda expedita fuga, officia nemo soluta corrupti tempora asperiores dignissimos sunt perspiciatis. Ullam quasi labore enim laboriosam laborum
                                libero placeat sed! Deleniti obcaecati quam ullam iure eaque voluptatem libero ducimus quae doloribus inventore ea vero impedit minus commodi enim veniam nostrum,
                                tempore ex quibusdam. Totam explicabo dicta sapiente officia temporibus error nihil, molestias provident id pariatur inventore doloremque? Sapiente neque officia modi
                                aut consequuntur error dolore eligendi nostrum id laborum! Quae, fugit quidem eveniet magni eaque optio debitis aperiam assumenda recusandae veniam inventore itaque
                                minima natus maiores quia quo repellendus, repudiandae aliquam eligendi, quod veritatis distinctio iste? Unde vitae fuga molestias assumenda amet et, voluptas sapiente
                                magni voluptatum ipsam accusantium illum repellendus deserunt minima, error iusto voluptatibus sequi ipsa laudantium nihil magnam? Vel, impedit doloribus! Provident
                                labore rerum ea placeat similique nisi omnis repudiandae vitae soluta minus, excepturi dolores quas expedita delectus, est ullam? Ipsum neque ab sapiente, culpa numquam
                                consequuntur asperiores possimus corrupti autem eligendi amet enim, dolore consectetur quisquam facere omnis ipsa ratione nemo incidunt vitae. Magni assumenda quam nisi
                                doloribus, iusto amet odit nam voluptas adipisci fugit, ducimus quis molestias culpa, consequuntur maiores ab nesciunt? Laudantium fugit natus mollitia! Rem soluta enim
                                ea rerum modi vitae animi, quidem illo maiores, autem incidunt in ipsam, repudiandae ullam. Nostrum dolorum reiciendis libero quas deserunt, repellat sint doloremque
                                deleniti aspernatur quod tempore odio neque aperiam voluptatum doloribus. Quod id aliquid mollitia nostrum provident atque amet sed blanditiis minima assumenda,
                                voluptatibus cum, molestiae quas velit perspiciatis pariatur doloribus, culpa fugiat ab.
                            </p>
                        </div>
                    </div>
                </DialogBody>
            </Dialog>

            {/* Tambah */}
            <Dialog
                open={openUbah}
                size="xl"
                handler={handleUbah}
                dismiss={{
                    escapeKey: false,
                    outsidePress: false,
                }}
                className="bg-white text-black dark:bg-black dark:text-white-light"
            >
                <DialogHeader className="flex items-center justify-between dark:text-white-light">
                    <h2 className="text-md">Form Ubah Video Soal</h2>
                    <IoMdClose
                        onClick={() => {
                            setOpenUbah(false);
                        }}
                        className="h-8 w-8 cursor-pointer rounded-full p-1 shadow-md"
                    />
                </DialogHeader>
                <DialogBody className="no-scrollbar h-[60vh] overflow-y-scroll rounded-xl border-none bg-white p-5 text-sm text-black dark:bg-black dark:text-white-light md:h-[60vh]">
                    <div className="relative flex flex-col gap-x-2 md:flex-row">
                        <div className="mr-2 w-1/3 border-r-2 border-r-black">
                            <div className="fixed w-[23%]">
                                <div className="flex items-end gap-x-6">
                                    <FileInput className="w-1/2" label="Ambil Video" placeholder="Ambil Video" accept="video/mp4,video/x-m4v,video/*" withAsterisk required />
                                    <p className="mb-2">Maksimal 500 MB (.mp4)</p>
                                </div>
                                <TextInput className="my-2" label="Judul Video" placeholder="Judul Video" withAsterisk />
                                <Textarea label="Deskripsi" placeholder="Deskripsi" withAsterisk />
                                <Textarea className="my-2" label="Keyword" placeholder="Keyword" withAsterisk />
                                <div className="flex items-end gap-x-4">
                                    <TextInput className="w-2/3" label="ID Soal" placeholder="ID Soal" withAsterisk />
                                    <Button className="w-1/3 bg-info">Lihat Soal</Button>
                                </div>
                                <div className="mt-8 flex justify-center gap-x-4">
                                    <Button className="bg-success" onClick={handleUbah}>
                                        Simpan
                                    </Button>
                                    <Button className="bg-white text-black" onClick={handleUbah}>
                                        Tutup
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="w-2/3 overflow-y-scroll">
                            <h2 className="text-center text-xl font-bold">Soal 1</h2>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, similique nam quidem reiciendis dolorem earum autem aspernatur accusamus numquam eaque aliquid ducimus
                                iusto quod debitis non expedita minus error itaque odio ea, at rerum corporis. Commodi nostrum eum, itaque totam repellat quae nisi non dignissimos quaerat autem,
                                fugiat reiciendis, deleniti perspiciatis sunt optio blanditiis omnis harum. Veniam unde ut magni soluta dignissimos adipisci magnam ex quam odit. Quas, ducimus nemo
                                officiis deleniti corrupti incidunt, numquam, aliquid aperiam necessitatibus ab commodi molestiae excepturi eaque impedit iste quis tenetur dolorum quae. Quae hic,
                                laborum amet fuga velit magni culpa nostrum error omnis aspernatur? Non maxime iure illum cum. Alias animi, suscipit numquam ipsa delectus, tenetur ut facilis totam aut
                                itaque dignissimos! Consequatur et sint corporis nulla tenetur eligendi molestias totam iusto repudiandae quidem doloremque obcaecati illo, saepe quod neque aperiam
                                laborum veniam in? Nulla alias quas possimus dolores ex sit! Eveniet, atque nesciunt a temporibus odio, architecto laboriosam tempora culpa quasi at sed maxime, velit
                                cupiditate quaerat veniam minima sit eligendi perferendis aliquam. Ad quasi eius, unde corporis excepturi harum similique vel officiis, exercitationem aliquid alias
                                quos consectetur laborum saepe quibusdam aliquam consequuntur quia itaque repellendus. Tenetur voluptate rerum in suscipit animi, sed ex hic unde. Illo suscipit veniam
                                veritatis, libero cum assumenda expedita fuga, officia nemo soluta corrupti tempora asperiores dignissimos sunt perspiciatis. Ullam quasi labore enim laboriosam laborum
                                libero placeat sed! Deleniti obcaecati quam ullam iure eaque voluptatem libero ducimus quae doloribus inventore ea vero impedit minus commodi enim veniam nostrum,
                                tempore ex quibusdam. Totam explicabo dicta sapiente officia temporibus error nihil, molestias provident id pariatur inventore doloremque? Sapiente neque officia modi
                                aut consequuntur error dolore eligendi nostrum id laborum! Quae, fugit quidem eveniet magni eaque optio debitis aperiam assumenda recusandae veniam inventore itaque
                                minima natus maiores quia quo repellendus, repudiandae aliquam eligendi, quod veritatis distinctio iste? Unde vitae fuga molestias assumenda amet et, voluptas sapiente
                                magni voluptatum ipsam accusantium illum repellendus deserunt minima, error iusto voluptatibus sequi ipsa laudantium nihil magnam? Vel, impedit doloribus! Provident
                                labore rerum ea placeat similique nisi omnis repudiandae vitae soluta minus, excepturi dolores quas expedita delectus, est ullam? Ipsum neque ab sapiente, culpa numquam
                                consequuntur asperiores possimus corrupti autem eligendi amet enim, dolore consectetur quisquam facere omnis ipsa ratione nemo incidunt vitae. Magni assumenda quam nisi
                                doloribus, iusto amet odit nam voluptas adipisci fugit, ducimus quis molestias culpa, consequuntur maiores ab nesciunt? Laudantium fugit natus mollitia! Rem soluta enim
                                ea rerum modi vitae animi, quidem illo maiores, autem incidunt in ipsam, repudiandae ullam. Nostrum dolorum reiciendis libero quas deserunt, repellat sint doloremque
                                deleniti aspernatur quod tempore odio neque aperiam voluptatum doloribus. Quod id aliquid mollitia nostrum provident atque amet sed blanditiis minima assumenda,
                                voluptatibus cum, molestiae quas velit perspiciatis pariatur doloribus, culpa fugiat ab.
                            </p>
                        </div>
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
                    <p className="mt-4 mb-8 text-center text-black">Apakah Apakah Anda Yakin Akan Menghapus Data Ini?</p>
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

            <DialogModal open={openVideo} size="xl" handler={handleLihatVideo} heightFit={false} title="Modal Lihat Video dan Preview Soal">
                <div className="relative flex gap-x-4">
                    <div className="w-1/2">
                        <video className="fixed h-auto w-1/3 rounded-lg" controls>
                            <source src="/demo.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                    <div className="w-1/2 overflow-y-scroll">
                        <h2 className="text-center text-lg font-bold">Soal 1</h2>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam ex atque, incidunt numquam, accusamus illum eligendi veritatis ea commodi cum, optio quam. Hic, est harum
                            praesentium perferendis sed commodi mollitia veniam architecto placeat ipsam optio quia temporibus et vitae dignissimos, natus molestiae blanditiis eius nesciunt dolore!
                            Nihil pariatur aut similique unde architecto, deserunt, nobis perferendis nam magni, autem exercitationem assumenda. Quam culpa dolor optio deleniti magnam, rerum
                            exercitationem! Nesciunt reiciendis a enim aut beatae culpa adipisci tenetur eius, velit, sapiente rerum architecto temporibus eveniet provident repellat atque officiis et
                            sint eaque reprehenderit quibusdam omnis corporis! Amet illo eos odio quas officia ipsam atque repudiandae vero. Non eaque autem eum quam sapiente magnam, commodi et eius
                            neque soluta? Vitae, qui. Sunt, cumque eum incidunt eaque consequatur ad vero sequi tempora doloremque expedita deserunt ut corporis, minima odio! Veniam minima eaque
                            repudiandae nobis modi voluptatibus fugiat perspiciatis culpa voluptatem, nemo temporibus iure, similique praesentium quis eligendi, numquam animi tempora nesciunt. Facere,
                            debitis. Recusandae rerum cupiditate nam aspernatur sed praesentium omnis provident, porro eum dignissimos soluta dicta error dolores laboriosam minus quibusdam asperiores
                            iure repellendus. Dolore eveniet harum, recusandae nemo repellendus vero officiis. Quae impedit inventore consectetur, a laboriosam quibusdam illo, nisi, totam incidunt
                            quisquam aliquid? Voluptatum quam ratione tenetur ex vel eius odio, consequuntur unde doloribus dolores vitae nisi illo repudiandae quis! Dolor sed, sequi mollitia possimus
                            cum autem sit unde iure ipsam, voluptatibus corporis corrupti? Repudiandae quam tempore atque animi neque saepe quidem ipsam. Expedita cum placeat repudiandae magni
                            quibusdam odit vero, quo temporibus, possimus nemo aspernatur libero architecto. Voluptatum doloremque, modi inventore delectus dolorem optio necessitatibus porro ex
                            quibusdam alias beatae, ducimus, minima quaerat odit? Dolor quam harum est delectus eos aliquid, in nam debitis error eum fugit iure itaque culpa esse! Voluptate quam
                            temporibus consequatur, repellendus excepturi eligendi et rem alias debitis est! Fugit deserunt beatae molestias quasi nostrum natus, optio iure temporibus nam vel? Quos,
                            veniam dolore officia optio odio exercitationem libero consequuntur totam, doloribus tempore officiis hic alias ipsum possimus magni deserunt veritatis quo doloremque
                            explicabo modi expedita, quisquam ratione! Non praesentium possimus est veniam quod reprehenderit alias nemo animi. Culpa cum perspiciatis, error obcaecati expedita
                            temporibus ea veritatis nulla suscipit eos hic sapiente officia minima sequi natus ut nostrum adipisci iste repellat quidem nobis commodi facere harum? Quasi deserunt animi
                            repellendus. Quo ipsa doloribus nam, explicabo natus laborum animi distinctio. Expedita eaque dolorum doloremque recusandae tempora a possimus architecto cumque aut
                            molestiae eos minima, doloribus reprehenderit ut omnis, illum sapiente quas fuga earum. Possimus ducimus similique porro laboriosam earum eius, consequuntur quasi natus
                            expedita assumenda ipsam aliquid eligendi inventore enim voluptatum. Velit molestias, culpa molestiae facilis repellendus est voluptas fuga nihil fugit aliquam mollitia
                            incidunt reiciendis consectetur possimus a nulla sit commodi error autem illum maxime quod odit eveniet. Explicabo, repellat dignissimos enim laudantium nostrum fugit ullam
                            ipsa optio fuga tenetur modi facere neque similique voluptas, accusantium eius omnis? Nihil ratione recusandae tempora atque ducimus, cumque dignissimos consequatur, aut
                            laboriosam est illo, quod voluptatibus facilis sapiente?
                        </p>
                    </div>
                </div>
            </DialogModal>
        </>
    );
};

export default UploadVideo;
