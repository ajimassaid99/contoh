import DialogModal from "@/components/Modal/Modal";
import DialogModalConfirmation from "@/components/Modal/ModalConfirmation";
import Button from "@/components/Ui/Button";
import Selects from "@/components/Ui/Selects";
import { PAGE_SIZES, dataRekening, optionsBank, optionsStatus } from "@/components/go-kasir/data";
import { Badge, Box, FileInput } from "@mantine/core";
import { sortBy } from "lodash";
import { DataTable, DataTableSortStatus, differenceBy, uniqBy } from "mantine-datatable";
import { useEffect, useMemo, useState } from "react";

const UploadVirtualAccount = () => {
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [page, setPage] = useState(1);
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: "namaKaryawan",
        direction: "asc",
    });
    const sortedRecords = useMemo(() => sortBy(dataRekening, "namaKaryawan"), []);
    const [records, setRecords] = useState(sortedRecords.slice(0, pageSize));

    const [allRecordsSelected, setAllRecordsSelected] = useState(false);
    const [selectedRecords, setSelectedRecords] = useState<any[]>([]);
    const [unselectedRecords, setUnselectedRecords] = useState<any[]>([]);

    const [openTambah, setOpenTambah] = useState(false);
    const [openKonfirmasiHapus, setOpenKonfirmasiHapus] = useState(false);

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
        const currentRecords = dataRekening.slice(from, to);
        setRecords(currentRecords);
        if (allRecordsSelected) {
            setSelectedRecords(
                // 👇 `differenceBy` is a utility function provided by Mantine DataTable
                differenceBy(currentRecords, unselectedRecords, (r) => r.id)
            );
        }
    }, [allRecordsSelected, page, pageSize, unselectedRecords]);

    useEffect(() => {
        const data = sortBy(dataRekening, sortStatus.columnAccessor);
        setRecords(sortStatus.direction === "desc" ? data.reverse() : data);
    }, [sortStatus]);

    const handleTambah = () => {
        setOpenTambah(!openTambah);
    };

    const handleKonfirmasiHapus = () => {
        setOpenKonfirmasiHapus(!openKonfirmasiHapus);
    };

    return (
        <>
            <div className="flex flex-wrap items-end gap-x-4">
                <Selects label="Bank" data={optionsBank} required />
                <Selects label="Status" data={optionsStatus} required />
                <Button className="bg-info">Lihat</Button>
                <Button className="bg-success" onClick={handleTambah}>
                    Tambah
                </Button>
                <Button className="bg-danger" onClick={handleKonfirmasiHapus}>
                    Hapus Data Yang Dipilih
                </Button>
                <Button className="bg-success">Donwload Template Excel</Button>
            </div>
            <Box sx={{ height: records.length > 10 ? 750 : "auto" }} className="z-50 mt-4">
                <DataTable
                    className="z-0"
                    withColumnBorders
                    highlightOnHover
                    shadow="sm"
                    selectedRecords={selectedRecords}
                    onSelectedRecordsChange={handleSelectedRecordsChange}
                    allRecordsSelectionCheckboxProps={{
                        indeterminate: allRecordsSelected && !!unselectedRecords.length,
                        checked: allRecordsSelected,
                        onChange: handleAllRecordsSelectionCheckboxChange,
                        title: allRecordsSelected ? "Unselect all records" : `Select ${dataRekening.length} records`,
                    }}
                    records={records}
                    columns={[
                        {
                            accessor: "number",
                            title: "No",
                            width: 75,
                            render: (number) => dataRekening.indexOf(number) + 1,
                        },
                        { accessor: "namaBank", title: "Nama Bank", sortable: true },
                        { accessor: "nva", title: "Nomor Virtual Akun", sortable: true },
                        { accessor: "peruntukan", title: "Peruntukan", sortable: true },
                        { accessor: "tanggalUpload", title: "Tanggal Upload", sortable: true },
                        { accessor: "nikUpload", title: "NIK Upload", sortable: true },
                        {
                            accessor: "status",
                            title: "Status",
                            sortable: true,
                            render: ({ status }) => (
                                <Badge className={`${status === true ? "bg-success" : "bg-danger"} text-white`} size="md">
                                    {status === true ? "SUDAH TERPAKAI" : "BELUM TERPAKAI"}
                                </Badge>
                            ),
                        },
                    ]}
                    totalRecords={dataRekening.length}
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
                <b className="font-bold">Keterangan: </b>Centang pada baris data untuk memilih.
            </p>

            {/* Tambah */}
            <DialogModal size="xs" open={openTambah} handler={handleTambah} heightFit={true} title="Form Upload Virtual Akun">
                <Selects label="Bank" data={optionsBank} required />
                <FileInput
                    className="mt-2"
                    label="File Excel"
                    placeholder="File Excel"
                    accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    withAsterisk
                    required
                />

                <div className="mt-8 flex justify-center gap-x-4">
                    <Button className="bg-success" onClick={handleTambah}>
                        Simpan
                    </Button>
                    <Button className="bg-white" onClick={handleTambah}>
                        Tutup
                    </Button>
                </div>
            </DialogModal>

            <DialogModalConfirmation
                title="Apakah anda yakin akan Menghapus Virtual Account yang dipilih?"
                open={openKonfirmasiHapus}
                handler={handleKonfirmasiHapus}
                onClickYa={handleKonfirmasiHapus}
                onClickTidak={handleKonfirmasiHapus}
            />
        </>
    );
};

export default UploadVirtualAccount;
