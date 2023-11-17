import DialogModal from "@/components/Modal/Modal";
import { Box, NumberInput, TextInput } from "@mantine/core";
import { Button, Dialog, DialogBody } from "@material-tailwind/react";
import { DataTable, DataTableSortStatus } from "mantine-datatable";
import { useEffect, useMemo, useState } from "react";
import { PAGE_SIZES, dataTargetPengerjaanSoal, optionsTingkatKelas, optionsTahunAjaran } from "@/data/smba/data";
import { sortBy } from "lodash";
import { BiSolidEditAlt } from "react-icons/bi";
import { FaQuestion, FaTrash } from "react-icons/fa6";
import Selects from "@/components/Ui/Selects";
import InputDate from "@/components/Ui/InputDate";
import dayjs from "dayjs";
import "dayjs/locale/id";

const TargetPengerjaanSoal = () => {
    dayjs.locale("id");
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [page, setPage] = useState(1);
    const [openTambah, setOpenTambah] = useState(false);
    const [openUbah, setOpenUbah] = useState(false);
    const [openHapus, setOpenHapus] = useState(false);

    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: "mataUji",
        direction: "asc",
    });
    const sortedRecords = useMemo(() => sortBy(dataTargetPengerjaanSoal, "mataUji"), []);
    const [records, setRecords] = useState(sortedRecords.slice(0, pageSize));

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecords(dataTargetPengerjaanSoal.slice(from, to));
    }, [page, pageSize]);
    useEffect(() => {
        const data = sortBy(dataTargetPengerjaanSoal, sortStatus.columnAccessor);
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
            <div className="flex items-end gap-x-4">
                <Selects label="Tingkat Kelas" required data={optionsTingkatKelas} withAsterisk />
                <Selects label="Tahun Ajaran" required data={optionsTahunAjaran} withAsterisk />
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
                            render: (number) => dataTargetPengerjaanSoal.indexOf(number) + 1,
                        },
                        { accessor: "mataUji", title: "Mata Uji", sortable: true },
                        { accessor: "tanggalAwal", title: "Tanggal Awal", sortable: true, render: ({ tanggalAwal }: any) => dayjs(tanggalAwal).format("DD MMMM YYYY") },
                        { accessor: "tanggalAkhir", title: "Tanggal Akhir", sortable: true, render: ({ tanggalAkhir }: any) => dayjs(tanggalAkhir).format("DD MMMM YYYY") },
                        { accessor: "jumlahTarget", title: "Jumlah Target", sortable: true },
                    ]}
                    rowContextMenu={{
                        items: (record) => [
                            {
                                key: "edit",
                                icon: <BiSolidEditAlt className="h-3 w-3" />,
                                title: `Ubah ${record.mataUji}`,
                                onClick: () => handleUbah(),
                            },
                            {
                                key: "delete",
                                icon: <FaTrash className="h-3 w-3" />,
                                title: `Hapus ${record.mataUji}`,
                                onClick: () => handleHapus(),
                            },
                        ],
                    }}
                    totalRecords={dataTargetPengerjaanSoal.length}
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

            {/* Tambah */}
            <DialogModal size="xs" open={openTambah} handler={handleTambah} heightFit={true} title="Form Tambah Target Pengerjaan Soal">
                <form action="#">
                    <TextInput label="Tingkat Kelas" placeholder="Tingkat Kelas" required withAsterisk />
                    <TextInput className="my-2" label="Tahun Ajaran" placeholder="Tahun Ajaran" required withAsterisk />
                    <Selects label="Tahun Ajaran" data={optionsTahunAjaran} required withAsterisk />
                    <InputDate className="my-2" required label="Tanggal Awal" />
                    <InputDate required label="Tanggal Akhir" />
                    <NumberInput className="mt-2" label="Jumlah Target" required withAsterisk />
                </form>
                <div className="mt-8 flex justify-center gap-x-4">
                    <Button className="bg-success" onClick={() => setOpenUbah(false)}>
                        Simpan
                    </Button>
                    <Button className="bg-white text-black" onClick={() => setOpenUbah(false)}>
                        Tutup
                    </Button>
                </div>
            </DialogModal>

            {/* Ubah */}
            <DialogModal size="xs" open={openUbah} handler={() => setOpenUbah(!openUbah)} heightFit={true} title={"Form Ubah Target Pengerjaan Soal"}>
                <form action="#">
                    <TextInput label="Tingkat Kelas" placeholder="Tingkat Kelas" required withAsterisk />
                    <TextInput className="my-2" label="Tahun Ajaran" placeholder="Tahun Ajaran" required withAsterisk />
                    <Selects label="Tahun Ajaran" data={optionsTahunAjaran} required withAsterisk />
                    <InputDate className="my-2" required label="Tanggal Awal" />
                    <InputDate required label="Tanggal Akhir" />
                    <NumberInput className="mt-2" label="Jumlah Target" required withAsterisk />
                </form>
                <div className="mt-8 flex justify-center gap-x-4">
                    <Button className="bg-success" onClick={() => setOpenUbah(false)}>
                        Simpan
                    </Button>
                    <Button className="bg-white text-black" onClick={() => setOpenUbah(false)}>
                        Tutup
                    </Button>
                </div>
            </DialogModal>

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
        </>
    );
};

export default TargetPengerjaanSoal;
