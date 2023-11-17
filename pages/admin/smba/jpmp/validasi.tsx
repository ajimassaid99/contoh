import Selects from "@/components/Ui/Selects";
import { PAGE_SIZES, dataBuatJpmpKelas, dataJpmpKelas, dataPjmpGrouping, optionsSemester, optionsTahunAjaran, optionsTingkatKelas, optionsZona } from "@/data/smba/data";
import { Badge, Box, Textarea } from "@mantine/core";
import { Button } from "@material-tailwind/react";
import { sortBy } from "lodash";
import { DataTable, DataTableSortStatus } from "mantine-datatable";
import { useEffect, useMemo, useState } from "react";
import { FaEye, FaPlus, FaTrash } from "react-icons/fa6";
import dayjs from "dayjs";
import "dayjs/locale/id";
import ConfirmationModalTable from "@/components/Modal/ModalConfirmation";
import DialogModal from "@/components/Modal/Modal";
import { optionsGedung, optionsKota } from "@/components/go-kasir/data";
import { MdAdd } from "react-icons/md";
import { BiSolidEditAlt } from "react-icons/bi";

const ValidasiJpmpKelas = () => {
    dayjs.locale("id");
    const [openValidasiPengajuan, setOpenValidasiPengajuan] = useState(false);
    const [selectedRowData, setSelectedRowData] = useState<any>(null);
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [page, setPage] = useState(1);
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: "kelas",
        direction: "asc",
    });
    const sortedRecords = useMemo(() => sortBy(dataJpmpKelas, "kelas"), []);
    const [records, setRecords] = useState(sortedRecords.slice(0, pageSize));

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecords(dataJpmpKelas.slice(from, to));
    }, [page, pageSize]);
    useEffect(() => {
        const data = sortBy(dataJpmpKelas, sortStatus.columnAccessor);
        setRecords(sortStatus.direction === "desc" ? data.reverse() : data);
    }, [sortStatus]);

    const handleValidasiPengajuan = (rowData: any) => {
        setSelectedRowData(rowData);
        setOpenValidasiPengajuan(!openValidasiPengajuan);
    };

    const totalDf = dataPjmpGrouping.reduce((acc, item) => acc + item.df, 0);
    const totalPj = dataPjmpGrouping.reduce((acc, item) => acc + item.pj, 0);
    return (
        <>
            <div className="flex flex-wrap items-end gap-x-4">
                <Selects label="Kota" data={optionsKota} withAsterisk required />
                <Selects label="Zona" data={optionsZona} withAsterisk required />
                <Selects label="Gedung" data={optionsGedung} withAsterisk required />
                <Selects label="Tingkat Kelas" data={optionsTingkatKelas} withAsterisk required />
                <Selects label="Tahun Ajaran" data={optionsTahunAjaran} withAsterisk required />
                <Selects label="Semester" data={optionsSemester} withAsterisk required />
                <Button className="bg-info">Lihat</Button>
            </div>
            <Box sx={{ height: records.length > 10 ? 750 : "auto" }} className="mt-4">
                <DataTable
                    withColumnBorders
                    highlightOnHover
                    shadow="sm"
                    records={records}
                    columns={[
                        { accessor: "kelas", title: "Kelas", width: 150, sortable: true },
                        { accessor: "statusKelas", title: "Status Kelas", sortable: true },
                        { accessor: "namaJuklak", title: "Nama Juklak", width: 400, sortable: true },
                        { accessor: "smt", title: "SMT", sortable: true },
                        { accessor: "pertemuan", title: "Pertemuan", sortable: true },
                        {
                            accessor: "adaJuklak",
                            sortable: true,
                            render: ({ adaJuklak }) => (
                                <Badge className={`${adaJuklak === true ? "bg-success" : "bg-danger"} text-white`} size="md">
                                    {adaJuklak === true ? "SUDAH" : "BELUM"}
                                </Badge>
                            ),
                        },
                        {
                            accessor: "validatorKacab",
                            title: "Validator KACAB",
                            sortable: true,
                            render: ({ validatorKacab }) => (
                                <Badge className={`${validatorKacab === true ? "bg-success" : "bg-danger"} text-white`} size="md">
                                    {validatorKacab === true ? "DISETUJUI" : "DITOLAK"}
                                </Badge>
                            ),
                        },
                        {
                            accessor: "validatorBmp",
                            title: "Validator BMP",
                            sortable: true,
                            render: ({ validatorBmp }) => (
                                <Badge className={`${validatorBmp === true ? "bg-success" : "bg-danger"} text-white`} size="md">
                                    {validatorBmp === true ? "DISETUJUI" : "DITOLAK"}
                                </Badge>
                            ),
                        },
                        { accessor: "pengajuanKe", title: "Pengajuan Ke", sortable: true },
                        { accessor: "stPengajuan", title: "ST Pengajuan", sortable: true },
                        { accessor: "petugasPengajuan", title: "Petugas Pengajuan", sortable: true },
                        { accessor: "tanggalPengajuan", title: "Tanggal Pengajuan", sortable: true, render: ({ tanggalPengajuan }) => dayjs(tanggalPengajuan).format("DD MMMM YYYY") },
                        { accessor: "alasan", title: "Alasan", width: 300, sortable: true },
                        { accessor: "petugasAcc", title: "Petugas ACC", sortable: true },
                        { accessor: "tanggalAcc", title: "Tanggal ACC", sortable: true, render: ({ tanggalAcc }) => dayjs(tanggalAcc).format("DD MMMM YYYY") },
                    ]}
                    rowContextMenu={{
                        items: (record) => [
                            {
                                key: "validation",
                                icon: <MdAdd className="h-3 w-3" />,
                                title: `Validasi Pengajuan JPMP ${record.kelas}`,
                                onClick: () => handleValidasiPengajuan(selectedRowData),
                            },
                        ],
                    }}
                    totalRecords={dataJpmpKelas.length}
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

            {/* Validasi */}
            <DialogModal open={openValidasiPengajuan} handler={handleValidasiPengajuan} size="xl" title="Form Validasi Pengajuan JPMP Kelas" heightFit={false}>
                <ul className="flex flex-wrap items-start gap-x-4 gap-y-2">
                    <li className="flex items-center gap-x-2">
                        <p className="font-bold">TO:</p>
                        <p>-</p>
                    </li>
                    <div>|</div>
                    <li className="flex items-center gap-x-2">
                        <p className="font-bold">TO SLP:</p>
                        <p>-</p>
                    </li>
                    <div>|</div>
                    <li className="flex items-center gap-x-2">
                        <p className="font-bold">PTO SLP:</p>
                        <p>-</p>
                    </li>
                    <div>|</div>
                    <li className="flex items-center gap-x-2">
                        <p className="font-bold">SIAGA UN:</p>
                        <p>-</p>
                    </li>
                    <div>|</div>
                    <li className="flex items-center gap-x-2">
                        <p className="font-bold">SIAGA PAS:</p>
                        <p>-</p>
                    </li>
                    <div>|</div>
                    <li className="flex items-center gap-x-2">
                        <p className="font-bold">SIAGA PTS:</p>
                        <p>-</p>
                    </li>
                    <div>|</div>
                    <li className="flex items-center gap-x-2">
                        <p className="font-bold">KBM KODING:</p>
                        <p>-</p>
                    </li>
                    <div>|</div>
                    <li className="flex items-center gap-x-2">
                        <p className="font-bold">PENGARAHAN:</p>
                        <p>-</p>
                    </li>
                    <div>|</div>
                    <li className="flex items-center gap-x-2">
                        <p className="font-bold">SIAGA USBN:</p>
                        <p>-</p>
                    </li>
                    <div>|</div>
                    <li className="flex items-center gap-x-2">
                        <p className="font-bold">UN VAGANZA:</p>
                        <p>-</p>
                    </li>
                    <div>|</div>
                    <li className="flex items-center gap-x-2">
                        <p className="font-bold">SEMINAR SLP:</p>
                        <p>-</p>
                    </li>
                    <div>|</div>
                    <li className="flex items-center gap-x-2">
                        <p className="font-bold">SOSIALISASI THE KING:</p>
                        <p>-</p>
                    </li>
                </ul>
                <Box sx={{ height: dataPjmpGrouping.length > 10 ? 750 : "auto" }} className="mt-4">
                    <DataTable
                        withColumnBorders
                        shadow="sm"
                        records={dataPjmpGrouping}
                        groups={[
                            {
                                id: "tanggal",
                                title: "TANGGAL",
                                className: "text-center",
                                style: { textAlign: "center", width: "15rem", border: "none" },
                                columns: [
                                    { accessor: "tanggalAwal", title: "Awal", footerStyle: { textAlign: "center", border: "none" } },
                                    { accessor: "tanggalAkhir", title: "Akhir", footer: "Total", footerClassName: "text-primary", footerStyle: { textAlign: "center", border: "none" } },
                                ],
                            },
                            {
                                id: "matematika-wajib",
                                title: "MATEMATIKA WAJIB",
                                style: { textAlign: "center", width: "5rem" },
                                columns: [
                                    { accessor: "df", title: "DF", footer: totalDf },
                                    { accessor: "pj", title: "PJ", footer: totalPj },
                                ],
                            },
                            {
                                id: "matematika-peminatan",
                                title: "MATEMATIKA PEMINATAN",
                                style: { textAlign: "center", width: "5rem" },
                                columns: [
                                    { accessor: "df", title: "DF", footer: totalDf },
                                    { accessor: "pj", title: "PJ", footer: totalPj },
                                ],
                            },
                            {
                                id: "fisika",
                                title: "FISIKA",
                                style: { textAlign: "center", width: "5rem" },
                                columns: [
                                    { accessor: "df", title: "DF", footer: totalDf },
                                    { accessor: "pj", title: "PJ", footer: totalPj },
                                ],
                            },
                            {
                                id: "kimia",
                                title: "KIMIA",
                                style: { textAlign: "center", width: "5rem" },
                                columns: [
                                    { accessor: "df", title: "DF", footer: totalDf },
                                    { accessor: "pj", title: "PJ", footer: totalPj },
                                ],
                            },
                            {
                                id: "biologi",
                                title: "BIOLOGI",
                                style: { textAlign: "center", width: "5rem" },
                                columns: [
                                    { accessor: "df", title: "DF", footer: totalDf },
                                    { accessor: "pj", title: "PJ", footer: totalPj },
                                ],
                            },
                            {
                                id: "bahasa-inggris",
                                title: "BAHASA INGGRIS",
                                style: { textAlign: "center", width: "5rem" },
                                columns: [
                                    { accessor: "df", title: "DF", footer: totalDf },
                                    { accessor: "pj", title: "PJ", footer: totalPj },
                                ],
                            },
                            {
                                id: "bahasa-indonesia",
                                title: "BAHASA INDONESIA",
                                style: { textAlign: "center", width: "5rem" },
                                columns: [
                                    { accessor: "df", title: "DF", footer: totalDf },
                                    { accessor: "pj", title: "PJ", footer: totalPj },
                                ],
                            },
                            {
                                id: "literasi-dalam-bahasa-inggris",
                                title: "LITERASI DALAM BAHASA INGGRIS",
                                style: { textAlign: "center", width: "5rem" },
                                columns: [
                                    { accessor: "df", title: "DF", footer: totalDf },
                                    { accessor: "pj", title: "PJ", footer: totalPj },
                                ],
                            },
                            {
                                id: "kpu-pm1",
                                title: "KPU + PM 1",
                                style: { textAlign: "center", width: "5rem" },
                                columns: [
                                    { accessor: "df", title: "DF", footer: totalDf },
                                    { accessor: "pj", title: "PJ", footer: totalPj },
                                ],
                            },
                            {
                                id: "kpu-pm2",
                                title: "KPU + PM 2",
                                style: { textAlign: "center", width: "5rem" },
                                columns: [
                                    { accessor: "df", title: "DF", footer: totalDf },
                                    { accessor: "pj", title: "PJ", footer: totalPj },
                                ],
                            },
                            {
                                id: "bahasa-indonesia-utbk",
                                title: "BAHASA INDONESIA + UTBK",
                                style: { textAlign: "center", width: "5rem" },
                                columns: [
                                    { accessor: "df", title: "DF", footer: totalDf },
                                    { accessor: "pj", title: "PJ", footer: totalPj },
                                ],
                            },
                        ]}
                    />
                </Box>
                <div className="mt-6 flex items-center justify-between">
                    <Textarea className="w-1/3" label="Alasan" placeholder="Alasan" />
                    <div className="flex justify-center gap-x-4">
                        <Button className="bg-success">Terima</Button>
                        <Button className="bg-danger">Tolak</Button>
                        <Button className="bg-white text-black" onClick={() => setOpenValidasiPengajuan(!openValidasiPengajuan)}>
                            Tutup
                        </Button>
                    </div>
                </div>
            </DialogModal>
        </>
    );
};

export default ValidasiJpmpKelas;
