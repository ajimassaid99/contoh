import DialogModal from "@/components/Modal/Modal";
import { Badge, Box, Group, TextInput } from "@mantine/core";
import { Button } from "@material-tailwind/react";
import { DataTable, DataTableSortStatus, differenceBy, uniqBy } from "mantine-datatable";
import { useEffect, useMemo, useState } from "react";
import { PAGE_SIZES, useStyles, dataMataAjar, dataSubMataAjar, optionsUplineBab, dataMataPelajaran, optionsStatus } from "@/data/smba/data";
import { sortBy } from "lodash";
import { BiSolidChevronRight, BiSolidEditAlt } from "react-icons/bi";
import Search from "@/components/Ui/Search";
import { MdAdd } from "react-icons/md";
import Selects from "@/components/Ui/Selects";
import Switch from "@/components/Ui/Switch";

const MataAjar = () => {
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [page, setPage] = useState(1);
    const [openTambah, setOpenTambah] = useState(false);
    const [openTambahMapel, setOpenTambahMapel] = useState(false);
    const [openUbahMapelModal, setOpenUbahMapelModal] = useState(false);
    const [expandedBabIds, setExpandedBabIds] = useState<string[]>([]);

    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: "mataAjar",
        direction: "asc",
    });
    const sortedRecords = useMemo(() => sortBy(dataMataAjar, "mataAjar"), []);
    const [records, setRecords] = useState(sortedRecords.slice(0, pageSize));

    const [sortStatusPelajaran, setSortStatusPelajaran] = useState<DataTableSortStatus>({
        columnAccessor: "mataPelajaran",
        direction: "asc",
    });
    const sortedRecordsPelajaran = useMemo(() => sortBy(dataMataPelajaran, "mataPelajaran"), []);
    const [recordsPelajaran, setRecordsPelajaran] = useState(sortedRecordsPelajaran.slice(0, pageSize));

    const [selectedRowData, setSelectedRowData] = useState<any>(null);
    const [allRecordsSelected, setAllRecordsSelected] = useState(false);
    const [selectedRecords, setSelectedRecords] = useState<any[]>([]);
    const [unselectedRecords, setUnselectedRecords] = useState<any[]>([]);
    const { cx, classes } = useStyles();
    const [selectedStatus, setSelectedStatus] = useState(optionsStatus[0].value);

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
        setRecords(dataMataAjar.slice(from, to));
    }, [page, pageSize]);
    useEffect(() => {
        const data = sortBy(dataMataAjar, sortStatus.columnAccessor);
        setRecords(sortStatus.direction === "desc" ? data.reverse() : data);
    }, [sortStatus]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        const currentRecords = dataMataPelajaran.slice(from, to);
        setRecordsPelajaran(currentRecords);
        if (allRecordsSelected) {
            setSelectedRecords(
                // 👇 `differenceBy` is a utility function provided by Mantine DataTable
                differenceBy(currentRecords, unselectedRecords, (r) => r.id)
            );
        }
    }, [allRecordsSelected, page, pageSize, unselectedRecords]);
    useEffect(() => {
        const data = sortBy(dataMataPelajaran, sortStatusPelajaran.columnAccessor);
        setRecordsPelajaran(sortStatusPelajaran.direction === "desc" ? data.reverse() : data);
    }, [sortStatusPelajaran]);

    const handleTambah = () => {
        setOpenTambah(!openTambah);
    };

    const handleEditMapel = (rowData: any) => {
        setSelectedRowData(rowData);
        setOpenUbahMapelModal(!openUbahMapelModal);
    };

    const handleTambahMapel = (rowData: any) => {
        setSelectedRowData(rowData);
        setOpenTambahMapel(!openTambahMapel);
    };

    return (
        <>
            <div className="flex gap-x-4">
                <Search label="Cari Sesuatu" onSearch={() => {}} />
                <Button className="bg-info">Cari</Button>
                <Button className="max-w-max bg-success" onClick={handleTambah}>
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
                            accessor: "mataAjar",
                            title: "Mata Ajar",
                            sortable: true,
                            render: ({ kode_bab, mataAjar }: any) => {
                                const isRelated = dataSubMataAjar && dataSubMataAjar.some((subData) => subData.idSub === kode_bab);

                                if (isRelated) {
                                    return (
                                        <Group spacing="xs">
                                            <BiSolidChevronRight
                                                className={cx(classes.expandIcon, {
                                                    [classes.expandIconRotated]: expandedBabIds.includes(kode_bab),
                                                })}
                                            />
                                            <p>{mataAjar}</p>
                                        </Group>
                                    );
                                } else {
                                    return <p className="ml-[1.6rem] cursor-text">{mataAjar}</p>;
                                }
                            },
                        },
                        { accessor: "singkatan", title: "Singkatan", width: "20%", sortable: true },
                        {
                            accessor: "status",
                            title: "Status",
                            width: "10%",
                            sortable: true,
                            render: ({ status }) => (
                                <Badge className={`${status === true ? "bg-success" : "bg-danger"} text-white`} size="md">
                                    {status === true ? "Aktif" : "Tidak Aktif"}
                                </Badge>
                            ),
                        },
                        { accessor: "idMataAjar", title: "ID", width: "5%", sortable: true },
                    ]}
                    rowContextMenu={{
                        items: (record) => [
                            {
                                key: "edit",
                                icon: <BiSolidEditAlt className="h-3 w-3" />,
                                title: `Ubah ${record.mataAjar}`,
                                onClick: () => handleEditMapel(record.mataAjar),
                            },
                            {
                                key: "add",
                                icon: <MdAdd className="h-3 w-3" />,
                                title: `Tambah Mata Pelajaran ${record.mataAjar}`,
                                onClick: () => handleTambahMapel(record.mataAjar),
                            },
                        ],
                    }}
                    rowExpansion={{
                        allowMultiple: true,
                        expanded: {
                            recordIds: expandedBabIds,
                            onRecordIdsChange: setExpandedBabIds,
                        },
                        content: (subBab) => (
                            <DataTable
                                noHeader
                                columns={[
                                    {
                                        accessor: "mataAjar",
                                        title: "Mata Ajar",
                                        sortable: true,
                                    },
                                    { accessor: "singkatan", title: "Singkatan", width: "20.4%", sortable: true },
                                    {
                                        accessor: "status",
                                        title: "Status",
                                        width: "10.25%",
                                        sortable: true,
                                        render: ({ status }) => (
                                            <Badge className={`${status === true ? "bg-success" : "bg-danger"} text-white`} size="md">
                                                {status === true ? "Aktif" : "Tidak Aktif"}
                                            </Badge>
                                        ),
                                    },
                                    { accessor: "idMataAjar", title: "ID", width: "4%", sortable: true },
                                ]}
                                rowContextMenu={{
                                    items: (record) => [
                                        {
                                            key: "edit",
                                            icon: <BiSolidEditAlt className="h-3 w-3" />,
                                            title: `Edit  ${record.mataAjar}`,
                                            onClick: () => handleEditMapel(record.mataAjar),
                                        },
                                        {
                                            key: "add",
                                            icon: <MdAdd className="h-3 w-3" />,
                                            title: `Tambah ${record.mataAjar}`,
                                            onClick: () => handleTambahMapel(record.mataAjar),
                                        },
                                    ],
                                }}
                                records={dataSubMataAjar.filter((subDatas: any) => subDatas.idSub === subBab.record.id)}
                            />
                        ),
                    }}
                    totalRecords={dataMataAjar.length}
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
            <DialogModal size="xs" open={openTambah} handler={handleTambah} heightFit={true} title="Form Tambah Mata Ajar">
                <form action="#">
                    <TextInput label="Mata Ajar" placeholder="Mata Ajar" withAsterisk required />
                    <TextInput className="my-2" label="Singkatan" placeholder="Singkatan" withAsterisk required />
                    <Selects className="my-2" label="Upline" withAsterisk data={optionsUplineBab} />
                    <Switch label="Status" options={[]} selectedOption={selectedStatus} setSelectedOption={setSelectedStatus} required />

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

            {/* Ubah Mata Pelajaran */}
            <DialogModal size="xs" open={openUbahMapelModal} handler={handleEditMapel} heightFit={true} title="Form Ubah Mata Ajar">
                <form action="#">
                    <TextInput label="Mata Ajar" placeholder="Mata Ajar" withAsterisk required />
                    <TextInput className="my-2" label="Singkatan" placeholder="Singkatan" withAsterisk required />
                    <Selects className="my-2" label="Upline" withAsterisk data={optionsUplineBab} />
                    <Switch label="Status" options={[]} selectedOption={selectedStatus} setSelectedOption={setSelectedStatus} required />

                    <div className="mt-8 flex justify-center gap-x-4">
                        <Button className="bg-success" onClick={() => setOpenUbahMapelModal(false)}>
                            Simpan
                        </Button>
                        <Button className="bg-white text-black" onClick={() => setOpenUbahMapelModal(false)}>
                            Tutup
                        </Button>
                    </div>
                </form>
            </DialogModal>

            {/* Tambah Mata Pelajaran */}
            <DialogModal size="md" open={openTambahMapel} handler={handleTambahMapel} heightFit={false} title="Form Tambah Mata Pelajaran">
                <div className="mb-4 flex gap-x-4">
                    <TextInput className="w-full" label="Mata Ajar" placeholder="Mata Ajar" withAsterisk required />
                    <TextInput className="w-full" label="Singkatan" placeholder="Singkatan" withAsterisk required />
                </div>
                <Box sx={{ height: recordsPelajaran.length > 10 ? 750 : "auto" }} className="mt-4">
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
                            title: allRecordsSelected ? "Unselect all records" : `Select ${dataMataPelajaran.length} records`,
                        }}
                        records={recordsPelajaran}
                        columns={[
                            {
                                accessor: "number",
                                title: "No",
                                sortable: true,
                                width: 75,
                                render: (number) => dataMataPelajaran.indexOf(number) + 1,
                            },
                            { accessor: "mataPelajaran", title: "Nama Pelajaran", sortable: true },
                            { accessor: "singkatan", title: "Singkatan", sortable: true },
                            {
                                accessor: "adaDiUtbk",
                                title: "Ada di UTBK",
                                sortable: true,
                                render: ({ adaDiUtbk }) => (
                                    <Badge className={`${adaDiUtbk === true ? "bg-success" : "bg-danger"} text-white`} size="md">
                                        {adaDiUtbk === true ? "Y" : "N"}
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
                        totalRecords={dataMataPelajaran.length}
                        sortStatus={sortStatusPelajaran}
                        onSortStatusChange={setSortStatusPelajaran}
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
                    <Button className="bg-success" onClick={() => setOpenTambahMapel(false)}>
                        Simpan
                    </Button>
                    <Button className="bg-white text-black" onClick={() => setOpenTambahMapel(false)}>
                        Tutup
                    </Button>
                </div>
            </DialogModal>
        </>
    );
};

export default MataAjar;
