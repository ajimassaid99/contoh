import Table from "@/components/Table/Table";
import TableHeader from "@/components/Table/HeaderTable";

const TABLE_HEAD = ["Mata Pelajaran", "Singkatan", "Ada di UTBK", "Status"];

const TABLE_ROWS = [
    {
        nama: "AKM Literasi Membaca",
        singkatan: "Singkatan",
        adaDiUTBK: "N",
        status: "Tidak Aktif",
    },
    {
        nama: "AKM Literasi Membaca",
        singkatan: "Singkatan",
        adaDiUTBK: "N",
        status: "Tidak Aktif",
    },
    {
        nama: "AKM Literasi Membaca",
        singkatan: "Singkatan",
        adaDiUTBK: "N",
        status: "Tidak Aktif",
    },
];

export default function MataPelajaran() {
    const handleSee = () => {
        // Implement the action when "Lihat" button is clicked
    };

    const handleAdd = () => {
        // Implement the action when "Tambah" button is clicked
    };

    const handleSearch = (searchText: string) => {
        // Implement the action when searching is performed
        // You can use the searchText parameter to filter the data, update the state, etc.
    };

    return (
        <>
            <TableHeader onSee={handleSee} onAdd={handleAdd} onSearch={handleSearch} />
            {/* <Table headData={TABLE_HEAD} rowsData={TABLE_ROWS} /> */}
        </>
    );
}
