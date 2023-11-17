import Selects from "@/components/Ui/Selects";
import DialogModal from "@/components/Modal/Modal";
import { PAGE_SIZES, dataBukuTeoriTeaser, optionsKelompokUjian, optionsTingkatKelas } from "@/data/smba/data";
import { Box, TextInput } from "@mantine/core";
import { Button, Dialog, DialogBody } from "@material-tailwind/react";
import { sortBy } from "lodash";
import { DataTable, DataTableSortStatus } from "mantine-datatable";
import { useEffect, useMemo, useState } from "react";
import { BiSolidEditAlt } from "react-icons/bi";
import { FaQuestion, FaTrash } from "react-icons/fa6";
import InputDate from "@/components/Ui/InputDate";

const BukuTeoriTeaser = () => {
    const [openTambah, setOpenTambah] = useState(false);
    const [openUbah, setOpenUbah] = useState(false);
    const [openHapus, setOpenHapus] = useState(false);

    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [page, setPage] = useState(1);
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: "namaBuku",
        direction: "asc",
    });
    const sortedRecords = useMemo(() => sortBy(dataBukuTeoriTeaser, "namaBuku"), []);
    const [records, setRecords] = useState(sortedRecords.slice(0, pageSize));

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecords(dataBukuTeoriTeaser.slice(from, to));
    }, [page, pageSize]);
    useEffect(() => {
        const data = sortBy(dataBukuTeoriTeaser, sortStatus.columnAccessor);
        setRecords(sortStatus.direction === "desc" ? data.reverse() : data);
    }, [sortStatus]);

    const handleTambah = () => {
        setOpenTambah(!openTambah);
    };

    const handleUbah = () => {
        setOpenUbah(!openUbah);
    };

    const handleHapus = () => {
        setOpenHapus(!openHapus);
    };

    return (
        <>
            <div className="flex flex-wrap items-end gap-x-4">
                <Selects label="Tingkat Kelas" data={optionsTingkatKelas} withAsterisk required />
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
                            width: 70,
                            render: (number) => dataBukuTeoriTeaser.indexOf(number) + 1,
                        },
                        { accessor: "namaBuku", title: "Nama Buku", sortable: true },
                        { accessor: "tingkatKelas", title: "Tanggal Awal", sortable: true },
                        { accessor: "semester", title: "Tanggal Akhir", sortable: true },
                        { accessor: "kurikulum", title: "Role", sortable: true },
                    ]}
                    rowContextMenu={{
                        items: (record) => [
                            {
                                key: "edit",
                                icon: <BiSolidEditAlt className="h-3 w-3" />,
                                title: `Ubah ${record.namaBuku}`,
                                onClick: () => handleUbah(),
                            },
                            {
                                key: "delete",
                                icon: <FaTrash className="h-3 w-3" />,
                                title: `Hapus ${record.namaBuku}`,
                                onClick: () => handleHapus(),
                            },
                        ],
                    }}
                    totalRecords={dataBukuTeoriTeaser.length}
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
            <DialogModal heightFit open={openTambah} handler={handleTambah} size="sm" title="Form Tambah Buku">
                <div>
                    <div className="mb-4 flex gap-4">
                        <TextInput className="w-full" label="Nama Buku" placeholder="Buku 1" withAsterisk required />
                        <Selects className="w-full" label="Role" data={optionsKelompokUjian} withAsterisk required />
                    </div>
                    <div className="flex gap-4">
                        <TextInput type="date" className="w-full" label="Tanggal Awal" placeholder="11 November 2023" withAsterisk required />
                        <TextInput type="date" className="w-full" label="Tanggal Akhir" placeholder="23 November 2023" withAsterisk required />
                    </div>
                </div>
                <h3 className="mt-4 mb-2 text-xl font-bold">Pencarian Buku</h3>
                <hr className="mb-4 border-2 border-gray-200" />
                <div>
                    <div className="mb-4 flex gap-4">
                        <Selects className="w-full" label="Tahun Ajaran" data={optionsKelompokUjian} withAsterisk required />
                        <Selects className="w-full" label="Kurikulum" data={optionsKelompokUjian} withAsterisk required />
                    </div>
                    <div className="flex gap-4">
                        <Selects className="w-full" label="Semester" data={optionsKelompokUjian} withAsterisk required />
                        <Selects className="w-full" label="Jenis" data={optionsKelompokUjian} withAsterisk required />
                    </div>
                    <div className="flex gap-4">
                        <Selects className="w-full" label="Nama Buku" data={optionsKelompokUjian} withAsterisk required />
                    </div>
                </div>
                <div className="mt-8 flex justify-center gap-x-4">
                    <Button
                        className="bg-success"
                        onClick={() => {
                            setOpenTambah(false);
                        }}
                    >
                        Tambah
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

            {/* Form Ubah Buku */}
            <DialogModal heightFit open={openUbah} handler={handleUbah} size="sm" title="Form Ubah Buku">
                <div>
                    <div className="mb-4 flex gap-4">
                        <TextInput className="w-full" label="Nama Buku" placeholder="Buku 1" withAsterisk required />
                        <Selects className="w-full" label="Role" data={optionsKelompokUjian} withAsterisk required />
                    </div>
                    <div className="flex gap-4">
                        <InputDate className="w-full" label="Tanggal Awal" required />
                        <InputDate className="w-full" label="Tanggal Akhir" required />
                    </div>
                </div>
                <h3 className="mt-4 mb-2 text-xl font-bold">Pencarian Buku</h3>
                <hr className="mb-4 border border-gray-200" />
                <div>
                    <div className="flex gap-4">
                        <Selects className="w-full" label="Tahun Ajaran" data={optionsKelompokUjian} withAsterisk required />
                        <Selects className="w-full" label="Kurikulum" data={optionsKelompokUjian} withAsterisk required />
                    </div>
                    <div className="my-4 flex gap-4">
                        <Selects className="w-full" label="Semester" data={optionsKelompokUjian} withAsterisk required />
                        <Selects className="w-full" label="Jenis" data={optionsKelompokUjian} withAsterisk required />
                    </div>
                    <Selects className="w-full" label="Nama Buku" data={optionsKelompokUjian} withAsterisk required />
                </div>
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

            {/* konfirmasi hapus buku */}
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
                    <FaQuestion className="mx-auto h-auto w-28 text-warning" />
                    <h2 className="mt-4 mb-8 text-center font-semibold text-black">Apakah Apakah Anda Yakin Akan Menghapus Data Ini?</h2>
                    <div className="mt-8 flex justify-center gap-x-4">
                        <Button className="bg-white text-black" onClick={handleHapus}>
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

export default BukuTeoriTeaser;
