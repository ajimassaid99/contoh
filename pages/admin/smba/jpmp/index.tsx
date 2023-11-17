import Selects from "@/components/Ui/Selects";
import { PAGE_SIZES, dataJpmp, optionsSemester, optionsTahunAjaran, optionsTingkatKelas } from "@/data/smba/data";
import { Badge, Box } from "@mantine/core";
import { Button, Dialog, DialogBody } from "@material-tailwind/react";
import { sortBy } from "lodash";
import { DataTable, DataTableSortStatus } from "mantine-datatable";
import { useEffect, useMemo, useState } from "react";
import { FaCheck, FaList, FaQuestion, FaXmark } from "react-icons/fa6";
import DialogModal from "@/components/Modal/Modal";
import dayjs from "dayjs";
import "dayjs/locale/id";

const Jpmp = () => {
    dayjs.locale("id");
    const [openDetailJuklak, setOpenDetailJuklak] = useState(false);
    const [openKonfirmasiAktif, setOpenKonfirmasiAktif] = useState(false);
    const [openKonfirmasiNonAktif, setOpenKonfirmasiNonAktif] = useState(false);

    const [selectedRowData, setSelectedRowData] = useState<any>(null);
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [page, setPage] = useState(1);
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: "kodeJuklak",
        direction: "asc",
    });
    const sortedRecords = useMemo(() => sortBy(dataJpmp, "kodeJuklak"), []);
    const [records, setRecords] = useState(sortedRecords.slice(0, pageSize));

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecords(dataJpmp.slice(from, to));
    }, [page, pageSize]);
    useEffect(() => {
        const data = sortBy(dataJpmp, sortStatus.columnAccessor);
        setRecords(sortStatus.direction === "desc" ? data.reverse() : data);
    }, [sortStatus]);

    const handleDetailJuklak = () => {
        setOpenDetailJuklak(!openDetailJuklak);
    };

    const handleKonfirmasiAktif = () => {
        setOpenKonfirmasiAktif(!openKonfirmasiAktif);
    };

    const handleKonfirmasiNonAktif = () => {
        setOpenKonfirmasiNonAktif(!openKonfirmasiNonAktif);
    };
    return (
        <>
            <div className="flex flex-wrap items-end gap-x-4">
                <Selects label="Tingkat Kelas" data={optionsTingkatKelas} withAsterisk required />
                <Selects label="Tahun Ajaran" data={optionsTahunAjaran} withAsterisk required />
                <Selects label="Semester" data={optionsSemester} withAsterisk required />
                <Button className="bg-info">Lihat</Button>
            </div>
            <div className="mt-4 flex items-center gap-x-4">
                <Button className="bg-success">Template Juklak</Button>
                <Button className="bg-success">Template Juklak Detail</Button>
                <Button className="bg-success">Upload Juklak</Button>
                <Button className="bg-success">Upload Juklak Detail</Button>
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
                            render: (number) => dataJpmp.indexOf(number) + 1,
                        },
                        { accessor: "idJuklak", title: "ID Juklak", sortable: true },
                        { accessor: "namaJuklak", title: "Nama Juklak", sortable: true },
                        { accessor: "tanggalAwal", title: "Tanggal Awal", sortable: true, render: ({ tanggalAwal }) => dayjs(tanggalAwal).format("DD MMMM YYYY") },
                        { accessor: "tanggalAkhir", title: "Tanggal Akhir", sortable: true, render: ({ tanggalAkhir }) => dayjs(tanggalAkhir).format("DD MMMM YYYY") },
                        { accessor: "hariBelajar", title: "Hari Belajar", sortable: true },
                        {
                            accessor: "status",
                            sortable: true,
                            render: ({ status }) => (
                                <Badge className={`${status === true ? "bg-success" : "bg-danger"} text-white`} size="md">
                                    {status === true ? "Aktif" : "Tidak Aktif"}
                                </Badge>
                            ),
                        },
                        { accessor: "tanggalUpload", title: "Tanggal Upload", sortable: true, render: ({ tanggalUpload }) => dayjs(tanggalUpload).format("DD MMMM YYYY hh:hh") },
                        { accessor: "jumlahDetail", title: "Jumlah Detail", sortable: true },
                    ]}
                    rowContextMenu={{
                        items: (record) => [
                            {
                                key: "detail",
                                icon: <FaList className="h-3 w-3" />,
                                title: `Detail Juklak ${record.kodeJuklak}`,
                                onClick: () => handleDetailJuklak(),
                            },
                            {
                                key: "active",
                                icon: <FaCheck className="h-3 w-3" />,
                                title: `Aktifkan ${record.kodeJuklak}`,
                                onClick: () => handleKonfirmasiAktif(),
                            },
                            {
                                key: "nonactive",
                                icon: <FaXmark className="h-3 w-3" />,
                                title: `Non Aktifkan ${record.kodeJuklak}`,
                                onClick: () => handleKonfirmasiNonAktif(),
                            },
                        ],
                    }}
                    totalRecords={dataJpmp.length}
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
            <DialogModal heightFit open={openDetailJuklak} handler={handleDetailJuklak} size="lg" title="Detail Juklak">
                <ul className="flex flex-wrap gap-x-4 gap-y-2">
                    <li className="flex items-center gap-x-2">
                        <p className="font-bold">ID/Kode Juklak:</p>
                        <p>37150 / S12324-GOL-6KREV-936</p>
                    </li>
                    <div>|</div>
                    <li className="flex items-center gap-x-2">
                        <p className="font-bold">Tanggal Awal:</p>
                        <p>11 November 2023</p>
                    </li>
                    <div>|</div>
                    <li className="flex items-center gap-x-2">
                        <p className="font-bold">Tanggal Akhir:</p>
                        <p>17 November 2023</p>
                    </li>
                    <div>|</div>
                    <li className="flex items-center gap-x-2">
                        <p className="font-bold">Hari Belajar:</p>
                        <p>SENIN(2)-SELASA(2)-KAMIS(2)</p>
                    </li>
                    <div>|</div>
                    <li className="flex items-center gap-x-2">
                        <p className="font-bold">Jumlah Pertemuan (Minggu):</p>
                        <p>6</p>
                    </li>
                    <div>|</div>
                    <li className="flex items-center gap-x-2">
                        <p className="font-bold">Total Pertemuan:</p>
                        <p>116</p>
                    </li>
                </ul>
                <div className="my-4 h-80 w-full border border-black"></div>
                <ul className="flex items-center gap-x-4 text-xs">
                    <li className="flex items-center gap-x-2">
                        <p className="font-bold">PENGARAHAN:</p>
                        <p>2</p>
                    </li>
                    <li className="flex items-center gap-x-2">
                        <p className="font-bold">TOTAL KBM KODING:</p>
                        <p>110</p>
                    </li>
                    <li className="flex items-center gap-x-2">
                        <p className="font-bold">GOA (DI LUAR KBM):</p>
                        <p>0</p>
                    </li>
                    <li className="flex items-center gap-x-2">
                        <p className="font-bold">TOBK (DI LUAR KBM):</p>
                        <p>0</p>
                    </li>
                    <li className="flex items-center gap-x-2">
                        <p className="font-bold">RESPONSI DI LUAR KBM:</p>
                        <p>0</p>
                    </li>
                    <li className="flex items-center gap-x-2">
                        <p className="font-bold">KAPITA SELEKTA THE KING:</p>
                        <p>4</p>
                    </li>
                </ul>
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
        </>
    );
};

export default Jpmp;
