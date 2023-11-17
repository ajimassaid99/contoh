import { Badge, Box, TextInput } from "@mantine/core";
import { Button, Dialog, DialogBody, DialogHeader, Tab, TabPanel, Tabs, TabsBody, TabsHeader } from "@material-tailwind/react";
import { sortBy } from "lodash";
import { DataTable, DataTableSortStatus } from "mantine-datatable";
import { useEffect, useMemo, useState } from "react";
import { BiSolidEditAlt, BiUserCircle } from "react-icons/bi";
import { FaCheck, FaQuestion } from "react-icons/fa6";
import { PAGE_SIZES, dataSimulasi, dataPilihBiodata, optionsTahunAjaran, optionsAsalSekolah, optionsKota, optionsProvinsi, optionsTingkat, dataHistory } from "@/components/go-kasir/data";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import Selects from "@/components/Ui/Selects";
import InputDate from "@/components/Ui/InputDate";
import FormatRupiah from "@/components/Rupiah/FormatRupiah";
import SimulasiSiswa from "@/components/go-kasir/component/transaksi/simulasi/SimulasiSiswa";
import InfoBiodataSiswa from "@/components/go-kasir/component/transaksi/simulasi/data-siswa/component/InfoBiodata";
import KartuIdentitasSiswa from "@/components/go-kasir/component/transaksi/simulasi/data-siswa/component/KartuIdentitas";
import SaudaraSiswa from "@/components/go-kasir/component/transaksi/simulasi/data-siswa/component/Saudara";
import dayjs from "dayjs";
import "dayjs/locale/id";
import { IoMdClose } from "react-icons/io";

const tabsModal = [
    { label: "Data Siswa", value: "data-siswa" },
    { label: "Simulasi Siswa", value: "simulasi-siswa" },
];

const tabsModalBiodata = [
    { label: "Info Biodata", value: "info-biodata" },
    { label: "Kartu Identitas", value: "kartu-identitas" },
    { label: "Saudara", value: "saudara" },
];

const Simulasi = () => {
    dayjs.locale("id");
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [page, setPage] = useState(1);

    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: "namaKaryawan",
        direction: "asc",
    });
    const [sortStatusBiodata, setSortStatusBiodata] = useState<DataTableSortStatus>({
        columnAccessor: "nama",
        direction: "asc",
    });
    const [sortStatusHistory, setSortStatusHistory] = useState<DataTableSortStatus>({
        columnAccessor: "tahunAjaran",
        direction: "asc",
    });

    const sortedRecords = useMemo(() => sortBy(dataSimulasi, "namaKaryawan"), []);
    const sortedRecordsBiodata = useMemo(() => sortBy(dataPilihBiodata, "nama"), []);
    const sortedRecordsHistory = useMemo(() => sortBy(dataHistory, "tahunAjaran"), []);

    const [records, setRecords] = useState(sortedRecords.slice(0, pageSize));
    const [recordsBiodata, setRecordsBiodata] = useState(sortedRecordsBiodata.slice(0, pageSize));
    const [recordsHistory, setRecordsHistory] = useState(sortedRecordsHistory.slice(0, pageSize));

    const [openTambah, setOpenTambah] = useState(false);
    const [openPilihBiodata, setOpenPilihBiodata] = useState(false);
    const [openUbah, setOpenUbah] = useState(false);
    const [openHistory, setOpenHistory] = useState(false);
    const [openConfirmationAddBiodata, setOpenConfirmationAddBiodata] = useState(false);

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecords(dataSimulasi.slice(from, to));
    }, [page, pageSize]);
    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecordsBiodata(dataPilihBiodata.slice(from, to));
    }, [page, pageSize]);
    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecordsHistory(dataHistory.slice(from, to));
    }, [page, pageSize]);

    useEffect(() => {
        const data = sortBy(dataSimulasi, sortStatus.columnAccessor);
        setRecords(sortStatus.direction === "desc" ? data.reverse() : data);
    }, [sortStatus]);
    useEffect(() => {
        const data = sortBy(dataPilihBiodata, sortStatusBiodata.columnAccessor);
        setRecordsBiodata(sortStatusBiodata.direction === "desc" ? data.reverse() : data);
    }, [sortStatusBiodata]);
    useEffect(() => {
        const data = sortBy(dataHistory, sortStatusHistory.columnAccessor);
        setRecordsHistory(sortStatusHistory.direction === "desc" ? data.reverse() : data);
    }, [sortStatusHistory]);

    const handleTambahData = () => {
        setOpenTambah(true);
    };

    const handlePilihBiodata = () => {
        setOpenTambah(false);
        setOpenPilihBiodata(true);
    };

    const handleBiodataSiswa = () => {
        setOpenPilihBiodata(false);
        setOpenUbah(true);
    };

    const handlePilihLangsung = () => {};

    const handleHistory = () => {
        setOpenPilihBiodata(false);
        setOpenHistory(!openHistory);
    };

    const handleConfirmationAddBiodata = () => {
        setOpenPilihBiodata(false);
        setOpenConfirmationAddBiodata(!openConfirmationAddBiodata);
    };

    return (
        <>
            <div className="flex items-end gap-x-4">
                <Selects label="Tahun Ajaran" data={optionsTahunAjaran} withAsterisk />
                <InputDate label="Tanggal Datang" required />
                <InputDate label="Sampai Dengan" required />
                <Button className="max-w-max bg-primary">Lihat</Button>
                <Button className="max-w-max bg-success" onClick={handleTambahData}>
                    Tambah
                </Button>
            </div>
            <Box sx={{ height: records.length > 10 ? 750 : "auto" }} className="mt-4">
                <DataTable
                    className="z-0"
                    withColumnBorders
                    highlightOnHover
                    shadow="sm"
                    records={records}
                    columns={[
                        {
                            accessor: "number",
                            title: "NO",
                            render: (number) => dataSimulasi.indexOf(number) + 1,
                        },
                        { accessor: "noInvoice", title: "Nomor Invoice", sortable: true },
                        { accessor: "tglDatang", title: "Tanggal Datang", sortable: true, width: 155, render: ({ tglDatang }) => dayjs(tglDatang).format("DD MMMM YYYY") },
                        { accessor: "namaLengkap", title: "Nama Lengkap", width: 250, sortable: true },
                        { accessor: "nohp", title: "No HP", sortable: true },
                        { accessor: "tahunAjaran", title: "Tahun Ajaran", sortable: true },
                        { accessor: "jenjang", title: "Jenjang", sortable: true },
                        { accessor: "tingkatKelas", title: "Tingkat Kelas", sortable: true },
                        { accessor: "namaBundling", title: "Nama Bundling", width: 300, sortable: true },
                        { accessor: "hargaJual", title: "Harga Jual", sortable: true, render: ({ hargaJual }) => FormatRupiah(hargaJual) },
                        { accessor: "totalBayar", title: "Total Bayar", sortable: true, render: ({ totalBayar }) => FormatRupiah(totalBayar) },
                        { accessor: "nominalBayar", title: "Nominal Bayar", sortable: true, render: ({ nominalBayar }) => FormatRupiah(nominalBayar) },
                        { accessor: "expired", title: "Expired", sortable: true, width: 155, render: ({ expired }) => dayjs(expired).format("DD MMMM YYYY") },
                        { accessor: "tglDigunakan", title: "Tanggal Digunakan", sortable: true, width: 155, render: ({ tglDigunakan }) => dayjs(tglDigunakan).format("DD MMMM YYYY") },
                        {
                            accessor: "status",
                            title: "Status",
                            sortable: true,
                            width: 150,
                            render: ({ status }) => (
                                <Badge className={`${status === true ? "bg-success" : "bg-danger"} text-white`} size="md">
                                    {status === true ? "SUDAH DIBAYAR" : "EXPIRED"}
                                </Badge>
                            ),
                        },
                    ]}
                    totalRecords={dataSimulasi.length}
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

            <Dialog
                open={openTambah}
                size="lg"
                handler={handleTambahData}
                dismiss={{
                    escapeKey: false,
                    outsidePress: false,
                }}
                className="bg-white text-black dark:bg-black dark:text-white-light"
            >
                <DialogHeader className="flex items-center justify-between dark:text-white-light">
                    <h2 className="text-md">Simulasi Siswa</h2>
                    <IoMdClose
                        onClick={() => {
                            setOpenTambah(false);
                        }}
                        className="h-8 w-8 cursor-pointer rounded-full p-1 shadow-md"
                    />
                </DialogHeader>

                <DialogBody className="no-scrollbar h-[60vh] overflow-y-scroll rounded-xl border-none bg-white p-5  text-sm text-black dark:bg-black dark:text-white-light md:h-[50vh]">
                    <Tabs value="data-siswa">
                        <TabsHeader className="mx-auto max-w-[20rem]">
                            {tabsModal.map(({ label, value }) => (
                                <Tab key={value} value={value}>
                                    {label}
                                </Tab>
                            ))}
                        </TabsHeader>
                        <TabsBody>
                            {tabsModal.map(({ value }) => (
                                <TabPanel key={value} value={value}>
                                    {value === "data-siswa" ? (
                                        // START: Data Siswa
                                        <>
                                            <div className="flex">
                                                <div className="w-1/2">
                                                    <BiUserCircle className="mx-auto h-auto w-[20rem]" />
                                                    <Button className="mx-auto flex">Ambil menggunakan kamera</Button>
                                                </div>
                                                <div className="w-1/2">
                                                    <form action="#">
                                                        <InputDate label="Tanggal Datang" required />
                                                        <hr className="mt-3" />
                                                        <TextInput className="my-2" withAsterisk required label="Nama Lengkap" />
                                                        <InputDate label="Tanggal Lahir" required />
                                                        <div className="my-4 grid grid-cols-2 gap-x-2">
                                                            <Button className="border border-black bg-white text-black">Ambil Ulang Biodata</Button>
                                                            <Button className="bg-info" onClick={handlePilihBiodata}>
                                                                Cari Biodata
                                                            </Button>
                                                        </div>
                                                        <TextInput className="my-2" withAsterisk required label="No HP" />
                                                        <hr className="my-3" />
                                                        <Selects label="Provinsi" data={optionsProvinsi} withAsterisk />
                                                        <Selects label="Kota" className="my-2" data={optionsKota} withAsterisk />
                                                        <Selects label="Jenjang Pendidikan" data={optionsTingkat} withAsterisk />
                                                        <Selects label="Asal Sekolah" className="my-2" data={optionsAsalSekolah} withAsterisk />
                                                    </form>
                                                    <div className="mt-6 flex justify-end">
                                                        <Button className="bg-success">Selanjutnya</Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        // END: Data Siswa
                                        <SimulasiSiswa />
                                    )}
                                </TabPanel>
                            ))}
                        </TabsBody>
                    </Tabs>
                </DialogBody>
            </Dialog>

            {/* Cari Biodata */}
            <Dialog
                open={openPilihBiodata}
                size="lg"
                handler={handlePilihBiodata}
                dismiss={{
                    escapeKey: false,
                    outsidePress: false,
                }}
                className="bg-white text-black dark:bg-black dark:text-white-light"
            >
                <DialogHeader className="flex items-center justify-between dark:text-white-light">
                    <h2 className="text-md">Pilih Biodata</h2>
                    <IoMdClose
                        onClick={() => {
                            setOpenTambah(true);
                            setOpenPilihBiodata(false);
                        }}
                        className="h-8 w-8 cursor-pointer rounded-full p-1 shadow-md"
                    />
                </DialogHeader>

                <DialogBody className="no-scrollbar h-[60vh] overflow-y-scroll rounded-xl border-none bg-white p-5 text-sm text-black dark:bg-black dark:text-white-light md:h-[50vh]">
                    <Box sx={{ height: recordsBiodata.length > 10 ? 750 : "auto" }} className="mt-4">
                        <DataTable
                            className="z-0"
                            withColumnBorders
                            highlightOnHover
                            shadow="sm"
                            records={recordsBiodata}
                            columns={[
                                {
                                    accessor: "number",
                                    title: "NO",
                                    render: (number) => dataPilihBiodata.indexOf(number) + 1,
                                },
                                { accessor: "noreg", sortable: true },
                                { accessor: "nama", width: 250, sortable: true },
                                { accessor: "tglLahir", sortable: true, width: 155, render: ({ tglDatang }) => dayjs(tglDatang).format("DD MMMM YYYY") },
                                { accessor: "nohp", sortable: true },
                                { accessor: "alamat", sortable: true },
                                {
                                    accessor: "status",
                                    sortable: true,
                                    width: 150,
                                    cellsStyle: ({ status }) =>
                                        status === "Aktif"
                                            ? {
                                                  backgroundColor: "lightgreen",
                                                  color: "green",
                                              }
                                            : { backgroundColor: "lightpink", color: "red" },
                                },
                            ]}
                            rowContextMenu={{
                                items: () => [
                                    {
                                        key: "edit",
                                        icon: <BiSolidEditAlt className="h-3 w-3" />,
                                        title: "Ubah",
                                        onClick: () => handleBiodataSiswa(),
                                    },
                                    {
                                        key: "choose",
                                        icon: <FaCheck className="h-3 w-3" />,
                                        title: "Pilih Langsung",
                                        onClick: () => handlePilihLangsung(),
                                    },
                                    {
                                        key: "history",
                                        icon: <HiMiniMagnifyingGlass className="h-3 w-3" />,
                                        title: "History Pembelian Produk",
                                        onClick: handleHistory,
                                    },
                                ],
                            }}
                            totalRecords={dataPilihBiodata.length}
                            sortStatus={sortStatusBiodata}
                            onSortStatusChange={setSortStatusBiodata}
                            recordsPerPage={pageSize}
                            page={page}
                            paginationSize="sm"
                            onPageChange={(p) => setPage(p)}
                            recordsPerPageOptions={PAGE_SIZES}
                            onRecordsPerPageChange={setPageSize}
                            paginationText={({ from, to, totalRecords }) => `Records ${from} - ${to} of ${totalRecords}`}
                        />
                    </Box>
                    <div className="mt-4 flex gap-x-2">
                        <Button className="bg-success" onClick={handleConfirmationAddBiodata}>
                            Tambah
                        </Button>
                        <p className="border-2 border-dashed border-info p-2 text-info">
                            <b className="font-bold">Keterangan: </b>Klik kanan pada table untuk menampilkan menu Pilih dan Ubah.
                        </p>
                    </div>
                </DialogBody>
            </Dialog>

            <Dialog
                open={openUbah}
                size="lg"
                handler={handleBiodataSiswa}
                dismiss={{
                    escapeKey: false,
                    outsidePress: false,
                }}
                className="bg-white text-black dark:bg-black dark:text-white-light"
            >
                <DialogHeader className="flex items-center justify-between dark:text-white-light">
                    <h2 className="text-md">Biodata</h2>
                    <IoMdClose
                        onClick={() => {
                            setOpenPilihBiodata(true);
                            setOpenUbah(false);
                        }}
                        className="h-8 w-8 cursor-pointer rounded-full p-1 shadow-md"
                    />
                </DialogHeader>

                <DialogBody className="no-scrollbar h-[60vh] overflow-y-scroll rounded-xl border-none bg-white p-5 text-sm text-black dark:bg-black dark:text-white-light md:h-[50vh]">
                    <Tabs value="info-biodata">
                        <TabsHeader className="mx-auto max-w-[30rem]">
                            {tabsModalBiodata.map(({ label, value }) => (
                                <Tab key={value} value={value}>
                                    {label}
                                </Tab>
                            ))}
                        </TabsHeader>
                        <TabsBody>
                            {tabsModalBiodata.map(({ value }) => (
                                <TabPanel key={value} value={value}>
                                    {value === "info-biodata" ? <InfoBiodataSiswa /> : value === "kartu-identitas" ? <KartuIdentitasSiswa /> : <SaudaraSiswa />}
                                </TabPanel>
                            ))}
                        </TabsBody>
                    </Tabs>
                </DialogBody>
            </Dialog>

            <Dialog
                open={openHistory}
                size="lg"
                handler={handleHistory}
                dismiss={{
                    escapeKey: false,
                    outsidePress: false,
                }}
                className="bg-white text-black dark:bg-black dark:text-white-light"
            >
                <DialogHeader className="flex items-center justify-between dark:text-white-light">
                    <h2 className="text-md">History Pembelian Produk</h2>
                    <IoMdClose
                        onClick={() => {
                            setOpenPilihBiodata(true);
                            setOpenHistory(false);
                        }}
                        className="h-8 w-8 cursor-pointer rounded-full p-1 shadow-md"
                    />
                </DialogHeader>

                <DialogBody className="no-scrollbar h-[60vh] overflow-y-scroll rounded-xl border-none bg-white p-5 text-sm text-black dark:bg-black dark:text-white-light md:h-[50vh]">
                    <Box sx={{ height: recordsHistory.length > 10 ? 750 : "auto" }} className="mt-4">
                        <DataTable
                            className="z-0"
                            withColumnBorders
                            highlightOnHover
                            shadow="sm"
                            records={recordsHistory}
                            columns={[
                                {
                                    accessor: "number",
                                    title: "No",
                                    render: (number) => dataHistory.indexOf(number) + 1,
                                },
                                { accessor: "tahunAjaran", title: "Tahun Ajaran", sortable: true },
                                { accessor: "noreg", title: "No Registrasi", width: 200, sortable: true },
                                { accessor: "lokasi", sortable: true },
                                { accessor: "kelas", sortable: true },
                            ]}
                            totalRecords={dataHistory.length}
                            sortStatus={sortStatusHistory}
                            onSortStatusChange={setSortStatusHistory}
                            recordsPerPage={pageSize}
                            page={page}
                            paginationSize="sm"
                            onPageChange={(p) => setPage(p)}
                            recordsPerPageOptions={PAGE_SIZES}
                            onRecordsPerPageChange={setPageSize}
                            paginationText={({ from, to, totalRecords }) => `Records ${from} - ${to} of ${totalRecords}`}
                        />
                    </Box>
                </DialogBody>
            </Dialog>

            {dataPilihBiodata.length > 0 && (
                <Dialog
                    open={openConfirmationAddBiodata}
                    handler={handleConfirmationAddBiodata}
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
                            Pencarian biodata telah di temukan sebanyak <b className="font-bold">{dataPilihBiodata.length} Data</b>. Periksa kembali pencarian biodata sebelum memutuskan menambah
                            biodata. Apakah Anda yakin tetap akan menambah biodata?
                        </p>
                        <div className="flex items-center justify-center gap-4">
                            <Button
                                className="bg-warning capitalize"
                                onClick={() => {
                                    setOpenConfirmationAddBiodata(false);
                                    setOpenPilihBiodata(true);
                                }}
                            >
                                Tidak
                            </Button>

                            <Button
                                className="bg-success capitalize"
                                onClick={() => {
                                    setOpenConfirmationAddBiodata(false);
                                    setOpenUbah(true);
                                }}
                            >
                                Ya
                            </Button>
                        </div>
                    </DialogBody>
                </Dialog>
            )}
        </>
    );
};

export default Simulasi;
