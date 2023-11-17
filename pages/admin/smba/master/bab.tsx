import { Children, useEffect, useMemo, useRef, useState } from "react";
import { DataTable, DataTableSortStatus } from "mantine-datatable";
import { Button, Dialog, DialogBody } from "@material-tailwind/react";
import { Box, Group, TextInput } from "@mantine/core";
import sortBy from "lodash/sortBy";
import { useReactToPrint } from "react-to-print";
import { PAGE_SIZES, useStyles, optionsUplineBab, optionsPeluang,optionsPelajaran, babDatas } from "@/data/smba/data";
import Selects from "@/components/Ui/Selects";
import { BiSolidChevronRight, BiSolidEditAlt } from "react-icons/bi";
import { FaCheck, FaQuestion, FaXmark } from "react-icons/fa6";
import { MdAdd } from "react-icons/md";
import DialogModal from "@/components/Modal/Modal";
import api from "@/service/api";
import React from "react";

const Bab = () => {
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [page, setPage] = useState(1);
    const [expandedBabKode, setExpandedBabKode] = useState<string[]>([]);
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: "created_at",
        direction: "desc",
    });
    const { cx, classes } = useStyles();
    const [openTambah, setOpenTambah] = useState(false);
    const [openUbah, setOpenUbah] = useState(false);
    const [openTambahSubBabModal, setOpenTambahSubBabModal] = useState(false);
    const [openKonfirmasiAktif, setOpenKonfirmasiAktif] = useState(false);
    const [openKonfirmasiNonAktif, setOpenKonfirmasiNonAktif] = useState(false);
    const [ListDatatabel, setListDatatabel] = useState<any>([]);
    const [totalRecords,settotalRecords] = useState<any>([]);
    const [upline,setUpline] = useState(null);
    const [subBabDatas, SetSubBabDatas] = useState<any>([])
   var i=0;
    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    
    const ref = useRef(null);
    const handlePrint = useReactToPrint({
        content: () => ref.current,
    });

    const handleTambah = () => {
        setOpenTambah(!openTambah);
    };

    const handleTambahSubBab = () => {
        setOpenTambahSubBabModal(!openTambahSubBabModal);
    };

    const handleUbah = () => {
        setOpenUbah(!openUbah);
    };

    const handleKonfirmasiAktif = () => {
        setOpenKonfirmasiAktif(!openKonfirmasiAktif);
    };

    const handleKonfirmasiNonAktif = () => {
        setOpenKonfirmasiNonAktif(!openKonfirmasiNonAktif);
    };

    const getDataTabel = async () => {
        try {
          const res = await api.get(`/${process.env.NEXT_PUBLIC_API_VERSION}/${process.env.NEXT_PUBLIC_API_SERVICE_SMBA}/master/bab?sort=${sortStatus.direction}&order_by=${sortStatus.columnAccessor}&page=${page}&per_page=${pageSize}`);
          
          const updatedData = await Promise.all(res.data?.data.map(async (item) => {
            const childrenData = await fetchDataForChildren(item.kode_bab);
            i++
            return {
              ...item,
              children: childrenData,
              id:i
            };
          }));
         
          settotalRecords(res.data?.metadata.total_count ?? 0);
          setListDatatabel(updatedData);
        } catch (err) {
          console.log(err);
        }
      };
      
    
      const fetchDataForChildren = async (kode_bab) => {
        try {
          const response =  await api.get(`/${process.env.NEXT_PUBLIC_API_VERSION}/${process.env.NEXT_PUBLIC_API_SERVICE_SMBA}/master/bab/sub?upline=${kode_bab}`); // Replace with your actual API call
          if(response.data?.data?.length===0){
            return null;
          }
          const updatedData = await Promise.all(response.data?.data.map(async (item) => {
            i++
            return {
              ...item,
              id:i
            };
          }));
          return updatedData;
        } catch (error) {
          console.error('Error fetching children data:', error);
          return []; // Return an empty array or handle the error as needed
        }
      };

      const getAllSubBab = async (listKodeBab) => {
        try {
             listKodeBab.map(async (kode_bab) => {

                const response = await fetchDataForChildren(kode_bab); // Ganti ini dengan logika Anda
                if(response != null){
                    tambahkanDataTabel(ListDatatabel,kode_bab,response)
                }
                
               
            });
    
            
        } catch (error) {
            console.error('Error fetching sub-bab data:', error);
            return []; // Mengembalikan array kosong jika terjadi kesalahan pada pemanggilan
        }
    };
    
async function tambahkanDataTabel(data, kodeBab, newData) {
    console.log(kodeBab)
    let currentData = data;

    // Memecah kodeBab menjadi potongan kode yang terpisah
    const subCodes = kodeBab.split('.');

    // Iterasi melalui potongan kode untuk menavigasi ke bagian yang sesuai dalam data
    for (let i = 0; i < subCodes.length - 2; i++) {
        const code =  kodeBab.split('.').slice(0, i + 2).join('.');
        const index = currentData.findIndex(item => item.kode_bab === code);
        
        if (index !== -1) {
            currentData = currentData[index].children;
        } else {
            console.log('Indeks tidak ditemukan.');
            break;
            return;
        }
    }

    // Temukan indeks terakhir dan tambahkan newData ke properti children
    const lastCode = subCodes[subCodes.length - 1];
    const lastIndex = currentData.findIndex(item => item.kode_bab === kodeBab);

    if (lastIndex !== -1) {
        // Pastikan untuk menambahkan properti children sebagai array jika belum ada
        if (!currentData[lastIndex].children) {
            currentData[lastIndex].children = [];
        }
        
        // Tambahkan objek newData ke properti children
        currentData[lastIndex].children.push(newData);

        setListDatatabel(data); 
    } else {
        console.log('Indeks terakhir tidak ditemukan.');
    }
}

    
     

    useEffect(() => {
        getDataTabel();
    }, [sortStatus,page,pageSize]);

    const RecursiveDataTable = ({ data, expandedSubBabIds, setExpandedSubBabIds }) => {
        const [loading, setLoading] = useState(true);

        useEffect(() =>  {
            if (data && data.record && data.record.children) {
                const extractedKodeBab = data.record.children.map((item) => item.kode_bab);
               getAllSubBab(extractedKodeBab);
               setLoading(false);
            }
            
        }, []); 
    
        if (loading) {
            return <p>Loading...</p>;
        }
        return (
          <>
            {data?.record?.children?.map((item) => {
                console.log("ini data",item)
              return  (
              <React.Fragment key={item.kode_bab}>
                <DataTable
                  noHeader
                  withBorder
                  records={[item]}
                  columns={[
                    {
                    accessor: "kode_bab",
                    title: "Nama Bab",
                    sortable: true,
                    render: ({ kode_bab,nama_bab, children }: any) => {
                        
                        if (children && children.length > 0) {
                            return (
                                <Group spacing="xs">
                                    <BiSolidChevronRight
                                        className={`your-expand-icon-class ${expandedBabKode.includes(kode_bab) ? 'your-rotated-class' : ''}`}
                                    />
                                    <p>
                                     {kode_bab} {nama_bab}
                                    </p>
                                </Group>
                            );
                            
                        } else {
                            return (
                                <p className="pl-4 ml-2">
                                    {kode_bab} {nama_bab}
                                </p>
                            );
                        }
                    }
                    },
                    { accessor: "peluang", title: "Peluang", sortable: true },
                    { accessor: "status", title: "Status", sortable: true },
                ]}
                rowExpansion={{
                    allowMultiple: true,
                    expanded: {
                         recordIds: expandedBabKode, onRecordIdsChange: setExpandedBabKode 
                    },
                    content: (subBab) => (
                    <RecursiveDataTable data={subBab} expandedSubBabIds={expandedSubBabIds} setExpandedSubBabIds={setExpandedSubBabIds}/>
                    ),
                }}
                  rowContextMenu={{
                    items: (record) => [
                      {
                        key: 'add',
                        icon: <MdAdd className="h-3 w-3" />,
                        title: `Tambah Sub Bab ${record.namaBab}`,
                        onClick: () => handleTambahSubBab(), // Assuming handleTambahSubBab is defined
                      },
                      {
                        key: 'edit',
                        icon: <BiSolidEditAlt className="h-3 w-3" />,
                        title: `Ubah ${record.namaBab}`,
                        onClick: () => handleUbah(), // Assuming handleUbah is defined
                      },
                      {
                        key: 'active',
                        icon: <FaCheck className="h-3 w-3" />,
                        title: `Aktifkan ${record.namaBab}`,
                        onClick: () => handleKonfirmasiAktif(), 
                      },
                      {
                        key: 'nonactive',
                        icon: <FaXmark className="h-3 w-3" />,
                        title: `Non Aktifkan ${record.namaBab}`,
                        onClick: () => handleKonfirmasiNonAktif(), 
                      },
                    ],
                  }}
                />
              </React.Fragment>
            )})}
          </>
        );
      };
        
    return (
        <>
            <div className="flex items-end gap-x-4">
                <Selects label="Mata Pelajaran" data={optionsPelajaran} required />
                <Button className="max-w-max bg-info">Lihat</Button>
                <Button className="max-w-max bg-success" onClick={handleTambah}>
                    Tambah
                </Button>
                <Button className="max-w-max bg-info" onClick={handlePrint}>
                    Cetak
                </Button>
            </div>
            <Box sx={{ height:  ListDatatabel.length > 10 ? 700 : "auto" }} className="mt-4">
                <div ref={ref}>
                 
                <DataTable
                    withBorder
                    withColumnBorders
                    records={ListDatatabel}
                    columns={[
                        {
                        accessor: "kode_bab",
                        title: "Nama Bab",
                        sortable: true,
                        render: ({ kode_bab,nama_bab, children }: any) => {
                            
                            if (children && children.length > 0) {
                                return (
                                    <Group spacing="xs">
                                        <BiSolidChevronRight
                                            className={`your-expand-icon-class ${expandedBabKode.includes(kode_bab) ? 'your-rotated-class' : ''}`}
                                        />
                                        <p>
                                         {kode_bab} {nama_bab}
                                        </p>
                                    </Group>
                                );
                                
                            } else {
                                return (
                                    <p className="pl-4 ml-2">
                                        {kode_bab} {nama_bab}
                                    </p>
                                );
                            }
                        }
                        },
                        { accessor: "peluang", title: "Peluang", sortable: true },
                        { accessor: "status", title: "Status", sortable: true },
                    ]}
                    rowExpansion={{
                        allowMultiple: true,
                        expanded: {
                             recordIds: expandedBabKode, onRecordIdsChange: setExpandedBabKode 
                        },
                        content: (subBab) => (
                        <RecursiveDataTable data={subBab} expandedSubBabIds={expandedBabKode} setExpandedSubBabIds={setExpandedBabKode}/>
                        ),
                    }}
                    rowContextMenu={{
                        items: (record) => [
                        {
                            key: "add",
                            icon: <MdAdd className="h-3 w-3" />,
                            title: `Tambah Sub Bab ${record.nama_bab}`,
                            onClick: () => handleTambahSubBab(),
                        },
                        {
                            key: "edit",
                            icon: <BiSolidEditAlt className="h-3 w-3" />,
                            title: `Ubah ${record.nama_bab}`,
                            onClick: () => handleUbah(),
                        },
                        {
                            key: "active",
                            icon: <FaCheck className="h-3 w-3" />,
                            title: `Aktifkan ${record.nama_bab}`,
                            onClick: () => handleKonfirmasiAktif(),
                        },
                        {
                            key: "nonactive",
                            icon: <FaXmark className="h-3 w-3" />,
                            title: `Non Aktifkan ${record.nama_bab}`,
                            onClick: () => handleKonfirmasiNonAktif(),
                        },
                        ],
                    }}
                    sortStatus={sortStatus}
                    onSortStatusChange={setSortStatus}
                    totalRecords={totalRecords}
                    recordsPerPage={pageSize}
                    page={page}
                    paginationSize="sm"
                    onPageChange={(p) => setPage(p)}
                    recordsPerPageOptions={PAGE_SIZES}
                    onRecordsPerPageChange={setPageSize}
                    paginationText={({ from, to, totalRecords }) =>
                        `Records ${from} - ${to} of ${totalRecords}`
                    }
                    />

                </div>
            </Box>

            {/* Tambah */}
            <DialogModal size="xs" open={openTambah} handler={handleTambah} heightFit={true} title="Form Tambah Bab">
                <form action="#">
                    <TextInput label="Mata Pelajaran" placeholder="Mata Pelajaran" withAsterisk required />
                    <Selects className="my-2" label="Upline" withAsterisk data={optionsUplineBab} />
                    <div className="flex items-end gap-x-4">
                        <Selects label="Kode Bab" withAsterisk data={optionsUplineBab} />
                        <p className="mb-2">format: ##,##,###</p>
                    </div>
                    <TextInput className="my-2" label="Nama Bab" placeholder="Nama Bab" withAsterisk required />
                    <Selects label="Peluang" withAsterisk data={optionsPeluang} />

                    <div className="mt-8 flex justify-center gap-x-4">
                        <Button className="bg-success" onClick={handleTambah}>
                            Simpan
                        </Button>
                        <Button className="bg-white text-black" onClick={handleTambah}>
                            Tutup
                        </Button>
                    </div>
                </form>
            </DialogModal>

            {/* Tambah Sub Bab */}
            <DialogModal size="xs" open={openTambahSubBabModal} handler={handleTambahSubBab} heightFit={true} title="Form Tambah Sub Bab">
                <form action="#">
                    <TextInput label="Mata Pelajaran" placeholder="Mata Pelajaran" withAsterisk required />
                    <Selects className="my-2" label="Upline" withAsterisk data={optionsUplineBab} />
                    <div className="flex items-end gap-x-4">
                        <Selects label="Kode Bab" withAsterisk data={optionsUplineBab} />
                        <p className="mb-2">format: ##,##,###</p>
                    </div>
                    <TextInput className="my-2" label="Nama Bab" placeholder="Nama Bab" withAsterisk required />
                    <Selects label="Peluang" withAsterisk data={optionsPeluang} />

                    <div className="mt-8 flex justify-center gap-x-4">
                        <Button className="bg-success" onClick={handleTambahSubBab}>
                            Simpan
                        </Button>
                        <Button className="bg-white text-black" onClick={handleTambahSubBab}>
                            Tutup
                        </Button>
                    </div>
                </form>
            </DialogModal>

            {/* Ubah */}
            <DialogModal size="xs" open={openUbah} handler={handleUbah} heightFit={true} title="Form Ubah Bab">
                <form action="#">
                    <TextInput label="Mata Pelajaran" placeholder="Mata Pelajaran" withAsterisk required />
                    <Selects className="my-2" label="Upline" withAsterisk data={optionsUplineBab} />
                    <div className="flex items-end gap-x-4">
                        <Selects label="Kode Bab" withAsterisk data={optionsUplineBab} />
                        <p className="mb-2">format: ##,##,###</p>
                    </div>
                    <TextInput className="my-2" label="Nama Bab" placeholder="Nama Bab" withAsterisk required />
                    <Selects label="Peluang" withAsterisk data={optionsPeluang} />

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

export default Bab;
