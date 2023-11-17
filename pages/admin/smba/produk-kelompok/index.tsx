import Selects from "@/components/Ui/Selects";
import DialogModal from "@/components/Modal/Modal";
import { PAGE_SIZES, dataDaftarProduk, dataKelolaProdukKelompok, optionsJenisProduk, optionsLayanan } from "@/data/smba/data";
import { Box, TextInput } from "@mantine/core";
import { Button, Checkbox, Dialog, DialogBody } from "@material-tailwind/react";
import { sortBy } from "lodash";
import { DataTable, DataTableSortStatus, uniqBy } from "mantine-datatable";
import { useEffect, useMemo, useState } from "react";
import { BiSolidEditAlt } from "react-icons/bi";
import { FaCheck, FaQuestion, FaTrash } from "react-icons/fa6";
import dayjs from "dayjs";
import "dayjs/locale/id";

const KelolaProdukKelompok = () => {
    dayjs.locale("id");
    const [openDaftarProduk, setOpenDaftarProduk] = useState(false);
    const [openTambahProduk, setOpenTambahProduk] = useState(false);
    const [openKonfirmasiJadikanDefault, setOpenKonfirmasiJadikanDefault] = useState(false);

    const [allRecordsSelected, setAllRecordsSelected] = useState(false);
    const [selectedRecords, setSelectedRecords] = useState<any[]>([]);
    const [unselectedRecords, setUnselectedRecords] = useState<any[]>([]);
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [page, setPage] = useState(1);
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: "namaKelompok",
        direction: "asc",
    });
    const sortedRecords = useMemo(() => sortBy(dataKelolaProdukKelompok, "namaKelompok"), []);
    const [records, setRecords] = useState(sortedRecords.slice(0, pageSize));

    const handleSelectedRecordsChange = (newSelectedRecords: any[]) => {
        if (allRecordsSelected) {
            const recordsToUnselect = dataDaftarProduk.filter((record) => !newSelectedRecords.includes(record));
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
        setRecords(dataKelolaProdukKelompok.slice(from, to));
    }, [page, pageSize]);
    useEffect(() => {
        const data = sortBy(dataKelolaProdukKelompok, sortStatus.columnAccessor);
        setRecords(sortStatus.direction === "desc" ? data.reverse() : data);
    }, [sortStatus]);

    const handleDaftarProduk = () => {
        setOpenDaftarProduk(!openDaftarProduk);
    };

    const handleTambahProduk = () => {
        setOpenTambahProduk(!openTambahProduk);
    };

    const handleKonfirmasiJadikanDefault = () => {
        setOpenTambahProduk(false);
        setOpenKonfirmasiJadikanDefault(true);
    };

    return (
        <>
            <div className="flex flex-wrap items-end gap-x-4">
                <div>
                    <Button className="bg-info">Lihat</Button>
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
                            width: 75,
                            render: (number) => dataKelolaProdukKelompok.indexOf(number) + 1,
                        },
                        { accessor: "namaKelompok", title: "Nama Kelompok", sortable: true },
                        { accessor: "kelompok", title: "Kelompok", sortable: true },
                        { accessor: "jumlahAnggota", title: "Jumlah Anggota", sortable: true },
                        { accessor: "jumlahProduk", title: "Jumlah Produk", sortable: true },
                    ]}
                    rowContextMenu={{
                        items: (record) => [
                            {
                                key: "list",
                                icon: <BiSolidEditAlt className="h-3 w-3" />,
                                title: `Daftar Produk ${record.namaKelompok}`,
                                onClick: () => handleDaftarProduk(),
                            },
                            {
                                key: "add",
                                icon: <FaTrash className="h-3 w-3" />,
                                title: `Tambah Produk ${record.namaKelompok}`,
                                onClick: () => handleTambahProduk(),
                            },
                        ],
                    }}
                    totalRecords={dataKelolaProdukKelompok.length}
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

            {/* Daftar Produk */}
            <DialogModal open={openDaftarProduk} handler={handleDaftarProduk} size="lg" heightFit={false} title="Daftar Produk">
                <ul className="flex flex-wrap items-start gap-x-4 gap-y-2">
                    <li className="flex items-center gap-x-2">
                        <p className="font-bold">Nama Kelompok:</p>
                        <p>10 IPA-FI-S_1_2324-K13R</p>
                    </li>
                    <div>|</div>
                    <li className="flex items-center gap-x-2">
                        <p className="font-bold">Kelompok:</p>
                        <p>PENGAJAR</p>
                    </li>
                </ul>
                <hr className="my-4 border border-gray-200" />
                <Box sx={{ height: dataDaftarProduk.length > 10 ? 750 : "auto" }} className="mt-4">
                    <DataTable
                        withColumnBorders
                        highlightOnHover
                        shadow="sm"
                        records={dataDaftarProduk}
                        columns={[
                            {
                                accessor: "number",
                                title: "No",
                                sortable: true,
                                width: 75,
                                render: (number) => dataDaftarProduk.indexOf(number) + 1,
                            },
                            { accessor: "namaProduk", title: "Nama Produk", sortable: true },
                            { accessor: "jenisProduk", title: "Jenis Produk", sortable: true },
                            { accessor: "tanggalAwal", title: "Tanggal Awal", sortable: true, render: ({ tanggalAwal }) => dayjs(tanggalAwal).format("DD MMMM YYYY") },
                            { accessor: "tanggalAkhir", title: "Tanggal Akhir", sortable: true, render: ({ tanggalAkhir }) => dayjs(tanggalAkhir).format("DD MMMM YYYY") },
                        ]}
                    />
                </Box>
            </DialogModal>

            {/* Tambah Produk */}
            <DialogModal open={openTambahProduk} handler={handleTambahProduk} size="lg" heightFit={false} title="Tambah Produk">
                <ul className="flex flex-wrap items-start gap-x-4 gap-y-2">
                    <li className="flex items-center gap-x-2">
                        <p className="font-bold">Nama Kelompok:</p>
                        <p>10 IPA-FI-S_1_2324-K13R</p>
                    </li>
                    <div>|</div>
                    <li className="flex items-center gap-x-2">
                        <p className="font-bold">Kelompok:</p>
                        <p>PENGAJAR</p>
                    </li>
                </ul>
                <hr className="my-4 border border-gray-200" />
                <div className="flex items-end gap-x-4">
                    <Selects label="Jenis Produk" data={optionsJenisProduk} withAsterisk required />
                    <Selects label="Layanan" data={optionsLayanan} withAsterisk required />
                    <TextInput label="Cari nama produk" />
                    <Button className="bg-info">Cari</Button>
                </div>
                <Box sx={{ height: dataDaftarProduk.length > 10 ? 750 : "auto" }} className="mt-4">
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
                            title: allRecordsSelected ? "Unselect all records" : `Select ${dataDaftarProduk.length} records`,
                        }}
                        records={dataDaftarProduk}
                        columns={[
                            {
                                accessor: "number",
                                title: "No",
                                sortable: true,
                                width: 75,
                                render: (number) => dataDaftarProduk.indexOf(number) + 1,
                            },
                            { accessor: "namaProduk", title: "Nama Produk", sortable: true },
                            { accessor: "tanggalAwal", title: "Tanggal Awal", sortable: true, render: ({ tanggalAwal }) => dayjs(tanggalAwal).format("DD MMMM YYYY") },
                            { accessor: "tanggalAkhir", title: "Tanggal Akhir", sortable: true, render: ({ tanggalAkhir }) => dayjs(tanggalAkhir).format("DD MMMM YYYY") },
                            { accessor: "pilih", title: "Pilih", render: () => <Checkbox className="cursor-pointer" /> },
                        ]}
                        rowContextMenu={{
                            items: () => [
                                {
                                    key: "edit",
                                    icon: <FaCheck className="h-3 w-3" />,
                                    title: "Jadikan Tanggal Default",
                                    onClick: () => handleKonfirmasiJadikanDefault(),
                                },
                            ],
                        }}
                    />
                </Box>
                <p className="border-2 border-dashed border-info p-2 text-info">
                    <b className="font-bold">Keterangan: </b>Centang checkbox kepala tabel untuk memilih semua.
                </p>
            </DialogModal>

            {/* konfirmasi jadikan tanggal default */}
            <Dialog
                open={openKonfirmasiJadikanDefault}
                handler={handleKonfirmasiJadikanDefault}
                size="xs"
                dismiss={{
                    escapeKey: false,
                    outsidePress: false,
                }}
                className="bg-white text-black dark:bg-black dark:text-white-light"
            >
                <DialogBody>
                    <FaQuestion className="mx-auto h-auto w-28 text-warning" />
                    <h2 className="mt-4 mb-8 text-center font-semibold text-black">Apakah anda yakin akan Menjadikan Tanggal Default ini untuk Semua Data yang di Pilih?</h2>
                    <div className="mt-8 flex justify-center gap-x-4">
                        <Button
                            className="bg-white text-black"
                            onClick={() => {
                                setOpenTambahProduk(true);
                                setOpenKonfirmasiJadikanDefault(false);
                            }}
                        >
                            Tidak
                        </Button>
                        <Button
                            className="bg-success"
                            onClick={() => {
                                setOpenTambahProduk(true);
                                setOpenKonfirmasiJadikanDefault(false);
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

export default KelolaProdukKelompok;
