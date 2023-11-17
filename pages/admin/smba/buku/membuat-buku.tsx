import Selects from "@/components/Ui/Selects";
import DialogModal from "@/components/Modal/Modal";
import { PAGE_SIZES, dataMembuatBuku, optionsKelengkapan, optionsKelompokUjian, optionsKurikulum, optionsPelajaran, optionsSemester, optionsTahunAjaran, optionsTingkatKelas } from "@/data/smba/data";
import { Box, NumberInput, TextInput, Textarea } from "@mantine/core";
import { Button, Dialog, DialogBody } from "@material-tailwind/react";
import { sortBy } from "lodash";
import { DataTable, DataTableSortStatus } from "mantine-datatable";
import { useEffect, useMemo, useState } from "react";
import { BiSolidEditAlt } from "react-icons/bi";
import { FaCopy, FaEye, FaPlus, FaQuestion, FaTrash } from "react-icons/fa6";

const MembuatBuku = () => {
    const [openTambahBuku, setOpenTambahBuku] = useState(false);
    const [openUbahBuku, setOpenUbahBuku] = useState(false);
    const [openTambahIsiBuku, setOpenTambahIsiBuku] = useState(false);
    const [openTambahKomponenProduk, setOpenTambahKomponenProduk] = useState(false);
    const [openLihatIsiBuku, setOpenLihatIsiBuku] = useState(false);
    const [openCopyBuku, setOpenCopyBuku] = useState(false);
    const [openKonfirmasiCopyBuku, setOpenKonfirmasiCopyBuku] = useState(false);
    const [openHapusBuku, setOpenHapusBuku] = useState(false);

    const [selectedRowData, setSelectedRowData] = useState<any>(null);
    const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
    const [confirmationTitle, setConfirmationTitle] = useState("");
    const [confirmationAction, setConfirmationAction] = useState("");
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [page, setPage] = useState(1);
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: "namaBuku",
        direction: "asc",
    });
    const sortedRecords = useMemo(() => sortBy(dataMembuatBuku, "namaBuku"), []);
    const [records, setRecords] = useState(sortedRecords.slice(0, pageSize));

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecords(dataMembuatBuku.slice(from, to));
    }, [page, pageSize]);
    useEffect(() => {
        const data = sortBy(dataMembuatBuku, sortStatus.columnAccessor);
        setRecords(sortStatus.direction === "desc" ? data.reverse() : data);
    }, [sortStatus]);

    const handleTambahBuku = (rowData: any) => {
        setSelectedRowData(rowData);
        setOpenTambahBuku(!openTambahBuku);
    };

    const handleUbahBuku = (rowData: any) => {
        setSelectedRowData(rowData);
        setOpenUbahBuku(!openUbahBuku);
    };

    const handleTambahIsiBuku = (rowData: any) => {
        setSelectedRowData(rowData);
        setOpenTambahIsiBuku(!openTambahIsiBuku);
    };

    const handleTambahKomponenProduk = (rowData: any) => {
        setSelectedRowData(rowData);
        setOpenTambahKomponenProduk(!openTambahKomponenProduk);
    };

    const handleLihatIsiBuku = (rowData: any) => {
        setSelectedRowData(rowData);
        setOpenLihatIsiBuku(!openLihatIsiBuku);
    };

    const handleCopyBuku = (rowData: any) => {
        setSelectedRowData(rowData);
        setOpenCopyBuku(!openCopyBuku);
    };

    const handleKonfirmasiCopyBuku = () => {
        setOpenKonfirmasiCopyBuku(!openKonfirmasiCopyBuku);
    };

    const handleHapusBuku = (rowData: any) => {
        setSelectedRowData(rowData);
        setOpenHapusBuku(!openHapusBuku);
    };

    return (
        <>
            <div className="flex flex-wrap items-end gap-x-4">
                <Selects label="Mata Pelajaran" data={optionsPelajaran} withAsterisk required />
                <Selects label="Kurikulum" data={optionsKurikulum} withAsterisk required />
                <Selects label="Tingkat Kelas" data={optionsTingkatKelas} withAsterisk required />
                <Selects label="Jenis" data={optionsKelengkapan} withAsterisk required />
                <Selects label="Semester" data={optionsSemester} withAsterisk required />
                <Button className="bg-info">Lihat</Button>
                <Button className="bg-success" onClick={handleTambahBuku}>
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
                            render: (number) => dataMembuatBuku.indexOf(number) + 1,
                        },
                        { accessor: "namaBuku", title: "Nama Buku", sortable: true },
                        { accessor: "tingkatKelas", title: "Tingkat Kelas", sortable: true },
                        { accessor: "semester", title: "Semester", sortable: true },
                        { accessor: "kurikulum", title: "Kurikulum", sortable: true },
                        { accessor: "jenis", title: "Jenis", sortable: true },
                        { accessor: "kelompokUjian", title: "Kelompok Ujian", sortable: true },
                    ]}
                    rowContextMenu={{
                        items: (record) => [
                            {
                                key: "edit",
                                icon: <BiSolidEditAlt className="h-3 w-3" />,
                                title: `Ubah Buku ${record.namaBuku}`,
                                onClick: () => handleUbahBuku(selectedRowData),
                            },
                            {
                                key: "addBuku",
                                icon: <FaPlus className="h-3 w-3" />,
                                title: `Tambah Isi Buku ${record.namaBuku}`,
                                onClick: () => handleTambahIsiBuku(record.namaBuku),
                            },
                            {
                                key: "addProduk",
                                icon: <FaPlus className="h-3 w-3" />,
                                title: `Tambah Komponen Produk ${record.namaBuku}`,
                                onClick: () => handleTambahKomponenProduk(record.namaBuku),
                            },
                            {
                                key: "see",
                                icon: <FaEye className="h-3 w-3" />,
                                title: `Lihat Isi Buku ${record.namaBuku}`,
                                onClick: () => handleLihatIsiBuku(record.namaBuku),
                            },
                            {
                                key: "copy",
                                icon: <FaCopy className="h-3 w-3" />,
                                title: `Copy Buku ${record.namaBuku}`,
                                onClick: () => handleCopyBuku(record.namaBuku),
                            },
                            {
                                key: "delete",
                                icon: <FaTrash className="h-3 w-3" />,
                                title: `Hapus Buku ${record.namaBuku}`,
                                onClick: () => handleHapusBuku(record.namaBuku),
                            },
                        ],
                    }}
                    totalRecords={dataMembuatBuku.length}
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

            {/* Form Tambah Buku */}
            <DialogModal heightFit open={openTambahBuku} handler={handleTambahBuku} size="xs" title="Form Tambah Buku">
                <TextInput label="Tahun Ajaran" placeholder="2023/2024" withAsterisk required />
                <TextInput className="my-2" label="Tingkat Kelas" placeholder="0 UMUM UMUM" withAsterisk required />
                <NumberInput label="Tingkat Kelas" min={1} max={3} withAsterisk required />
                <TextInput className="my-2" label="Kurikulum" placeholder="CBSA" withAsterisk required />
                <TextInput label="Jenis" placeholder="Lengkap" withAsterisk required />
                <Selects className="my-2" label="Jenis" data={optionsKelompokUjian} withAsterisk required />
                <TextInput label="Nama Buku" placeholder="Nama Buku" withAsterisk required />
                <Textarea className="mt-2" label="Deskripsi" placeholder="Deskripsi" withAsterisk required />
                <div className="mt-8 flex justify-center gap-x-4">
                    <Button
                        className="bg-success"
                        onClick={() => {
                            setOpenTambahBuku(false);
                        }}
                    >
                        Simpan
                    </Button>
                    <Button
                        className="bg-white text-black"
                        onClick={() => {
                            setOpenTambahBuku(false);
                        }}
                    >
                        Tutup
                    </Button>
                </div>
            </DialogModal>

            {/* Form Copy Buku */}
            <DialogModal heightFit open={openCopyBuku} handler={handleCopyBuku} size="xs" title="Form Copy Buku">
                <TextInput label="Nama Buku Yang Dipilih" placeholder="Buku Uji Coba" withAsterisk required />
                <Textarea className="my-2" label="Deskripsi Buku Yang Dipilih" placeholder="Buku Uji Coba" withAsterisk required autosize />
                <TextInput label="Nama Buku Baru" placeholder="Buku Uji Coba" withAsterisk required />
                <Textarea className="my-2" label="Deskripsi Buku Baru" placeholder="Buku Uji Coba" withAsterisk required autosize />
                <Selects label="Tahun Ajaran" data={optionsTahunAjaran} withAsterisk required />
                <Selects className="mt-2" label="Tingkat Kelas" data={optionsTingkatKelas} withAsterisk required />
                <div className="mt-8 flex justify-center gap-x-4">
                    <Button
                        className="bg-info"
                        onClick={() => {
                            setOpenCopyBuku(false);
                            setOpenKonfirmasiCopyBuku(true);
                        }}
                    >
                        Copy Buku
                    </Button>
                    <Button
                        className="bg-white text-black"
                        onClick={() => {
                            setOpenCopyBuku(false);
                        }}
                    >
                        Tutup
                    </Button>
                </div>
            </DialogModal>

            {/* konfirmasi copy buku */}
            <Dialog
                open={openKonfirmasiCopyBuku}
                handler={handleKonfirmasiCopyBuku}
                size="xs"
                dismiss={{
                    escapeKey: false,
                    outsidePress: false,
                }}
                className="bg-white text-black dark:bg-black dark:text-white-light"
            >
                <DialogBody>
                    <FaQuestion className="mx-auto h-auto w-28 text-warning" />
                    <h2 className="mt-4 mb-8 text-center font-semibold text-black">Apakah anda yakin akan Meng-Copy Buku yang di pilih Beserta Isi dan Komponen Produk?</h2>
                    <div className="mt-8 flex justify-center gap-x-4">
                        <Button
                            className="bg-white text-black"
                            onClick={() => {
                                setOpenCopyBuku(true);
                                setOpenKonfirmasiCopyBuku(false);
                            }}
                        >
                            Tidak
                        </Button>
                        <Button
                            className="bg-success"
                            onClick={() => {
                                setOpenCopyBuku(true);
                                setOpenKonfirmasiCopyBuku(false);
                            }}
                        >
                            Ya
                        </Button>
                    </div>
                </DialogBody>
            </Dialog>

            {/* Form Ubah Buku */}
            <DialogModal heightFit open={openUbahBuku} handler={handleUbahBuku} size="xs" title="Form Ubah Buku">
                <TextInput label="Tahun Ajaran" placeholder="2023/2024" withAsterisk required />
                <TextInput className="my-2" label="Tingkat Kelas" placeholder="0 UMUM UMUM" withAsterisk required />
                <NumberInput label="Tingkat Kelas" min={1} max={3} withAsterisk required />
                <TextInput className="my-2" label="Kurikulum" placeholder="CBSA" withAsterisk required />
                <TextInput label="Jenis" placeholder="Lengkap" withAsterisk required />
                <Selects className="my-2" label="Jenis" data={optionsKelompokUjian} withAsterisk required />
                <TextInput label="Nama Buku" placeholder="Nama Buku" withAsterisk required />
                <Textarea className="mt-2" label="Deskripsi" placeholder="Deskripsi" withAsterisk required autosize />
                <div className="mt-8 flex justify-center gap-x-4">
                    <Button
                        className="bg-success"
                        onClick={() => {
                            setOpenUbahBuku(false);
                        }}
                    >
                        Simpan
                    </Button>
                    <Button
                        className="bg-white text-black"
                        onClick={() => {
                            setOpenUbahBuku(false);
                        }}
                    >
                        Tutup
                    </Button>
                </div>
            </DialogModal>

            {/* konfirmasi hapus buku */}
            <Dialog
                open={openHapusBuku}
                handler={handleHapusBuku}
                size="xs"
                dismiss={{
                    escapeKey: false,
                    outsidePress: false,
                }}
                className="bg-white text-black dark:bg-black dark:text-white-light"
            >
                <DialogBody>
                    <FaQuestion className="mx-auto h-auto w-28 text-warning" />
                    <h2 className="mt-4 mb-8 text-center font-semibold text-black">
                        Dengan Menghapus Buku yang Dipilih, maka Isi Buku dan Produk yang Tertaut akan Ikut Terhapus. Apakah Anda Yakin Akan Menghapus data Ini?
                    </h2>
                    <div className="mt-8 flex justify-center gap-x-4">
                        <Button className="bg-success" onClick={handleHapusBuku}>
                            Ya
                        </Button>
                        <Button className="bg-white text-black" onClick={handleHapusBuku}>
                            Tidak
                        </Button>
                    </div>
                </DialogBody>
            </Dialog>
        </>
    );
};

export default MembuatBuku;
