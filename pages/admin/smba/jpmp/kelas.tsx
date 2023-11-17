import Selects from "@/components/Ui/Selects";
import { PAGE_SIZES, dataBuatJpmpKelas, dataJpmpKelas, dataPjmpGrouping, optionsSemester, optionsTahunAjaran, optionsTingkatKelas, optionsZona } from "@/data/smba/data";
import { Badge, Box, Textarea } from "@mantine/core";
import { Button, Dialog, DialogBody } from "@material-tailwind/react";
import { sortBy } from "lodash";
import { DataTable, DataTableSortStatus } from "mantine-datatable";
import { useEffect, useMemo, useState } from "react";
import { FaEye, FaQuestion, FaTrash } from "react-icons/fa6";
import dayjs from "dayjs";
import "dayjs/locale/id";
import DialogModal from "@/components/Modal/Modal";
import { optionsGedung, optionsKota } from "@/components/go-kasir/data";
import { MdAdd } from "react-icons/md";
import { BiSolidEditAlt } from "react-icons/bi";

const JpmpKelas = () => {
    dayjs.locale("id");
    const [openBuat, setOpenBuat] = useState(false);
    const [openHapus, setOpenHapus] = useState(false);
    const [openLihat, setOpenLihat] = useState(false);
    const [openPengajuan, setOpenPengajuan] = useState(false);

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

    const handleBuat = () => {
        setOpenBuat(!openBuat);
    };

    const handleHapus = () => {
        setOpenHapus(!openHapus);
    };

    const handleLihat = () => {
        setOpenLihat(!openLihat);
    };

    const handlePengajuan = () => {
        setOpenPengajuan(!openPengajuan);
    };

    const totalMatematika = dataBuatJpmpKelas.reduce((acc, item) => acc + item.matematika, 0);
    const totalFisika = dataBuatJpmpKelas.reduce((acc, item) => acc + item.fisika, 0);
    const totalKimia = dataBuatJpmpKelas.reduce((acc, item) => acc + item.kimia, 0);
    const totalBiologi = dataBuatJpmpKelas.reduce((acc, item) => acc + item.biologi, 0);
    const totalLitbing = dataBuatJpmpKelas.reduce((acc, item) => acc + item.litbing, 0);
    const totalKpupm1 = dataBuatJpmpKelas.reduce((acc, item) => acc + item.kpupm1, 0);
    const totalKkpm2 = dataBuatJpmpKelas.reduce((acc, item) => acc + item.kkpm2, 0);
    const totalBind = dataBuatJpmpKelas.reduce((acc, item) => acc + item.bind, 0);
    const total = dataBuatJpmpKelas.reduce((acc, item) => acc + item.total, 0);

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
                                key: "create",
                                icon: <MdAdd className="h-3 w-3" />,
                                title: `Buat JPMP ${record.kelas}`,
                                onClick: () => handleBuat(),
                            },
                            {
                                key: "delete",
                                icon: <FaTrash className="h-3 w-3" />,
                                title: `hapus JPMP ${record.kelas}`,
                                onClick: () => handleHapus(),
                            },
                            {
                                key: "see",
                                icon: <FaEye className="h-3 w-3" />,
                                title: `Lihat JPMP ${record.kelas}`,
                                onClick: () => handleLihat(),
                            },
                            {
                                key: "submission",
                                icon: <BiSolidEditAlt className="h-3 w-3" />,
                                title: `Pengajuan JPMP ${record.kelas}`,
                                onClick: () => handlePengajuan(),
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

            {/* Buat */}
            <DialogModal open={openBuat} handler={handleBuat} size="lg" title="Detail Juklak" heightFit={false}>
                <ul className="flex flex-wrap items-start gap-x-4 gap-y-2">
                    <li className="flex items-center gap-x-2">
                        <p className="font-bold">Kelas:</p>
                        <p>12-IPA-R-N-151</p>
                    </li>
                    <div>|</div>
                    <li className="flex items-center gap-x-2">
                        <p className="font-bold">Tanggal Mulai:</p>
                        <p>11 November 2023</p>
                    </li>
                    <div>|</div>
                    <li className="flex items-center gap-x-2">
                        <p className="font-bold">Tanggal Selesai:</p>
                        <p>11 November 2024</p>
                    </li>
                    <div>|</div>
                    <li className="flex items-center gap-x-2">
                        <p className="font-bold">Tingkat Selesai:</p>
                        <p>12 SMA IPA</p>
                    </li>
                    <div>|</div>
                    <li className="flex items-center gap-x-2">
                        <p className="font-bold">Tanggal Running:</p>
                        <p>17 November 2023</p>
                    </li>
                    <div>|</div>
                    <li className="flex items-center gap-x-2">
                        <p className="font-bold">Semester:</p>
                        <p>2</p>
                    </li>
                    <div>|</div>
                    <li className="flex items-center gap-x-2">
                        <p className="font-bold">Jenis Layanan:</p>
                        <p>REGULER</p>
                    </li>
                    <div>|</div>
                    <li className="flex items-center gap-x-2">
                        <p className="font-bold">Tanggal Launching:</p>
                        <p>11 November 2022</p>
                    </li>
                </ul>
                <Selects className="mt-2 w-1/4" label="Kode Juklak" data={optionsSemester} />
                <hr className="my-4" />
                <ul className="mb-4 flex flex-wrap gap-x-4 gap-y-2">
                    <li className="flex items-center gap-x-2">
                        <p className="font-bold">Hari Belajar Kelas:</p>
                        <p>SENIN, KAMIS</p>
                    </li>
                    <li className="flex items-center gap-x-2">
                        <p className="font-bold">Hari Belajar Juklak:</p>
                        <p>KAMIS(2)-SABTU(1)</p>
                    </li>
                    <li className="flex items-center gap-x-2">
                        <p className="font-bold">Nama Juklak:</p>
                        <p>12 IPA REGULER 3 Pert KURIKULUM NASIONAL</p>
                    </li>
                </ul>
                <Box sx={{ height: dataBuatJpmpKelas.length > 10 ? 750 : "auto" }} className="mt-4">
                    <DataTable
                        highlightOnHover
                        shadow="sm"
                        records={dataBuatJpmpKelas}
                        columns={[
                            {
                                accessor: "number",
                                title: "No",
                                sortable: true,
                                width: 75,
                                render: (number) => dataBuatJpmpKelas.indexOf(number) + 1,
                            },
                            { accessor: "tanggalAwal", title: "Tanggal Awal", sortable: true, render: ({ tanggalAwal }) => dayjs(tanggalAwal).format("DD MMMM YYYY") },
                            { accessor: "tanggalAkhir", title: "Tanggal Akhir", sortable: true, render: ({ tanggalAkhir }) => dayjs(tanggalAkhir).format("DD MMMM YYYY") },
                            { accessor: "matematika", title: "Matematika", sortable: true, footer: totalMatematika },
                            { accessor: "fisika", title: "Fisika", sortable: true, footer: totalFisika },
                            { accessor: "kimia", title: "Kimia", sortable: true, footer: totalKimia },
                            { accessor: "biologi", title: "Biologi", sortable: true, footer: totalBiologi },
                            { accessor: "litbing", title: "Literasi Dalam Bahasa Inggris", sortable: true, footer: totalLitbing },
                            { accessor: "kpupm1", title: "KPU + PM 1", sortable: true, footer: totalKpupm1 },
                            { accessor: "kkpm2", title: "KK + PM 2", sortable: true, footer: totalKkpm2 },
                            { accessor: "bind", title: "Bahasa Indonesia", sortable: true, footer: totalBind },
                            { accessor: "total", title: "Total", sortable: true, footer: total },
                        ]}
                    />
                </Box>
                <ul className="mt-4 flex items-center gap-x-4 text-xs">
                    <li className="flex items-center gap-x-2">
                        <p className="font-bold">KBM KODING:</p>
                        <p>29</p>
                    </li>
                    <li className="flex items-center gap-x-2">
                        <p className="font-bold">PENGARAHAN:</p>
                        <p>0</p>
                    </li>
                    <li className="flex items-center gap-x-2">
                        <p className="font-bold">GOA (DI LUAR KBM):</p>
                        <p>0</p>
                    </li>
                    <li className="flex items-center gap-x-2">
                        <p className="font-bold">TOBK (DI LUAR KBM):</p>
                        <p>6</p>
                    </li>
                    <li className="flex items-center gap-x-2">
                        <p className="font-bold">KAPITA SELEKTA THE KING:</p>
                        <p>0</p>
                    </li>
                    <li className="flex items-center gap-x-2">
                        <p className="font-bold">RESPONSI US/PAT (DI LUAR KBM):</p>
                        <p>0</p>
                    </li>
                </ul>
            </DialogModal>

            {/* Lihat */}
            <DialogModal open={openLihat} handler={handleLihat} size="lg" title="Form JPMP Kelas" heightFit={false}>
                <ul className="flex flex-wrap items-start gap-x-4 gap-y-2">
                    <li className="flex items-center gap-x-2">
                        <p className="font-bold">Kelas:</p>
                        <p>12-IPA-R-N-151</p>
                    </li>
                    <div>|</div>
                    <li className="flex items-center gap-x-2">
                        <p className="font-bold">Tanggal Mulai:</p>
                        <p>11 November 2023</p>
                    </li>
                    <div>|</div>
                    <li className="flex items-center gap-x-2">
                        <p className="font-bold">Tanggal Selesai:</p>
                        <p>11 November 2024</p>
                    </li>
                    <div>|</div>
                    <li className="flex items-center gap-x-2">
                        <p className="font-bold">Tingkat Selesai:</p>
                        <p>12 SMA IPA</p>
                    </li>
                    <div>|</div>
                    <li className="flex items-center gap-x-2">
                        <p className="font-bold">Tanggal Running:</p>
                        <p>17 November 2023</p>
                    </li>
                    <div>|</div>
                    <li className="flex items-center gap-x-2">
                        <p className="font-bold">Semester:</p>
                        <p>2</p>
                    </li>
                    <div>|</div>
                    <li className="flex items-center gap-x-2">
                        <p className="font-bold">Jenis Layanan:</p>
                        <p>REGULER</p>
                    </li>
                    <div>|</div>
                    <li className="flex items-center gap-x-2">
                        <p className="font-bold">Tanggal Launching:</p>
                        <p>11 November 2022</p>
                    </li>
                </ul>
                <Selects className="mt-2 w-1/4" label="Kode Juklak" data={optionsSemester} />
                <hr className="my-4" />
                <ul className="mb-4 flex flex-wrap gap-x-4 gap-y-2">
                    <li className="flex items-center gap-x-2">
                        <p className="font-bold">Hari Belajar Kelas:</p>
                        <p>SENIN, KAMIS</p>
                    </li>
                    <li className="flex items-center gap-x-2">
                        <p className="font-bold">Hari Belajar Juklak:</p>
                        <p>KAMIS(2)-SABTU(1)</p>
                    </li>
                    <li className="flex items-center gap-x-2">
                        <p className="font-bold">Nama Juklak:</p>
                        <p>12 IPA REGULER 3 Pert KURIKULUM NASIONAL</p>
                    </li>
                </ul>
                <Box sx={{ height: dataBuatJpmpKelas.length > 10 ? 750 : "auto" }} className="mt-4">
                    <DataTable
                        highlightOnHover
                        shadow="sm"
                        records={dataBuatJpmpKelas}
                        columns={[
                            {
                                accessor: "number",
                                title: "No",
                                sortable: true,
                                width: 75,
                                render: (number) => dataBuatJpmpKelas.indexOf(number) + 1,
                            },
                            { accessor: "tanggalAwal", title: "Tanggal Awal", sortable: true, render: ({ tanggalAwal }) => dayjs(tanggalAwal).format("DD MMMM YYYY") },
                            { accessor: "tanggalAkhir", title: "Tanggal Akhir", sortable: true, render: ({ tanggalAkhir }) => dayjs(tanggalAkhir).format("DD MMMM YYYY") },
                            { accessor: "matematika", title: "Matematika", sortable: true, footer: totalMatematika },
                            { accessor: "fisika", title: "Fisika", sortable: true, footer: totalFisika },
                            { accessor: "kimia", title: "Kimia", sortable: true, footer: totalKimia },
                            { accessor: "biologi", title: "Biologi", sortable: true, footer: totalBiologi },
                            { accessor: "litbing", title: "Literasi Dalam Bahasa Inggris", sortable: true, footer: totalLitbing },
                            { accessor: "kpupm1", title: "KPU + PM 1", sortable: true, footer: totalKpupm1 },
                            { accessor: "kkpm2", title: "KK + PM 2", sortable: true, footer: totalKkpm2 },
                            { accessor: "bind", title: "Bahasa Indonesia", sortable: true, footer: totalBind },
                            { accessor: "total", title: "Total", sortable: true, footer: total },
                        ]}
                    />
                </Box>
                <ul className="mt-4 flex items-center gap-x-4 text-xs">
                    <li className="flex items-center gap-x-2">
                        <p className="font-bold">KBM KODING:</p>
                        <p>29</p>
                    </li>
                    <li className="flex items-center gap-x-2">
                        <p className="font-bold">PENGARAHAN:</p>
                        <p>0</p>
                    </li>
                    <li className="flex items-center gap-x-2">
                        <p className="font-bold">GOA (DI LUAR KBM):</p>
                        <p>0</p>
                    </li>
                    <li className="flex items-center gap-x-2">
                        <p className="font-bold">TOBK (DI LUAR KBM):</p>
                        <p>6</p>
                    </li>
                    <li className="flex items-center gap-x-2">
                        <p className="font-bold">KAPITA SELEKTA THE KING:</p>
                        <p>0</p>
                    </li>
                    <li className="flex items-center gap-x-2">
                        <p className="font-bold">RESPONSI US/PAT (DI LUAR KBM):</p>
                        <p>0</p>
                    </li>
                </ul>
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
                    <p className="mt-4 mb-8 text-center text-black">Apakah Anda Yakin Akan Menghapus Data Ini?</p>
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

            {/* Pengajuan */}
            <DialogModal open={openPengajuan} handler={handlePengajuan} size="xl" title="Form Pengajuan JPMP Kelas" heightFit={false}>
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
                        <Button className="bg-success" onClick={() => setOpenPengajuan(false)}>
                            Simpan
                        </Button>
                        <Button className="bg-white text-black" onClick={() => setOpenPengajuan(false)}>
                            Tutup
                        </Button>
                    </div>
                </div>
            </DialogModal>
        </>
    );
};

export default JpmpKelas;
