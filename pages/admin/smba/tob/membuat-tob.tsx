import Selects from "@/components/Ui/Selects";
import DialogModal from "@/components/Modal/Modal";
import {
    PAGE_SIZES,
    dataMembuatTOB,
    dataTambahKomponenProduk,
    dataTambahPaketSoal,
    dataTambahSyaratEmpati,
    optionsJenisProduk,
    optionsKelompokUjian,
    optionsKurikulum,
    optionsLayanan,
    optionsTahunAjaran,
    optionsTingkatKelas,
    optionsYaAtauTidak,
} from "@/data/smba/data";
import { Badge, Box, Checkbox, NumberInput, TextInput } from "@mantine/core";
import { Button, Dialog, DialogBody } from "@material-tailwind/react";
import { sortBy, uniqBy } from "lodash";
import { DataTable, DataTableSortStatus } from "mantine-datatable";
import { useEffect, useMemo, useState } from "react";
import { BiSolidEditAlt } from "react-icons/bi";
import { FaCheck, FaEye, FaQuestion, FaTrash, FaXmark } from "react-icons/fa6";
import { MdAdd } from "react-icons/md";
import InputDate from "@/components/Ui/InputDate";
import Switch from "@/components/Ui/Switch";
import dayjs from "dayjs";
import "dayjs/locale/id";

const MembuatTOB = () => {
    dayjs.locale("id");
    const [openTambah, setOpenTambah] = useState(false);
    const [openUbah, setOpenUbah] = useState(false);
    const [openTambahPaketSoal, setOpenTambahPaketSoal] = useState(false);
    const [openTambahProduk, setOpenTambahProduk] = useState(false);
    const [openKonfirmasiAktif, setOpenKonfirmasiAktif] = useState(false);
    const [openKonfirmasiNonAktif, setOpenKonfirmasiNonAktif] = useState(false);
    const [openKonfirmasiTambahProduk, setOpenKonfirmasiTambahProduk] = useState(false);
    const [openKonfirmasiHapusProduk, setOpenKonfirmasiHapusProduk] = useState(false);
    const [openLihatIsiTob, setOpenLihatIsiTob] = useState(false);
    const [openTambahSyaratEmpati, setOpenTambahSyaratEmpati] = useState(false);

    const [allRecordsSelected, setAllRecordsSelected] = useState(false);
    const [selectedRecords, setSelectedRecords] = useState<any[]>([]);
    const [unselectedRecords, setUnselectedRecords] = useState<any[]>([]);
    const [selectedRowData, setSelectedRowData] = useState<any>(null);
    const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
    const [confirmationTitle, setConfirmationTitle] = useState("");
    const [confirmationAction, setConfirmationAction] = useState<"activate" | "deactivate" | "">("");
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [page, setPage] = useState(1);
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: "namaTob",
        direction: "asc",
    });
    const sortedRecords = useMemo(() => sortBy(dataMembuatTOB, "namaTob"), []);
    const [records, setRecords] = useState(sortedRecords.slice(0, pageSize));
    const [selectedStatus, setSelectedStatus] = useState(optionsYaAtauTidak[0].value);

    const handleSelectedRecordsChange = (newSelectedRecords: any[]) => {
        if (allRecordsSelected) {
            const recordsToUnselect = records.filter((record) => !newSelectedRecords.includes(record));
            setUnselectedRecords(
                // 👇 `uniqBy` is a utility function provided by Mantine DataTable
                uniqBy([...unselectedRecords, ...recordsToUnselect], (r) => r.id).filter((r) => !newSelectedRecords.includes(r))
            );
        } else {
            setSelectedRecords(newSelectedRecords);
        }
    };

    const handleAllRecordsSelectionCheckboxChange = () => {
        if (allRecordsSelected) {
            setAllRecordsSelected(false);
            setSelectedRecords([]);
            setUnselectedRecords([]);
        } else {
            setAllRecordsSelected(true);
        }
    };

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecords(dataMembuatTOB.slice(from, to));
    }, [page, pageSize]);
    useEffect(() => {
        const data = sortBy(dataMembuatTOB, sortStatus.columnAccessor);
        setRecords(sortStatus.direction === "desc" ? data.reverse() : data);
    }, [sortStatus]);

    const handleTambah = () => {
        setOpenTambah(!openTambah);
    };

    const handleUbah = () => {
        setOpenUbah(!openUbah);
    };

    const handleTambahPaketSoal = () => {
        setOpenTambahPaketSoal(!openTambahPaketSoal);
    };

    const handleTambahProduk = () => {
        setOpenTambahProduk(!openTambahProduk);
    };

    const handleKonfirmasiTambahProduk = () => {
        setOpenTambahProduk(false);
        setOpenKonfirmasiTambahProduk(true);
    };

    const handleKonfirmasiHapusProduk = () => {
        setOpenTambahProduk(false);
        setOpenKonfirmasiHapusProduk(true);
    };

    const handleLihatIsiTob = () => {
        setOpenLihatIsiTob(!openLihatIsiTob);
    };

    const handleKonfirmasiAktif = () => {
        setOpenKonfirmasiAktif(!openKonfirmasiAktif);
    };

    const handleKonfirmasiNonAktif = () => {
        setOpenKonfirmasiNonAktif(!openKonfirmasiNonAktif);
    };

    const handleTambahSyaratEmpati = () => {
        setOpenTambahSyaratEmpati(!openTambahSyaratEmpati);
    };

    return (
        <>
            <div className="flex flex-wrap items-end gap-x-4">
                <Selects label="Tahun Ajaran" data={optionsTahunAjaran} withAsterisk required />
                <Selects label="Jenis" data={optionsKelompokUjian} withAsterisk required />
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
                            width: 80,
                            render: (number) => dataMembuatTOB.indexOf(number) + 1,
                        },
                        { accessor: "namaTob", title: "Nama TOB", sortable: true },
                        { accessor: "jenisTob", title: "Jenis TOB", sortable: true },
                        { accessor: "jarak", title: "Jarak Antar Paket (Menit)", sortable: true },
                        { accessor: "tanggalAwal", title: "Tanggal Awal", sortable: true, render: ({ tanggalAwal }) => dayjs(tanggalAwal).format("DD MMMM YYYY") },
                        { accessor: "tanggalAkhir", title: "Tanggal Akhir", sortable: true, render: ({ tanggalAkhir }) => dayjs(tanggalAkhir).format("DD MMMM YYYY") },
                        {
                            accessor: "format",
                            title: "Format Merdeka",
                            sortable: true,
                            render: ({ format }) => (
                                <Badge className={`${format === true ? "bg-success" : "bg-danger"} text-white`} size="md">
                                    {format === true ? "YA" : "TIDAK"}
                                </Badge>
                            ),
                        },
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
                                title: `Ubah ${record.namaTob}`,
                                onClick: () => handleUbah(),
                            },
                            {
                                key: "addPaketSoal",
                                icon: <MdAdd className="h-3 w-3" />,
                                title: `Tambah Paket Soal ${record.namaTob}`,
                                onClick: () => handleTambahPaketSoal(),
                            },
                            {
                                key: "addProduk",
                                icon: <MdAdd className="h-3 w-3" />,
                                title: `Tambah produk ${record.namaTob}`,
                                onClick: () => handleTambahProduk(),
                            },
                            {
                                key: "seeTob",
                                icon: <FaEye className="h-3 w-3" />,
                                title: `Lihat Isi TOB ${record.namaTob}`,
                                onClick: () => handleLihatIsiTob(),
                            },
                            {
                                key: "active",
                                icon: <FaCheck className="h-3 w-3" />,
                                title: `Aktifkan ${record.namaTob}`,
                                onClick: () => handleKonfirmasiAktif(),
                            },
                            {
                                key: "nonactive",
                                icon: <FaXmark className="h-3 w-3" />,
                                title: `Non Aktifkan ${record.namaTob}`,
                                onClick: () => handleKonfirmasiNonAktif(),
                            },
                            {
                                key: "addSyarat",
                                icon: <MdAdd className="h-3 w-3" />,
                                title: `Tambah Syarat Empati ${record.namaTob}`,
                                onClick: () => handleTambahSyaratEmpati(),
                            },
                        ],
                    }}
                    totalRecords={dataMembuatTOB.length}
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

            {/* Form Tambah Tob */}
            <DialogModal heightFit open={openTambah} handler={handleTambah} size="xs" title="Form Tambah TOB">
                <TextInput label="Tahun Ajaran" placeholder="Tob 1" withAsterisk required />
                <Switch label="Format Merdeka" className="my-2" options={optionsYaAtauTidak} selectedOption={selectedStatus} setSelectedOption={setSelectedStatus} required />
                <hr className="my-4 border border-gray-200" />
                <TextInput label="Nama TOB" placeholder="Nama TOB" withAsterisk required />
                <Selects className="my-2" label="Jenis TOB" data={optionsKurikulum} withAsterisk required />
                <NumberInput label="Jarak Antar Paket (Menit)" min={0} withAsterisk required />
                <InputDate className="my-2" label="Tanggal Awal" required />
                <InputDate label="Tanggal Akhir" required />
                <div className="mt-8 flex justify-center gap-x-4">
                    <Button
                        className="bg-success"
                        onClick={() => {
                            setOpenTambah(false);
                        }}
                    >
                        Simpan
                    </Button>
                    <Button
                        className="bg-white text-black"
                        onClick={() => {
                            setOpenTambah(false);
                        }}
                    >
                        Tutup
                    </Button>
                </div>
            </DialogModal>

            {/* Form Ubah Tob */}
            <DialogModal heightFit open={openUbah} handler={handleUbah} size="xs" title="Form Ubah TOB">
                <TextInput label="Tahun Ajaran" placeholder="Tahun Ajaran" withAsterisk required />
                <Switch label="Format Merdeka" className="my-2" options={optionsYaAtauTidak} selectedOption={selectedStatus} setSelectedOption={setSelectedStatus} required />
                <hr className="my-4 border border-gray-200" />
                <TextInput label="Nama TOB" placeholder="Nama TOB" withAsterisk required />
                <Selects className="my-2" label="Jenis TOB" data={optionsKurikulum} withAsterisk required />
                <NumberInput label="Jarak Antar Paket (Menit)" min={0} withAsterisk required />
                <InputDate className="my-2" label="Tanggal Awal" required />
                <InputDate label="Tanggal Akhir" required />
                <div className="mt-8 flex justify-center gap-x-4">
                    <Button
                        className="bg-success"
                        onClick={() => {
                            setOpenUbah(false);
                        }}
                    >
                        Simpan
                    </Button>
                    <Button
                        className="bg-white text-black"
                        onClick={() => {
                            setOpenUbah(false);
                        }}
                    >
                        Tutup
                    </Button>
                </div>
            </DialogModal>

            {/* Form Tambah Paket Soal */}
            <DialogModal open={openTambahPaketSoal} handler={handleTambahPaketSoal} size="xl" title="Form Tambah Paket Soal" heightFit={false}>
                <ul className="flex flex-wrap items-start gap-x-4 gap-y-2">
                    <li className="flex items-center gap-x-2">
                        <p className="font-bold">Nama TOB:</p>
                        <p>12IPA-K13R-S1-Biologi-TA.23/24</p>
                    </li>
                    <div>|</div>
                    <li className="flex items-center gap-x-2">
                        <p className="font-bold">Tahun Ajaran:</p>
                        <p>2023/2024</p>
                    </li>
                    <div>|</div>
                    <li className="flex items-center gap-x-2">
                        <p className="font-bold">Tanggal Awal:</p>
                        <p>2023-06-26</p>
                    </li>
                    <div>|</div>
                    <li className="flex items-center gap-x-2">
                        <p className="font-bold">Tanggal Akhir:</p>
                        <p>2023-12-16</p>
                    </li>
                </ul>
                <hr className="my-4 border border-gray-200" />
                <div className="flex gap-x-4">
                    <Selects label="Tingkat Kelas" data={optionsTingkatKelas} />
                    <Selects label="Jenis Produk" data={optionsJenisProduk} />
                </div>
                <Box sx={{ height: dataTambahPaketSoal.length > 10 ? 750 : "auto" }} className="mt-4">
                    <DataTable
                        withColumnBorders
                        shadow="sm"
                        selectedRecords={selectedRecords}
                        onSelectedRecordsChange={handleSelectedRecordsChange}
                        allRecordsSelectionCheckboxProps={{
                            indeterminate: allRecordsSelected && !!unselectedRecords.length,
                            checked: allRecordsSelected,
                            onChange: handleAllRecordsSelectionCheckboxChange,
                            title: allRecordsSelected ? "Unselect all records" : `Select ${dataTambahPaketSoal.length} records`,
                        }}
                        records={dataTambahPaketSoal}
                        columns={[
                            {
                                accessor: "number",
                                title: "No",
                                sortable: true,
                                width: 80,
                                render: (number) => dataTambahPaketSoal.indexOf(number) + 1,
                            },
                            { accessor: "kodePaket", title: "Kode Paket", sortable: true },
                            { accessor: "deskripsi", title: "Deskripsi", width: "40%", sortable: true },
                            { accessor: "tanggalAwal", title: "Tanggal Awal", sortable: true, render: ({ tanggalAwal }) => dayjs(tanggalAwal).format("DD MMMM YYYY") },
                            { accessor: "tanggalAkhir", title: "Tanggal Akhir", sortable: true, render: ({ tanggalAkhir }) => dayjs(tanggalAkhir).format("DD MMMM YYYY") },
                            {
                                accessor: "blockingTime",
                                title: "Blocking Time",
                                sortable: true,
                                render: ({ blockingTime }) => (
                                    <Badge className={`${blockingTime === true ? "bg-success" : "bg-danger"} text-white`} size="md">
                                        {blockingTime === true ? "YA" : "TIDAK"}
                                    </Badge>
                                ),
                            },
                            {
                                accessor: "random",
                                title: "Random",
                                sortable: true,
                                render: ({ random }) => (
                                    <Badge className={`${random === true ? "bg-success" : "bg-danger"} text-white`} size="md">
                                        {random === true ? "YA" : "TIDAK"}
                                    </Badge>
                                ),
                            },
                            { accessor: "urutan", title: "Urutan", sortable: true },
                            { accessor: "wajib", title: "Wajib", render: () => <Checkbox className="cursor-pointer" /> },
                            // { accessor: "wajib", title: "Wajib", render: ({ wajib }) => (wajib === true ? <Checkbox checked /> : <Checkbox />) },
                        ]}
                    />
                </Box>
                <p className="border-2 border-dashed border-info p-2 text-info">
                    <b className="font-bold">Keterangan: </b>Isikan Urutan dengan benar lalu Pilih/Centang pada baris data untuk memilih.
                </p>
                <div className="mt-8 flex justify-center gap-x-4">
                    <Button className="bg-success" onClick={handleTambahPaketSoal}>
                        Simpan
                    </Button>
                    <Button className="bg-white text-black" onClick={handleTambahPaketSoal}>
                        Tutup
                    </Button>
                </div>
            </DialogModal>

            {/* Form Tambah Produk */}
            <DialogModal open={openTambahProduk} handler={handleTambahProduk} size="lg" title="Form Tambah Paket Soal" heightFit={false}>
                <ul className="flex flex-wrap items-start gap-x-4 gap-y-2">
                    <li className="flex items-center gap-x-2">
                        <p className="font-bold">Nama TOB:</p>
                        <p>12IPA-K13R-S1-Biologi-TA.23/24</p>
                    </li>
                    <div>|</div>
                    <li className="flex items-center gap-x-2">
                        <p className="font-bold">Tahun Ajaran:</p>
                        <p>2023/2024</p>
                    </li>
                    <div>|</div>
                    <li className="flex items-center gap-x-2">
                        <p className="font-bold">Tanggal Awal:</p>
                        <p>2023-06-26</p>
                    </li>
                    <div>|</div>
                    <li className="flex items-center gap-x-2">
                        <p className="font-bold">Tanggal Akhir:</p>
                        <p>2023-12-16</p>
                    </li>
                </ul>
                <hr className="my-4 border border-gray-200" />
                <div className="flex items-end gap-x-4">
                    <Selects label="Tingkat Kelas" data={optionsTingkatKelas} />
                    <Selects label="Layanan" data={optionsLayanan} />
                    <Selects label="Komponen Produk" data={optionsJenisProduk} />
                    <Button className="bg-success" onClick={handleKonfirmasiTambahProduk}>
                        Tambah
                    </Button>
                </div>
                <Box sx={{ height: dataTambahKomponenProduk.length > 10 ? 750 : "auto" }} className="mt-4">
                    <DataTable
                        withColumnBorders
                        shadow="sm"
                        records={dataTambahKomponenProduk}
                        columns={[
                            {
                                accessor: "number",
                                title: "No",
                                sortable: true,
                                width: 80,
                                render: (number) => dataTambahKomponenProduk.indexOf(number) + 1,
                            },
                            { accessor: "id", title: "ID Produk", sortable: true },
                            { accessor: "komponen", title: "Komponen Produk", sortable: true },
                        ]}
                        rowContextMenu={{
                            items: (record) => [
                                {
                                    key: "edit",
                                    icon: <FaTrash className="h-3 w-3" />,
                                    title: `Hapus ${record.id}`,
                                    onClick: () => handleKonfirmasiHapusProduk(),
                                },
                            ],
                        }}
                    />
                </Box>
                <p className="border-2 border-dashed border-info p-2 text-info">
                    <b className="font-bold">Keterangan: </b>Klik kanan pada salah satu baris data untuk menampilkan Menu.
                </p>
            </DialogModal>

            {/* Konfirmasi tambah komponen produk */}
            <Dialog
                open={openKonfirmasiTambahProduk}
                handler={handleKonfirmasiTambahProduk}
                size="xs"
                dismiss={{
                    escapeKey: false,
                    outsidePress: false,
                }}
                className="bg-white text-black dark:bg-black dark:text-white-light"
            >
                <DialogBody>
                    <FaQuestion className="mx-auto h-auto w-28 text-warning" />
                    <h2 className="mt-4 mb-8 text-center font-semibold text-black">Apakah anda yakin akan Menambah Komponen Produk yang dipilih?</h2>
                    <div className="mt-8 flex justify-center gap-x-4">
                        <Button
                            className="bg-white text-black"
                            onClick={() => {
                                setOpenKonfirmasiTambahProduk(false);
                                setOpenTambahProduk(true);
                            }}
                        >
                            Tidak
                        </Button>
                        <Button
                            className="bg-success"
                            onClick={() => {
                                setOpenKonfirmasiTambahProduk(false);
                                setOpenTambahProduk(true);
                            }}
                        >
                            Ya
                        </Button>
                    </div>
                </DialogBody>
            </Dialog>

            {/* Konfirmasi hapus komponen produk */}
            <Dialog
                open={openKonfirmasiHapusProduk}
                handler={handleKonfirmasiHapusProduk}
                size="xs"
                dismiss={{
                    escapeKey: false,
                    outsidePress: false,
                }}
                className="bg-white text-black dark:bg-black dark:text-white-light"
            >
                <DialogBody>
                    <FaQuestion className="mx-auto h-auto w-28 text-warning" />
                    <h2 className="mt-4 mb-8 text-center font-semibold text-black">Apakah Anda Yakin Akan Menghapus Data Ini?</h2>
                    <div className="mt-8 flex justify-center gap-x-4">
                        <Button
                            className="bg-white text-black"
                            onClick={() => {
                                setOpenKonfirmasiHapusProduk(false);
                                setOpenTambahProduk(true);
                            }}
                        >
                            Tidak
                        </Button>
                        <Button
                            className="bg-success"
                            onClick={() => {
                                setOpenKonfirmasiHapusProduk(false);
                                setOpenTambahProduk(true);
                            }}
                        >
                            Ya
                        </Button>
                    </div>
                </DialogBody>
            </Dialog>

            {/* Form Tambah Paket Soal */}
            <DialogModal open={openLihatIsiTob} handler={handleLihatIsiTob} size="xl" title="Detail TOB" heightFit={false}>
                <ul className="flex flex-wrap items-start gap-x-4 gap-y-2">
                    <li className="flex items-center gap-x-2">
                        <p className="font-bold">Nama TOB:</p>
                        <p>12IPA-K13R-S1-Biologi-TA.23/24</p>
                    </li>
                    <div>|</div>
                    <li className="flex items-center gap-x-2">
                        <p className="font-bold">Tahun Ajaran:</p>
                        <p>2023/2024</p>
                    </li>
                    <div>|</div>
                    <li className="flex items-center gap-x-2">
                        <p className="font-bold">Tanggal Awal:</p>
                        <p>2023-06-26</p>
                    </li>
                    <div>|</div>
                    <li className="flex items-center gap-x-2">
                        <p className="font-bold">Tanggal Akhir:</p>
                        <p>2023-12-16</p>
                    </li>
                </ul>
                <hr className="my-4 border border-gray-200" />
                <Box sx={{ height: dataTambahPaketSoal.length > 10 ? 750 : "auto" }}>
                    <DataTable
                        withColumnBorders
                        shadow="sm"
                        records={dataTambahPaketSoal}
                        columns={[
                            { accessor: "urutan", title: "Urutan", sortable: true },
                            { accessor: "kodePaket", title: "Kode Paket", sortable: true },
                            { accessor: "deskripsi", title: "Deskripsi", width: "35%", sortable: true },
                            { accessor: "tanggalAwal", title: "Tanggal Awal", sortable: true, render: ({ tanggalAwal }) => dayjs(tanggalAwal).format("DD MMMM YYYY") },
                            { accessor: "tanggalAkhir", title: "Tanggal Akhir", sortable: true, render: ({ tanggalAkhir }) => dayjs(tanggalAkhir).format("DD MMMM YYYY") },
                            {
                                accessor: "blockingTime",
                                title: "Blocking Time",
                                sortable: true,
                                render: ({ blockingTime }) => (
                                    <Badge className={`${blockingTime === true ? "bg-success" : "bg-danger"} text-white`} size="md">
                                        {blockingTime === true ? "YA" : "TIDAK"}
                                    </Badge>
                                ),
                            },
                            {
                                accessor: "random",
                                title: "Random",
                                sortable: true,
                                render: ({ random }) => (
                                    <Badge className={`${random === true ? "bg-success" : "bg-danger"} text-white`} size="md">
                                        {random === true ? "YA" : "TIDAK"}
                                    </Badge>
                                ),
                            },
                            { accessor: "wajib", title: "Wajib", render: () => <Checkbox className="cursor-pointer" /> },
                            // { accessor: "wajib", title: "Wajib", render: ({ wajib }) => (wajib === true ? <Checkbox checked /> : <Checkbox />) },
                        ]}
                    />
                </Box>
            </DialogModal>

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

            {/* Form Tambah Syarat Empati */}
            <DialogModal open={openTambahSyaratEmpati} handler={handleTambahSyaratEmpati} size="sm" title="Form Syarat Empati" heightFit={false}>
                <div className="flex items-center gap-x-2">
                    <p className="font-bold">Nama Try Out:</p>
                    <p>12IPA-K13R-S1-KPU+PM 1-TA.23/24 - UTBK</p>
                </div>
                <hr className="my-4 border border-gray-200" />
                <div className="flex items-end gap-x-4">
                    <InputDate className="w-full" label="Tanggal Awal" required />
                    <InputDate className="w-full" label="Tanggal Akhir" required />
                    <Button className="bg-info">Cari</Button>
                </div>
                <Selects className="mt-2" label="Syarat Empati" data={optionsJenisProduk} />
                <div className="mt-8 flex justify-center gap-x-4">
                    <Button
                        className="bg-success"
                        onClick={() => {
                            setOpenTambahSyaratEmpati(false);
                        }}
                    >
                        Simpan
                    </Button>
                    <Button
                        className="bg-white text-black"
                        onClick={() => {
                            setOpenTambahSyaratEmpati(false);
                        }}
                    >
                        Tutup
                    </Button>
                </div>
                <hr className="my-4 border border-gray-200" />
                <h2 className="text-base font-bold">Daftar Syarat Empati</h2>
                <Box sx={{ height: dataTambahSyaratEmpati.length > 10 ? 750 : "auto", marginTop: "8px" }}>
                    <DataTable
                        withColumnBorders
                        shadow="sm"
                        records={dataTambahSyaratEmpati}
                        columns={[
                            {
                                accessor: "number",
                                title: "No",
                                sortable: true,
                                width: 80,
                                render: (number) => dataTambahSyaratEmpati.indexOf(number) + 1,
                            },
                            { accessor: "namaTO", title: "Nama Try Out", sortable: true },
                            { accessor: "syaratEmpati", title: "Syarat Empati", sortable: true },
                        ]}
                    />
                </Box>
            </DialogModal>
        </>
    );
};

export default MembuatTOB;
