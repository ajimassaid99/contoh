import { useEffect, useMemo, useState } from "react";
import { PAGE_SIZES, dataEntriSoal, dataMembuatPaket, dataTambahBundelSoal, optionsJenisProduk, optionsTahunAjaran, optionsTingkatKelas, optionsYaAtauTidak } from "@/data/smba/data";
import { Button, Dialog, DialogBody } from "@material-tailwind/react";
import Selects from "@/components/Ui/Selects";
import { BiSolidEditAlt } from "react-icons/bi";
import { FaCheck, FaPlus, FaQuestion, FaXmark } from "react-icons/fa6";
import { DataTable, DataTableSortStatus, differenceBy, uniqBy } from "mantine-datatable";
import { sortBy } from "lodash";
import { Badge, Box, TextInput, Textarea } from "@mantine/core";
import { BsFillSendFill } from "react-icons/bs";
import DialogModal from "@/components/Modal/Modal";
import InputDate from "@/components/Ui/InputDate";
import Switch from "@/components/Ui/Switch";
import dayjs from "dayjs";
import "dayjs/locale/id";
const MembuatPaket = () => {
    dayjs.locale("id");
    const [openTambah, setOpenTambah] = useState(false);

    const [openUbah, setOpenUbah] = useState(false);
    const [openTambahBundel, setOpenTambahBundel] = useState(false);
    const [openKonfirmasiUploadBundelSoal, setOpenKonfirmasiUploadBundelSoal] = useState(false);

    const [openKonfirmasiAktif, setOpenKonfirmasiAktif] = useState(false);
    const [openKonfirmasiNonAktif, setOpenKonfirmasiNonAktif] = useState(false);

    const [openEntri, setOpenEntri] = useState(false);
    const [openKonfirmasiUploadEntri, setOpenKonfirmasiUploadEntri] = useState(false);

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
        columnAccessor: "kodePaket",
        direction: "asc",
    });
    const sortedRecords = useMemo(() => sortBy(dataMembuatPaket, "kodePaket"), []);
    const [records, setRecords] = useState(sortedRecords.slice(0, pageSize));

    const [sortStatusBundleSoal, setSortStatusBundleSoal] = useState<DataTableSortStatus>({
        columnAccessor: "kodeBundel",
        direction: "asc",
    });
    const sortedRecordsBundleSoal = useMemo(() => sortBy(dataTambahBundelSoal, "kodeBundel"), []);
    const [recordsBundleSoal, setRecordsBundleSoal] = useState(sortedRecordsBundleSoal.slice(0, pageSize));

    const [sortStatusEntriSoal, setSortStatusEntriSoal] = useState<DataTableSortStatus>({
        columnAccessor: "kodeBundel",
        direction: "asc",
    });
    const sortedRecordsEntriSoal = useMemo(() => sortBy(dataEntriSoal, "kodeBundel"), []);
    const [recordsEntriSoal, setRecordsEntriSoal] = useState(sortedRecordsEntriSoal.slice(0, pageSize));
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
        setRecords(dataMembuatPaket.slice(from, to));
    }, [page, pageSize]);
    useEffect(() => {
        const data = sortBy(dataMembuatPaket, sortStatus.columnAccessor);
        setRecords(sortStatus.direction === "desc" ? data.reverse() : data);
    }, [sortStatus]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        const currentRecords = dataTambahBundelSoal.slice(from, to);
        setRecordsBundleSoal(currentRecords);
        if (allRecordsSelected) {
            setSelectedRecords(
                // 👇 `differenceBy` is a utility function provided by Mantine DataTable
                differenceBy(currentRecords, unselectedRecords, (r) => r.id)
            );
        }
    }, [allRecordsSelected, page, pageSize, unselectedRecords]);
    useEffect(() => {
        const data = sortBy(dataTambahBundelSoal, sortStatus.columnAccessor);
        setRecordsBundleSoal(sortStatus.direction === "desc" ? data.reverse() : data);
    }, [sortStatus]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecordsEntriSoal(dataEntriSoal.slice(from, to));
    }, [page, pageSize]);
    useEffect(() => {
        const data = sortBy(dataEntriSoal, sortStatusEntriSoal.columnAccessor);
        setRecordsEntriSoal(sortStatusEntriSoal.direction === "desc" ? data.reverse() : data);
    }, [sortStatusEntriSoal]);

    const handleTambah = () => {
        setOpenTambah(!openTambah);
    };

    const handleUbah = () => {
        setOpenUbah(!openUbah);
    };

    const handleTambahBundel = () => {
        setOpenTambahBundel(!openTambahBundel);
    };
    // upload entri
    const handleKonfirmasiUploadBundelSoal = () => {
        setOpenTambahBundel(false);
        setOpenKonfirmasiUploadBundelSoal(true);
    };

    const handleKonfirmasiAktif = () => {
        setOpenKonfirmasiAktif(!openKonfirmasiAktif);
    };

    const handleKonfirmasiNonAktif = () => {
        setOpenKonfirmasiNonAktif(!openKonfirmasiNonAktif);
    };

    const handleEntri = () => {
        setOpenEntri(!openEntri);
    };
    // upload entri
    const handleKonfirmasiUploadEntri = () => {
        setOpenEntri(false);
        setOpenKonfirmasiUploadEntri(true);
    };
    return (
        <>
            <div className="flex items-end gap-x-4">
                <Selects label="Tahun Ajaran" required data={optionsTahunAjaran} withAsterisk />
                <Selects label="Jenis Produk" required data={optionsJenisProduk} withAsterisk />
                <Selects label="Tingkat Kelas" required data={optionsTingkatKelas} withAsterisk />
                <div className="flex gap-x-4">
                    <Button className="bg-info">Lihat</Button>
                    <Button className="bg-success" onClick={handleTambah}>
                        Tambah
                    </Button>
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
                            render: (number) => dataMembuatPaket.indexOf(number) + 1,
                        },
                        { accessor: "kodePaket", title: "Kode Paket", sortable: true },
                        { accessor: "jenisProduk", title: "Jenis Produk", sortable: true },
                        { accessor: "deskripsi", title: "Deskripsi", width: 700, sortable: true },
                        { accessor: "tanggalAwal", title: "Tanggal Awal", sortable: true, render: ({ tanggalAwal }) => dayjs(tanggalAwal).format("DD MMMM YYYY") },
                        { accessor: "tanggalAkhir", title: "Tanggal Akhir", sortable: true, render: ({ tanggalAkhir }) => dayjs(tanggalAkhir).format("DD MMMM YYYY") },
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
                                title: `Ubah ${record.kodePaket}`,
                                onClick: () => handleUbah(),
                            },
                            {
                                key: "add",
                                icon: <FaPlus className="h-3 w-3" />,
                                title: `Tambah Bundel Soal ${record.kodePaket}`,
                                onClick: () => handleTambahBundel(),
                            },
                            {
                                key: "active",
                                icon: <FaCheck className="h-3 w-3" />,
                                title: `Aktifkan ${record.kodePaket}`,
                                onClick: () => handleKonfirmasiAktif(),
                            },
                            {
                                key: "nonactive",
                                icon: <FaXmark className="h-3 w-3" />,
                                title: `Non Aktifkan ${record.kodePaket}`,
                                onClick: () => handleKonfirmasiNonAktif(),
                            },
                            {
                                key: "entry",
                                icon: <BsFillSendFill className="h-3 w-3" />,
                                title: "Entri Urutan & Upload",
                                onClick: () => handleEntri(),
                            },
                        ],
                    }}
                    totalRecords={dataMembuatPaket.length}
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

            {/* Tambah */}
            <DialogModal size="xs" open={openTambah} handler={handleTambah} heightFit={false} title="Form Tambah Paket Soal">
                <form action="#">
                    <TextInput label="Tahun Ajaran" placeholder="Tahun Ajaran" required withAsterisk />
                    <TextInput className="my-2" label="Tingkat Kelas" placeholder="Tingkat Kelas" required withAsterisk />
                    <TextInput label="Jenis Produk" placeholder="Jenis Produk" required withAsterisk />
                    <InputDate className="my-2" label="Tanggal Awal" required />
                    <InputDate label="Tanggal Akhir" required />
                    <Textarea className="my-2" label="Deskripsi" placeholder="Deskripsi" autosize required withAsterisk />
                    <Switch label="Blocking Time" options={optionsYaAtauTidak} selectedOption={selectedStatus} setSelectedOption={setSelectedStatus} required />
                    <Switch label="Random" className="mt-2" options={optionsYaAtauTidak} selectedOption={selectedStatus} setSelectedOption={setSelectedStatus} required />
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

            {/* Ubah */}
            <DialogModal size="xs" open={openUbah} handler={handleUbah} heightFit={false} title="Form Ubah Paket Soal">
                <form action="#">
                    <TextInput label="Tahun Ajaran" placeholder="Tahun Ajaran" required withAsterisk />
                    <TextInput className="my-2" label="Tingkat Kelas" placeholder="Tingkat Kelas" required withAsterisk />
                    <TextInput label="Jenis Produk" placeholder="Jenis Produk" required withAsterisk />
                    <InputDate className="my-2" label="Tanggal Awal" required />
                    <InputDate label="Tanggal Akhir" required />
                    <Textarea className="my-2" label="Deskripsi" placeholder="Deskripsi" autosize required withAsterisk />
                    <Switch label="Blocking Time" options={optionsYaAtauTidak} selectedOption={selectedStatus} setSelectedOption={setSelectedStatus} required />
                    <Switch label="Random" className="mt-2" options={optionsYaAtauTidak} selectedOption={selectedStatus} setSelectedOption={setSelectedStatus} required />
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

            {/* Tambah Bundel */}
            <DialogModal size="xl" open={openTambahBundel} handler={handleTambahBundel} heightFit={false} title="Form Tambah Bundel Soal">
                <ul className="grid w-3/4 grid-cols-3 gap-4 text-sm text-black">
                    <li>
                        <b className="font-bold">Kode Paket: </b>EMMA-005839
                    </li>
                    <li>
                        <b className="font-bold">Tanggal Awal: </b>
                        2023-11-09
                    </li>
                    <li>
                        <b className="font-bold">Deskripsi: </b>
                        UJI COBA MANDIRI
                    </li>
                    <li>
                        <b className="font-bold">Jenis Produk: </b>
                        e-Empati Mandiri
                    </li>
                    <li>
                        <b className="font-bold">Tanggal Akhir: </b>
                        2023-11-09
                    </li>
                </ul>
                <hr className="my-4" />
                <Selects className="w-1/5" label="Peruntukan" data={optionsTingkatKelas} />
                <Box sx={{ height: recordsBundleSoal.length > 10 ? 750 : "auto" }} className="mt-4">
                    <DataTable
                        withColumnBorders
                        highlightOnHover
                        shadow="sm"
                        selectedRecords={selectedRecords}
                        onSelectedRecordsChange={handleSelectedRecordsChange}
                        allRecordsSelectionCheckboxProps={{
                            indeterminate: allRecordsSelected && !!unselectedRecords.length,
                            checked: allRecordsSelected,
                            onChange: handleAllRecordsSelectionCheckboxChange,
                            title: allRecordsSelected ? "Unselect all records" : `Select ${dataTambahBundelSoal.length} records`,
                        }}
                        records={recordsBundleSoal}
                        columns={[
                            {
                                accessor: "number",
                                title: "No",
                                sortable: true,
                                width: 75,
                                render: (number) => dataTambahBundelSoal.indexOf(number) + 1,
                            },
                            { accessor: "kodeBundel", title: "Kode Bundel", sortable: true },
                            { accessor: "deskripsi", title: "Deskripsi", width: 700, sortable: true },
                            { accessor: "jumlahSoal", title: "Jumlah Soal", sortable: true },
                            { accessor: "jumlahEntriSoal", title: "Jumlah Entri Soal", sortable: true },
                            {
                                accessor: "status",
                                title: "Status",
                                sortable: true,
                                render: ({ status }) => (
                                    <Badge className={`${status === true ? "bg-success" : "bg-danger"} text-white`} size="md">
                                        {status === true ? "Selesai" : "Tidak Selesai"}
                                    </Badge>
                                ),
                            },
                        ]}
                        totalRecords={dataMembuatPaket.length}
                        sortStatus={sortStatusBundleSoal}
                        onSortStatusChange={setSortStatusBundleSoal}
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
                    <b className="font-bold">Keterangan: </b>Centang pada baris data untuk memilih.
                </p>
                <div className="mt-8 flex justify-center gap-x-4">
                    <Button className="bg-success" onClick={() => setOpenTambahBundel(false)}>
                        Simpan
                    </Button>
                    <Button className="bg-info" onClick={handleKonfirmasiUploadBundelSoal}>
                        Simpan & Upload
                    </Button>
                </div>
            </DialogModal>

            {/* Konfirmasi Upload Tambah Bundel */}
            <Dialog
                open={openKonfirmasiUploadBundelSoal}
                handler={handleKonfirmasiUploadBundelSoal}
                size="xs"
                dismiss={{
                    escapeKey: false,
                    outsidePress: false,
                }}
                className="bg-white text-black dark:bg-black dark:text-white-light"
            >
                <DialogBody>
                    <FaQuestion className="mx-auto h-auto w-28 text-info" />
                    <p className="mt-4 mb-8 text-center text-black">Apakah anda yakin akan Menyimpan & Mengupload Paket Soal Beserta Bundel yang dipilih?</p>
                    <div className="mt-8 flex justify-center gap-x-4">
                        <Button
                            className="bg-warning"
                            onClick={() => {
                                setOpenTambahBundel(true);
                                setOpenKonfirmasiUploadBundelSoal(false);
                            }}
                        >
                            Tidak
                        </Button>
                        <Button
                            className="bg-success"
                            onClick={() => {
                                setOpenTambahBundel(true);
                                setOpenKonfirmasiUploadBundelSoal(false);
                            }}
                        >
                            Ya
                        </Button>
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

            {/* Entri */}
            <DialogModal size="lg" open={openEntri} handler={handleEntri} heightFit={false} title="Form Upload Paket Soal">
                <ul className="grid w-3/4 grid-cols-3 gap-4 text-sm text-black">
                    <li>
                        <b className="font-bold">Kode Paket: </b>EMMA-005839
                    </li>
                    <li>
                        <b className="font-bold">Tanggal Awal: </b>
                        2023-11-09
                    </li>
                    <li>
                        <b className="font-bold">Deskripsi: </b>
                        UJI COBA MANDIRI
                    </li>
                    <li>
                        <b className="font-bold">Jenis Produk: </b>
                        e-Empati Mandiri
                    </li>
                    <li>
                        <b className="font-bold">Tanggal Akhir: </b>
                        2023-11-09
                    </li>
                </ul>
                <hr className="my-4" />
                <Box sx={{ height: recordsEntriSoal.length > 10 ? 750 : "auto" }} className="mt-4">
                    <DataTable
                        withColumnBorders
                        highlightOnHover
                        shadow="sm"
                        records={recordsEntriSoal}
                        columns={[
                            {
                                accessor: "number",
                                title: "No",
                                sortable: true,
                                width: 75,
                                render: (number) => dataEntriSoal.indexOf(number) + 1,
                            },
                            { accessor: "kodeBundel", title: "Kode Bundel", sortable: true },
                            { accessor: "deskripsi", title: "Deskripsi", width: 700, sortable: true },
                            { accessor: "jumlahSoal", title: "Jumlah Soal", sortable: true },
                            { accessor: "jumlahEntriSoal", title: "Jumlah Entri Soal", sortable: true },
                            { accessor: "urutan", title: "Urutan", sortable: true },
                        ]}
                        totalRecords={dataEntriSoal.length}
                        sortStatus={sortStatusEntriSoal}
                        onSortStatusChange={setSortStatusEntriSoal}
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
                    <b className="font-bold">Keterangan: </b>Centang pada baris data untuk memilih.
                </p>
                <div className="mt-8 flex justify-center gap-x-4">
                    <Button className="bg-success" onClick={() => setOpenEntri(false)}>
                        Simpan
                    </Button>
                    <Button className="bg-primary" onClick={handleKonfirmasiUploadEntri}>
                        Upload
                    </Button>
                    <Button className="bg-info" onClick={() => setOpenEntri(false)}>
                        Periksa Hasil Upload
                    </Button>
                </div>
            </DialogModal>

            {/* Konfirmasi Upload Entri */}
            <Dialog
                open={openKonfirmasiUploadEntri}
                handler={handleKonfirmasiUploadEntri}
                size="xs"
                dismiss={{
                    escapeKey: false,
                    outsidePress: false,
                }}
                className="bg-white text-black dark:bg-black dark:text-white-light"
            >
                <DialogBody>
                    <FaQuestion className="mx-auto h-auto w-28 text-info" />
                    <p className="mt-4 mb-8 text-center text-black">Apakah Anda yakin untuk mengupload paket soal ini?</p>
                    <div className="mt-8 flex justify-center gap-x-4">
                        <Button
                            className="bg-warning"
                            onClick={() => {
                                setOpenEntri(true);
                                setOpenKonfirmasiUploadEntri(false);
                            }}
                        >
                            Tidak
                        </Button>
                        <Button
                            className="bg-success"
                            onClick={() => {
                                setOpenEntri(true);
                                setOpenKonfirmasiUploadEntri(false);
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

export default MembuatPaket;
