import DialogModal from "@/components/Modal/Modal";
import { Box, TextInput, Textarea } from "@mantine/core";
import { Button, Dialog, DialogBody } from "@material-tailwind/react";
import { DataTable, DataTableSortStatus } from "mantine-datatable";
import { useEffect, useMemo, useState } from "react";
import { PAGE_SIZES, dataWacana, dataSumberSoalDetail, optionsPelajaran } from "@/data/smba/data";
import { sortBy } from "lodash";
import { BiSolidEditAlt } from "react-icons/bi";
import { FaEye, FaQuestion, FaTrash } from "react-icons/fa6";
import Selects from "@/components/Ui/Selects";
import { Modal } from "@mantine/core";
import dynamic from "next/dynamic";

const Editor = dynamic(() => import("@/components/Editor/Editor"), { ssr: false });

const Wacana = () => {
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [page, setPage] = useState(1);
    const [openTambah, setOpenTambah] = useState(false);
    const [openLihat, setOpenLihat] = useState(false);
    const [openUbah, setOpenUbah] = useState(false);
    const [openHapus, setOpenHapus] = useState(false);
    const [openEditDetailModal, setOpenEditDetailModal] = useState(false);
    const [openFillKodeSumberModal, setOpenFillKodeSumberModal] = useState(false);

    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: "namaSumber",
        direction: "asc",
    });
    const sortedRecords = useMemo(() => sortBy(dataWacana, "namaSumber"), []);
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
        setRecords(dataWacana.slice(from, to));
    }, [page, pageSize]);
    useEffect(() => {
        const data = sortBy(dataWacana, sortStatus.columnAccessor);
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
        setOpenTambah(true);
    };

    const handleLihat = () => {
        setOpenLihat(!openLihat);
    };

    const handleUbah = () => {
        setOpenUbah(true);
    };

    const handleHapus = () => {
        setOpenHapus(!openHapus);
    };

    return (
        <>
            <div className="flex flex-wrap items-end gap-x-4">
                <Textarea className="w-[20%]" label="keyword" autosize />
                <TextInput label="Judul Wacana" />
                <Selects label="Mata Pelajaran" data={optionsPelajaran} withAsterisk={false} />
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
                            width: 75,
                            render: (number) => dataWacana.indexOf(number) + 1,
                        },
                        { accessor: "mataPelajaran", title: "Mata Pelajaran", sortable: true },
                        { accessor: "judulWacana", title: "Judul Wacana", sortable: true },
                        { accessor: "cuplikanTeks", title: "Cuplikan Teks", sortable: true },
                        { accessor: "keyword", title: "Keyword", sortable: true },
                    ]}
                    rowContextMenu={{
                        items: (record) => [
                            {
                                key: "see",
                                icon: <FaEye className="h-3 w-3" />,
                                title: `Lihat  ${record.mataPelajaran}`,
                                onClick: () => handleLihat(),
                            },
                            {
                                key: "edit",
                                icon: <BiSolidEditAlt className="h-3 w-3" />,
                                title: `Ubah  ${record.mataPelajaran}`,
                                onClick: () => handleUbah(),
                            },
                            {
                                key: "delete",
                                icon: <FaTrash className="h-3 w-3" />,
                                title: `Hapus  ${record.mataPelajaran}`,
                                onClick: () => handleHapus(),
                            },
                        ],
                    }}
                    totalRecords={dataWacana.length}
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
            <DialogModal size="md" open={openLihat} handler={handleLihat} heightFit={false} title={"Informasi Wacana"}>
                <ul>
                    <li className="flex items-center gap-x-4">
                        <p className="font-bold">Judul Wacana:</p>
                        <p>Jembatan Gantung</p>
                    </li>
                    <li className="my-4 flex items-center gap-x-4">
                        <p className="font-bold">Mata Pelajaran:</p>
                        <p>Kemampuan Penalaran Umum dan Penalaran Matematika 1</p>
                    </li>
                    <li className="my-4 flex gap-x-4">
                        <p className="w-[14.5%] font-bold">Cuplikan Teks:</p>
                        <div className="w-[74.5%]">
                            <p className="font-semibold">Jembatan Gantung</p>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi facilis excepturi dolor nam ab ea optio. Amet laboriosam fugit culpa vero. Labore repudiandae molestiae
                                voluptate asperiores, doloribus suscipit accusantium dicta! Laudantium qui eveniet dolore temporibus nesciunt, rem natus nam ut iure explicabo amet, exercitationem
                                veritatis, beatae iste id repellat ullam. Earum consequatur recusandae rem magni veritatis odit pariatur incidunt laudantium doloremque quibusdam. Labore sapiente vitae
                                ad, aspernatur atque dolorum eos, sint voluptatibus quod porro harum nam voluptatum earum fuga modi ducimus amet expedita ullam dolores quis. Nesciunt facilis optio,
                                eum doloremque nulla dicta possimus itaque cum deserunt placeat quaerat omnis aut? Consectetur molestiae inventore sint ipsam assumenda doloremque suscipit commodi
                                tenetur ipsa minima ea reiciendis excepturi minus eaque quo fugit debitis aperiam error ullam perferendis, magni provident enim veniam dignissimos! Laboriosam maxime
                                aliquam, non possimus sed eaque animi at deserunt cumque officiis distinctio illum, delectus consequatur ratione temporibus tenetur quos ipsum sapiente id praesentium?
                                Quibusdam id nemo temporibus dolore in laborum obcaecati repellendus sint qui, veniam, quod repellat officia nam beatae aperiam dolores voluptatibus amet quis nobis!
                                Nesciunt aspernatur quaerat sit illum culpa deleniti ullam recusandae a eum. Praesentium nemo, molestiae odio iure aut hic consequatur vel impedit quam necessitatibus.
                            </p>
                        </div>
                    </li>
                </ul>
            </DialogModal>

            {/* Tambah */}
            <Modal size="70%" opened={openTambah} onClose={() => setOpenTambah(false)} title="Form Tambah Wacana" centered>
                <div className="flex gap-x-4">
                    <div className="w-2/3">
                        <label htmlFor="cuplikan">Cuplikan Teks</label>
                        <Editor isParent={true} />
                    </div>
                    <div className="w-1/3">
                        <TextInput label="Judul Wacana" placeholder="Judul Wacana" withAsterisk required />
                        <Selects className="my-2" label="Mata Pelajaran" data={optionsPelajaran} withAsterisk required />
                        <Textarea label="Keyword" placeholder="Keyword" autosize withAsterisk required />
                    </div>
                </div>

                <div className="mt-8 flex justify-center gap-x-4">
                    <Button className="bg-success" onClick={() => setOpenTambah(false)}>
                        Simpan
                    </Button>
                    <Button className="bg-white text-black" onClick={() => setOpenTambah(false)}>
                        Tutup
                    </Button>
                </div>
            </Modal>

            {/* Ubah */}
            <Modal size="70%" opened={openUbah} onClose={() => setOpenUbah(false)} title="Form Ubah Wacana" centered>
                <div className="flex gap-x-4">
                    <div className="w-2/3">
                        <label htmlFor="cuplikan">Cuplikan Teks</label>
                        <Editor isParent={true} />
                    </div>
                    <div className="w-1/3">
                        <TextInput label="Judul Wacana" placeholder="Judul Wacana" withAsterisk required />
                        <Selects className="my-2" label="Mata Pelajaran" data={optionsPelajaran} withAsterisk required />
                        <Textarea label="Keyword" placeholder="Keyword" autosize withAsterisk required />
                    </div>
                </div>

                <div className="mt-8 flex justify-center gap-x-4">
                    <Button className="bg-success" onClick={() => setOpenUbah(false)}>
                        Simpan
                    </Button>
                    <Button className="bg-white text-black" onClick={() => setOpenUbah(false)}>
                        Tutup
                    </Button>
                </div>
            </Modal>

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
                    <p className="mt-4 mb-8 text-center text-black">Apakah Anda Yakin Akan Menghapus Data Ini?</p>
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

export default Wacana;
