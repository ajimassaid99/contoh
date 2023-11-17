import Selects from "@/components/Ui/Selects";
import DialogModal from "@/components/Modal/Modal";
import {
    PAGE_SIZES,
    dataMonitoringBahKelas,
    optionsKelengkapan,
    optionsKelompokUjian,
    optionsKurikulum,
    optionsPelajaran,
    optionsSemester,
    optionsTahunAjaran,
    optionsTingkatKelas,
    optionsLayanan,
} from "@/data/smba/data";
import { Box, NumberInput, TextInput, Textarea } from "@mantine/core";
import { Button, Dialog, DialogBody } from "@material-tailwind/react";
import { sortBy } from "lodash";
import { DataTable, DataTableSortStatus } from "mantine-datatable";
import { useEffect, useMemo, useState } from "react";
import { BiSolidEditAlt } from "react-icons/bi";
import { FaCopy, FaEye, FaPlus, FaQuestion, FaTrash } from "react-icons/fa6";

const MonitoringBahKelas = () => {
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
    const sortedRecords = useMemo(() => sortBy(dataMonitoringBahKelas, "namaBuku"), []);
    const [records, setRecords] = useState(sortedRecords.slice(0, pageSize));

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecords(dataMonitoringBahKelas.slice(from, to));
    }, [page, pageSize]);
    useEffect(() => {
        const data = sortBy(dataMonitoringBahKelas, sortStatus.columnAccessor);
        setRecords(sortStatus.direction === "desc" ? data.reverse() : data);
    }, [sortStatus]);

    const handleTambahBuku = (rowData: any) => {
        setSelectedRowData(rowData);
        setOpenTambahBuku(!openTambahBuku);
    };

    const handleLihatDetail = (rowData: any) => {
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
                <div className="mb-4 grid w-2/3 grid-cols-2 gap-x-6 gap-y-2">
                    <Selects label="Kota" data={optionsTahunAjaran} withAsterisk required />
                    <Selects label="Gedung" data={optionsLayanan} withAsterisk required />
                    <Selects label="Tahun Ajaran" data={optionsTahunAjaran} withAsterisk required />
                </div>

                <div>
                    <Button className="bg-info">Lihat</Button>
                    {/* <Button className="bg-success" onClick={handleTambahBuku}>
                        Tambah
                    </Button> */}
                </div>
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
                            render: (number) => dataMonitoringBahKelas.indexOf(number) + 1,
                        },
                        { accessor: "namaBuku", title: "Kelas", sortable: true },
                        { accessor: "tingkatKelas", title: "Tingkat Kelas", sortable: true },
                        { accessor: "semester", title: "Jenis Kelas", sortable: true },
                        { accessor: "kurikulum", title: "Status BAH", sortable: true },
                    ]}
                    rowContextMenu={{
                        items: (record) => [
                            {
                                key: "lihat",
                                icon: <BiSolidEditAlt className="h-3 w-3" />,
                                title: `Lihat Detail`,
                                onClick: () => handleLihatDetail(selectedRowData),
                            },
                        ],
                    }}
                    totalRecords={dataMonitoringBahKelas.length}
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
            <DialogModal heightFit open={openTambahBuku} handler={handleTambahBuku} size="lg" title="Form Tambah Buku">
                <h3 className="mb-2 text-xl font-bold">Informasi Kelas</h3>
                <hr className="mb-4 border-2 border-gray-200" />
                <div>
                    <div className="mb-4 flex gap-4">
                        <TextInput className="w-full" label="Nama Kelas" placeholder="Buku 1" withAsterisk required />
                        <Selects className="w-full" label="Tingkat Kelas" data={optionsKelompokUjian} withAsterisk required />
                    </div>
                    <div className="flex gap-4">
                        <Selects className="w-full" label="Layanan" data={optionsKelompokUjian} withAsterisk required />
                    </div>
                </div>
                <h3 className="mt-4 mb-2 text-xl font-bold">Pencarian Bah</h3>
                <hr className="mb-4 border-2 border-gray-200" />
                <div>
                    <div className="mb-4 flex gap-4">
                        <Selects className="w-full" label="Kelompok Ujian" data={optionsKelompokUjian} withAsterisk required />
                        <Selects className="w-full" label="Kurikulum" data={optionsKelompokUjian} withAsterisk required />
                    </div>
                    <div className="flex gap-4">
                        <TextInput type="number" label="Nama Kelas" placeholder="1" withAsterisk required />
                        <div className="flex items-end">
                            <Button className="bg-info">Lihat daftar BAH</Button>
                        </div>
                    </div>
                    <div className="mt-8">
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
                                    render: (number) => dataMonitoringBahKelas.indexOf(number) + 1,
                                },
                                { accessor: "namaBuku", title: "Nama Buku", sortable: true },
                                { accessor: "tingkatKelas", title: "Tanggal Awal", sortable: true },
                                { accessor: "semester", title: "Tanggal Akhir", sortable: true },
                                { accessor: "kurikulum", title: "Role", sortable: true },
                            ]}
                            totalRecords={dataMonitoringBahKelas.length}
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
                    </div>
                </div>
                <div className="mt-8 flex justify-center gap-x-4">
                    <Button
                        className="bg-success"
                        onClick={() => {
                            setOpenTambahBuku(false);
                        }}
                    >
                        Tambah
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

            {/* Form Lihat Detail */}
            <DialogModal heightFit open={openUbahBuku} handler={handleLihatDetail} size="lg" title="Form Ubah Buku">
                <div>
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
                                render: (number) => dataMonitoringBahKelas.indexOf(number) + 1,
                            },
                            { accessor: "namaBuku", title: "Nama Buku", sortable: true },
                            { accessor: "tingkatKelas", title: "Tanggal Awal", sortable: true },
                            { accessor: "semester", title: "Tanggal Akhir", sortable: true },
                            { accessor: "kurikulum", title: "Role", sortable: true },
                        ]}
                        totalRecords={dataMonitoringBahKelas.length}
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
                </div>
                <div className="mt-8 flex justify-center gap-x-4">
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
                    <h2 className="mt-4 mb-8 text-center font-semibold text-black">Apakah anda yakin akan Menghapus Buku yang di pilih Beserta Isi dan Komponen Produk?</h2>
                    <div className="mt-8 flex justify-center gap-x-4">
                        <Button className="bg-success" onClick={handleHapusBuku}>
                            Simpan
                        </Button>
                        <Button className="bg-white text-black" onClick={handleHapusBuku}>
                            Tutup
                        </Button>
                    </div>
                </DialogBody>
            </Dialog>
        </>
    );
};

export default MonitoringBahKelas;
