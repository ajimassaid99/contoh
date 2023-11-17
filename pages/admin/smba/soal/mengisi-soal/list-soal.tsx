import { Box } from "@mantine/core";
import { Button } from "@material-tailwind/react";
import { sortBy } from "lodash";
import { DataTable, DataTableSortStatus } from "mantine-datatable";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";

const intialDataListSoal = {
    id: 1,
    tipeSoal: "PGB",
    sumber: "Buku paket",
    kesulitan: "Mudah",
    metode: "Langsung",
    waktuPengerjaan: "20",
    wacana: "Bahasa indonesia adalah bahasa pemersatu bangsa",
    video: "https://google.com",
    kognitif: "Ya",
    totBab: "10.3.2",
    nikPembuat: "213710232",
    namaPembuat: "Asep Saepudin",
    tanggalPembuatan: "20-5-2023",
    isVerif: "true",
    nikVerif: "0934782397",
    namaVerif: "Saepudin Asep",
    tanggalVerif: "10-05-2023",
};

const datasList = Array.from({ length: 40 }, (_, index) => ({
    ...intialDataListSoal,
}));

const PAGE_SIZES = [10, 20, 30];

const ListSoal = () => {
    const router = useRouter();
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [page, setPage] = useState(1);

    const sortedRecordLists = useMemo(() => sortBy(datasList, "id"), []);
    const [recordLists, setRecordLists] = useState(sortedRecordLists.slice(0, pageSize));
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: "namaBab",
        direction: "asc",
    });

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecordLists(datasList.slice(from, to));
    }, [page, pageSize]);

    return (
        <>
            <div className="mb-4 flex items-center justify-between">
                <div className="mb-5 flex items-center gap-2">
                    <FiArrowLeft onClick={() => router.back()} size={25} />
                    <h1 className="text-lg font-bold">List Soal</h1>
                </div>

                <div className=" flex items-end justify-end gap-x-4">
                    <Button className="max-w-max bg-primary ">Refresh</Button>
                    <Button
                        type="button"
                        className="max-w-max bg-primary"
                        onClick={() => {
                            router.push("/admin/smba/soal/mengisi-soal/tambah-soal");
                        }}
                    >
                        Tambah Soal
                    </Button>
                </div>
            </div>

            <Box sx={{ height: recordLists.length > 10 ? 500 : "75vh" }}>
                <DataTable
                    withColumnBorders
                    highlightOnHover
                    shadow="md"
                    records={datasList}
                    columns={[
                        { accessor: "id", width: 150, sortable: true },
                        { accessor: "tipeSoal", width: 150, sortable: true },
                        { accessor: "sumber", width: 200, sortable: true },
                        { accessor: "kesulitan", width: 150, sortable: true },
                        { accessor: "metode", width: 200, sortable: true },
                        { accessor: "waktuPengerjaan", width: 150, sortable: true },
                        { accessor: "wacana", width: 300, sortable: true },
                        { accessor: "video", width: 300, sortable: true },
                        { accessor: "kognitif", width: 200, sortable: true },
                        { accessor: "totBab", width: 150, sortable: true },
                        { accessor: "nikPembuat", width: 150, sortable: true },
                        { accessor: "namaPembuat", width: 150, sortable: true },
                        { accessor: "tanggalPembuatan", width: 150, sortable: true },
                        { accessor: "isVerif", width: 150, sortable: true },
                        { accessor: "nikVerif", width: 150, sortable: true },
                        { accessor: "namaVerif", width: 150, sortable: true },
                        { accessor: "tanggalVerif", width: 150, sortable: true },
                    ]}
                    totalRecords={datasList.length}
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
        </>
    );
};

export default ListSoal;
